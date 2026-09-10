/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { AjfBaseWidgetComponent, AjfColumnWidgetInstance, AjfDialogWidgetInstance, AjfLayoutWidgetInstance, AjfPaginatedListWidgetInstance, AjfPaginatedTableWidgetInstance, AjfReportWidget as CoreComponent, AjfWidgetComponentsMap, AjfWidgetInstance, AjfWidgetService as CoreService } from '@ajf/core/reports';
import { AjfContext } from '@ajf/core/common';
import { AjfTableCell } from '@ajf/core/table';
import { AfterContentChecked, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AjfWidgetService extends CoreService {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfWidgetService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfWidgetService>;
}
export declare class AjfReportWidget extends CoreComponent {
    filterWidgetChange: EventEmitter<{
        context: AjfContext;
        widget: AjfWidgetInstance;
    }>;
    readonly widgetsMap: AjfWidgetComponentsMap;
    constructor(renderer: Renderer2, widgetService: AjfWidgetService);
    filterWidgetChanged(changes: {
        context: AjfContext;
        widget: AjfWidgetInstance;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportWidget, "ajf-widget", never, {}, { "filterWidgetChange": "filterWidgetChange"; }, never, never, false, never>;
}
export declare class AjfColumnWidgetComponent extends AjfBaseWidgetComponent<AjfColumnWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfColumnWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfColumnWidgetComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
export declare class AjfLayoutWidgetComponent extends AjfBaseWidgetComponent<AjfLayoutWidgetInstance> implements AfterContentChecked {
    private _allcolumnsRendered$;
    readonly allcolumnsRendered$: Observable<boolean>;
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    ngAfterContentChecked(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfLayoutWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfLayoutWidgetComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
export declare class AjfDialogWidgetComponent extends AjfBaseWidgetComponent<AjfDialogWidgetInstance> {
    private _dialog;
    dialogContent: TemplateRef<HTMLElement>;
    constructor(cdr: ChangeDetectorRef, el: ElementRef, _dialog: MatDialog);
    openDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfDialogWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfDialogWidgetComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
export declare class AjfPaginatedListWidgetComponent extends AjfBaseWidgetComponent<AjfPaginatedListWidgetInstance> implements OnChanges, OnInit {
    get currentPage(): number;
    private _currentPage;
    get pages(): number;
    private _pages;
    get currentContent(): AjfWidgetInstance[];
    private _currentContent;
    get canGoForward(): boolean;
    private _canGoForward;
    get canGoBackward(): boolean;
    private _canGoBackward;
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    goToPage(direction: 'next' | 'previous'): void;
    private _updateCurrentContent;
    private _fillCurrentContent;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfPaginatedListWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfPaginatedListWidgetComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
export declare class AjfPaginatedTableWidgetComponent extends AjfBaseWidgetComponent<AjfPaginatedTableWidgetInstance> implements OnChanges, OnInit {
    readonly paginatorConfig: {
        pageSize: number;
        pageSizeOptions: number[];
    };
    get currentPage(): number;
    private _currentPage;
    get pages(): number;
    private _pages;
    get orderBy(): number;
    private _orderBy;
    get currentContent(): AjfTableCell[][];
    private _currentContent;
    /**
     * full data table
     */
    private _allDataContent;
    /**
     * full sorted data table
     */
    private _sortedAllDataContent;
    get headerContent(): AjfTableCell[];
    private _headerContent;
    get canGoForward(): boolean;
    private _canGoForward;
    get canGoBackward(): boolean;
    private _canGoBackward;
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    /**
     * Set initial data for the table on instance changes
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    /**
     * Got to next or previous page
     * @param direction
     * @returns
     */
    goToPage(direction: 'next' | 'previous'): void;
    onPageSizeChange(_pageSize: number): void;
    /**
     * Sort all data for the table, not only current page data
     * @param sort
     * @returns
     */
    sortPaginatedData(sort: Sort): void;
    exportableContent(): AjfTableCell[][];
    private _compare;
    /**
     * Set current header and data for the table, starting from page 1
     */
    private _updateCurrentContent;
    /**
     * Update current data for the table, using page and sorted data
     */
    private _fillCurrentContent;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfPaginatedTableWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfPaginatedTableWidgetComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=widget.d.ts.map