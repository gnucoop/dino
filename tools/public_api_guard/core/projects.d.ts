export interface Project extends Metric {
  code: string;
  donors: string | null;
  end_date: string | null;
  sectors_of_intervention: string | null;
  start_date: string | null;
}

export declare class ProjectManager extends DataModelManager<Project> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService);
  static ɵfac: i0.ɵɵFactoryDeclaration<ProjectManager, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<ProjectManager>;
}

export declare class ProjectModule {
  readonly projectMetric: ActiveMetric;
  constructor(_filtersService: FiltersService, _metricsService: MetricsService);
  static ɵfac: i0.ɵɵFactoryDeclaration<ProjectModule, never>;
  static ɵinj: i0.ɵɵInjectorDeclaration<ProjectModule>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<ProjectModule, never, never, never>;
}
