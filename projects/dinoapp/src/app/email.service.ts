import {Injectable} from '@angular/core';
import {AuthService} from '@dino/core/auth';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {environment} from 'src/environments/environment';
@Injectable({providedIn: 'root'})
export class EmailService {
  /**
   * The grapqhl endpoint url.
   */
  grapqhlHostUrl: string = environment.dataConfig.syncGraphQLUrl;

  constructor(private _authService: AuthService, private _ehms: ErrorHandlerMessageService) {}

  /**
   * Sends an email with the specified parameters, using gnumail.
   * Argumnts graphqlUrl and authToken are for authentication purposes.
   * GraphQL is queried with the authentication header 'Bearer '+authToken.
   * In a dinoapp, their values should be:
   * graphqlUrl: environment.dataConfig.syncGraphQLUrl
   * authToken: AuthService.authToken.getValue() || ''
   * @param senderAddr
   * @param senderName
   * @param recipientAddr
   * @param recipientName
   * @param subject
   * @param textContent
   * @param htmlContent
   * @param enableEmail
   * @returns
   */
  sendEmail(
    senderAddr: string,
    senderName: string,
    recipientAddr: string,
    recipientName: string,
    subject: string,
    textContent: string = '',
    htmlContent: string = '',
    enableEmail: boolean = false,
  ) {
    if (enableEmail) {
      const authToken: string | null = this._authService.getAuthToken();
      const data = new FormData();
      data.append('senderAddr', senderAddr);
      data.append('senderName', senderName);
      data.append('recipientAddr', recipientAddr);
      if (recipientName && recipientName !== recipientAddr && recipientName.indexOf('@') === -1) {
        data.append('recipientName', recipientName);
      }
      data.append('subject', subject);
      data.append('textContent', textContent);
      data.append('htmlContent', htmlContent);
      data.append('graphqlUrl', this.grapqhlHostUrl);
      if (authToken) {
        data.append('authToken', authToken);
      }
      const sendUrl = environment.dataConfig.emailSendUrl || 'https://gnumail-u2056.vm.elestio.app/send';
      return fetch(sendUrl, {
        method: 'POST',
        body: data,
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(errorText => {
              throw new Error(
                `Gnumail error (${response.status} ${response.statusText}): ${errorText}`,
              );
            });
          }
          return response.text();
        })
        .then(responseData => {
          return responseData;
        })
        .catch(error => {
          console.error('Error making request to gnumail:', error);
          if (this._ehms) {
            this._ehms.captureErrorMessage(
              `Error making request to Gnumail: ${error.message}`,
              'error',
            );
          }
          return null;
        });
    }
    return null;
  }
}
