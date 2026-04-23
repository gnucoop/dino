import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Optional, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {b64_to_utf8} from '@dino/core/auth';
import {FormData, FormDataManager, FormSchema, FormSchemaManager} from '@dino/core/forms';
import {Area, AreaManager} from '@dino/core/areas';
import {Case, CaseManager} from '@dino/core/cases';
import {Metric} from '@dino/core/data';
import {ListHeader} from '@dino/core/list';
import {Location, LocationManager} from '@dino/core/locations';
import {Organization, OrganizationManager} from '@dino/core/organizations';
import {Project, ProjectManager} from '@dino/core/projects';
import {RxDocument} from 'rxdb';
import {Observable, of} from 'rxjs';
import {combineLatestWith, map, take} from 'rxjs/operators';
import {format} from 'date-fns';

import * as L from 'leaflet';
import 'leaflet.markercluster';

L.Icon.Default.prototype.options.iconUrl = 'assets/icons/marker-icon.png';
L.Icon.Default.prototype.options.iconRetinaUrl = 'assets/icons/marker-icon-2x.png';
L.Icon.Default.prototype.options.shadowUrl = 'assets/icons/marker-shadow.png';

interface LocationWithLatLon extends Location {
  latLon?: [number, number];
}

interface FieldValues {
  [fieldName: string]: string[];
}

function loadHeaders(schemaId: string): ListHeader<FormData>[] {
  const b64 = localStorage.getItem('columns_' + schemaId);
  if (b64 == null) {
    return [];
  }
  let headers: ListHeader<FormData>[];
  try {
    const preset: {columns: ListHeader<FormData>[]; displayedColumns: string[]} = JSON.parse(
      b64_to_utf8(b64),
    );
    headers = preset.columns;
  } catch {
    console.warn("Couldn't parse column headers");
    return [];
  }
  return filterHeaders(headers);
}

function filterHeaders(headers: ListHeader<FormData>[]): ListHeader<FormData>[] {
  return headers.filter(h => h.displayed && (
    h.dataColumn && !h.repeatingSlideColumn ||
    h.column === 'area_ref_id' || h.column === 'case_ref_id' ||
    h.column === 'organization_ref_id' || h.column === 'project_ref_id'
  ));
}

function markerPopup(form: FormData, dataHeaders: ListHeader<FormData>[]): string {
  let html = '<b>Location</b>: ' + form.data['location_ref_id'];
  for (const h of dataHeaders) {
    let val = form.data[h.column];
    if (val == null) {
      val = 'null';
    }
    if (Array.isArray(val)) {
      val = val.join(', ');
    }
    html += `<br><b>${h.label}</b>: ${val}`;
  }
  return html;
}

@Component({
  selector: 'dinoapp-forms-map',
  templateUrl: 'forms-map.html',
  styleUrls: ['forms-map.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormsMapComponent implements AfterViewInit {
  readonly dateStartControl = new FormControl<Date|null>(null);
  readonly dateEndControl = new FormControl<Date|null>(null);

  headers: ListHeader<FormData>[] = [];
  fieldValues: FieldValues = {};

  private allForms!: FormData[];
  private map!: L.Map;
  private markers!: L.MarkerClusterGroup;

  private schemaId: string;
  private formSchema: Observable<RxDocument<FormSchema>>;
  private formData: Observable<RxDocument<FormData>[]>;
  private areas: Observable<RxDocument<Area>[]>;
  private cases: Observable<RxDocument<Case>[]>;
  private locations: Observable<LocationWithLatLon[]>;
  private organizations: Observable<RxDocument<Organization>[]>;
  private projects: Observable<RxDocument<Project>[]>;

  constructor(
    route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private formSchemaManager: FormSchemaManager,
    formDataManager: FormDataManager,
    @Optional() areaManager: AreaManager | null,
    @Optional() caseManager: CaseManager | null,
    @Optional() locationManager: LocationManager | null,
    @Optional() orgManager: OrganizationManager | null,
    @Optional() projectManager: ProjectManager | null,
  ) {
    this.schemaId = route.snapshot.params['form_schema_id'];

    this.formSchema = this.formSchemaManager.get(this.schemaId).pipe(map(schema => {
      if (schema == null) {
        throw new Error('No form schema with id ' + this.schemaId);
      }
      return schema;
    }), take(1));

    this.formData = formDataManager.query({selector:
      {_deleted: {$ne: true}, form_schema_ref_id: {$eq: this.schemaId}}
    }).pipe(take(1));
    
    if (locationManager == null) {
      throw new Error('the locations module must be enabled to use the map');
    }
    this.locations = locationManager.query({selector:
      {_deleted: {$ne: true}}
    }).pipe(map(locations => {
      return locations.map(doc => {
        const loc = doc.toJSON() as LocationWithLatLon;
        const coord = loc.coordinates as unknown as string;
        if (typeof coord === 'string' && coord.includes(',')) {
          const latLon = coord.split(',').slice(0, 2).map(s => Number(s)) as [number, number];
          if (!isNaN(latLon[0]) && !isNaN(latLon[1])) {
            loc.latLon = latLon;
          }
        }
        return loc;
      }).filter(l => l.latLon != null) as LocationWithLatLon[];
    }), take(1));
    this.areas = areaManager == null ? of([]) : areaManager.query({selector:
      {_deleted: {$ne: true}}
    }).pipe(take(1));
    this.cases = caseManager == null ? of([]) : caseManager.query({selector:
      {_deleted: {$ne: true}}
    }).pipe(take(1));
    this.organizations = orgManager == null ? of([]) : orgManager.query({selector:
      {_deleted: {$ne: true}}
    }).pipe(take(1));
    this.projects = projectManager == null ? of([]) : projectManager.query({selector:
      {_deleted: {$ne: true}}
    }).pipe(take(1));
  }

  ngAfterViewInit(): void {
    this.formSchema.pipe(
      combineLatestWith(this.formData, this.areas, this.cases, this.locations, this.organizations, this.projects),
      take(1),
    ).subscribe(([schema, formData, areas, cases, locations, orgs, projects]) => {
      const metrics: Metric[] = [
        ...areas,
        ...cases,
        ...locations,
        ...orgs,
        ...projects,
      ];
      const metricsTab: {[id: string]: Metric} = {};
      for (const m of metrics) {
        metricsTab[m.id] = m;
      }

      const forms = formData.map(f => f.toJSON() as FormData);
      for (const form of forms) {
        for (const key in form) {
          if (key.endsWith('_ref_id')) {
            const metricId = form[key as keyof FormData] as string | null;
            if (metricId == null) {
              continue;
            }
            const metric = metricsTab[metricId];
            if (metric == null) {
              continue;
            }
            // Store the metric name in the form's data,
            // so that we can treat it as a regular field for displaying and filtering:
            form.data[key] = metric.name;
            if (key === 'location_ref_id') {
              form.data['latLon'] = (metric as LocationWithLatLon).latLon;
            }
          }
        }
      }
      this.allForms = forms.filter(f => f.data['latLon'] != null);

      this.headers = loadHeaders(this.schemaId);
      if (this.headers.length === 0) {
        this.headers = filterHeaders(this.formSchemaManager.generateSchemaListHeaders(schema));
      }
      this.extractFieldValues();
      this.cdr.markForCheck();

      this.createMap();
    });
  }

  private extractFieldValues() {
    const sets: {[field: string]: Set<string>} = {};
    for (const h of this.headers) {
      const field = h.column;
      const set = new Set<string>();
      for (const f of this.allForms) {
        const val = f.data[field];
        if (val == null) {
          set.add('null');
          continue;
        }
        if (Array.isArray(val)) {
          for (const v of val) {
            set.add(String(v));
          }
          continue;
        }
        set.add(String(val));
      }
      sets[field] = set;
    }
    for (const field in sets) {
      this.fieldValues[field] = [...sets[field]].filter(v => v.trim() !== '').sort();
    }
  }

  private createMap() {
    this.map = L.map('mapContainer', {zoomControl: false});
    this.map.setView([43.726, 10.411], 13);
    L.control.zoom({position: 'bottomright'}).addTo(this.map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.markers = L.markerClusterGroup();
    for (const f of this.allForms) {
      const m = L.marker(f.data['latLon']);
      m.bindPopup(markerPopup(f, this.headers), {closeButton: false});
      this.markers.addLayer(m);
    }
    this.map.addLayer(this.markers);
    if (this.allForms.length > 0) {
      this.map.fitBounds(this.markers.getBounds());
    }
  }

  applyFilters() {
    const isoFormat = 'yyyy-MM-dd';
    const dateStart = this.dateStartControl.value;
    const start = dateStart == null ? '0000-01-01' : format(dateStart, isoFormat);
    const dateEnd = this.dateEndControl.value;
    const end = dateEnd == null ? '9999-12-31' : format(dateEnd, isoFormat);

    const filterInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('#filtersContainer input');
    const filterVals: string[] = [];
    for (let i = 0; i < this.headers.length; i++) {
      // Skip the first two filterInputs, which are dateStart and dateEnd
      filterVals.push(filterInputs[i + 2].value.toLowerCase());
    }

    const forms = this.allForms.filter(f => {
      if (f.created_at < start || f.created_at > end) {
        return false;
      }
      for (let i = 0; i < this.headers.length; i++) {
        const filterVal = filterVals[i];
        if (filterVal === '') {
          continue;
        }
        const val = f.data[this.headers[i].column];
        if (val == null && filterVal !== 'null') {
          return false;
        }
        if (typeof val === 'number' && String(val) !== filterVal) {
          return false;
        }
        if (!String(val).toLowerCase().includes(filterVal)) {
          return false;
        }
      }
      return true;
    });

    const newMarkers = L.markerClusterGroup();
    for (const f of forms) {
      const m = L.marker(f.data['latLon']);
      m.bindPopup(markerPopup(f, this.headers), {closeButton: false});
      newMarkers.addLayer(m);
    }
    this.map.removeLayer(this.markers);
    this.map.addLayer(newMarkers);
    this.markers = newMarkers;
    if (forms.length > 0) {
      this.map.fitBounds(newMarkers.getBounds());
    }
  }
}
