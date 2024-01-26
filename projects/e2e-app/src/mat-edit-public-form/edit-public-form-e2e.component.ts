import {Component} from '@angular/core';
import {ActionTrigger} from '@dino/core/data';

@Component({
  selector: 'app-edit-public-form',
  templateUrl: './edit-public-form-e2e.component.html',
})
export class MatEditPublicFormE2E {
  editPublicFormAction(formData: any) {
    console.log('editPublicFormAction', formData);
  }
  processActionTrigger<T>(trigger: ActionTrigger<T>) {
    if (trigger.triggerData && trigger.triggerData.doc) {
      this.editPublicFormAction(trigger.triggerData.doc);
    }
  }
}
