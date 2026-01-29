import {Component, Inject} from '@angular/core';
import {syncGraphQLUrl} from '../mocks';
import {PANDINO_SERVICE_CONFIG, PandinoConfig} from '@dino/core/data';
@Component({
  selector: 'app-gpt',
  templateUrl: './gpt-e2e.component.html',
})
export class GptE2E {
  baseDataChatAPIurl = 'http://127.0.0.1:5000';
  validateEndpoint = 'validateapikey';
  completionChatEndpoint = 'agentchat';
  namespaces = this._pandinoConfig.pandinoGptNamespaces ?? [];
  syncGraphQLUrl = syncGraphQLUrl;
  bucketUrl = 'https://dinorag.s3.eu-south-1.amazonaws.com';
  endpointUrls = {
    validateEndpoint: this.validateEndpoint,
    completionChatEndpoint: this.completionChatEndpoint,
  };
  acceptTermsContent = `
  <h2>Condizioni di utilizzo del servizio DinoGPT</h2>
  <p>
    DinoGPT è un assistente virtuale basato sulla tecnologia di ChatGPT, cioè un programma informatico
    creato per fornire informazioni e assistenza all'utente in base alle conoscenze reperite all'interno
    di un database specifico, definito dal programmatore del software.
  </p>
  <p>
    Le risposte e le informazioni fornite da DinoGPT sono, quindi, generate in base a modelli statistici
    e al testo di input fornito dal programmatore.
  </p>
  <p>
    È importante notare che le informazioni e risposte fornite da DinoGPT all'utente potrebbero
    non essere sempre accurate o aggiornate, poiché la conoscenza di DinoGPT è limitata al contenuto
    del database a cui ha accesso.
  </p>
  <p>
    DinoGPT non ha accesso a Internet o a fonti esterne diverse dal database fornitogli dal programmatore e,
    quindi, le risposte fornite potrebbero non essere aggiornate alla data di consultazione da parte
    dell'utente, che è tenuto a verificarle autonomamente, con esonero da qualsivoglia responsabilità
    da parte del programmatore.
  </p>
  <p>
    Si precisa, inoltre, che le informazioni fornite da DinoGPT non devono mai essere considerate
    alla stregua di una consulenza legale o, in genere, professionale. È, quindi, sempre fondamentale che,
    una volta reperita l'informazione richiesta, l'utente si consulti con un esperto o un professionista
    qualificato per ricevere consulenza specifica in merito alle proprie esigenze.
  </p>
  <p>
    L'utente è l'unico responsabile del corretto utilizzo delle informazioni reperite tramite DinoGPT,
    che deve sempre essere utilizzato in modo consapevole e diligente in funzione delle caratteristiche
    tipiche degli assistenti virtuali.
  </p>
  <p>
    Il programmatore non assume alcuna responsabilità per eventuali perdite o danni, di qualsivoglia
    genere o specie, derivanti dall'uso delle informazioni fornite da DinoGPT.
  </p>
  <p>
    Utilizzando questo servizio, l'utente accetta e comprende i termini e le condizioni di cui sopra
    con esonero di qualsivoglia responsabilità in capo al programmatore. Se non si accettano questi termini,
    si prega di astenersi dall'utilizzare DinoGPT.
  </p>
  <p>
    Questo disclaimer è soggetto a modifiche e aggiornamenti in funzione degli sviluppi del servizio.
    È responsabilità dell'utente verificare periodicamente eventuali modifiche alle presenti condizioni
    di servizio.
  </p>`;
  constructor(@Inject(PANDINO_SERVICE_CONFIG) private _pandinoConfig: PandinoConfig) {}
}
