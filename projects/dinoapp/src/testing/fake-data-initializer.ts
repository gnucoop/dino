import {DataService} from '@dino/core/data';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormSchemaDeps,
  FormSchemaDepsManager,
  FormSchemaManager,
} from '@dino/core/forms';
import {RxDocument} from 'rxdb';
import {Project, ProjectManager} from '@dino/core/projects';
import {
  ReportData,
  ReportDataManager,
  ReportSchema,
  ReportSchemaManager,
} from '@dino/core/reports';
import {combineLatest, Observable, of as obsOf, throwError, zip} from 'rxjs';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';

import {FakeDataGenerator} from './fake-data-generator';
import {formDatas} from './test-ajf-formdata';
import {formSchemas} from './test-ajf-formschema';
import {reportDatas} from './test-ajf-reportdata';
import {reportSchemas} from './test-ajf-reportschema';
import {projects} from './test-projects';

const fakeFormSchemaGenerator = new FakeDataGenerator<FormSchema>();
const fakeFormSchemaDepsGenerator = new FakeDataGenerator<FormSchemaDeps>();
const fakeFormDataGenerator = new FakeDataGenerator<FormData>();
const fakeProjectsGenerator = new FakeDataGenerator<Project>();
const fakeReportSchemaGenerator = new FakeDataGenerator<ReportSchema>();
const fakeReportDataGenerator = new FakeDataGenerator<ReportData>();

export function initializeApp(
  ds: DataService,
  fsm: FormSchemaManager,
  fdm: FormDataManager,
  pm: ProjectManager,
  rsm: ReportSchemaManager,
  rdm: ReportDataManager,
  fsdm: FormSchemaDepsManager,
): () => Observable<any> {
  return () => {
    combineLatest([fsm.init(), fdm.init(), pm.init(), rsm.init(), rdm.init(), fsdm.init()])
      .pipe(take(1))
      .subscribe();

    // Clone arrays to avoid mutating module-level data across runs
    const localFormSchemas = [...formSchemas];
    const localReportSchemas = reportSchemas.map(rs => ({...rs, form_schema_ids: [...rs.form_schema_ids]}));
    const localFormDatas = formDatas.map(fd => ({...fd}));
    const localReportDatas = reportDatas.map(rd => ({...rd}));

    return fakeProjectsGenerator.generateData(ds, pm, projects).pipe(
      switchMap(() => fakeFormSchemaGenerator.generateData(ds, fsm, localFormSchemas)),
      switchMap(resForm =>
        wireFormSchemaDeps(ds, fsm, fsdm, resForm.success).pipe(map(() => resForm)),
      ),
      switchMap(resForm => {
        if (resForm.success[0] != null) {
          const genFormSchemaId = resForm.success[0].id;
          for (const rs of localReportSchemas) {
            rs.form_schema_ids.push(genFormSchemaId);
          }
          return zip(
            obsOf(resForm.success[0].id),
            fakeReportSchemaGenerator.generateData(ds, rsm, localReportSchemas),
          );
        }
        return obsOf([null, null]);
      }),
      switchMap(([formSchemaId, resReport]) => {
        if (
          formSchemaId == null ||
          resReport == null ||
          resReport.success == null ||
          resReport.success.length === 0
        ) {
          return obsOf(null);
        }
        const genReportSchemaId = resReport.success[0].id;
        for (const fd of localFormDatas) {
          fd.form_schema_ref_id = formSchemaId;
        }
        for (const rd of localReportDatas) {
          rd.report_schema_ref_id = genReportSchemaId;
        }
        return combineLatest([
          fakeFormDataGenerator.generateData(ds, fdm, localFormDatas),
          fakeReportDataGenerator.generateData(ds, rdm, localReportDatas),
        ]);
      }),
      tap(() => console.log('[E2E] Fake data generated')),
      catchError(err => {
        console.error('[E2E] Error generating fake data:', err);
        return throwError(() => new Error(err));
      }),
    );
  };
}

/**
 * Creates a sample form relationship so the docs can show a populated
 * Relationships (form dependencies) dialog: test_form depends on the
 * village_registry form. IDs are generated at insert time, so the deps
 * document is built and linked here at runtime rather than in the seed.
 */
function wireFormSchemaDeps(
  ds: DataService,
  fsm: FormSchemaManager,
  fsdm: FormSchemaDepsManager,
  schemas: RxDocument<FormSchema>[],
): Observable<any> {
  const contextForm = schemas.find(s => s.name === 'test_form');
  const refForm = schemas.find(s => s.name === 'village_registry');
  if (contextForm == null || refForm == null) {
    return obsOf(null);
  }

  const depsDoc = {
    deps_origin: [
      {
        form_schema_ref_id: refForm.id,
        fields_to_update: ['family_name'],
        filter_by_metric: [],
        is_choice: false,
        choices_origin: null,
      },
    ],
    metric_data_to_show: [],
  } as any;

  return fakeFormSchemaDepsGenerator.generateData(ds, fsdm, [depsDoc]).pipe(
    switchMap(resDeps => {
      const depsDocId = resDeps.success[0]?.id;
      if (depsDocId == null) {
        return obsOf(null);
      }
      return ds.update(fsm.collectionName, contextForm, {
        form_schema_deps_ref_id: depsDocId,
      } as Partial<FormSchema>);
    }),
    // ds.update is driven by the internal _db Subject which never completes;
    // take(1) guarantees the APP_INITIALIZER chain settles.
    take(1),
    catchError(err => {
      console.error('[E2E] Error wiring form schema deps:', err);
      return obsOf(null);
    }),
  );
}
