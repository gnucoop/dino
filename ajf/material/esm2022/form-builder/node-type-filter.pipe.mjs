import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class NodeTypeFilterPipe {
    transform(nodeTypes, searchTerm) {
        if (!nodeTypes)
            return [];
        if (!searchTerm)
            return nodeTypes;
        const term = searchTerm.toLowerCase();
        return nodeTypes.filter(nt => nt.label.toLowerCase().includes(term));
    }
    static { this.ɵfac = function NodeTypeFilterPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NodeTypeFilterPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "nodeTypeFilter", type: NodeTypeFilterPipe, pure: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NodeTypeFilterPipe, [{
        type: Pipe,
        args: [{
                name: 'nodeTypeFilter',
                pure: false,
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10eXBlLWZpbHRlci5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9ub2RlLXR5cGUtZmlsdGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7O0FBT2xELE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsU0FBUyxDQUFDLFNBQXdDLEVBQUUsVUFBa0I7UUFDcEUsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sU0FBUyxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7bUhBTlUsa0JBQWtCO3dGQUFsQixrQkFBa0I7O2lGQUFsQixrQkFBa0I7Y0FKOUIsSUFBSTtlQUFDO2dCQUNKLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLElBQUksRUFBRSxLQUFLO2FBQ1oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnl9IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdub2RlVHlwZUZpbHRlcicsXG4gIHB1cmU6IGZhbHNlLFxufSlcbmV4cG9ydCBjbGFzcyBOb2RlVHlwZUZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKG5vZGVUeXBlczogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10sIHNlYXJjaFRlcm06IHN0cmluZyk6IGFueVtdIHtcbiAgICBpZiAoIW5vZGVUeXBlcykgcmV0dXJuIFtdO1xuICAgIGlmICghc2VhcmNoVGVybSkgcmV0dXJuIG5vZGVUeXBlcztcbiAgICBjb25zdCB0ZXJtID0gc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBub2RlVHlwZXMuZmlsdGVyKG50ID0+IG50LmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGVybSkpO1xuICB9XG59XG4iXX0=