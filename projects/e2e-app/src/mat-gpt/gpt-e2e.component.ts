import {Component} from '@angular/core';
import {syncGraphQLUrl} from '../mocks';
@Component({
  selector: 'app-gpt',
  templateUrl: './gpt-e2e.component.html',
})
export class GptE2E {
  baseDataChatAPIurl = 'http://127.0.0.1:5000';
  validateEndpoint = 'validateapikey';
  completionChatEndpoint = 'completion.json';
  namespaces = ['Gnucoop', 'Dino', 'Xlsform', 'PRAG', 'CC'];
  syncGraphQLUrl = syncGraphQLUrl;
  endpointUrls = {
    validateEndpoint: this.validateEndpoint,
    completionChatEndpoint: this.completionChatEndpoint,
  };
  constructor() {}
}
