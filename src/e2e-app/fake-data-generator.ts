import {DataModelManager, Model} from '@dino/core/data';
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
   */
  generateData(
    manager: DataModelManager<T>,
    docs: T[],
  ): Observable<{success: RxDocument<T, {}>[]; error: any[]}> {
    if (manager == null || docs.length == 0) {
      return obsOf({success: [], error: []});
    }
    return manager.list().pipe(
      switchMap(doclist => {
        if (doclist.length === 0) {
          return manager.bulkCreate(docs);
        }
        return obsOf({success: [], error: []});
      }),
      take(1),
    );
  }
  constructor() {}
}
