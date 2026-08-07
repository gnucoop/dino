import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ajfCommonFunctions} from '../../../ajf-functions/ajf-functions.common';
import {acceptTermsContent, pandinoUrl} from '../conf';

@Component({
  selector: 'dinoapp-datachat',
  templateUrl: './datachat.component.html',
  styleUrls: ['./datachat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DataChatComponent {
  ajfCustomFunctions = ajfCommonFunctions;
  baseDataChatAPIurl = pandinoUrl;
  validateEndpoint = 'validateapikey';
  startEndpoint = 'startdatachat';
  endEndpoint = 'enddatachat';
  dataChatEndpoint = 'datachat';
  endpointUrls = {
    validateEndpoint: this.validateEndpoint,
    startEndpoint: this.startEndpoint,
    endEndpoint: this.endEndpoint,
    dataChatEndpoint: this.dataChatEndpoint,
  };
  acceptTermsContent = acceptTermsContent;
  constructor() {}
}
