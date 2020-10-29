import {Injectable} from '@angular/core';
import {DataModelManager, DataService, Model, PermissionContextService} from '@dewco/core/data';
import {FormData} from '@dewco/core/forms';
import {ListHeader} from '@dewco/core/list';
import {RxJsonSchema} from 'rxdb';

import {testFormData, testFormData_loc} from './test-ajf-formdata';

export const schema = {
  'type': 'object',
  'properties': {
    'id': {'type': 'string', 'description': 'UUID v4 identifier.'},
    'name': {'type': 'string', 'description': 'Element name'},
    'weight': {'type': 'number', 'description': 'Element weight'},
    'symbol': {'type': 'string', 'description': 'Element symbol'},
    'data': {'type': 'object', 'description': 'Form data'},
    'created_at': {'type': 'string', 'description': 'Creation timestamp.'},
    'updated_at': {'type': 'string', 'description': 'Update timestamp.'},
  },
  'additionalProperties': false,
  'title': 'periodicelement',
  'version': 0,
} as RxJsonSchema;


export class PeriodicElement implements Model {
  name: string;
  weight: number;
  symbol: string;
  data?: FormData;
  id: string;
  created_at: string;
  updated_at: string;
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

export const displayedHeaders: ListHeader<PeriodicElement>[] = [
  {column: 'name', label: 'Name', sortable: true},
  {column: 'weight', label: 'Weight', sortable: true},
  {column: 'data', label: 'FormData', sortable: false},
  {column: 'symbol', label: 'Symbol', sortable: false},
];

@Injectable({providedIn: 'root'})
export class ElementManager extends DataModelManager<PeriodicElement> {
  constructor(
      dataService: DataService,
      permissionContextService: PermissionContextService,
  ) {
    const collection = {name: 'periodicelement', schema: schema};
    super({collection}, dataService, permissionContextService);
  }
}
