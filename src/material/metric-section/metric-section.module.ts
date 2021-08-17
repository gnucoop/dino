import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule} from '@dewco/core/forms';
import {BreakpointObserverModule} from '@dewco/material/breakpoint-observer';
import {FloatingButtonModule} from '@dewco/material/floating-button';
import {ListModule} from '@dewco/material/list';
import {MetricEditorModule} from '@dewco/material/metric-editor';
import {SearchFiltersBarModule} from '@dewco/material/search-filters-bar';


import {MetricSection} from './metric-section';

@NgModule({
  declarations: [MetricSection],
  imports: [
    BreakpointObserverModule,
    CommonModule,
    ListModule,
    FloatingButtonModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    MetricEditorModule,
    SearchFiltersBarModule,
  ],
  exports: [MetricSection],
})
export class MetricSectionModule {
}
