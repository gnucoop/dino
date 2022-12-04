import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {StepperComponent} from './pipeline-stepper';

@NgModule({
  imports: [MatStepperModule, MatIconModule, CommonModule],
  declarations: [StepperComponent],
  exports: [StepperComponent],
  providers: [{provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}}],
})
export class PipelineStepperModule {}
