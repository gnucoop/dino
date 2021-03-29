export declare class Login extends LoginComponent {
    constructor(authService: AuthService, router: Router, fb: FormBuilder, cdr: ChangeDetectorRef);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<Login, "dewco-login", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<Login, never>;
}

export declare class LoginModule {
    static ɵfac: i0.ɵɵFactoryDef<LoginModule, never>;
    static ɵinj: i0.ɵɵInjectorDef<LoginModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<LoginModule, [typeof i1.Login], [typeof i2.CommonModule, typeof i3.IonicModule, typeof i4.ReactiveFormsModule], [typeof i1.Login]>;
}
