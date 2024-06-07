import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  isDevMode,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormStatus,
  FormStatusManager,
} from '@dino/core/forms';
import {AdminUserInteractionsService} from '@dino/material/user-interactions';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of as obsOf,
  Subscription,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActionTriggerData, PermissionContextService} from '@dino/core/data';
import {isRxDocument, RxDocument} from 'rxdb';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {UserDataManager, UserGroupManager} from '@dino/core/users';

/**
 * Represents data to be passed to the Form Status changer
 */
export interface FormStatusChangerData {
  /**
   * The Form Data whose status will be edited
   */
  formData: FormData & {form_schema: Observable<FormSchema>};
}

/**
 * Dialog component that allows the editing of a Form Status of a Form Data.
 */
@Component({
  selector: 'dino-form-status-changer',
  templateUrl: 'form-status-changer.html',
  styleUrls: ['form-status-changer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormStatusChanger implements OnDestroy, OnInit {
  /**
   * The list of all the Form Statuses available to the active User
   */
  readonly availableStatuses: Observable<FormStatus[] | null>;
  /**
   * The edited Form Data current status id
   */
  readonly currentStatusId: string | null;
  /**
   * Emits the Save status event
   */
  private _saveStatusEvt: EventEmitter<string> = new EventEmitter<string>();
  /**
   * Subscribes to the save status event.
   */
  private _saveSub: Subscription = Subscription.EMPTY;

  constructor(
    public dialogRef: MatDialogRef<FormStatusChangerData>,
    @Inject(MAT_DIALOG_DATA) public data: FormStatusChangerData,
    private _fstm: FormStatusManager,
    private _fdm: FormDataManager,
    private _aui: AdminUserInteractionsService,
    private _snackbar: MatSnackBar,
    private _pcs: PermissionContextService,
    private _ehms: ErrorHandlerMessageService,
    private _udm: UserDataManager,
    private _ugm: UserGroupManager,
  ) {
    this.currentStatusId = data.formData.form_status_ref_id;
    this.availableStatuses = data.formData.form_schema.pipe(
      switchMap(fschema => {
        if (fschema == null) {
          return obsOf([]);
        }
        return combineLatest([
          this._fstm.formStatusesOfSchema(fschema),
          this._pcs.permissionContext,
        ]).pipe(
          map(([statuses, context]) => {
            if (statuses == null || context == null) {
              return [];
            }
            const stts = [...(context.user_form_statuses ?? [])];
            return statuses.filter(status => stts.includes(status.id) || stts.includes('all'));
          }),
        );
      }),
    );
  }

  ngOnInit(): void {
    this._saveSub = this._saveStatusEvt
      .pipe(
        switchMap(newStatusId =>
          this._aui
            .askConfirm({actionType: 'status edit', askConfirm: true})
            .pipe(map(confirmation => ({confirmation, newStatusId}))),
        ),
        switchMap(({confirmation, newStatusId}) => {
          if (!confirmation || !newStatusId) {
            return obsOf('close');
          }
          const formDataClone: FormData = this._fdm.depopulateFormData(this.data.formData);
          formDataClone['form_status_ref_id'] = newStatusId;
          return this._fdm.update(formDataClone as FormData);
        }),
        catchError(err => {
          if (isDevMode()) {
            console.log(err);
          }
          this._ehms.captureErrorMessage(
            `Could not update status of form data: ${JSON.stringify(err)}`,
            'error',
          );
          return obsOf(null);
        }),
        withLatestFrom(this._udm.getActiveUserData(), this._ugm.getActiveUserGroups()),
      )
      .subscribe({
        next: res => {
          if (res[0] === 'close') {
            return;
          }
          let statusChange: ActionTriggerData<FormData> | null = null;
          if (res[0] == null) {
            this._snackbar.open(
              `Oops! Something went wrong while changing the Status.`,
              'SAVE ERROR',
              {
                duration: 10000,
              },
            );
          } else {
            this._snackbar.open(`Status changed successfully`, 'STATUS CHANGED', {duration: 10000});
            if (isRxDocument(res[0]) && typeof res[0] != 'string') {
              const resObj = res[0] as {[key: string]: any} & {form_status_ref_id: string};
              const activeUser = res[1] || null;
              const activeUserGroups = res[2] || [];
              statusChange = {
                previousValue: this.currentStatusId,
                newValue: resObj.form_status_ref_id,
                doc: res[0] as RxDocument<FormData>,
                additional_info: {
                  activeUser,
                  activeUserGroups,
                },
              };
            }
          }
          this.closeDialog(statusChange);
        },
        error: err => {
          this._snackbar.open(
            `Oops! Something went wrong while performing the requested action.`,
            `ERROR: ${err.message.toUpperCase()}`,
            {
              duration: 5000,
            },
          );
          this.closeDialog(null);
        },
      });
  }

  /**
   * Closes the dialog
   */
  closeDialog(statusChange?: ActionTriggerData<FormData> | null) {
    this.dialogRef.close(statusChange ?? null);
  }

  /**
   * Emits the save event
   */
  saveStatus(newStatusId: string) {
    this._saveStatusEvt.emit(newStatusId);
  }

  ngOnDestroy(): void {
    this._saveSub.unsubscribe();
  }
}
