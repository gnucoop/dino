import {DataService} from '@dino/core/data';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormSchemaManager,
} from '@dino/core/forms';
import {Project, ProjectManager} from '@dino/core/projects';
import {
  ReportData,
  ReportDataManager,
  ReportSchema,
  ReportSchemaManager,
} from '@dino/core/reports';
import {combineLatest, Observable, of as obsOf, throwError, zip} from 'rxjs';
import {catchError, switchMap, take, tap} from 'rxjs/operators';

import {FakeDataGenerator} from './fake-data-generator';
import {formDatas} from './test-ajf-formdata';
import {formSchemas} from './test-ajf-formschema';
import {reportDatas} from './test-ajf-reportdata';
import {reportSchemas} from './test-ajf-reportschema';
import {projects} from './test-projects';

const fakeFormSchemaGenerator = new FakeDataGenerator<FormSchema>();
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
): () => Observable<any> {
  return () => {
    combineLatest([fsm.init(), fdm.init(), pm.init(), rsm.init(), rdm.init()])
      .pipe(take(1))
      .subscribe();

    // Clone arrays to avoid mutating module-level data across runs
    const localFormSchemas = [...formSchemas];
    const localReportSchemas = reportSchemas.map(rs => ({...rs, form_schema_ids: [...rs.form_schema_ids]}));
    const localFormDatas = formDatas.map(fd => ({...fd}));
    const localReportDatas = reportDatas.map(rd => ({...rd}));

    return fakeProjectsGenerator.generateData(ds, pm, projects).pipe(
      switchMap(() => fakeFormSchemaGenerator.generateData(ds, fsm, localFormSchemas)),
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
