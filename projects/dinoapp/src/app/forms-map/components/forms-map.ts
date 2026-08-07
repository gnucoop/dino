import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {b64_to_utf8} from '@dino/core/auth';
import {Area, AreaManager} from '@dino/core/areas';
import {Case, CaseManager} from '@dino/core/cases';
import {ActionTrigger, Metric} from '@dino/core/data';
import {ExportListData} from '@dino/core/exporter';
import {FormData, FormDataManager, FormInfo, FormSchema, FormSchemaManager} from '@dino/core/forms';
import {
  FiltersService,
  ListHeader,
  NodeVisibility,
  sectionStorageKey,
} from '@dino/core/list';
import {Location, LocationManager} from '@dino/core/locations';
import {Organization, OrganizationManager} from '@dino/core/organizations';
import {Project, ProjectManager} from '@dino/core/projects';
import {UserDataManager, UserGroupManager} from '@dino/core/users';
import {ExportList} from '@dino/material/export-list';
import {ListDataSource} from '@dino/material/list';
import {SearchFiltersBar} from '@dino/material/search-filters-bar';
import {RxDocument} from 'rxdb';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {ActionsService} from 'src/app/actions.service';

import * as L from 'leaflet';
import 'leaflet.markercluster';

L.Icon.Default.prototype.options.iconUrl = 'assets/icons/marker-icon.png';
L.Icon.Default.prototype.options.iconRetinaUrl = 'assets/icons/marker-icon-2x.png';
L.Icon.Default.prototype.options.shadowUrl = 'assets/icons/marker-shadow.png';

interface LocationWithLatLon extends Location {
  latLon?: [number, number];
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
export class FormsMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild(SearchFiltersBar) filtersBar?: SearchFiltersBar;

  readonly isDataList = 'form';
  readonly secondaryMetricFieldsDisplayed: {[metricName: string]: string | string[]} | null =
    environment.metricsConfig.secondaryMetricFieldsDisplayed ?? null;

  /**
   * The shared list data source. Reused only to populate the filter fields and to
   * decode the active filter into a Mango query (via `queryDM`) — its paginated
   * `dataResults` are not used to plot markers.
   */
  readonly dataSource: ListDataSource<FormData, FormSchema>;

  /** Displayed headers, used both for marker popups and keyword-search columns. */
  headers: ListHeader<FormData>[] = [];

  /** Number of plotted (geolocated) pins currently on the map. */
  pinCount = 0;

  private _map?: L.Map;
  private _markers?: L.MarkerClusterGroup;
  private _metricsTab: {[id: string]: Metric} = {};
  private readonly _destroy = new Subject<void>();

  private readonly _schemaId: string;
  private readonly _additionalDataSchema$: Observable<FormSchema | null>;
  private readonly _nodesVisibility$: Observable<NodeVisibility[]>;
  private readonly _dataHeaders$: Observable<ListHeader<FormData>[]>;
  private readonly _metricsTab$: Observable<{[id: string]: Metric}>;

  constructor(
    private _route: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _filtersService: FiltersService,
    private _formDataManager: FormDataManager,
    private _formSchemaManager: FormSchemaManager,
    private _dialog: MatDialog,
    private _actionsService: ActionsService,
    private _udm: UserDataManager,
    private _ugm: UserGroupManager,
    @Optional() areaManager: AreaManager | null,
    @Optional() caseManager: CaseManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() orgManager: OrganizationManager | null,
    @Optional() projectManager: ProjectManager | null,
  ) {
    this._schemaId = this._route.snapshot.params['form_schema_id'];

    if (this._locationManager == null) {
      throw new Error('the locations module must be enabled to use the map');
    }

    // Reset any basic-filter form groups left over from another view: the FiltersService
    // is a root singleton shared with the Table view.
    this._filtersService.clearAdditionalBasicFilters();

    this.dataSource = new ListDataSource(
      this._formDataManager,
      this._filtersService,
      this._formSchemaManager,
      this.isDataList,
    );

    // Schema with resolved relationships — mirrors FormsListComponent.
    this._additionalDataSchema$ = this._formSchemaManager.get(this._schemaId).pipe(
      filter(schema => schema != null),
      switchMap(schema => this._formSchemaManager.getSchemaWithRelationships(schema, true, null)),
      shareReplay(1),
    );

    // Ajf node visibility — drives which advanced-filter fields are available.
    this._nodesVisibility$ = combineLatest([
      this._additionalDataSchema$,
      this._udm.getActiveUserData(),
      this._ugm.getActiveUserGroups(),
    ]).pipe(
      map(([fschema, activeUser, activeUserGroups]) => {
        if (fschema == null || activeUser == null || activeUserGroups == null) {
          return [];
        }
        const dinoFormInfo: FormInfo = {
          activeUser,
          activeUserGroups,
          createdAt: null,
          status: null,
          allStatuses: [],
          user: null,
          userGroups: null,
        };
        return this._formSchemaManager.getPermissionsRelevant(fschema.schema.nodes, dinoFormInfo);
      }),
      shareReplay(1),
    );

    // Displayed headers: reuse the user's saved column preset, falling back to the schema.
    this._dataHeaders$ = this._additionalDataSchema$.pipe(
      map(schema => {
        if (schema == null) {
          return [];
        }
        let headers = loadHeaders(this._schemaId);
        if (headers.length === 0) {
          headers = filterHeaders(this._formSchemaManager.generateSchemaListHeaders(schema));
        }
        return headers;
      }),
      shareReplay(1),
    );

    // Metrics lookup table (id -> Metric), including locations decorated with latLon.
    const locations$: Observable<LocationWithLatLon[]> = this._locationManager
      .query({selector: {_deleted: {$ne: true}}})
      .pipe(
        map(locations =>
          locations.map(doc => {
            const loc = doc.toJSON() as LocationWithLatLon;
            const coord = loc.coordinates as unknown as string;
            if (typeof coord === 'string' && coord.includes(',')) {
              const latLon = coord
                .split(',')
                .slice(0, 2)
                .map(s => Number(s)) as [number, number];
              if (!isNaN(latLon[0]) && !isNaN(latLon[1])) {
                loc.latLon = latLon;
              }
            }
            return loc;
          }),
        ),
        take(1),
      );
    const areas$: Observable<RxDocument<Area>[]> =
      areaManager == null ? of([]) : areaManager.query({selector: {_deleted: {$ne: true}}}).pipe(take(1));
    const cases$: Observable<RxDocument<Case>[]> =
      caseManager == null ? of([]) : caseManager.query({selector: {_deleted: {$ne: true}}}).pipe(take(1));
    const orgs$: Observable<RxDocument<Organization>[]> =
      orgManager == null ? of([]) : orgManager.query({selector: {_deleted: {$ne: true}}}).pipe(take(1));
    const projects$: Observable<RxDocument<Project>[]> =
      projectManager == null ? of([]) : projectManager.query({selector: {_deleted: {$ne: true}}}).pipe(take(1));

    this._metricsTab$ = combineLatest([locations$, areas$, cases$, orgs$, projects$]).pipe(
      map(([locations, areas, cases, orgs, projects]) => {
        const metrics: Metric[] = [...areas, ...cases, ...locations, ...orgs, ...projects];
        const metricsTab: {[id: string]: Metric} = {};
        for (const m of metrics) {
          metricsTab[m.id] = m;
        }
        return metricsTab;
      }),
      take(1),
      shareReplay(1),
    );
  }

  ngAfterViewInit(): void {
    // Create the map right away so it always renders, independently of the
    // (potentially slow) filter-field data streams.
    this._createMap();

    // Feed node visibility to the data source when available — this only affects
    // which advanced-filter fields appear, so it must not block the map or markers.
    this._nodesVisibility$
      .pipe(takeUntil(this._destroy))
      .subscribe(nv => (this.dataSource.nodesVisibility = nv));

    // Once the metrics lookup, headers and schema are ready, wire the data source
    // like <dino-list> does and start the reactive marker pipeline.
    combineLatest([this._metricsTab$, this._dataHeaders$, this._additionalDataSchema$])
      .pipe(take(1))
      .subscribe(([metricsTab, headers, schema]) => {
        this._metricsTab = metricsTab;
        this.headers = headers;
        this.dataSource.dataHeaders = headers.filter(h => h.displayed);

        // IMPORTANT: subscribe to the marker pipeline BEFORE triggering filter
        // initialization. FiltersService.queryString is a hot combineLatest with
        // skip(1) that does not replay — it fires exactly once when the filters are
        // first initialized. A late subscriber would miss that initial emission and
        // the map would stay empty until the user changed a filter.
        combineLatest([
          // startWith an empty-filter query so the initial (unfiltered) set of pins is
          // always plotted, even before the hot queryString fires its first value.
          this._filtersService.queryString.pipe(startWith(this._emptyQueryString())),
          this._formDataManager.permissionContext,
          this._additionalDataSchema$,
          this._dataHeaders$,
        ])
          .pipe(
            debounceTime(50),
            switchMap(([queryString, permissionContext, addSchema, dataHeaders]) => {
              const query = this.dataSource.queryDM(
                queryString,
                permissionContext,
                false,
                addSchema,
                null,
                null,
                dataHeaders,
                true,
              );
              return this._formDataManager.query(query).pipe(take(1));
            }),
            takeUntil(this._destroy),
          )
          .subscribe(docs => {
            const forms = docs
              .map(doc => doc.toJSON() as FormData)
              .map(form => this._resolveRefsAndLatLon(form))
              .filter(form => form.data['latLon'] != null);
            this.pinCount = forms.length;
            this._plotMarkers(forms);
            this._cdr.markForCheck();
          });

        // Now trigger the filter initialization that makes queryString emit:
        // setting the schema pushes the generated additional filters, and
        // _initBasicFilters registers the metric basic filters + (re)inits the bar.
        this.dataSource.additionalDataSchema = schema as FormSchema;
        this._initBasicFilters(schema);
        this._cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    this.dataSource.disconnect();
    this._filtersService.clearModelFilters();
    this._filtersService.clearCustomFilters();
    this._filtersService.clearAdditionalBasicFilters();
    if (this._map != null) {
      this._map.remove();
    }
  }

  /**
   * Opens the shared Export dialog for the currently-filtered set of records.
   * Mirrors SelectionList._exportForms / _openExportDialog.
   */
  export(ev: 'XLSX' | 'CSV' | 'dialog'): void {
    if (
      this.dataSource.additionalDataSchema == null ||
      (this.dataSource.additionalDataSchema as FormSchema).schema == null ||
      this.dataSource.dataResults.value == null
    ) {
      return;
    }
    const formSchema: FormSchema = this.dataSource.additionalDataSchema as FormSchema;
    const dialogConfig = new MatDialogConfig<ExportListData>();
    if (ev === 'XLSX' || ev === 'CSV') {
      dialogConfig.data = {
        exportFormat: ev === 'XLSX' ? 'xlsx' : 'csv',
        selectAll: true,
        listType: 'forms',
        nodesVisibility: this._nodesVisibility$,
        formSchema,
        downloadFile: true,
      };
    }
    const dialogRef = this._dialog.open(ExportList, dialogConfig);
    dialogRef.componentInstance.emitExportActionTrigger
      .pipe(take(1))
      .subscribe((trigger: ActionTrigger) => this._actionsService.processTrigger(trigger));
    dialogRef.componentInstance.data = this.dataSource.data as any[];
    dialogRef.componentInstance.filteredQueryObs = this.dataSource.filteredQueryObs;
    dialogRef.componentInstance.allItemsQueryObs = this.dataSource.allItemsQueryObs;
    dialogRef.componentInstance.filtersCount = this.dataSource.filtersCount;
  }

  /**
   * Registers the metric/status/user basic filters on the shared FiltersService,
   * then re-initializes the bar so their autocompletes appear. Mirrors the
   * SelectionList.additionalBasicFilters input setter.
   */
  private _initBasicFilters(schema: FormSchema | null): void {
    const labels = ['form_status', 'user_data', 'unavailableFilter'];
    if (schema) {
      if (!schema.form_schema_metrics || !schema.form_schema_metrics.length) {
        labels.push('project', 'location', 'area', 'case', 'organization');
      } else {
        labels.push(...schema.form_schema_metrics);
      }
    }
    for (const label of labels) {
      if (this._filtersService.availableBasicFilterLabels.indexOf(label) > -1) {
        this._filtersService.addBasicFilter(label);
      }
    }
    if (this.filtersBar != null) {
      // The map displays the data of the form, so it filters it with the very
      // filters of its table: same section, same key.
      this._filtersService.storageKey = sectionStorageKey(
        'filters',
        this._route.snapshot,
        undefined,
      );
      this.filtersBar.initFilters();
    }
  }

  /**
   * Resolves each `*_ref_id` field to its metric name (so it can be shown/filtered
   * like a regular field) and, for the location, extracts its latLon coordinates.
   */
  private _resolveRefsAndLatLon(form: FormData): FormData {
    for (const key in form) {
      if (key.endsWith('_ref_id')) {
        const metricId = form[key as keyof FormData] as string | null;
        if (metricId == null) {
          continue;
        }
        const metric = this._metricsTab[metricId];
        if (metric == null) {
          continue;
        }
        form.data[key] = metric.name;
        if (key === 'location_ref_id') {
          form.data['latLon'] = (metric as LocationWithLatLon).latLon;
        }
      }
    }
    return form;
  }

  /**
   * The base64-encoded empty filter, matching how ListDataSource encodes the
   * "no filters" query. Used to seed the marker pipeline for the initial plot.
   */
  private _emptyQueryString(): string {
    return btoa(encodeURI(JSON.stringify({filters: [], additionalFiltersLogic: 'and'})));
  }

  private _createMap(): void {
    this._map = L.map('mapContainer', {zoomControl: false});
    this._map.setView([43.726, 10.411], 13);
    L.control.zoom({position: 'bottomright'}).addTo(this._map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this._map);

    this._markers = L.markerClusterGroup();
    this._map.addLayer(this._markers);
  }

  private _plotMarkers(forms: FormData[]): void {
    if (this._map == null) {
      return;
    }
    const newMarkers = L.markerClusterGroup();
    for (const f of forms) {
      const m = L.marker(f.data['latLon']);
      m.bindPopup(markerPopup(f, this.headers), {closeButton: false});
      newMarkers.addLayer(m);
    }
    if (this._markers != null) {
      this._map.removeLayer(this._markers);
    }
    this._map.addLayer(newMarkers);
    this._markers = newMarkers;
    this._map.invalidateSize();
    if (forms.length > 0) {
      this._map.fitBounds(newMarkers.getBounds());
    }
  }
}
