import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormStatus, FormStatusManager} from '@dino/core/forms';
import {RxDocument} from 'rxdb';
import {finalize, map, Observable, Subscription, switchMap, take, timer} from 'rxjs';

/**
 * Represents data to be passed to the Form Status editor
 */
export interface FormStatusEditorData {
  /**
   * The dialog action ('Create' or 'Edit').
   */
  statusAction: 'Create' | 'Edit';
  /**
   * The Form Status item to be edited.
   */
  statusItem?: FormStatus;
}

/**
 * Dialog component that allows the creation and editing of a Form Status.
 */
@Component({
  selector: 'dino-form-status-editor',
  templateUrl: 'form-status-editor.html',
  styleUrls: ['form-status-editor.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class FormStatusEditor implements OnDestroy {
  /**
   * The form group of the Form Status item.
   */
  statusForm: UntypedFormGroup;

  /**
   * The color of the Form Status item.
   */
  statusColor: string;

  /**
   * True while the Form Status is being saved: a second click would create it twice.
   */
  saving: boolean = false;

  /**
   * Emits when a Form Status is created or edited.
   */
  private _saveEvt: EventEmitter<FormStatus> = new EventEmitter<FormStatus>();

  /**
   * Subscribes to the save event.
   */
  private _saveSub: Subscription = Subscription.EMPTY;

  constructor(
    public dialogRef: MatDialogRef<FormStatusEditor>,
    @Inject(MAT_DIALOG_DATA) public data: FormStatusEditorData,
    private _fstm: FormStatusManager,
    private _cdr: ChangeDetectorRef,
  ) {
    this.statusColor = data.statusItem?.color ?? '#ffffff';

    const group: {[key: string]: UntypedFormControl} = {};
    group['name'] = new UntypedFormControl(
      data.statusItem?.name ?? null,
      Validators.required,
      this._nameCheck(data.statusItem?.name),
    );
    group['label'] = new UntypedFormControl(data.statusItem?.label ?? null, Validators.required);
    group['status_level'] = new UntypedFormControl(
      data.statusItem?.status_level ?? null,
      Validators.required,
    );
    group['color'] = new UntypedFormControl(this.statusColor, Validators.required);
    this.statusForm = new UntypedFormGroup(group);

    this._saveSub = this._saveEvt
      .pipe(
        switchMap(item => {
          let statusDoc: Observable<RxDocument<FormStatus> | null>;
          if (this.data.statusAction === 'Edit') {
            statusDoc = this._fstm.update(item);
          } else {
            statusDoc = this._fstm.create(item);
          }
          return statusDoc;
        }),
      )
      .subscribe(status => {
        this.dialogRef.close(status);
      });
  }

  /**
   * Checks the form validation
   */
  isFormValid(): boolean {
    return this.statusForm != null && this.statusForm.valid;
  }

  /**
   * Saves the Form Status and closes the editor
   */
  saveStatus(): void {
    if (this.statusForm == null) {
      return;
    }
    const formValue = this.statusForm.value;
    if (formValue != null && this.isFormValid()) {
      let obj = {...formValue};
      obj.color = this.statusColor;
      if (this.data.statusAction === 'Edit' && this.data.statusItem) {
        obj.id = this.data.statusItem?.id;
      }
      this.saving = true;
      this._saveEvt.emit(obj);
    }
  }

  /**
   * Fails when another Form Status already has the name: the server rejects a duplicate
   * name, and the status would stay on the device only.
   * @param currentName The name of the edited status, which may keep it
   */
  private _nameCheck(currentName?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> =>
      timer(300).pipe(
        switchMap(() => this._fstm.query({selector: {name: {$eq: control.value}}})),
        take(1),
        map(docs => (docs.some(doc => doc.name !== currentName) ? {incorrect: true} : null)),
        finalize(() => {
          control.markAsTouched();
          this._cdr.markForCheck();
        }),
      );
  }

  /**
   * Closes the editor without saving
   *
   */
  closeEditor(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this._saveSub.unsubscribe();
  }
}
