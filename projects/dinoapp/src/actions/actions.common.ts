import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthService} from '@dino/core/auth';
import {InsertModel, PermissionContextService} from '@dino/core/data';
import {NotificationManager} from '@dino/core/notifications';
import {UserData, UserGroup} from '@dino/core/users';
import {RxDocument} from 'rxdb';
import {forkJoin, Observable, of as obsOf} from 'rxjs';
import {EmailService} from 'src/app/email.service';
import {EmailContext, EmailTemplateBuilder} from './email-templates.interface';
import {emailTemplateBuilder as notificationEmailTemplate} from './email-templates.notification';
import {environment} from 'src/environments/environment';
import {Notification, NotificationType} from '@dino/core/notifications/notification';
import {format} from 'date-fns';
import {HttpClient} from '@angular/common/http';
import {FormInfo} from '@dino/core/forms';
import {isDevMode} from '@angular/core';

export interface UserNotificationDetails {
  /**
   * Email body
   */
  body: string;

  /**
   * Email subject
   */
  subject: string;

  /**
   * user's for the notification
   */
  recipients: UserData[];

  /**
   * notification text
   */
  notificationText: string;

  /**
   * notification level
   */
  level: NotificationType;

  /**
   * redirect url
   */
  redirectUrl?: string;
}

export interface TriggerArgs {
  syncing: Observable<boolean>;
  router: Router;
  snackbar: MatSnackBar;
  emailservice: EmailService;
  authService: AuthService;
  httpClient: HttpClient;
  pcs: PermissionContextService;
}

/**
 * Return true if environment.production is not set to false.
 * Default to true if the variable is not set
 * @param environment
 * @returns
 */
export function getEnvironmentProductionValue(environment: any): boolean {
  let isDevEnv = false;
  if (environment) {
    isDevEnv =
      environment.production === false ||
      ((environment as any).environment && (environment as any).environment.production === false);
  }

  if (isDevMode()) {
    console.log('Environment production is DEV?' + isDevEnv);
  }
  return !isDevEnv;
}

/**
 * Get value in form by field name
 * @param field
 * @param doc formdata
 * @returns the value if exist
 */
export function getFormDataValue(field: string, doc: {[key: string]: any} | null): any {
  return doc && doc.data && field in doc.data ? doc.data[field] : null;
}

export const notificationIcons: {[key in NotificationType]: string} = {
  info: 'info',
  warning: 'notifications',
  alert: 'warning',
};

/**
 * Format custom text for email and notifications
 * @param str initial string
 * @param val values to be replaced
 * @returns
 */
export function formatString(str: string, ...val: string[]) {
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
}

/**
 * Build email with template and send
 * @param emailservice
 * @param emailbuilder
 * @param mailBody
 * @param mailSubject
 * @param user
 * @param appUrl
 */
export function buildEmail(
  emailservice: EmailService | null,
  emailbuilder: EmailTemplateBuilder | null,
  mailBody: string,
  mailSubject: string,
  user: UserData,
  appUrl: string | null,
  senderAddr: string,
  senderName: string,
  buttonText: string | null,
): void {
  if (emailservice && emailbuilder) {
    const enableEmail =
      environment.usersConfig.enableEmail === undefined
        ? false
        : environment.usersConfig.enableEmail;

    const completeAppUrl = appUrl ? 'https://' + window.location.host + '/' + appUrl : '';
    const mailcontext: EmailContext = {
      title: mailSubject,
      preheader: '',
      body_main: mailBody,
      body_footer: '',
      footer: '',
      button_link: completeAppUrl,
    };
    if (buttonText) {
      mailcontext.button_text = buttonText;
    }
    const email = emailbuilder(mailcontext);
    emailservice.sendEmail(
      senderAddr || 'admin@gnucoop.com',
      senderName || 'DINO',
      user.email,
      user.full_name,
      mailSubject,
      '',
      email,
      enableEmail,
    );
  }
}

/**
 * Prepare notification object with all informations
 * @param formNotificationText
 * @param userRecipients
 * @param redirectUrl
 * @param paramsForEmailText
 * @param paramsForInternalNotificationText
 * @param level
 * @returns
 */
export function prepareNotification(
  formNotificationText: any,
  userRecipients: any[],
  redirectUrl: string | null,
  paramsForEmailText: any[],
  paramsForInternalNotificationText: any[],
  level: NotificationType,
): UserNotificationDetails {
  const notification: UserNotificationDetails = {
    body: formatString(formNotificationText.emailText, ...paramsForEmailText),
    notificationText: formatString(
      formNotificationText.notificationText,
      ...paramsForInternalNotificationText,
    ),
    subject: formNotificationText.subject,
    recipients: userRecipients,
    level: level,
  };
  if (redirectUrl) {
    notification.redirectUrl = redirectUrl;
  }
  return notification;
}

/**
 * Send email and create notification for each user
 * @param userNotifications users notification details
 * @param redirectUrl the link for the email button and for the notification
 * @param ntfMng notification manager: if null no internal notification will be sent
 * @param activeUser if it's not null, no notification will be sent to him
 * @param senderAddr the sender address
 * @param senderName the sender name
 * @param buttonText the text for the email button
 * @param args
 * @returns
 */
export function sendEmailAndNotifications(
  userNotifications: UserNotificationDetails[],
  redirectUrl: string,
  ntfMng: NotificationManager | null,
  activeUser: UserData | null,
  senderAddr: string,
  senderName: string,
  buttonText: string | null,
  args: TriggerArgs,
  emailbuilder?: EmailTemplateBuilder,
): Observable<(RxDocument<Notification> | null)[]> {
  if (userNotifications) {
    const notificationItms: Observable<RxDocument<Notification> | null>[] = [];

    userNotifications.forEach(notification => {
      if (notification.recipients.length) {
        notification.recipients.forEach(user => {
          if (!activeUser || user.email !== activeUser.email) {
            // Send email
            buildEmail(
              args.emailservice,
              emailbuilder || notificationEmailTemplate,
              notification.body,
              notification.subject,
              user,
              notification.redirectUrl || redirectUrl,
              senderAddr,
              senderName,
              buttonText,
            );
          }
        });

        // Create notifications
        if (ntfMng) {
          const recipients = notification.recipients
            .filter(u => !activeUser || u.email !== activeUser.email)
            .map(u => u.id)
            .filter(uid => uid != null);

          if (recipients.length) {
            const item: InsertModel<Notification> = {
              recipients,
              readers: [],
              text: notification.notificationText,
              type: notification.level,
              icon: notificationIcons[notification.level],
              redirect_url: notification.redirectUrl || redirectUrl,
              created_at: format(new Date(), 'yyyy-MM-dd'),
            };
            notificationItms.push(ntfMng.create(item));
          }
        }
      }
    });
    if (notificationItms.length) {
      return forkJoin(notificationItms);
    }
  }
  return obsOf([]);
}

/**
 * Return all user group names
 * @param additionalInfo additional info for the FormData from the trigger
 * @returns a list of user's groups
 */
export function getAllUserGroups(additionalInfo: FormInfo | null): string[] {
  let allUserGroups: string[] = [];
  if (additionalInfo && additionalInfo.activeUserGroups) {
    allUserGroups = additionalInfo.activeUserGroups.map((g: UserGroup) => g.groupName);
  }
  return allUserGroups;
}

/**
 * Return active logged user
 * @param additionalInfo additional info for the FormData from the trigger
 * @returns the active logged user
 */
export function getActiveUser(additionalInfo: FormInfo | null): UserData | null {
  if (additionalInfo) {
    return additionalInfo.activeUser;
  }
  return null;
}
