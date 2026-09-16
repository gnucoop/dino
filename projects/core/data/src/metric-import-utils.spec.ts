import {of} from 'rxjs';

import {DataModelManager} from './data-model-manager';
import {Metric} from './metric';
import {
  buildMetricLookupSelector,
  collectParentRefs,
  fillInMissingParentValues,
  formatMetricNamesMessage,
  hasParentRef,
  ImportableMetric,
  importMetricTree,
  splitMetricsByParent,
} from './metric-import-utils';

/**
 * A manager creating the given metrics with a generated id, counting the bulk
 * creations so that the number of tree levels can be asserted.
 */
function managerMock(fail: boolean = false): {
  manager: DataModelManager<Metric>;
  calls: {[key: string]: any}[][];
} {
  const calls: {[key: string]: any}[][] = [];
  const manager = {
    bulkCreate: (docs: {[key: string]: any}[]) => {
      calls.push([...docs]);
      if (fail) {
        return of({success: [], error: [{msg: 'db error'}]});
      }
      const pass = calls.length;
      return of({
        success: docs.map((doc, idx) => ({...doc, id: `id-${pass}-${idx}`})),
        error: [],
      });
    },
  } as unknown as DataModelManager<Metric>;
  return {manager, calls};
}

describe('metric import utils', () => {
  describe('hasParentRef', () => {
    it('should ignore the empty parent references', () => {
      // parent_id and parent_name are required by the metric schemas, so they
      // are always present and valued null when the file has no column for them
      expect(hasParentRef({name: 'A', parent_id: null, parent_name: null})).toBe(false);
      expect(hasParentRef({name: 'A', parent_id: '', parent_name: '   '})).toBe(false);
      expect(hasParentRef({name: 'A', parent_id: null, parent_name: 'P'})).toBe(true);
      expect(hasParentRef({name: 'A', parent_id: 'p1', parent_name: null})).toBe(true);
    });
  });

  describe('splitMetricsByParent', () => {
    it('should split the metrics by the presence of a parent', () => {
      const root = {name: 'Root', parent_id: null, parent_name: null};
      const child = {name: 'Child', parent_id: null, parent_name: 'Root'};
      expect(splitMetricsByParent([child, root])).toEqual({roots: [root], withParent: [child]});
    });
  });

  describe('collectParentRefs', () => {
    it('should collect the deduplicated and trimmed parent references', () => {
      const refs = collectParentRefs([
        {name: 'A', parent_id: 'p1', parent_name: ' Root '},
        {name: 'B', parent_id: 'p1', parent_name: 'Root'},
        {name: 'C', parent_id: null, parent_name: 'Other'},
        {name: 'D', parent_id: null, parent_name: null},
      ]);
      expect(refs).toEqual({parentIds: ['p1'], parentNames: ['Root', 'Other']});
    });
  });

  describe('buildMetricLookupSelector', () => {
    it('should return null when there is nothing to look up', () => {
      expect(buildMetricLookupSelector([], [])).toBeNull();
    });

    it('should build a flat selector for a single condition', () => {
      expect(buildMetricLookupSelector(['a', 'a'], [])).toEqual({
        selector: {id: {$in: ['a']}, is_deleted: {$ne: true}},
      });
      expect(buildMetricLookupSelector([], ['N'])).toEqual({
        selector: {name: {$in: ['N']}, is_deleted: {$ne: true}},
      });
    });

    it('should build an $or selector for both conditions', () => {
      expect(buildMetricLookupSelector(['a'], ['N'])).toEqual({
        selector: {
          $or: [{id: {$in: ['a']}}, {name: {$in: ['N']}}],
          is_deleted: {$ne: true},
        },
      });
    });
  });

  describe('fillInMissingParentValues', () => {
    const pool = [{id: 'p1', name: 'Root'}];

    it('should fill in the parent name when the parent is referenced by id', () => {
      const child: ImportableMetric = {name: 'Child', parent_id: 'p1', parent_name: null};
      const res = fillInMissingParentValues([child], pool);
      expect(res.readyToInsert).toEqual([child]);
      expect(res.deferred).toEqual([]);
      expect(child['parent_name']).toBe('Root');
    });

    it('should fill in the parent id when the parent is referenced by name', () => {
      const child: ImportableMetric = {name: 'Child', parent_id: null, parent_name: 'Root'};
      const res = fillInMissingParentValues([child], pool);
      expect(res.readyToInsert).toEqual([child]);
      expect(child['parent_id']).toBe('p1');
    });

    it('should let the parent id win over an inconsistent parent name', () => {
      const child = {name: 'Child', parent_id: 'p1', parent_name: 'Wrong'};
      fillInMissingParentValues([child], pool);
      expect(child['parent_name']).toBe('Root');
    });

    it('should defer the metrics whose parent is unknown', () => {
      const child = {name: 'Child', parent_id: null, parent_name: 'Missing'};
      const res = fillInMissingParentValues([child], pool);
      expect(res.readyToInsert).toEqual([]);
      expect(res.deferred).toEqual([child]);
    });
  });

  describe('importMetricTree', () => {
    it('should create a multi level tree one level per pass, whatever the order is', done => {
      const {manager, calls} = managerMock();
      const metrics: ImportableMetric[] = [
        {name: 'C', parent_id: null, parent_name: 'B'},
        {name: 'B', parent_id: null, parent_name: 'A'},
      ];
      importMetricTree(manager, metrics, [{id: 'a', name: 'A'}]).subscribe(res => {
        expect(calls.length).toBe(2);
        expect(calls[0].map(m => m['name'])).toEqual(['B']);
        expect(calls[1].map(m => m['name'])).toEqual(['C']);
        expect(res.success.map(m => (m as any).name)).toEqual(['B', 'C']);
        expect(res.deferred).toEqual([]);
        expect(metrics[1]['parent_id']).toBe('a');
        expect(metrics[0]['parent_id']).toBe('id-1-0');
        done();
      });
    });

    it('should stop on a cycle instead of recurring forever', done => {
      const {manager, calls} = managerMock();
      const metrics = [
        {name: 'A', parent_id: null, parent_name: 'B'},
        {name: 'B', parent_id: null, parent_name: 'A'},
      ];
      importMetricTree(manager, metrics, []).subscribe(res => {
        expect(calls.length).toBe(0);
        expect(res.success).toEqual([]);
        expect(res.deferred.length).toBe(2);
        done();
      });
    });

    it('should report the metrics whose parent does not exist', done => {
      const {manager} = managerMock();
      const metrics = [
        {name: 'Child', parent_id: null, parent_name: 'Root'},
        {name: 'Orphan', parent_id: null, parent_name: 'Missing'},
      ];
      importMetricTree(manager, metrics, [{id: 'r', name: 'Root'}]).subscribe(res => {
        expect(res.success.length).toBe(1);
        expect(res.deferred.map(m => m['name'])).toEqual(['Orphan']);
        done();
      });
    });

    it('should not create the children when a level fails', done => {
      const {manager, calls} = managerMock(true);
      const metrics = [
        {name: 'B', parent_id: null, parent_name: 'A'},
        {name: 'C', parent_id: null, parent_name: 'B'},
      ];
      importMetricTree(manager, metrics, [{id: 'a', name: 'A'}]).subscribe(res => {
        expect(calls.length).toBe(1);
        expect(res.error.length).toBe(1);
        expect(res.deferred.map(m => m['name'])).toEqual(['C']);
        done();
      });
    });

    it('should call onCreated once per level', done => {
      const {manager} = managerMock();
      const created: string[][] = [];
      const metrics = [
        {name: 'B', parent_id: null, parent_name: 'A'},
        {name: 'C', parent_id: null, parent_name: 'B'},
      ];
      importMetricTree(manager, metrics, [{id: 'a', name: 'A'}], {
        onCreated: docs => created.push(docs.map(d => (d as any).name)),
      }).subscribe(() => {
        expect(created).toEqual([['B'], ['C']]);
        done();
      });
    });
  });

  describe('formatMetricNamesMessage', () => {
    it('should return an empty message for an empty list', () => {
      expect(formatMetricNamesMessage([], 'Label')).toBe('');
    });

    it('should list the metric names', () => {
      expect(formatMetricNamesMessage([{name: 'A'}, {name: 'B'}], 'Label')).toBe(
        '\nLabel (2):\nA,\nB\n',
      );
    });

    it('should truncate the list at the maximum', () => {
      const metrics = [{name: 'A'}, {name: 'B'}, {name: 'C'}];
      expect(formatMetricNamesMessage(metrics, 'Label', 2, '\nand more...')).toBe(
        '\nLabel (3):\nA,\nB,\nand more...\n',
      );
    });
  });
});
