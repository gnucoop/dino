import {Injectable} from '@angular/core';
import {
  Actions,
  ActionTrigger,
  DataModelManager,
  DataService,
  PermissionContextService,
} from '@dino/core/data';
import {AdminUserInteractionsService} from '@dino/material/user-interactions';
import {UserData, UserDataManager} from '@dino/core/users';
import {actions as customActions} from 'src/actions/actions.custom';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {EmailService} from './email.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '@dino/core/auth';
@Injectable({providedIn: 'root'})
export class ActionsService {
  managers: {[key: string]: DataModelManager<any> | null} = {};
  actions: Actions | undefined = customActions;

  constructor(
    private _pcs: PermissionContextService,
    private _aui: AdminUserInteractionsService,
    private _snackbar: MatSnackBar,
    private _router: Router,
    private _ds: DataService,
    private _email: EmailService,
    private _httpClient: HttpClient,
    private _authService: AuthService,
  ) {}

  initManagers(managers: {[key: string]: DataModelManager<any> | null}): Observable<boolean> {
    this.managers = managers;
    if (this.managers['user_data'] != null) {
      (this.managers['user_data'] as UserDataManager).emitActionTrigger.subscribe(trigger => {
        this.processTrigger<UserData>(trigger);
      });
    }
    return of(true);
  }

  processTrigger<T = {}>(trigger: ActionTrigger<T>): void {
    if (this.actions && trigger.triggerData) {
      const action = this.actions[trigger.triggerType];
      action
        ? action<T>(trigger, this.managers, {
            pcs: this._pcs,
            router: this._router,
            aui: this._aui,
            snackbar: this._snackbar,
            syncing: this._ds.isSyncing,
            emailservice: this._email,
            httpClient: this._httpClient,
            authService: this._authService,
          })
        : null;
    }
  }
}
