import {AjfFieldType} from '@ajf/core/forms';
import {CollectionChangedEvent, Model} from '@dewco/core/data';
import {FormData} from '@dewco/core/forms';
import {FilterGroup, ListHeader} from '@dewco/core/list';
import {RxJsonSchema} from 'rxdb';
import {Observable, of as obsOf} from 'rxjs';

import {testFormData, testFormData_loc} from './test-ajf-formdata';

export const schema = {
  'type': 'object',
  'properties': {
    'id': {'type': 'string', 'primary': true, 'description': 'UUID v4 identifier.'},
    'name': {'type': 'string', 'description': 'Element name'},
    'weight': {'type': 'number', 'description': 'Element weight'},
    'symbol': {'type': 'string', 'description': 'Element symbol'},
    'data': {'type': 'object', 'description': 'Form data'},
    'created_at': {'type': 'string', 'description': 'Creation timestamp.'},
    'updated_at': {'type': 'string', 'description': 'Update timestamp.'},
    'is_deleted': {'type': 'boolean', 'description': 'Deleted flag.'}

  },
  'required': [
    'id',
    'name',
    'weight',
    'symbol',
    'created_at',
  ],
  'additionalProperties': false,
  'title': 'periodicelement',
  'version': 0,
} as RxJsonSchema;

export interface PeriodicElement extends Model {
  name: string;
  weight: number;
  symbol: string;
  data?: FormData;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: '',
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    data: testFormData,
    created_at: '',
    updated_at: ''
  },
  {id: '', name: 'Helium', weight: 4.0026, symbol: 'He', created_at: '', updated_at: ''},
  {id: '', name: 'Lithium', weight: 6.941, symbol: 'Li', created_at: '', updated_at: ''},
  {id: '', name: 'Beryllium', weight: 9.0122, symbol: 'Be', created_at: '', updated_at: ''},
  {
    id: '',
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    data: testFormData_loc,
    created_at: '',
    updated_at: ''
  },
  {id: '', name: 'Carbon', weight: 12.0107, symbol: 'C', created_at: '', updated_at: ''},
  {id: '', name: 'Nitrogen', weight: 14.0067, symbol: 'N', created_at: '', updated_at: ''},
  {
    id: '',
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    data: testFormData,
    created_at: '',
    updated_at: ''
  },
  {
    id: '',
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    data: testFormData_loc,
    created_at: '',
    updated_at: ''
  },
  {id: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', created_at: '', updated_at: ''},
];

export const filters: FilterGroup[] = [
  {
    filterGroupName: 'Stats',
    filterGroupAdditionalFilters: [
      {
        name: 'Name',
        fieldType: AjfFieldType.String,
      },
      {
        name: 'Weight',
        fieldType: AjfFieldType.Number,
      },
    ],
    filterGroupBasicFilters: [{
      name: 'Location',
      fieldType: AjfFieldType.MultipleChoice,
      choicesOrigin: {
        name: 'location',
        type: 'fixed',
        label: 'Location',
        choices: [
          {label: 'Location A', value: 'A'},
          {label: 'Location B', value: 'B'},
          {label: 'Location C', value: 'C'},
        ],
      }
    }]
  },
  {
    filterGroupName: 'Charts',
    filterGroupAdditionalFilters: [
      {
        name: 'Symbol',
        fieldType: AjfFieldType.MultipleChoice,
        choicesOrigin: {
          name: 'symbol',
          type: 'fixed',
          label: 'Symbol',
          choices: [
            {label: 'Ne', value: 'Ne'},
            {label: 'Li', value: 'Li'},
            {label: 'B', value: 'B'},
          ],
        }
      },
    ],
  },
];

export const displayedHeaders: ListHeader<PeriodicElement>[] = [
  {column: 'name', label: 'Name', sortable: true},
  {column: 'weight', label: 'Weight', sortable: true},
  {column: 'data', label: 'FormData', sortable: false, displayed: false},
  {column: 'symbol', label: 'Symbol', sortable: false},
];

let elements = [...ELEMENT_DATA.slice(0, 5)];

type Doc = {
  toJSON: () => PeriodicElement
};

export class ElementManager {
  get collectionSchema(): RxJsonSchema {
    return schema;
  }
  get collectionChanged(): Observable<CollectionChangedEvent> {
    return obsOf({
      timestamp: new Date().getTime(),
      collection: 'element',
      action: '',
    });
  }
  get collectionName(): string {
    return 'element';
  }
  query(): Observable<{exec: () => Observable<Doc[]>}> {
    return obsOf({exec: () => obsOf(elements.map(e => ({toJSON: () => e})))});
  }
  bulkDelete(items: PeriodicElement[]): Observable<Doc[]> {
    elements = elements.filter(e => items.indexOf(e) === -1);
    return obsOf(elements.map(e => ({toJSON: () => e})));
  }
}

// @Injectable()
// export class ElementManager extends DataModelManager<PeriodicElement> {
//   constructor(
//       dataService: DataService,
//       permissionContextService: PermissionContextService,
//   ) {
//     super(
//         {collection: {name: 'element', schema}},
//         dataService,
//         permissionContextService,
//     );
//   }
// }
