export declare class Login extends LoginComponent {
    constructor(authService: AuthService, router: Router, fb: FormBuilder, cdr: ChangeDetectorRef);
    static ɵcmp: i0.ɵɵComponentDeclaration<Login, "dewco-login", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<Login, never>;
}

export declare class LoginModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<LoginModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LoginModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LoginModule, [typeof i1.Login], [typeof i2.CommonModule, typeof i3.MatButtonModule, typeof i4.MatIconModule, typeof i5.MatProgressBarModule, typeof i6.ReactiveFormsModule], [typeof i1.Login]>;
}
