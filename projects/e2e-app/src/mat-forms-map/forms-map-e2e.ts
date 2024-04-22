import {AfterViewInit, Component, Optional, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {b64_to_utf8} from '@dino/core/auth';
import {FormData, FormDataManager} from '@dino/core/forms';
import {Area, AreaManager} from '@dino/core/areas';
import {Case, CaseManager} from '@dino/core/cases';
import {Metric} from '@dino/core/data';
import {ListHeader} from '@dino/core/list';
import {Location, LocationManager} from '@dino/core/locations';
import {Organization, OrganizationManager} from '@dino/core/organizations';
import {Project, ProjectManager} from '@dino/core/projects';
import {RxDocument} from 'rxdb';
import {Observable, of} from 'rxjs';
import {combineLatestWith, take} from 'rxjs/operators';
import {format} from 'date-fns';

import * as L from 'leaflet';
import 'leaflet.markercluster';

L.Icon.Default.prototype.options.iconUrl = 'assets/marker-icon.png';
L.Icon.Default.prototype.options.iconRetinaUrl = 'assets/marker-icon-2x.png';
L.Icon.Default.prototype.options.shadowUrl = 'assets/marker-shadow.png';

interface LocationWithLatLon extends Location {
  latLon?: [number, number];
}

interface FormDataWithMetrics extends FormData {
  location: LocationWithLatLon;
  area?: Area;
  case?: Case;
  organization?: Organization;
  project?: Project;
}

function loadDataHeaders(schemaId: string): ListHeader<FormData>[] {
  const b64 = localStorage.getItem('columns_' + schemaId);
  if (b64 == null) {
    return [];
  }
  let headers: ListHeader<FormData>[];
  try {
    headers = JSON.parse(b64_to_utf8(b64));
  } catch {
    console.warn("Couldn't parse column headers");
    return [];
  }
  return headers.filter(h => h.dataColumn && h.displayed && !h.repeatingSlideColumn);
}

function markerPopup(form: FormDataWithMetrics, dataHeaders: ListHeader<FormData>[]): string {
  let html = 'Location: ' + form.location.name;
  if (form.area != null) {
    html += '<br>Area: ' + form.area.name;
  }
  if (form.case != null) {
    html += '<br>Case: ' + form.case.name;
  }
  if (form.organization != null) {
    html += '<br>Organization: ' + form.organization.name;
  }
  if (form.project != null) {
    html += '<br>Project: ' + form.project.name;
  }
  for (const h of dataHeaders) {
    const val = form.data[h.column];
    html += `<br>${h.label}: ${val === undefined ? null : val}`;
  }
  return html;
}

@Component({
  selector: 'app-forms-map-e2e',
  templateUrl: 'forms-map-e2e.html',
  styleUrls: ['forms-map-e2e.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatFormsMapE2E implements AfterViewInit {
  readonly dataHeaders: ListHeader<FormData>[];
  private filterInputs!: NodeListOf<HTMLInputElement>;

  private allForms!: FormDataWithMetrics[];
  private map!: L.Map;
  private markers!: L.MarkerClusterGroup;

  private formData: Observable<RxDocument<FormData>[]>;
  private areaDocs: Observable<RxDocument<Area>[]>;
  private caseDocs: Observable<RxDocument<Case>[]>;
  private locationDocs: Observable<RxDocument<Location>[]>;
  private orgDocs: Observable<RxDocument<Organization>[]>;
  private projectDocs: Observable<RxDocument<Project>[]>;

  constructor(
    route: ActivatedRoute,
    formDataManager: FormDataManager,
    @Optional() areaManager: AreaManager | null,
    @Optional() caseManager: CaseManager | null,
    @Optional() locationManager: LocationManager | null,
    @Optional() orgManager: OrganizationManager | null,
    @Optional() projectManager: ProjectManager | null,
  ) {
    const schemaId = route.snapshot.params['form_schema_id'];
    this.dataHeaders = loadDataHeaders(schemaId);
    this.formData = formDataManager.query({selector:
      {is_deleted: {$eq: false}, form_schema_ref_id: {$eq: schemaId}}
    }).pipe(take(1));
    
    this.areaDocs = areaManager == null ? of([]) : areaManager.query({selector:
      {is_deleted: {$eq: false}}
    }).pipe(take(1));
    this.caseDocs = caseManager == null ? of([]) : caseManager.query({selector:
      {is_deleted: {$eq: false}}
    }).pipe(take(1));
    if (locationManager == null) {
      throw new Error('the locations module must be enabled to use the map');
    }
    this.locationDocs = locationManager.query({selector:
      {is_deleted: {$eq: false}}
    }).pipe(take(1));
    this.orgDocs = orgManager == null ? of([]) : orgManager.query({selector:
      {is_deleted: {$eq: false}}
    }).pipe(take(1));
    this.projectDocs = projectManager == null ? of([]) : projectManager.query({selector:
      {is_deleted: {$eq: false}}
    }).pipe(take(1));
  }

  ngAfterViewInit(): void {
    this.filterInputs = document.querySelectorAll('#filtersContainer input');

    this.formData.pipe(
      combineLatestWith(this.areaDocs, this.caseDocs, this.locationDocs, this.orgDocs, this.projectDocs),
      take(1),
    ).subscribe(([formsData, areas, cases, locations, orgs, projects]) => {
      const locs = locations.map(doc => {
        const loc = doc.toJSON() as LocationWithLatLon;
        const coord = loc.coordinates as unknown as string;
        if (typeof coord === 'string' && coord.includes(',')) {
          const latLon = coord.split(',').slice(0, 2).map(s => Number(s)) as [number, number];
          if (!isNaN(latLon[0]) && !isNaN(latLon[1])) {
            loc.latLon = latLon;
          }
        }
        return loc;
      }).filter(l => l.latLon != null);

      const metrics: Metric[] = [
        ...areas.map(x => x.toJSON()),
        ...cases.map(x => x.toJSON()),
        ...locs,
        ...orgs.map(x => x.toJSON()),
        ...projects.map(x => x.toJSON()),
      ];
      const metricsTab: {[id: string]: Metric} = {};
      for (const m of metrics) {
        metricsTab[m.id] = m;
      }

      const forms = formsData.map(f => f.toJSON()) as FormDataWithMetrics[];
      for (const form of forms) {
        const f: any = form;
        for (const key in form) {
          if (key.endsWith('_ref_id')) {
            const k = key.slice(0, -'_ref_id'.length);
            f[k] = metricsTab[String(f[key])];
          }
        }
      }
      this.allForms = forms.filter(f => f.location != null);
      this.createMap();
    });
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
      const m = L.marker(f.location.latLon!);
      m.bindPopup(markerPopup(f, this.dataHeaders), {closeButton: false});
      this.markers.addLayer(m);
    }
    this.map.addLayer(this.markers);
    if (this.allForms.length > 0) {
      this.map.fitBounds(this.markers.getBounds());
    }
  }

  applyFilters() {
    const dateStartInput = this.filterInputs[0];
    const dateEndInput = this.filterInputs[1];
    const isoFormat = 'yyyy-MM-dd';
    const dateStart = new Date(dateStartInput.value);
    const start = isNaN(dateStart.valueOf()) ? '0000-01-01' : format(dateStart, isoFormat);
    const dateEnd = new Date(dateEndInput.value);
    const end = isNaN(dateEnd.valueOf()) ? '9999-12-31' : format(dateEnd, isoFormat);
    const filterVals: string[] = [];
    for (let i = 0; i < this.dataHeaders.length; i++) {
      filterVals.push(this.filterInputs[i + 2].value.toLowerCase());
    }

    const forms = this.allForms.filter(f => {
      if (f.created_at < start || f.created_at > end) {
        return false;
      }
      for (let i = 0; i < this.dataHeaders.length; i++) {
        const filterVal = filterVals[i];
        // apply filter only if user has typed at least 2 chars:
        if (filterVal.length < 2) {
          continue;
        }
        const col = this.dataHeaders[i].column;
        const val = f.data[col] == null ? 'null' : String(f.data[col]);
        if (!val.toLowerCase().includes(filterVal)) {
          return false;
        }
      }
      return true;
    });

    const newMarkers = L.markerClusterGroup();
    for (const f of forms) {
      const m = L.marker(f.location.latLon!);
      m.bindPopup(markerPopup(f, this.dataHeaders), {closeButton: false});
      newMarkers.addLayer(m);
    }
    const zoomingIn = forms.length === 0 || this.markers.getBounds().contains(newMarkers.getBounds());
    this.map.removeLayer(this.markers);
    this.map.addLayer(newMarkers);
    this.markers = newMarkers;
    if (forms.length > 0 && !zoomingIn) {
      this.map.fitBounds(newMarkers.getBounds());
    }
  }
}
