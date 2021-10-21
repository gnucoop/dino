export declare class Login extends LoginComponent implements OnDestroy {
  get loginFormVisible(): Observable<boolean>;
  set loginFormVisible(visibility: Observable<boolean>);
  get logoImagePath(): string;
  set logoImagePath(url: string);
  constructor(
    authService: AuthService,
    router: Router,
    fb: FormBuilder,
    cdr: ChangeDetectorRef,
    _snackBar: MatSnackBar,
    _route: ActivatedRoute,
  );
  ngOnDestroy(): void;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    Login,
    'dewco-login',
    never,
    {'logoImagePath': 'logoImagePath'; 'loginFormVisible': 'loginFormVisible'},
    {},
    never,
    ['[dropdownSelect]', '[additionalContent]']
  >;
  static ɵfac: i0.ɵɵFactoryDeclaration<Login, never>;
}

export declare class LoginModule {
  static ɵfac: i0.ɵɵFactoryDeclaration<LoginModule, never>;
  static ɵinj: i0.ɵɵInjectorDeclaration<LoginModule>;
  static ɵmod: i0.ɵɵNgModuleDeclaration<
    LoginModule,
    [typeof i1.Login],
    [
      typeof i2.AjfTranslocoModule,
      typeof i3.CommonModule,
      typeof i4.MatButtonModule,
      typeof i5.MatIconModule,
      typeof i6.MatProgressBarModule,
      typeof i7.MatSnackBarModule,
      typeof i8.ReactiveFormsModule,
    ],
    [typeof i1.Login]
  >;
}
