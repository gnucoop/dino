export declare class MixedEditor implements AfterViewInit {
    readonly closeMethod?: () => void;
    saveList: MixedEditorItem[];
    readonly saveListMethod: (list: MixedEditorItem[], listName: string) => void;
    saveListName: ElementRef<HTMLInputElement>;
    search: ElementRef<HTMLInputElement>;
    readonly sourceList: BehaviorSubject<MixedEditorItem[]>;
    readonly validateListMethod?: (list: MixedEditorItem[]) => boolean;
    readonly viewOnly?: boolean;
    constructor(_cdr: ChangeDetectorRef);
    addItem(item: MixedEditorItem | undefined): void;
    findItem(itemId: string, list?: 'source' | 'save'): MixedEditorItem | undefined;
    ngAfterViewInit(): void;
    onClose(): void;
    removeItem(item: MixedEditorItem | undefined): void;
    saveMixedList(): void;
    updateFilter(evt: any): void;
    validateSaveList(): boolean;
    static ɵcmp: i0.ɵɵComponentDeclaration<MixedEditor, "dewco-mixed-editor", never, { "sourceList": "sourceList"; "saveListMethod": "saveListMethod"; "validateListMethod": "validateListMethod"; "closeMethod": "closeMethod"; "viewOnly": "viewOnly"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MixedEditor, never>;
}

export interface MixedEditorItem {
    disabled?: boolean;
    displayed: boolean;
    itemIcon: string;
    itemId: string;
    itemName: string;
    itemParentId: string | null;
    itemType: string;
    uniqueItem: boolean;
}

export declare class MixedEditorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MixedEditorModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MixedEditorModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MixedEditorModule, [typeof i1.MixedEditor], [typeof i2.AuthModule, typeof i3.DragDropModule, typeof i4.CommonModule, typeof i5.MatButtonModule, typeof i6.MatDialogModule, typeof i7.MatFormFieldModule, typeof i8.MatIconModule, typeof i9.MatInputModule, typeof i10.MatListModule, typeof i11.MatSnackBarModule, typeof i12.ReactiveFormsModule, typeof i13.RouterModule, typeof i14.UsersModule], [typeof i1.MixedEditor]>;
}
