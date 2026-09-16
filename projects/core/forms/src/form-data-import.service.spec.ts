import {AjfFieldType, AjfNodeType} from '@ajf/core/forms';
import {TestBed} from '@angular/core/testing';
import {MetricsService} from '@dino/core/data';
import {BehaviorSubject} from 'rxjs';

import {FormDataImportService} from './form-data-import.service';
import {FormSchema} from './form-schema';

const metricsServiceMock = {
  activeMetrics: new BehaviorSubject<{metricName: string}[]>([
    {metricName: 'project'},
    {metricName: 'area'},
  ]),
};

/**
 * A schema with a field inside a nested group, a repeating slide and a table,
 * to cover every kind of mapping target.
 */
function testFormSchema(formSchemaMetrics?: string[]): FormSchema {
  return {
    id: 'schema_id',
    name: 'test_schema',
    form_schema_metrics: formSchemaMetrics,
    schema: {
      nodes: [
        {
          id: 1,
          parent: 0,
          nodeType: AjfNodeType.AjfSlide,
          name: 'slide1',
          label: 'First slide',
          nodes: [
            {
              id: 2,
              parent: 1,
              nodeType: AjfNodeType.AjfNodeGroup,
              name: 'group1',
              label: 'A group',
              nodes: [
                {
                  id: 3,
                  parent: 2,
                  nodeType: AjfNodeType.AjfField,
                  name: 'district',
                  label: 'District of residence',
                },
                {id: 4, parent: 2, nodeType: AjfNodeType.AjfField, name: 'noLabel', label: ''},
              ],
            },
          ],
        },
        {
          id: 5,
          parent: 1,
          nodeType: AjfNodeType.AjfRepeatingSlide,
          name: 'children',
          label: 'Children',
          nodes: [
            {
              id: 6,
              parent: 5,
              nodeType: AjfNodeType.AjfField,
              name: 'childAge',
              label: 'Age of the child',
            },
          ],
        },
        {
          id: 7,
          parent: 5,
          nodeType: AjfNodeType.AjfSlide,
          name: 'slide2',
          label: 'Second slide',
          nodes: [
            {
              id: 8,
              parent: 7,
              nodeType: AjfNodeType.AjfField,
              fieldType: AjfFieldType.Table,
              name: 'myTable',
              label: 'My table',
              rowLabels: ['Row A'],
              columnLabels: ['Col 1', 'Col 2'],
            },
          ],
        },
      ],
    },
  } as unknown as FormSchema;
}

describe('FormDataImportService', () => {
  let service: FormDataImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: MetricsService, useValue: metricsServiceMock}],
    });
    service = TestBed.inject(FormDataImportService);
  });

  describe('getSchemaMetrics', () => {
    it('should return all the active metrics when the schema declares none', () => {
      expect(service.getSchemaMetrics(null)).toEqual(['project', 'area']);
      expect(service.getSchemaMetrics(testFormSchema())).toEqual(['project', 'area']);
      expect(service.getSchemaMetrics(testFormSchema([]))).toEqual(['project', 'area']);
    });

    it('should keep only the metrics declared by the schema', () => {
      expect(service.getSchemaMetrics(testFormSchema(['area']))).toEqual(['area']);
    });

    it('should ignore a declared metric that is not active', () => {
      expect(service.getSchemaMetrics(testFormSchema(['case']))).toEqual([]);
    });
  });

  describe('getFieldLabels', () => {
    it('should return the label of a field nested in a group', () => {
      expect(service.getFieldLabels(testFormSchema())['district']).toBe('District of residence');
    });

    it('should key a repeating slide field by its base name', () => {
      const labels = service.getFieldLabels(testFormSchema());
      expect(labels['childAge']).toBe('Age of the child');
      expect(labels['childAge__[0-9]+']).toBeUndefined();
    });

    it('should skip the fields with no label', () => {
      expect(service.getFieldLabels(testFormSchema())['noLabel']).toBeUndefined();
    });
  });

  describe('getTableFields', () => {
    it('should expose one entry per cell, with the table label', () => {
      const cells = service.getTableFields(testFormSchema());
      expect(Object.keys(cells).sort()).toEqual(['myTable__0__0', 'myTable__0__1']);
      expect(cells['myTable__0__1']).toEqual({
        tableName: 'myTable',
        tableLabel: 'My table',
        rowLabel: 'Row A',
        columnLabel: 'Col 2',
      });
    });
  });

  describe('getAvailableFields', () => {
    it('should offer the dinoinvalid flag', () => {
      expect(service.getAvailableFields(testFormSchema())).toContain('dinoinvalid');
    });

    it('should offer the table cells instead of the bare table name', () => {
      const fields = service.getAvailableFields(testFormSchema());
      expect(fields).toContain('myTable__0__0');
      expect(fields).not.toContain('myTable');
    });

    it('should offer the repeating slide field by its base name', () => {
      expect(service.getAvailableFields(testFormSchema())).toContain('childAge');
    });
  });
});
