import {Area, AreaManager} from '@dino/core/areas';
import {Case, CaseManager} from '@dino/core/cases';
import {DataService} from '@dino/core/data';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormSchemaDeps,
  FormSchemaDepsManager,
  FormSchemaManager,
} from '@dino/core/forms';
import {Location, LocationManager} from '@dino/core/locations';
import {Notification, NotificationManager} from '@dino/core/notifications';
import {Organization, OrganizationManager} from '@dino/core/organizations';
import {RxDocument} from 'rxdb';
import {Project, ProjectManager} from '@dino/core/projects';
import {ReportData, ReportDataManager, ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {UserData, UserDataManager, UserGroup, UserGroupManager} from '@dino/core/users';
import {combineLatest, Observable, of as obsOf, throwError, zip} from 'rxjs';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';

import {FakeDataGenerator} from './fake-data-generator';
import {formDatas} from './test-ajf-formdata';
import {formSchemas} from './test-ajf-formschema';
import {reportDatas} from './test-ajf-reportdata';
import {reportSchemas} from './test-ajf-reportschema';
import {areas} from './test-areas';
import {cases} from './test-cases';
import {locations} from './test-locations';
import {notifications} from './test-notifications';
import {organizations} from './test-organizations';
import {projects} from './test-projects';
import {userData} from './test-userdata';
import {userGroups} from './test-usergroups';

const fakeFormSchemaGenerator = new FakeDataGenerator<FormSchema>();
const fakeFormSchemaDepsGenerator = new FakeDataGenerator<FormSchemaDeps>();
const fakeFormDataGenerator = new FakeDataGenerator<FormData>();
const fakeProjectsGenerator = new FakeDataGenerator<Project>();
const fakeReportSchemaGenerator = new FakeDataGenerator<ReportSchema>();
const fakeReportDataGenerator = new FakeDataGenerator<ReportData>();
const fakeAreasGenerator = new FakeDataGenerator<Area>();
const fakeCasesGenerator = new FakeDataGenerator<Case>();
const fakeLocationsGenerator = new FakeDataGenerator<Location>();
const fakeOrganizationsGenerator = new FakeDataGenerator<Organization>();
const fakeNotificationsGenerator = new FakeDataGenerator<Notification>();
const fakeUserDataGenerator = new FakeDataGenerator<UserData>();
const fakeUserGroupsGenerator = new FakeDataGenerator<UserGroup>();

export function initializeApp(
  ds: DataService,
  fsm: FormSchemaManager,
  fdm: FormDataManager,
  pm: ProjectManager,
  rsm: ReportSchemaManager,
  rdm: ReportDataManager,
  fsdm: FormSchemaDepsManager,
  ugm: UserGroupManager,
  udm: UserDataManager,
  nm: NotificationManager,
  // Managers of optional modules: null when the module is disabled
  am: AreaManager | null,
  cm: CaseManager | null,
  lm: LocationManager | null,
  om: OrganizationManager | null,
): () => Observable<any> {
  return () => {
    const managers = [fsm, fdm, pm, rsm, rdm, fsdm, ugm, udm, nm, am, cm, lm, om];
    combineLatest(managers.filter(m => m != null).map(m => m!.init()))
      .pipe(take(1))
      .subscribe();

    // Clone arrays to avoid mutating module-level data across runs
    const localFormSchemas = [...formSchemas];
    const localReportSchemas = reportSchemas.map(rs => ({
      ...rs,
      form_schema_ids: [...rs.form_schema_ids],
    }));
    const localFormDatas = formDatas.map(fd => ({...fd}));
    const localReportDatas = reportDatas.map(rd => ({...rd}));

    return fakeProjectsGenerator.generateData(ds, pm, projects).pipe(
      // Project ids are regenerated at insert time: remap the seed refs
      tap(resProjects => remapProjectRefs(resProjects.success, localFormDatas)),
      switchMap(() =>
        combineLatest([
          generateAreas(ds, am),
          fakeCasesGenerator.generateData(ds, cm, cases),
          fakeLocationsGenerator.generateData(ds, lm, locations),
          fakeOrganizationsGenerator.generateData(ds, om, organizations),
          fakeNotificationsGenerator.generateData(ds, nm, notifications),
          generateUsers(ds, ugm, udm),
        ]),
      ),
      // Link each form data to the location matching its district
      tap(([, , resLocations]) => remapLocationRefs(resLocations.success, localFormDatas)),
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
 * Project ids are regenerated at insert time, so the project_ref_id of the
 * seed form datas (which points to the seed project ids) is remapped here
 * to the actually-inserted projects, matched by name.
 */
function remapProjectRefs(inserted: RxDocument<Project>[], fds: any[]): void {
  if (inserted.length === 0) {
    return;
  }
  const idMap = new Map<string, string>();
  for (const seed of projects) {
    const doc = inserted.find(p => p.name === seed.name);
    if (doc != null) {
      idMap.set(seed.id, doc.id);
    }
  }
  for (const fd of fds) {
    if (fd.project_ref_id != null) {
      fd.project_ref_id = idMap.get(fd.project_ref_id) ?? null;
    }
  }
}

/**
 * Links each form data to the inserted location whose name matches the
 * district selected in the form (the seed locations are the districts of
 * the ophthalmic_visits form).
 */
function remapLocationRefs(inserted: RxDocument<Location>[], fds: any[]): void {
  if (inserted.length === 0) {
    return;
  }
  const byDistrict = new Map(inserted.map(l => [l.name.toLowerCase(), l.id]));
  for (const fd of fds) {
    const district = fd.data?.district;
    if (fd.location_ref_id == null && district != null) {
      fd.location_ref_id = byDistrict.get(district) ?? null;
    }
  }
}

/**
 * Generates the seed areas and re-links children to their parent: area ids
 * are regenerated at insert time, so the seed parent_id would dangle.
 */
function generateAreas(ds: DataService, am: AreaManager | null): Observable<any> {
  if (am == null) {
    return obsOf(null);
  }
  return fakeAreasGenerator.generateData(ds, am, areas).pipe(
    switchMap(resAreas => {
      const byName = new Map(resAreas.success.map(d => [d.name, d]));
      const updates = areas
        .filter(a => a.parent_name != null)
        .map(a => {
          const child = byName.get(a.name);
          const parent = byName.get(a.parent_name!);
          if (child == null || parent == null) {
            return null;
          }
          // ds.update never completes; take(1) lets combineLatest settle
          return ds
            .update(am.collectionName, child, {parent_id: parent.id} as Partial<Area>)
            .pipe(take(1));
        })
        .filter((u): u is Observable<any> => u != null);
      if (updates.length === 0) {
        return obsOf(null);
      }
      return combineLatest(updates).pipe(take(1));
    }),
    catchError(err => {
      console.error('[E2E] Error wiring area hierarchy:', err);
      return obsOf(null);
    }),
  );
}

/**
 * Generates user groups and user datas. Group ids are generated at insert
 * time, so each user is assigned to a group here (cycling through the
 * inserted groups in seed order) rather than in the seed data.
 */
function generateUsers(
  ds: DataService,
  ugm: UserGroupManager,
  udm: UserDataManager,
): Observable<any> {
  return fakeUserGroupsGenerator.generateData(ds, ugm, userGroups).pipe(
    switchMap(resGroups => {
      const groupIds = userGroups
        .map(g => resGroups.success.find(d => d.groupName === g.groupName)?.id)
        .filter((id): id is string => id != null);
      const localUserData = userData.map((u, i) => ({
        ...u,
        user_group_ids: groupIds.length > 0 ? [groupIds[i % groupIds.length]] : [],
      }));
      return fakeUserDataGenerator.generateData(ds, udm, localUserData);
    }),
    catchError(err => {
      console.error('[E2E] Error generating users:', err);
      return obsOf(null);
    }),
  );
}

/**
 * Creates a sample form relationship so the docs can show a populated
 * Relationships (form dependencies) dialog: ophthalmic_visits depends on
 * the village_registry form. IDs are generated at insert time, so the deps
 * document is built and linked here at runtime rather than in the seed.
 */
function wireFormSchemaDeps(
  ds: DataService,
  fsm: FormSchemaManager,
  fsdm: FormSchemaDepsManager,
  schemas: RxDocument<FormSchema>[],
): Observable<any> {
  const contextForm = schemas.find(s => s.name === 'ophthalmic_visits');
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
