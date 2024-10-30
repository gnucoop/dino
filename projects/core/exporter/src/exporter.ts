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
  isContainerNode,
} from '@ajf/core/forms';
import {TranslocoService} from '@ajf/core/transloco';
import {deepCopy} from '@ajf/core/utils';
import {Directive, EventEmitter, OnDestroy, Optional, Output} from '@angular/core';
import {BehaviorSubject, forkJoin, isObservable, Observable, of as obsOf, Subscription} from 'rxjs';
import {filter, map, shareReplay, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import * as XLSX from 'xlsx';

import {FormData, FormSchema} from '@dino/core/forms';

import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {ActionTrigger, DataModelManager} from '@dino/core/data';
import {
  AjfField,
  Context,
  Data,
  ExportData,
  ExportFormat,
  MAX_SHEETNAME_LENGTH,
  ExportListData,
} from './export-interface';
import {ExportModel} from './export-model.interface';
import {isRxDocument, RxDocument} from 'rxdb';

/**
 * Exporter Class that can be instantiated to export documents
 */
@Directive()
export class Exporter implements OnDestroy {
  /**
   * Event emitted as an Action hook
   */
  @Output() emitExportActionTrigger: EventEmitter<ActionTrigger> =
    new EventEmitter<ActionTrigger>();

  private _exportDataList$: BehaviorSubject<ExportData[]> = new BehaviorSubject<ExportData[]>([]);

  /** The export data model of the schema */
  private _exportModel$: BehaviorSubject<ExportModel | null> =
    new BehaviorSubject<ExportModel | null>(null);
  private _schema$: BehaviorSubject<FormSchema | null> = new BehaviorSubject<FormSchema | null>(
    null,
  );

  /**
   * The file created by the exporter
   */
  private _exportedFile: BehaviorSubject<File | null> = new BehaviorSubject<File | null>(null);
  get exportedFile(): Observable<File | null> {
    return this._exportedFile.pipe(
      filter(f => f != null),
      shareReplay(1),
    );
  }
  /**
   * The Export Format
   */
  private _exportFormat: ExportFormat = 'csv';

  /**
   * The placeholder for the ',' in multiple choises translated values
   */
  private readonly _multipleChoisePlaceholder = '_';

  private readonly _exportedFieldNames$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    [],
  );

  private _exportedDataListPopulated$: Observable<ExportData[]>;
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

  private _buildFileEvt: EventEmitter<void> = new EventEmitter<void>();
  private _buildFileSub: Subscription = Subscription.EMPTY;

  private _ctxValuesSub: Subscription = Subscription.EMPTY;
  private _nvSub: Subscription = Subscription.EMPTY;

  /** A dictionary with the name of the slide and the list of selected field name as value */
  private _exportedNamesBySlide: {[index: number]: string[]} = {};

  /** If true, export use translated labels instead values */
  private _translate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /** If true, export use data analysis format */
  private _dataAnalysis$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /** A dictionary with all context values:
   * {field name: field value}
   * {choiceOriginName_choiceOriginValue: choiceLabel} */
  private _ctxValuesDict: {[name: string]: string} = {};

  /**
   * The Exporting state of the export
   */
  private _isExporting: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isExporting(): Observable<boolean> {
    return this._isExporting.asObservable();
  }

  /**
   * Sets up all the Exporter parameters
   * @param setupData SetupData parameters (Schema, Nodesvisibility etc.)
   * @param fields The Fields/Columns that will be exported
   * @param docs The documents that will be exported (forms, metrics etc.)
   * @param format The export format (csv, xlsx, splitted-xlsx)
   * @param analysis If true, data-analysis format will be used
   * @param translation Set if export context real values or their translations/labels
   */
  setup(
    setupData: ExportListData | null,
    fields: AjfField[] | 'all',
    docs: Data[] | RxDocument<FormData>[] | null,
    format: ExportFormat,
    analysis: boolean,
    translation: boolean,
  ): void {
    const docsData: Data[] | null = docs ? docs.map(d => (isRxDocument(d) ? d.toJSON() : d)) : docs;
    this.setSetupData(setupData);
    this.setFields(fields);
    this.setDocsToExport(docsData);
    this.setExportFormat(format);
    this.setDataAnalysisFormat(analysis);
    this.setTranslation(translation);
  }

  private _setupData: BehaviorSubject<ExportListData | null> =
    new BehaviorSubject<ExportListData | null>(null);
  setSetupData(eld: ExportListData | null) {
    this._setupData.next(eld);
  }
  private _setupDataSub: Subscription = Subscription.EMPTY;

  private _fields: AjfField[] = [];
  setFields(flds: AjfField[] | 'all') {
    if (flds === 'all') {
      const schemaNodes =
        this._schema$.value && this._schema$.value.schema.nodes
          ? this._schema$.value.schema.nodes
          : [];
      const nodes = this._flattenNodes(schemaNodes);
      this._fields = nodes as AjfField[];
    } else {
      this._fields = flds;
    }
  }

  setExportFormat(format: ExportFormat) {
    this._exportFormat = format;
  }

  private _docsToExport: Data[] | null = null;
  setDocsToExport(data: Data[] | null) {
    this._docsToExport = data;
  }

  constructor(
    private _ts: TranslocoService,
    @Optional() private _ar: AreaManager | null,
    @Optional() private _cs: CaseManager | null,
    @Optional() private _pj: ProjectManager | null,
    @Optional() private _lc: LocationManager | null,
    @Optional() private _og: OrganizationManager | null,
  ) {
    this._setupDataSub = this._setupData.subscribe(std => {
      if (std && std.formSchema) {
        this._schema$.next(std.formSchema);
        this._buildExportModel(std.formSchema);
      }
    });

    this._exportedDataListPopulated$ = this._exportDataList$.pipe(
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
            /*if (populatedData.length) {
              this._buildFileEvt.emit();
            }*/
            return populatedData;
          }),
        );
      }),
    );

    this._ctxValuesSub = (this._schema$ as Observable<FormSchema | null>)
      .pipe(
        filter((f: any) => f != null),
        map((fs: FormSchema) => fs.schema),
        map(s => {
          const choicesOrigins: AjfChoicesOrigin<string | number>[] = s.choicesOrigins ?? [];
          const slides: AjfContainerNode[] = s.nodes ? (s.nodes as AjfContainerNode[]) : [];
          const res: {[name: string]: string} = {};
          choicesOrigins.forEach((choicesOrigin: AjfChoicesOrigin<string | number>) => {
            choicesOrigin.choices.forEach(choice => {
              res[choicesOrigin.name + '_' + choice.value] = `${this._ts.translate(choice.label)}`;
            });
          });
          slides.forEach(slide => {
            res[slide.name] = `${slide.label}`;
            (slide.nodes as AjfField[]).forEach(field => {
              res[field.name] = `${this._ts.translate(field.label)}`;
              if (field.visibility != null && field.visibility.condition != null) {
                const rootField = field.visibility.condition.split(' ')[0];
                if (res[rootField] != null) {
                  const fieldLabel = this._ts.translate(field.label) || field.label;
                  const rField = this._ts.translate(res[rootField]) || res[rootField];
                  res[field.name] = `${fieldLabel}(${rField})`;
                }
              }
            });
          });
          return res;
        }),
      )
      .subscribe(res => {
        this._ctxValuesDict = res;
      });

    const slideNodes$: Observable<AjfSlide[]> = this._schema$.pipe(
      map(fs => {
        const slides =
          fs != null && fs.schema != null && fs.schema.nodes != null ? fs.schema.nodes : [];
        return slides as AjfSlide[];
      }),
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

    const slideNodesWithAllRepeatingInstance$: Observable<AjfField[]> = this._exportDataList$.pipe(
      withLatestFrom(slideNodes$),
      map(([ctxList, slideNodes]) => {
        let fields: AjfField[] = [];
        const fieldsFromTab: AjfField[] = [...this._fields];
        const fieldsFromTabNames: string[] = [...this._fields].map(f => f.name);
        if (ctxList.length > 0) {
          slideNodes.forEach(slideNode => {
            if ((slideNode.nodeType as AjfNodeType) === AjfNodeType.AjfRepeatingSlide) {
              const count = this._countNumberOfRepeatingSlidesInstance(
                fieldsFromTab as AjfField[],
                ctxList,
                slideNode.name,
              );
              if (this._dataAnalysis$.value) {
                slideNode.nodes
                  .filter(n => fieldsFromTabNames.indexOf(n.name) > -1)
                  .forEach((field, idx) => {
                    if (idx === 0) {
                      const slideFieldCloned: AjfField = deepCopy(field);
                      slideFieldCloned.name = slideNode.name;
                      fields.push(slideFieldCloned);
                    }
                    const fieldCloned: AjfField = deepCopy(field);
                    fields.push(fieldCloned);
                  });
              } else {
                for (let i = 0; i < count; i++) {
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
        switchMap(() => {
          if (!this._isExporting.value) {
            this._isExporting.next(true);
            return obsOf(this._docsToExport);
          } else {
            return obsOf(null);
          }
        }),
        tap((dmExportableData: Data[] | null) => {
          if (dmExportableData) {
            this._exportDataList$.next(
              dmExportableData.map(row => {
                const rowData = this._setupData.value?.listType === 'forms' ? row.data : row;
                const ctx: ExportData = {...rowData, dino: {}, externalRefs: {}};
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
        }),
        switchMap(() => this._exportedDataListPopulated$),
      )
      .subscribe(res => {
        if (res) {
          this._buildFileEvt.emit();
        }
      });

    this._buildFileSub = this._buildFileEvt
      .pipe(
        switchMap(() => slideNodesWithAllRepeatingInstance$),
        withLatestFrom(this._exportedDataListPopulated$),
        map(([slideNodesWithAllRepeatingInstance, ctxList]) => {
          const exportCtxList: Context[] = [];
          ctxList.forEach(ctx => {
            const exportCtx: Context = {};
            let expandedExportCtx: Context[] = [];

            if (this._dataAnalysis$.value) {
              // Expand rows for data analysis format
              expandedExportCtx = this._expandRowCtxForDataAnalysis(
                slideNodesWithAllRepeatingInstance,
                ctx,
              );
            } else {
              slideNodesWithAllRepeatingInstance
                .filter(f => f.slideName !== f.name) // remove slide fields
                .forEach(field => {
                  this._evaluateContext(field, exportCtx, ctx);
                  if (
                    field.slideNodeType === AjfNodeType.AjfRepeatingSlide &&
                    field.slideName != null &&
                    exportCtx[field.slideName] == null
                  ) {
                    const fieldsFromTab: AjfField[] = [...this._fields];
                    exportCtx[field.slideName] = ctx[field.slideName]
                      ? ctx[field.slideName]
                      : this._countNumberOfInstanceInContext(fieldsFromTab, ctx);
                  }
                });
            }

            if (
              Object.keys(exportCtx).length > 0 ||
              expandedExportCtx.length > 0 ||
              this._setupData.value?.listType !== 'forms'
            ) {
              const refExportCtx: Context = {};
              this._dinoFields.forEach(field => {
                const isDinoRefField = field.includes('_ref_id');
                const dinoField = isDinoRefField ? field.replace('_ref_id', '') : field;
                refExportCtx[field] =
                  isDinoRefField && ctx.dino[dinoField]
                    ? ctx.dino[dinoField].id
                    : ctx.dino[dinoField];
              });
              if (ctx.dino['user_data'] != null) {
                refExportCtx['user_data_full_name'] = ctx.dino['user_data'].full_name;
              }
              const metricManagers = this._metricManagers.filter(mm => mm != null);
              metricManagers.forEach(manager => {
                const isListOfTypeMetrics = this._setupData.value?.listType === 'metrics';
                if (
                  manager != null &&
                  !(
                    isListOfTypeMetrics &&
                    manager.collectionName.toLowerCase() !== this._schema$.value?.name.toLowerCase()
                  )
                ) {
                  const metricName = manager.collectionName.toLowerCase();
                  const metricProperties = manager.collectionSchema.properties;
                  for (let prop in metricProperties) {
                    const ctxDinoContent = isListOfTypeMetrics ? ctx.dino : ctx.dino[metricName];
                    if (ctxDinoContent && !this._dinoBaseModelFields.includes(prop)) {
                      const metricProp = isListOfTypeMetrics ? prop : `${metricName}_${prop}`;
                      if (prop === 'metric_data') {
                        refExportCtx[metricProp] = ctxDinoContent[prop]
                          ? JSON.stringify(ctxDinoContent[prop])
                          : '';
                      } else {
                        refExportCtx[metricProp] = ctxDinoContent[prop];
                      }
                    }
                  }
                }
              });
              if (ctx.dino['form_status']) {
                refExportCtx[`form_status_id`] = ctx.dino['form_status']['id'];
                refExportCtx[`form_status_name`] = ctx.dino['form_status']['name'];
                refExportCtx[`form_status_label`] = ctx.dino['form_status']['label'];
                refExportCtx[`form_status_level`] = ctx.dino['form_status']['status_level'];
                refExportCtx[`form_status_color`] = ctx.dino['form_status']['color'];
              }

              if (this._dataAnalysis$.value) {
                expandedExportCtx.forEach(row => {
                  exportCtxList.push({...row, ...refExportCtx});
                });
              } else {
                exportCtxList.push({...exportCtx, ...refExportCtx});
              }
            }
          });
          return exportCtxList;
        }),
      )
      .subscribe((res: Context[]) => {
        switch (this._exportFormat) {
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
        this._isExporting.next(false);
      });
  }

  /**
   * Starts the Export process
   */
  export(): void {
    this._exportEvt.emit();
  }

  ngOnDestroy(): void {
    this._schema$.complete();
    this._exportModel$.complete();
    this._exportSub.unsubscribe();
    this._buildFileSub.unsubscribe();
    this._ctxValuesSub.unsubscribe();
    this._nvSub.unsubscribe();
    this._setupDataSub.unsubscribe();
  }

  /**
   * Set if export context real values or their translations/labels
   * @param checked
   */
  setTranslation(checked: boolean): void {
    this._translate$.next(checked);
  }

  /**
   * Set if download data in data analysis format
   * @param checked
   */
  setDataAnalysisFormat(checked: boolean): void {
    this._dataAnalysis$.next(checked);
  }

  /**
   * Return a row for each value of the multiple choice field
   * @param baseExportCtx the base export context object
   * @param fieldName the field name for the multiple choice field
   * @returns an array of Context with only one multiple choice value
   * [{attivita: 'PM'}, {attivita: 'Meeting'}, ...]
   */
  private _expandMultipleChoiceRow(baseExportCtx: Context, fieldName: string): Context[] {
    let multipleValues: string[] = [];
    if (Array.isArray(baseExportCtx[fieldName])) {
      multipleValues = [...(baseExportCtx[fieldName] as string[])];
    } else if (baseExportCtx[fieldName] && baseExportCtx[fieldName].length > 0) {
      if (baseExportCtx[fieldName][0] === '[' && baseExportCtx[fieldName].length > 2) {
        multipleValues = baseExportCtx[fieldName]
          .substring(1, baseExportCtx[fieldName].length - 1)
          .split(',');
      } else {
        multipleValues = baseExportCtx[fieldName].split(',');
      }
    }
    baseExportCtx[fieldName] = '';
    let rowsForMultipleChoice: Context[] = [];
    // Multiple choice: add a row for each value
    multipleValues.forEach(mVal => {
      const exportCtx: Context = {};
      exportCtx[fieldName] = mVal.replace(this._multipleChoisePlaceholder, ',');
      rowsForMultipleChoice.push(exportCtx);
    });
    return rowsForMultipleChoice;
  }

  /**
   * Push into export list the formdata expanded in multiple rows, one for
   * each repeating slide or multiple values
   * @param slideNodesWithAllRepeatingInstance
   * @param ctx
   * @returns
   */
  private _expandRowCtxForDataAnalysis(
    slideNodesWithAllRepeatingInstance: AjfField[],
    ctx: ExportData,
  ): Context[] {
    const expandedRows: {[key: string]: Context[]} = {};
    const baseExportCtx: Context = {};
    let expandedExportCtx: Context[] = [];

    slideNodesWithAllRepeatingInstance
      .filter(f => f.slideName !== f.name) // remove slide fields
      .forEach(field => {
        if (field.slideNodeType !== AjfNodeType.AjfRepeatingSlide) {
          this._evaluateContext(field, baseExportCtx, ctx);
          if (
            field.fieldType === AjfFieldType.MultipleChoice &&
            baseExportCtx[field.name] &&
            ctx[field.name] &&
            Array.isArray(ctx[field.name]) &&
            ctx[field.name].length > 1
          ) {
            // Multiple choice: add a row for each value
            const rowsForMultipleChoice = this._expandMultipleChoiceRow(baseExportCtx, field.name);
            expandedRows['main'] = expandedRows['main']
              ? [...expandedRows['main'], ...rowsForMultipleChoice]
              : rowsForMultipleChoice;
          }
        } else {
          const baseField = deepCopy(field);
          const baseFieldName = field.name.split('__')[0];
          baseField.name = baseFieldName;
          this._evaluateContext(baseField, baseExportCtx, {});
          if (field.slideName != null && baseExportCtx[field.slideName] == null) {
            const fieldsFromTab: AjfField[] = [...this._fields];
            const numberOfInstanceInContext = ctx[field.slideName]
              ? ctx[field.slideName]
              : this._countNumberOfInstanceInContext(fieldsFromTab, ctx);
            baseExportCtx[field.slideName] = numberOfInstanceInContext;
            // Repeating slide: add a row for each instance of the slide
            let rowsForCurrentSlide: Context[] = [];
            for (let i = 0; i < numberOfInstanceInContext; i++) {
              const exportCtx: Context = {};
              const rowsForMultipleChoice: Context[] = [];
              fieldsFromTab
                .filter(rf => rf != null)
                .forEach(repField => {
                  const repFieldNameWithCount = `${repField.name}__${i}`;
                  const repFieldWithCount = deepCopy(repField);
                  repFieldWithCount.name = repFieldNameWithCount;
                  this._evaluateContext(repFieldWithCount, exportCtx, ctx);
                  exportCtx[repField.name] = exportCtx[repFieldNameWithCount];
                  delete exportCtx[repFieldNameWithCount];
                  if (
                    repField.fieldType === AjfFieldType.MultipleChoice &&
                    exportCtx[repField.name] &&
                    ctx[repFieldNameWithCount] &&
                    Array.isArray(ctx[repFieldNameWithCount]) &&
                    ctx[repFieldNameWithCount].length > 1
                  ) {
                    rowsForMultipleChoice.push(
                      ...this._expandMultipleChoiceRow(exportCtx, repField.name),
                    );
                  }
                });
              // Add the row for the slide instance
              if (rowsForMultipleChoice.length > 0) {
                rowsForMultipleChoice.forEach(choiceRow => {
                  rowsForCurrentSlide.push({...exportCtx, ...choiceRow});
                });
              } else {
                rowsForCurrentSlide.push(exportCtx);
              }
            }
            expandedRows[field.slideName] = rowsForCurrentSlide;
          }
        }
      });

    let conta = 1;
    Object.keys(expandedRows).forEach(slide => {
      expandedRows[slide].forEach(row => {
        expandedExportCtx.push({...baseExportCtx, ...row, conta});
        conta = 0;
      });
    });
    if (expandedExportCtx.length === 0) {
      expandedExportCtx.push({...baseExportCtx, conta});
    }
    return expandedExportCtx;
  }

  private _buildExportModel(exportSchema: FormSchema): void {
    if (!this._setupData.value || !this._setupData.value?.nodesVisibility) return;

    this._nvSub = this._setupData.value.nodesVisibility.pipe(take(1)).subscribe(nodesVisibility => {
      const schemaName = exportSchema.name;
      const schema: AjfFormCreate = exportSchema.schema;
      const slideNodes: AjfSlide[] = schema.nodes
        ? (schema.nodes! as AjfSlide[])
            .map((slide, index) => {
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
                    (node as AjfField).fieldType !== AjfFieldType.Image &&
                    nodesVisibility.find(
                      field => field.name === node.name && field.visible === true,
                    ),
                );
              return slide;
            })
            .filter(node =>
              nodesVisibility.find(
                slide =>
                  slide.name === node.name && slide.type === 'slide' && slide.visible === true,
              ),
            )
        : [];
      const slideLabels: string[] = slideNodes.map(slide => slide.label);
      const slides = slideNodes.map(slide => slide.nodes);
      this._exportModel$.next({schemaName, slideLabels, slides});
    });
  }

  private _buildLabelsRow(names: string[]): {[name: string]: string} {
    const labels: {[name: string]: string} = {};
    names.forEach(name => {
      const fieldName = this._getFieldName(name);
      if (this._dinoFields.indexOf(name) === -1) {
        labels[name] =
          this._ctxValuesDict[fieldName] != null ? this._ctxValuesDict[fieldName] : name;
      } else {
        labels[name] = fieldName;
      }
    });
    if (this._setupData.value && this._setupData.value.removeCommas) {
      this._removeCommasFromlabels(labels);
    }
    return labels;
  }

  /**
   * Removes commas from all Labels
   * @param labels The labels
   * @returns
   */
  private _removeCommasFromlabels(labels: {[name: string]: string}) {
    if (!labels) return;
    for (let key in labels) {
      labels[key] = labels[key].replace(/,/g, '').replace(/ +(?= )/g, '');
    }
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
    const singleHeader = this._setupData.value?.singleHeader;
    let fieldNames: string[] = [];
    let fieldNamesSet: Set<string>;
    fieldNamesSet =
      singleHeader && ctxList && ctxList[0]
        ? new Set([...this._dinoFields, ...slideFieldNames, ...Object.keys(ctxList[0])])
        : new Set([...this._dinoFields, ...slideFieldNames]);
    fieldNames = Array.from(fieldNamesSet);
    const fieldLabels = this._buildLabelsRow(fieldNames);
    const data = [fieldLabels, ...ctxList];
    return XLSX.utils.json_to_sheet(data, {skipHeader: singleHeader === true});
  }

  /**
   * It builds a xlxs file and download it from browser.
   * It creates a xlxs workbook that contains a sheet with all the selected fields
   * and, if splitted is true, a sheet for each slide of the form.
   * The schema name is used as file name.
   *
   * @param ctxList is the list of ajf contexts.
   * @param splitted if true creates a sheet for each slide of the form
   */
  private _buildXlsx(ctxList: Context[], splitted = false): void {
    const exportModel: ExportModel = this._exportModel$.value!;
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

    const exportFileBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const trigger: ActionTrigger = {
      name: 'Form Data Exported',
      triggerType: 'on_form_data_export',
      triggerData: {newValue: exportFileBuffer, additional_info: {bookType: 'xlsx'}},
    };

    this.emitExportActionTrigger.emit(trigger);

    if (this._setupData.value?.downloadFile) {
      XLSX.writeFile(workbook, `${exportModel.schemaName}.xlsx`, {
        bookType: 'xlsx',
        type: 'array',
      });
    } else {
      const wbFile = this._workbookToFile(workbook, 'xlsx', exportModel);
      this._exportedFile.next(wbFile);
    }
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
  private _buildCsv(ctxList: Context[], all = false): void {
    const exportModel: ExportModel = this._exportModel$.value!;
    let exportedNames = this._exportedFieldNames$.value;
    if (all) {
      exportedNames = Object.keys(ctxList[0]);
    }
    const worksheet: XLSX.WorkSheet = this._buildWorksheet(ctxList, exportedNames);
    const workBook: XLSX.WorkBook = {Sheets: {'': worksheet}, SheetNames: ['']};

    const exportFileBuffer = XLSX.write(workBook, {
      bookType: 'csv',
      type: 'array',
    });

    const trigger: ActionTrigger = {
      name: 'Form Data Exported',
      triggerType: 'on_form_data_export',
      triggerData: {newValue: exportFileBuffer, additional_info: {bookType: 'csv'}},
    };

    this.emitExportActionTrigger.emit(trigger);

    if (this._setupData.value?.downloadFile) {
      XLSX.writeFile(workBook, `${exportModel.schemaName}.csv`, {
        bookType: 'csv',
      });
    } else {
      const wbFile = this._workbookToFile(workBook, 'csv', exportModel);
      this._exportedFile.next(wbFile);
    }
  }

  /**
   * Converts an XLSX Workbook to a File
   * @param wb The workbook
   * @param exportFormt The File format (csv or xlsx)
   * @param exportModel The exporter Export Model
   * @returns A file
   */
  private _workbookToFile(
    wb: XLSX.WorkBook,
    exportFormat: ExportFormat,
    exportModel: ExportModel,
  ): File {
    /* write workbook to Uint8Array */
    const u8 = XLSX.write(wb, {bookType: exportFormat as XLSX.BookType, type: 'buffer'});
    /* create array of parts */
    const parts = [u8]; // `File` constructor expects this
    /* create File */
    const file = new File(parts, `${exportModel.schemaName}.${exportFormat}`, {
      type: exportFormat != 'csv' ? 'application/vnd.ms-excel' : 'text/csv;charset=utf-8',
    });
    return file;
  }

  /**
   * Creates an AjfField array from Form Schema nodes
   * @param nodes The schema nodes
   * @returns
   */
  private _flattenNodes(nodes: AjfNode[]): AjfNode[] {
    let flatNodes: AjfNode[] = [];

    nodes.forEach((node: AjfNode) => {
      if (isContainerNode(node)) {
        flatNodes = flatNodes.concat(this._flattenNodes((<AjfContainerNode>node).nodes));
      } else {
        flatNodes.push(node);
      }
    });

    return flatNodes;
  }

  /**
   * Count the max number of instances in the current context for all the repeating slides
   * @param fields ajfFields list for the repeating slide
   * @param ctx context for the form
   * @returns the max number of instances for all the  repeating slides
   */
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
   * It returns tha max count of the field instances for a specific repeating slide relative
   * to all the form data context list.
   * @param fields
   * @param ctxList
   * @param slideName
   * @returns
   */
  private _countNumberOfRepeatingSlidesInstance(
    fields: AjfField[],
    ctxList: Context[],
    slideName: string,
  ): number {
    let count = 0;
    ctxList.map(ctx => {
      const countInCtx = ctx[slideName]
        ? ctx[slideName]
        : this._countNumberOfInstanceInContext(fields, ctx);
      count = count < countInCtx ? countInCtx : count;
    });
    return count;
  }

  /**
   * Evaluate the form context with its translations and put the result in exportCtx
   * @param field AjfField to be evaluate
   * @param exportCtx the output evaluated context
   * @param ctx the input Ajf Form Data context
   */
  private _evaluateContext(field: AjfField, exportCtx: Context, ctx: Context): void {
    if (ctx[field.name] != null || field.fieldType === AjfFieldType.Table) {
      switch (field.fieldType) {
        case AjfFieldType.Number:
          exportCtx[field.name] = ctx[field.name];
          break;
        case AjfFieldType.MultipleChoice:
        case AjfFieldType.SingleChoice:
          const choicePrefix = (field as any).choicesOriginRef + '_';
          exportCtx[field.name] = this._translateCtxValue(ctx[field.name], choicePrefix);
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
              this._ctxValuesDict[tableKey] = labelCell;
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
    name = name.indexOf('data_') === 0 ? name.replace('data_', '') : name;
    const splittedName = name.split('__');
    if (splittedName.length === 2) {
      return splittedName[0];
    }
    return name;
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

  /**
   * Evaluate a form value with its translation or with its label
   * for choices, if required
   * @param value
   * @param prefix the prefix to add to the value to access to the translations dict
   * @returns the evaluated value
   */
  private _translateCtxValue(
    value: string | number | string[] | number[],
    prefix?: string | null,
  ): string | string[] {
    if (value == null || this._isObject(value)) {
      return '';
    }
    if (prefix == null || prefix == undefined) {
      prefix = '';
    }

    if (this._translate$.value) {
      if (Array.isArray(value)) {
        return (value as string[])
          .map((n: string | number) => {
            n = `${n}`;
            if (n === '') {
              return n;
            }
            const label = this._ctxValuesDict[prefix + n];
            let transLabel = this._translate(n) as string;
            if (label != null && label !== '') {
              transLabel = this._translate(label) as string;
            }
            return this._dataAnalysis$.value
              ? transLabel.replace(',', this._multipleChoisePlaceholder)
              : transLabel;
          })
          .toString();
      } else {
        value = `${value}`;
        if (
          this._ctxValuesDict[prefix + value] != null &&
          this._ctxValuesDict[prefix + value] !== ''
        ) {
          return this._translate(this._ctxValuesDict[prefix + value]);
        } else {
          return value !== '' ? this._translate(value) : value;
        }
      }
    } else {
      if (Array.isArray(value)) {
        const values = (value as string[]).map((v: string | number) => `${v}`);
        if (values.length === 1 && this._dataAnalysis$.value) {
          return values[0].toString();
        }
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
