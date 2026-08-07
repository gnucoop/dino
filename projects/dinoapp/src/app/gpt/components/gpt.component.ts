import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {
  acceptTermsContent,
  completionBucketUrl,
  pandinoGptNamespaces,
  pandinoUrl,
  syncGraphQLUrl,
} from '../conf';
@Component({
  selector: 'dinoapp-gpt',
  templateUrl: './gpt.component.html',
  styleUrls: ['./gpt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GptComponent {
  baseDataChatAPIurl = pandinoUrl;
  validateEndpoint = 'validateapikey';
  completionChatEndpoint = 'agentchat';
  namespaces = pandinoGptNamespaces;
  syncGraphQLUrl = syncGraphQLUrl;
  bucketUrl = completionBucketUrl;
  endpointUrls = {
    validateEndpoint: this.validateEndpoint,
    completionChatEndpoint: this.completionChatEndpoint,
  };
  acceptTermsContent = acceptTermsContent;
  constructor() {}

  // saveFeedback(qa: QA, happy: boolean) {
  //   if (qa.userIsHappy != null) {
  //     // Feedback already registered
  //     return;
  //   }
  //   qa.userIsHappy = happy;
  //   this.cdr.markForCheck();

  //   const par = qa.paragraphs || [];
  //   const sim = qa.similarities || [];
  //   this.dataManager.create({
  //     created_at: new Date().toJSON().slice(0, 10),
  //     user_data_ref_id: this.userId,
  //     form_schema_ref_id: this.feedbackSchemaId,
  //     form_status_ref_id: null,
  //     area_ref_id: null,
  //     case_ref_id: null,
  //     project_ref_id: null,
  //     location_ref_id: null,
  //     organization_ref_id: this.orgId,
  //     data: {
  //       dino_gpt_namespace: qa.namespace,
  //       question: qa.question,
  //       answer: qa.answer,
  //       user_is_happy: happy,
  //       paragraph0: par[0],
  //       paragraph1: par[1],
  //       paragraph2: par[2],
  //       similarity0: sim[0],
  //       similarity1: sim[1],
  //       similarity2: sim[2],
  //     },
  //   })
  //   .pipe(take(1))
  //   .subscribe(() => console.log('Feedback registered for the following QA:', qa));
  // }
}
