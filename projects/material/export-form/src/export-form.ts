/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {
  AjfChoicesOrigin,
  AjfContainerNode,
  AjfFieldType,
  AjfFormCreate,
  AjfNode,
  AjfNodeType,
  AjfSlide,
  AjfTableField,
} from '@ajf/core/forms';
import {TranslocoService} from '@ajf/core/transloco';
import {deepCopy} from '@ajf/core/utils';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Optional,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {MatSelectionList} from '@angular/material/list';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {BehaviorSubject, forkJoin, isObservable, Observable, of as obsOf, Subscription} from 'rxjs';
import {filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as XLSX from 'xlsx';

import {FormSchema} from '@dino/core/forms';

import {ExportSelectAllButtonComponent} from './export-form-select-all-button';
import {
  AjfField,
  Context,
  Data,
  ExportData,
  ExportFormat,
  ExportModel,
  MAX_SHEETNAME_LENGTH,
} from './export-interface';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {DataModelManager} from '@dino/core/data';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

/**
 * The export form component dialog data interface
 */
export interface ExportFormData {
  /**
   * The desired export format
   */
  exportFormat?: 'xlsx' | 'csv';
  /**
   * If true, all fields are automatically selected when the
   * dialog is opened.
   */
  selectAll?: boolean;
}

@Component({
  selector: 'dino-export-form',
  templateUrl: 'export-form.html',
  styleUrls: ['export-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ExportForm implements AfterViewInit, OnDestroy {
  disableExport$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  exportFormat: ExportFormat = 'csv';
  @ViewChildren(ExportSelectAllButtonComponent)
  exportSelectAllButton!: QueryList<ExportSelectAllButtonComponent>;
  @ViewChildren(MatSelectionList) fields!: QueryList<MatSelectionList>;

  readonly exportDataList$: BehaviorSubject<ExportData[]> = new BehaviorSubject<ExportData[]>([]);
  // it is the export data model of the form schema.
  readonly exportModel$: BehaviorSubject<ExportModel | null> =
    new BehaviorSubject<ExportModel | null>(null);
  readonly formSchema$: BehaviorSubject<FormSchema | null> = new BehaviorSubject<FormSchema | null>(
    null,
  );
  readonly maxNumberOfForm$: Observable<number>;

  private readonly _exportedFieldNames$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    [],
  );

  private _exportedDataListPopulated$: Observable<ExportData[]>;
  private _currentTabIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _dinoFields: string[] = ['id', 'user_data_ref_id', 'created_at'];
  private _dinoBaseModelFields: string[] = ['_deleted', 'is_deleted', 'updated_at'];
  private _metricManagers: (DataModelManager<any> | null)[] = [
    this._ar,
    this._cs,
    this._pj,
    this._lc,
    this._og,
  ];
  private _exportEvt: EventEmitter<void> = new EventEmitter<void>();
  private _exportSub: Subscription = Subscription.EMPTY;
  // it is a dictionary with keu the name of the slide and the list of selected field name as value.
  private _exportedNamesBySlide: {[index: number]: string[]} = {};
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _selectAllFieldsofCurrentSlideEvt: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _selectAllSub: Subscription = Subscription.EMPTY;
  // if it is true, it indicates that the export must be by translated labels.
  private _translate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // it is a dictionary with key the label of the fields or choice origins and the relative label as
  // value.
  private _translateCtxValuesDic: {[name: string]: string} = {};

  constructor(
    public dialogRef: MatDialogRef<ExportForm>,
    @Inject(MAT_DIALOG_DATA) public dialogData: ExportFormData,
    private _ts: TranslocoService,
    @Optional() private _ar: AreaManager | null,
    @Optional() private _cs: CaseManager | null,
    @Optional() private _pj: ProjectManager | null,
    @Optional() private _lc: LocationManager | null,
    @Optional() private _og: OrganizationManager | null,
  ) {
    this._selectAllSub = (this._selectAllFieldsofCurrentSlideEvt as Observable<boolean>)
      .pipe(withLatestFrom(this._currentTabIndex$))
      .subscribe(([checked, tabIndex]) => {
        const selectionList = this.fields.toArray()[tabIndex];
        if (checked) {
          selectionList.selectAll();
        } else {
          selectionList.deselectAll();
        }
      });

    this._exportedDataListPopulated$ = this.exportDataList$.pipe(
      switchMap(expData => {
        const expObjData: Observable<{[k: string]: any}>[] = [];
        for (let data of expData) {
          const dinoData = data.dino;
          const itemObj: {[k: string]: Observable<any>} = {};
          for (let dKey in dinoData) {
            itemObj[dKey] = isObservable(dinoData[dKey]) ? dinoData[dKey] : obsOf(dinoData[dKey]);
          }
          expObjData.push(forkJoin(itemObj));
        }
        return forkJoin(expObjData).pipe(
          map(newDinoData => {
            const populatedData: ExportData[] = [];
            expData.forEach(exp => {
              const newData = newDinoData.find(ndd => ndd['id'] === exp.dino['id']);
              if (newData) {
                exp.dino = newData;
              }
              populatedData.push(exp);
            });
            return populatedData;
          }),
        );
      }),
    );

    this.maxNumberOfForm$ = this.exportDataList$.pipe(map(l => l.length));

    const translateCtxValueslSub = (this.formSchema$ as Observable<FormSchema | null>)
      .pipe(
        filter((f: any) => f != null),
        map((fs: FormSchema) => fs.schema),
        map(s => {
          const choicesOrigins: AjfChoicesOrigin<string | number>[] = s.choicesOrigins!;
          const slides: AjfContainerNode[] = s.nodes as AjfContainerNode[];
          const res: {[name: string]: string} = {};
          choicesOrigins.forEach((choicesOrigin: AjfChoicesOrigin<string | number>) => {
            choicesOrigin.choices.forEach(choice => {
              res[choice.value] = `${choice.label}`;
            });
            slides.forEach(slide => {
              res[slide.name] = `${slide.label}`;
              (slide.nodes as AjfField[]).forEach(field => {
                res[field.name] = `${field.label}`;
                if (field.visibility != null && field.visibility.condition != null) {
                  const rootField = field.visibility.condition.split(' ')[0];
                  if (res[rootField] != null) {
                    res[field.name] = `${field.label}(${res[rootField]})`;
                  }
                }
              });
            });
          });
          return res;
        }),
      )
      .subscribe(res => {
        this._translateCtxValuesDic = res;
        translateCtxValueslSub.unsubscribe();
      });

    const slideNodes$: Observable<AjfSlide[]> = this.formSchema$.pipe(
      filter((fs: any) => fs != null && fs.schema != null && fs.schema.nodes != null),
      map(fs => fs.schema.nodes as AjfSlide[]),
      // remove empty or malformed slides.
      map((slides: AjfSlide[]) =>
        slides.filter(slide => slide.nodes != null && slide.nodes.length > 0),
      ),
      map((slides: AjfSlide[], _ctxList) =>
        slides.map((slide, index) => {
          slide.id = index; // prevent no sequencial id
          slide.nodes = slide.nodes
            .map(node => ({
              ...node,
              ...{
                slideNodeType: slide.nodeType,
                slideIndex: slide.id,
                slideName: slide.name,
              },
            }))
            .filter(
              // remove unexportable ajf fields.
              node =>
                node.nodeType === 0 &&
                (node as AjfField).fieldType !== AjfFieldType.File &&
                (node as AjfField).fieldType !== AjfFieldType.Empty &&
                (node as AjfField).fieldType !== AjfFieldType.Image,
            );
          return slide;
        }),
      ),
    );

    const slideNodesWithAllRepeatingInstance$: Observable<AjfField[]> = this.exportDataList$.pipe(
      withLatestFrom(slideNodes$),
      map(([ctxList, slideNodes]) => {
        let fields: AjfField[] = [];
        const fieldsFromTab: AjfField[] = this._getFieldsFromTabs();
        const fieldsFromTabNames: string[] = this._getFieldsFromTabs().map(f => f.name);
        if (ctxList.length > 0) {
          slideNodes.forEach(slideNode => {
            if ((slideNode.nodeType as AjfNodeType) === AjfNodeType.AjfRepeatingSlide) {
              const count = this._countNumberOfRepeatingSlidesInstance(
                fieldsFromTab as AjfField[],
                ctxList,
              );
              for (let i = 0; i <= count; i++) {
                slideNode.nodes
                  .filter(n => fieldsFromTabNames.indexOf(n.name) > -1)
                  .forEach((field, idx) => {
                    if (idx === 0 && i === 0) {
                      const slideFieldCloned: AjfField = deepCopy(field);
                      slideFieldCloned.name = slideNode.name;
                      fields.push(slideFieldCloned);
                    }
                    const fieldCloned: AjfField = deepCopy(field);
                    fieldCloned.name = `${field.name}__${i}`;
                    fields.push(fieldCloned);
                  });
              }
            } else {
              fields = fields.concat(
                (slideNode.nodes as AjfField[]).filter(
                  f => fieldsFromTabNames.indexOf(f.name) > -1,
                ),
              );
            }
          });
        }
        return fields;
      }),
      tap(fields => {
        let exportedFieldNames: string[] = [];
        fields.forEach(field => {
          if (field.fieldType === AjfFieldType.Table) {
            const tableKeyNames: string[] = [];
            const rowLabels = (field as AjfTableField).rowLabels.map(l =>
              this._translateCtxValue(l),
            );
            const columnLabels = (field as AjfTableField).columnLabels.map(l =>
              this._translateCtxValue(l),
            );
            rowLabels.forEach((_, rowIdx) => {
              columnLabels.forEach((__, columnIdx) => {
                const tableKey = `${field.name}__${rowIdx}__${columnIdx}`;
                tableKeyNames.push(tableKey);
              });
            });
            exportedFieldNames = exportedFieldNames.concat(tableKeyNames);
          } else {
            exportedFieldNames.push(field.name);
          }
        });
        this._exportedFieldNames$.next(exportedFieldNames);
      }),
    );

    this._exportSub = this._exportEvt
      .pipe(
        switchMap(() => slideNodesWithAllRepeatingInstance$),
        withLatestFrom(this._exportedDataListPopulated$),
        map(([slideNodesWithAllRepeatingInstance, ctxList]) => {
          const exportCtxList: Context[] = [];
          ctxList.forEach(ctx => {
            const exportCtx: Context = {};

            slideNodesWithAllRepeatingInstance
              .filter(f => f.slideName !== f.name) // remove slide fields
              .forEach(field => {
                this._evaluateContext(field, exportCtx, ctx);
                if (
                  field.slideNodeType === AjfNodeType.AjfRepeatingSlide &&
                  field.slideName != null &&
                  exportCtx[field.slideName] == null
                ) {
                  const fieldsFromTab: AjfField[] = this._getFieldsFromTabs(field.slideIndex);
                  exportCtx[field.slideName] = this._countNumberOfInstanceInContext(
                    fieldsFromTab,
                    ctx,
                  );
                }
              });
            if (Object.keys(exportCtx).length > 0) {
              this._dinoFields.forEach(field => {
                const isDinoRefField = field.includes('_ref_id');
                const dinoField = isDinoRefField ? field.replace('_ref_id', '') : field;
                exportCtx[field] =
                  isDinoRefField && ctx.dino[dinoField]
                    ? ctx.dino[dinoField].id
                    : ctx.dino[dinoField];
              });
              if (ctx.dino['user_data'] != null) {
                exportCtx['user_data_full_name'] = ctx.dino['user_data'].full_name;
              }
              const metricManagers = this._metricManagers.filter(mm => mm != null);
              metricManagers.forEach(manager => {
                if (manager != null) {
                  const metricName = manager.collectionName.toLowerCase();
                  const metricProperties = manager.collectionSchema.properties;
                  for (let prop in metricProperties) {
                    if (ctx.dino[metricName] && !this._dinoBaseModelFields.includes(prop)) {
                      exportCtx[`${metricName}_${prop}`] = ctx.dino[metricName][prop];
                    }
                  }
                }
              });
              if (ctx.dino['form_status']) {
                exportCtx[`form_status_id`] = ctx.dino['form_status']['id'];
                exportCtx[`form_status_name`] = ctx.dino['form_status']['name'];
                exportCtx[`form_status_label`] = ctx.dino['form_status']['label'];
                exportCtx[`form_status_level`] = ctx.dino['form_status']['status_level'];
                exportCtx[`form_status_color`] = ctx.dino['form_status']['color'];
              }
              exportCtxList.push(exportCtx);
            }
          });
          return exportCtxList;
        }),
      )
      .subscribe((res: Context[]) => {
        switch (this.exportFormat) {
          case 'xlsx':
            this._buildXlsx(res);
            break;
          case 'splitted-xlsx':
            this._buildXlsx(res, true);
            break;
          default:
            this._buildCsv(res);
            break;
        }
        this.dialogRef.close();
      });
  }

  ngAfterViewInit(): void {
    if (this.dialogData) {
      if (this.dialogData.selectAll && this.exportSelectAllButton.first != null) {
        this.exportSelectAllButton.first.toggle();
      }
      if (this.dialogData.exportFormat) {
        this.exportFormat = this.dialogData.exportFormat;
      }
    }
  }

  @Input()
  set data(data: Data[]) {
    this.exportDataList$.next(
      data.map(row => {
        const ctx: ExportData = {...row.data, dino: {}, externalRefs: {}};
        const keys = Object.keys(row);
        keys
          .filter(k => k != 'data')
          .forEach(key => {
            key.includes('ref_id')
              ? (ctx.externalRefs[key] = row[key])
              : (ctx.dino[key] = row[key]);
          });
        return ctx;
      }),
    );
  }

  @Input()
  set dinoFields(fieldNames: string[]) {
    this._dinoFields = fieldNames;
  }

  @Input()
  set formSchema(formSchema: FormSchema) {
    this.formSchema$.next(formSchema);
    this.exportModel$.next(this._buildExportModel(formSchema));
  }

  get loading$(): Observable<boolean> {
    return this._loading$ as Observable<boolean>;
  }

  /**
   * It builds a csv file and download it from browser.
   * the csv contains all the selected fields.
   * The file name follows the following metric
   * `${schema_name}__${time_level}__${start_period}__${end_period}`
   *
   * @param ctxList is the list of ajf contexts.
   * @param exportModel is the ExportModel of current form schema.
   */
  _buildCsv(ctxList: Context[], all = false): void {
    const exportModel: ExportModel = this.exportModel$.value!;
    let exportedNames = this._exportedFieldNames$.value;
    if (all) {
      exportedNames = Object.keys(ctxList[0]);
    }
    const worksheet: XLSX.WorkSheet = this._buildWorksheet(ctxList, exportedNames);
    const workBook: XLSX.WorkBook = {Sheets: {'': worksheet}, SheetNames: ['']};
    XLSX.writeFile(workBook, `${exportModel.schemaName}.csv`, {
      bookType: 'csv',
    });
    this._loading$.next(false);
  }

  export(): void {
    this._exportEvt.emit();
  }

  ngOnDestroy(): void {
    this._selectAllSub.unsubscribe();
    this._exportSub.unsubscribe();
  }

  selectAll(checked: boolean): void {
    this.exportSelectAllButton
      .filter(button => button.group != null && button.group === 'tab')
      .forEach(button => button.setChecked(checked));
    this.fields.forEach(field => (checked ? field.selectAll() : field.deselectAll()));
    this.updateExportDisable();
  }

  selectAllfieldSlides(checked: boolean): void {
    this._selectAllFieldsofCurrentSlideEvt.next(checked);
    this.updateExportDisable();
  }

  setTranslation(checked: boolean): void {
    this._translate$.next(checked);
  }

  tabChange(ev: MatTabChangeEvent): void {
    this._currentTabIndex$.next(ev.index);
  }

  updateExportDisable(): void {
    const countSelectedFields = this._getFieldsFromTabs().length;
    if (countSelectedFields > 0) {
      this.disableExport$.next(false);
    } else {
      this.disableExport$.next(true);
    }
  }

  private _buildExportModel(formSchema: FormSchema): ExportModel {
    const schemaName = formSchema.name;
    const schema: AjfFormCreate = formSchema.schema;
    const slideNodes: AjfSlide[] = (schema.nodes! as AjfSlide[]).map((slide, index) => {
      slide.id = index;
      slide.nodes = slide.nodes
        .map(node => ({
          ...node,
          ...{
            slideNodeType: slide.nodeType,
            slideIndex: slide.id,
            slideName: slide.name,
          },
        }))
        .filter(
          // remove unexportable ajf fields.
          (node: AjfNode) =>
            node.nodeType === 0 &&
            (node as AjfField).fieldType !== AjfFieldType.File &&
            (node as AjfField).fieldType !== AjfFieldType.Empty &&
            (node as AjfField).fieldType !== AjfFieldType.Image,
        );
      return slide;
    });
    const slideLabels: string[] = slideNodes.map(slide => slide.label);
    const slides = slideNodes.map(slide => slide.nodes);

    return {schemaName, slideLabels, slides};
  }

  private _buildLabelsRow(names: string[]): {[name: string]: string} {
    const labels: {[name: string]: string} = {};
    names.forEach(name => {
      const fieldName = this._getFieldName(name);
      if (this._dinoFields.indexOf(name) === -1) {
        labels[name] =
          this._translateCtxValuesDic[fieldName] != null
            ? this._translateCtxValuesDic[fieldName]
            : name;
      } else {
        labels[name] = fieldName;
      }
    });
    return labels;
  }

  /**
   * xlsx needs a formatted label with fixed max length and no special characters
   * inside.
   * @param label
   * @returns a sheet name.
   */
  private _buildSheetName(label: string): string {
    if (label.length > MAX_SHEETNAME_LENGTH) {
      label = label.substring(0, MAX_SHEETNAME_LENGTH);
    }
    label = label.replace(new RegExp(/[^a-zA-Z0-9]/g), ' ');
    return label;
  }

  private _buildWorksheet(ctxList: Context[], slideFieldNames: string[]): XLSX.WorkSheet {
    let fieldNames = [];

    fieldNames = [...this._dinoFields, ...slideFieldNames];
    const fieldLabels = this._buildLabelsRow(fieldNames);
    const data = [fieldLabels, ...ctxList];
    return XLSX.utils.json_to_sheet(data);
  }

  /**
   * It builds a xlxs file and download it from browser.
   * It creates a xlxs workbook that contains a sheet with all the selected fields and a sheet for
   * each slide of the form. Each value shown is shown as a label when present and translated when a
   * translation is present.
   * The file name follows the following metric
   * `${schema_name}__${time_level}__${start_period}__${end_period}`
   *
   * @param ctxList is the list of ajf contexts.
   * @param exportModel is the ExportModel of current form schema.
   */
  private _buildXlsx(ctxList: Context[], splitted = false): void {
    const exportModel: ExportModel = this.exportModel$.value!;
    const sheets: {[sheet: string]: XLSX.WorkSheet} = {};
    if (splitted) {
      Object.keys(this._exportedNamesBySlide).forEach(exportNameKey => {
        const slideContext: Context[] = this._getSlideContex(
          ctxList,
          this._exportedNamesBySlide[+exportNameKey],
        );
        const worksheet: XLSX.WorkSheet = this._buildWorksheet(
          slideContext,
          this._exportedNamesBySlide[+exportNameKey],
        );
        let sheetLabel = this._buildSheetName(exportModel.slideLabels[+exportNameKey]);
        sheets[sheetLabel] = worksheet;
      });
      // remove empty sheets.
      Object.keys(sheets).forEach(sheetName => {
        if (Object.keys(sheets[sheetName]).length === 1) {
          delete sheets[sheetName];
        }
      });
    }

    const slideNames: string[] = Object.keys(sheets);
    const exportedNames = this._exportedFieldNames$.value;
    // create the main sheet
    const worksheetAll: XLSX.WorkSheet = this._buildWorksheet(ctxList, exportedNames);
    const schemaName = this._buildSheetName(exportModel.schemaName);
    sheets[schemaName] = worksheetAll;

    const workbook: XLSX.WorkBook = {
      Sheets: sheets,
      SheetNames: [schemaName, ...slideNames],
    };
    XLSX.writeFile(workbook, `${exportModel.schemaName}.xls`, {
      bookType: 'xls',
      type: 'array',
    });
    this._loading$.next(false);
  }

  private _countNumberOfInstanceInContext(fields: AjfField[], ctx: Context): number {
    let count = -1;
    const fieldNames = fields.map(field => field.name);
    Object.keys(ctx).map(key => {
      const splittedKey = key.split(`__`);
      if (
        splittedKey.length === 2 &&
        fieldNames.indexOf(splittedKey[0]) > -1 &&
        count < +splittedKey[1] &&
        ctx[key] != null
      ) {
        count++;
      }
    });
    count++;
    return count;
  }

  /**
   * It returns tha max counts of the field instances relative to the current context
   * list.
   * example field1__0, field1__1, field1__2, field2__0, field2__1, field3__0.
   * return 3
   *
   * @private
   * @param fields
   * @param ctxList
   * @return {*}
   */
  private _countNumberOfRepeatingSlidesInstance(fields: AjfField[], ctxList: Context[]): number {
    let count = 0;
    ctxList.map(ctx => {
      const countInCtx = this._countNumberOfInstanceInContext(fields, ctx) - 1;
      count = count < countInCtx ? countInCtx : count;
    });
    return count;
  }

  private _evaluateContext(field: AjfField, exportCtx: Context, ctx: Context): void {
    if (ctx[field.name] != null || field.fieldType === AjfFieldType.Table) {
      switch (field.fieldType) {
        case AjfFieldType.Number:
          exportCtx[field.name] = ctx[field.name];
          break;
        case AjfFieldType.MultipleChoice:
          exportCtx[field.name] = this._translateCtxValue(ctx[field.name]);
          break;
        case AjfFieldType.Table:
          const rowLabels = (field as AjfTableField).rowLabels.map(l => this._translateCtxValue(l));
          const columnLabels = (field as AjfTableField).columnLabels.map(l =>
            this._translateCtxValue(l),
          );
          rowLabels.forEach((row, rowIdx) => {
            columnLabels.forEach((column, columnIdx) => {
              const tableKey = `${field.name}__${rowIdx}__${columnIdx}`;
              const labelCell = `${row}__${column}`;
              this._translateCtxValuesDic[tableKey] = labelCell;
              if (ctx[tableKey] != null) {
                exportCtx[tableKey] = this._translate(`${ctx[tableKey] || ' '}`);
                if (field.slideIndex != null) {
                  this._updateExportNamesBySlides(field.slideIndex, tableKey);
                }
              }
            });
          });
          break;
        default:
          const newValue = this._translateCtxValue(ctx[field.name]);
          exportCtx[field.name] = newValue;
      }
    } else {
      exportCtx[field.name] = '';
    }
    if (field.fieldType !== AjfFieldType.Table && field.slideIndex != null && field.name != null) {
      this._updateExportNamesBySlides(field.slideIndex, field.name);
    }
  }

  private _getFieldName(name: string): string {
    name = name.replace('data_', '');
    name = name.replace('django_', '');
    const splittedName = name.split('__');
    if (splittedName.length === 2) {
      return splittedName[0];
    }
    return name;
  }

  /**
   * @return The list of ajfField of the selected fields contained in the tabs.
   */
  private _getFieldsFromTabs(idx?: number): AjfField[] {
    const fields: AjfField[] = [];
    const tabs = this.fields != null ? this.fields.toArray() : [];
    if (idx != null && tabs[idx] != null) {
      tabs[idx].options.forEach(option => {
        fields.push(option.value);
      });
    } else {
      tabs.forEach(tab => {
        if (tab.selectedOptions != null && tab.selectedOptions.selected != null) {
          tab.selectedOptions.selected
            .filter(selected => selected != null && selected.value != null)
            .forEach(selected => fields.push(selected.value));
        }
      });
    }
    return fields;
  }

  /**
   * @param ctxList is the list of ajf contexts.
   * @param names is the list of field names.
   * @return the ctxList filtered by names
   */
  private _getSlideContex(ctxList: Context[], names: string[]): Context[] {
    const slidesCtx: Context[] = [];
    names = [...this._dinoFields, ...names];
    ctxList.forEach(ctx => {
      const slideCtx: Context = {};
      names.forEach(name => {
        if (ctx[name] != null) {
          slideCtx[name] = ctx[name];
        }
      });
      slidesCtx.push(slideCtx);
    });
    return slidesCtx.filter(ctx => Object.keys(ctx).length > 0);
  }

  private _isObject(val: any): boolean {
    if (val === null) {
      return false;
    }
    return Array.isArray(val) === false && (typeof val === 'function' || typeof val === 'object');
  }

  /**
   * prevent instant error.
   * Do null checks and convert val to string or string array before instant calling.
   *
   * @private
   * @param val
   * @return {*}
   */
  private _translate(val: any): string | string[] {
    if (val != null && val != '') {
      if (Array.isArray(val)) {
        val = val.map(v => `${v || ' '}`);
      } else {
        val = `${val}`;
      }
      return this._ts.translate(val);
    }
    return '';
  }

  private _translateCtxValue(value: string | number | string[] | number[]): string | string[] {
    if (value == null || this._isObject(value)) {
      return '';
    }

    if (this._translate$.value) {
      if (Array.isArray(value)) {
        return (value as string[])
          .map((n: string | number) => {
            n = `${n}`;
            if (n === '') {
              return n;
            }
            const label = this._translateCtxValuesDic[n];
            if (label != null && label !== '') {
              return this._translate(label);
            } else {
              return this._translate(n);
            }
          })
          .toString();
      } else {
        value = `${value}`;
        if (
          this._translateCtxValuesDic[value] != null &&
          this._translateCtxValuesDic[value] !== ''
        ) {
          return this._translate(this._translateCtxValuesDic[value]);
        } else {
          return value !== '' ? this._translate(value) : value;
        }
      }
    } else {
      if (Array.isArray(value)) {
        const values = (value as string[]).map((v: string | number) => `${v}`).toString();
        return `[${values.toString()}]`;
      } else {
        return `${value}`;
      }
    }
  }

  private _updateExportNamesBySlides(slideIndex: number, fieldName: string): void {
    if (this._exportedNamesBySlide[slideIndex] != null) {
      this._exportedNamesBySlide[slideIndex] = [
        ...new Set([...this._exportedNamesBySlide[slideIndex], fieldName]),
      ];
    } else {
      this._exportedNamesBySlide[slideIndex] = [fieldName];
    }
  }
}
