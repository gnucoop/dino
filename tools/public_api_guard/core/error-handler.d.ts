export declare class ErrorHandlerModule {
    static ɵinj: i0.ɵɵInjectorDef<ErrorHandlerModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<ErrorHandlerModule, never, never, never>;
}

export declare class ErrorHandlerService implements ErrorHandler {
    constructor(_injector: Injector);
    handleError<T>(error: Error | HttpErrorResponse): Observable<T>;
    static ɵfac: i0.ɵɵFactoryDef<ErrorHandlerService, never>;
    static ɵprov: i0.ɵɵInjectableDef<ErrorHandlerService>;
}
