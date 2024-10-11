import {Component} from '@angular/core';
import {ajfCustomFunctions} from '../ajf-custom-functions';
@Component({
  selector: 'app-datachat',
  templateUrl: './datachat-e2e.component.html',
})
export class DataChatE2E {
  ajfCustomFunctions = ajfCustomFunctions;
  baseDataChatAPIurl = 'http://127.0.0.1:5000';
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
  constructor() {}
}
