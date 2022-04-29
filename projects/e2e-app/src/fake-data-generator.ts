import {DataModelManager, DataService, Model} from '@dino/core/data';
import {RxDocument} from 'rxdb';
import {concat, Observable, of as obsOf} from 'rxjs';
import {map, switchMap, take, toArray} from 'rxjs/operators';

/**
 * Class that generates formdata/schemas for the e2e app
 */
export class FakeDataGenerator<T extends Model = Model> {
  /**
   * Generates dummy docs.
   * @param manager The data model manager
   * @param docs The docs to generate
   */
  generateData(
    dataService: DataService,
    manager: DataModelManager<T>,
    docs: T[],
  ): Observable<{success: RxDocument<T, {}>[]; error: any[]}> {
    if (manager == null || docs.length == 0) {
      return obsOf({success: [], error: []});
    }
    return manager.list().pipe(
      switchMap(doclist => {
        const {collectionName} = manager;
        if (doclist.length === 0) {
          return concat(
            ...docs.map(object =>
              dataService.upsert<T, RxDocument<T>>({collectionName, object}).pipe(take(1)),
            ),
          ).pipe(
            toArray(),
            map(success => ({success: success as RxDocument<T, {}>[], error: []})),
          );
        }
        return obsOf({success: [], error: []});
      }),
      take(1),
    );
  }
  constructor() {}
}
