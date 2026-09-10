import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AjfDndDirective {
    private _file;
    readonly file: Observable<FileList>;
    private _over;
    get over(): boolean;
    onDragOver(evt: DragEvent): void;
    onDragLeave(evt: DragEvent): void;
    onDrop(evt: DragEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfDndDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfDndDirective, "[ajfDnd]", never, {}, { "file": "file"; }, never, never, false, never>;
}
//# sourceMappingURL=dnd-directive.d.ts.map