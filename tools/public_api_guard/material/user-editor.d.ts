export interface UserDialogData {
  userAction?: 'view' | 'edit' | 'create';
  userItem?: UserModel;
}

export declare class UserEditor implements OnDestroy, OnInit {
  data: UserDialogData;
  dialogRef: MatDialogRef<UserEditor>;
  readonly snackbar: MatSnackBar;
  userForm: FormGroup;
  userFormFields: UserFormField[];
  readonly userGroups: Observable<UserGroup[]>;
  constructor(
    _userModelManager: UserModelManager,
    _userGroupManager: UserGroupManager,
    snackbar: MatSnackBar,
    data: UserDialogData,
    dialogRef: MatDialogRef<UserEditor>,
  );
  closeEditor(): void;
  isFormValid(): boolean;
  ngOnDestroy(): void;
  ngOnInit(): void;
  saveUser(): void;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    UserEditor,
    'dewco-user-editor',
    never,
    {},
    {},
    never,
    never
  >;
  static ɵfac: i0.ɵɵFactoryDeclaration<UserEditor, never>;
}

export declare class UserEditorModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<UserEditorModule, never>;
  static ɵinj: i0.ɵɵInjectorDeclaration<UserEditorModule>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    UserEditorModule,
    [typeof i1.UserEditor],
    [
      typeof i2.AuthModule,
      typeof i3.BreakpointObserverModule,
      typeof i4.CommonModule,
      typeof i5.MatAutocompleteModule,
      typeof i6.MatButtonModule,
      typeof i7.MatDatepickerModule,
      typeof i8.MatDialogModule,
      typeof i9.MatFormFieldModule,
      typeof i10.MatIconModule,
      typeof i11.MatInputModule,
      typeof i12.MatListModule,
      typeof i13.MatNativeDateModule,
      typeof i14.MatSelectModule,
      typeof i15.MatSnackBarModule,
      typeof i16.ReactiveFormsModule,
      typeof i17.RouterModule,
    ],
    [typeof i1.UserEditor]
  >;
}

export interface UserFormField {
  fieldName: string;
  hint?: string;
  placeholder: string;
  value?: any;
}
