import {ChangeDetectorRef} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Model} from '@dewco/core/data';
import {AdminUserInteractionsService, List} from '@dewco/core/list';
import {Observable, of as obsOf} from 'rxjs';

const changeDetectorRefMock = {
  markForCheck() {}
};

class AdminUIService extends AdminUserInteractionsService {
  askConfirm(action: string): Observable<boolean> {
    return obsOf(true);
  }
}

interface DummyModel extends Model {
  name: string;
}

const dummySelection: DummyModel[] = [
  {id: '1', name: 'DummyA', created_at: '', updated_at: ''},
  {id: '2', name: 'DummyB', created_at: '', updated_at: ''},
];

const adminUIService = new AdminUIService();

class ListFeatComp extends List<DummyModel> {
  constructor(
      aui: AdminUIService,
      cdr: ChangeDetectorRef,
  ) {
    super(cdr, aui);
  }

  getSelection() {
    return dummySelection;
  }
  getItems() {
    return [];
  }
  clearSelection() {}
  selectAll() {}
  refreshList() {}
  deleteAction(items: DummyModel[]) {
    return items;
  }
}

describe('Core ListComponent', () => {
  let cdr: ChangeDetectorRef;
  let aui: AdminUIService;
  let listFeatComp: ListFeatComp;
  let spyDelete: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ChangeDetectorRef, useValue: changeDetectorRefMock},
        {provide: AdminUIService, useValue: adminUIService},
      ],
    });
    cdr = TestBed.inject(ChangeDetectorRef);
    aui = TestBed.inject(AdminUIService);
    listFeatComp = new ListFeatComp(aui, cdr);
    spyDelete = spyOn(listFeatComp, 'deleteAction').and.callThrough();
  });

  it('should retrieve and call the correct Action Handler method name', () => {
    const actionName = 'delete';
    listFeatComp.processAction(actionName, dummySelection);
    expect(spyDelete).toHaveBeenCalled();
  });
});
