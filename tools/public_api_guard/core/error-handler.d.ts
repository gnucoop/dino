export declare class ErrorHandlerService implements ErrorHandler {
    constructor(_injector: Injector);
    handleError<T>(error: any): Observable<T>;
    static ɵfac: i0.ɵɵFactoryDef<ErrorHandlerService, never>;
    static ɵprov: i0.ɵɵInjectableDef<ErrorHandlerService>;
}
