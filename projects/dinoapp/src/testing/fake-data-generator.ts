import {DataModelManager, DataService, InsertModel, Model} from '@dino/core/data';
import {RxDocument} from 'rxdb';
import {Observable, of as obsOf} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';

/**
 * Class that generates formdata/schemas for the e2e app
 */
export class FakeDataGenerator<T extends Model = Model> {
  /**
   * Generates dummy docs.
   * @param manager The data model manager
   * @param docs The docs to generate
   * @param loops? How many times the Generator should re-insert the provided forms
   */
  generateData(
    dataService: DataService,
    manager: DataModelManager<T> | null,
    docs: InsertModel<T>[],
    loops?: number,
  ): Observable<{success: RxDocument<T, {}>[]; error: any[]}> {
    if (manager == null || docs.length == 0) {
      return obsOf({success: [], error: []});
    }
    return manager.list().pipe(
      switchMap(doclist => {
        const {collectionName} = manager;
        if (doclist.length === 0) {
          const docsToInsert = [...docs];
          if (loops) {
            for (let i = 0; i < loops; i++) {
              docsToInsert.push(...docs);
            }
          }
          return dataService.bulkInsert<T, RxDocument<T>>({collectionName, objects: docsToInsert});
        }
        return obsOf({success: [], error: []});
      }),
      take(1),
    );
  }
  constructor() {}
}
