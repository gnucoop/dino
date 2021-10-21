export interface Location extends Metric {
  coordinates?: Coordinates;
}

export declare class LocationManager extends DataModelManager<Location> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService);
  static ɵfac: i0.ɵɵFactoryDeclaration<LocationManager, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<LocationManager>;
}

export declare class LocationModule {
  readonly locationsMetric: ActiveMetric;
  constructor(_filtersService: FiltersService, _metricsService: MetricsService);
  static ɵfac: i0.ɵɵFactoryDeclaration<LocationModule, never>;
  static ɵinj: i0.ɵɵInjectorDeclaration<LocationModule>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<LocationModule, never, never, never>;
}
