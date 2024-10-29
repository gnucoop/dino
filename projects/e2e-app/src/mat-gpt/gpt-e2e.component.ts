import {Component} from '@angular/core';
import {syncGraphQLUrl} from '../mocks';
@Component({
  selector: 'app-gpt',
  templateUrl: './gpt-e2e.component.html',
})
export class GptE2E {
  baseDataChatAPIurl = 'https://pandino.gnucoop.io';
  validateEndpoint = 'validateapikey';
  completionChatEndpoint = 'completion.json';
  namespaces = ['Gnucoop', 'Dino', 'Xlsform', 'PRAG', 'CC'];
  syncGraphQLUrl = syncGraphQLUrl;
  bucketUrl = 'https://dinorag.s3.eu-south-1.amazonaws.com';
  endpointUrls = {
    validateEndpoint: this.validateEndpoint,
    completionChatEndpoint: this.completionChatEndpoint,
  };
  constructor() {}
}
