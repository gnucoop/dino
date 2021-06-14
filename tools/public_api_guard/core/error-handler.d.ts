export declare class ErrorHandlerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ErrorHandlerModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ErrorHandlerModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ErrorHandlerModule, never, never, never>;
}

export declare class ErrorHandlerService implements ErrorHandler {
    constructor(_injector: Injector);
    handleError<T>(error: Error | HttpErrorResponse): Observable<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ErrorHandlerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ErrorHandlerService>;
}
