# Come provare la sincronizzazione

Elenco di prove da fare a mano sul comportamento del sync: cosa fare, cosa deve succedere, e quando
invece è un bug da segnalare. Servono Chrome e i suoi strumenti di sviluppo, niente altro.

Il filo che tiene insieme tutto: **l'app è usata dove la connessione è instabile o assente per giorni,
e i dati raccolti offline non devono mai andare persi.** Quasi tutte le prove qui sotto verificano
proprio questo, cioè che di fronte a un problema l'app si fermi e lo dica, invece di buttare via
qualcosa.

> ⚠️ Le prove **8** e **9** cancellano il database locale: sono l'ultima cosa da fare, e non su un
> dispositivo con dati che servono.

---

## Prima di iniziare

**Aprire gli strumenti**: F12 (o Ctrl+Shift+I / Cmd+Option+I). Servono tre schede:

| Scheda | A cosa serve |
| --- | --- |
| **Network** | vedere le chiamate: `token` (rinnovo della sessione), `graphql` (dati), `signout` (logout vero) |
| **Console** | i messaggi dell'app |
| **Application** → Storage | `IndexedDB` (i dati raccolti) e `Local Storage` (i token della sessione) |

**Andare offline**: Network → menù *No throttling* → **Offline**. Ricordarsi di rimetterlo su *No
throttling* dopo.

**Bloccare solo il rinnovo della sessione**: in Network, click destro su una chiamata a `token` →
**Block request URL**. Da quel momento la lista dei blocchi si gestisce dal pannello *Network request
blocking* (⋮ → More tools). La casella in alto lo attiva e disattiva: è il modo per simulare "il
server di autenticazione non risponde" senza toccare la rete.

**Dove sono i token**: Application → Local Storage → chiavi `dino_auth_token` (vale 15 minuti) e
`dino_refresh_token` (la credenziale che permette di rinnovare). Si possono modificare con doppio
click: cambiare un carattere basta a renderli inutilizzabili, ed è il modo per simulare una sessione
scaduta.

**Dove sono i dati**: Application → IndexedDB. È lì che restano i documenti raccolti offline, anche a
app chiusa. Se un test dice "i dati devono essere ancora lì", si guarda qui.

**Nota sui messaggi in console**: i log descritti sotto compaiono solo nelle build di sviluppo. Su un
ambiente di produzione le prove valgono comunque, ma si giudicano da Network e da quello che si vede a
schermo.

**Il badge**: il puntino rosso con il `!` sull'icona di sync, in alto. È l'unico segnale che un
operatore sul campo riceve, quindi in ogni prova è importante notare se è acceso o spento.

---

## 1. Il sync normale fa qualcosa

**Cosa fare** — Online e con la sessione attiva, toccare l'icona di sync.

**Cosa deve succedere** — In Network: una chiamata a `token` **e** le query `graphql` delle varie
collection. La rotellina gira mentre lavora e si ferma alla fine. Badge spento.

**È un bug se** — non parte nessuna chiamata, oppure la rotellina continua a girare all'infinito.

---

## 2. Raccolta offline

**Cosa fare** — Network → Offline. Creare un record (un form data, per esempio) e salvarlo.

**Cosa deve succedere** — Il salvataggio riesce senza errori. In Network non parte niente. In
Application → IndexedDB il documento c'è. L'icona di sync diventa "sync disabilitato". Toccare in giro
non produce messaggi di errore.

**È un bug se** — il salvataggio fallisce, o l'app chiede di riautenticarsi, o compaiono errori.

---

## 3. Ritorno online: il recupero è automatico

**Cosa fare** — Dopo la prova 2, rimettere la rete su *No throttling* e **non toccare niente**.

**Cosa deve succedere** — Entro pochi secondi: una chiamata a `token` (l'app rinnova la sessione da
sola) e poi le `graphql`, tra cui la mutation che manda su il record creato offline. Badge spento.

**È un bug se** — bisogna toccare l'icona o ricaricare la pagina perché il record parta.

---

## 4. Sessione lunga lasciata aperta

**Cosa fare** — Lasciare l'app aperta e ferma su una pagina per una ventina di minuti, con la scheda
Network aperta.

**Cosa deve succedere** — Una chiamata a `token` circa ogni **11 minuti e 15 secondi**, prima che il
token scada: l'app rinnova in anticipo, così nessuna operazione dell'utente incappa in una sessione
scaduta. In console (build di sviluppo) `NEXT PRE-EMPTIVE TOKEN REFRESH IN …` dice quanto manca alla
prossima.

**È un bug se** — non arriva nessun rinnovo e poi, al primo click, l'app va al login o si blocca.

---

## 5. Il server di autenticazione non risponde

Questa è la prova più importante: è la situazione che sul campo si presenta come "la sincronizzazione
si è fermata".

**Cosa fare** — Online, bloccare l'URL di `token` (vedi *Prima di iniziare*) e aspettare che il token
in corso scada — al massimo 15 minuti. Chi non vuole aspettare: modificare `dino_refresh_token` in
Local Storage e toccare l'icona di sync.

**Cosa deve succedere**

1. **Il badge si accende** sull'icona di sync, e il tooltip spiega che la sincronizzazione è ferma.
2. **L'app resta usabile**: si naviga tra le sezioni, si leggono i dati già scaricati, si possono
   raccogliere dati nuovi, che restano in IndexedDB.
3. **Nessun logout, nessun redirect**: l'app non porta al login da sola.

**È un bug se** — l'app va al login senza chiedere niente; oppure i click sul menù non fanno niente e
si resta bloccati sulla pagina; oppure non si riesce a salvare.

---

## 6. La via d'uscita, e la via di ritorno

**Cosa fare** — Dallo stato della prova 5, toccare l'icona di sync.

**Cosa deve succedere** — L'app **prima riprova**: in Network parte una chiamata a `token`. Se
fallisce ancora, compare la domanda: *"La sincronizzazione è ferma e non è più possibile salvare i dati
fino a un nuovo accesso. Vuoi chiudere la sessione, mantenendo i dati su questo dispositivo, e andare
alla pagina di accesso?"* con **Vai alla pagina di accesso** e **Più tardi**.

- **Più tardi** → non cambia niente: badge acceso, sessione ancora aperta, dati al loro posto.
- **Sbloccare l'URL e toccare di nuovo l'icona** → la sessione si riprende da sola: badge spento,
  ripartono le `graphql`, e **il dialogo non compare**. È la prova che un tap è sufficiente quando la
  connessione torna.
- **Vai alla pagina di accesso** → si arriva al login. Da verificare lì:
  - in IndexedDB **i dati ci sono ancora**;
  - sulla pagina di login c'è un avviso che **nomina l'account** i cui dati sono sul dispositivo;
  - in Network **non** c'è nessuna chiamata a `signout`: la sessione è stata chiusa solo in locale, i
    dati non sono stati toccati.

**È un bug se** — il tap non riprova mai e mostra subito il dialogo; oppure andando al login i dati
sparissero; oppure l'avviso non nominasse l'account.

---

## 7. Il backlog riparte dopo il nuovo accesso

**Cosa fare** — Dalla pagina di login della prova 6, sbloccare l'URL e accedere **con lo stesso
account**.

**Cosa deve succedere** — I dati raccolti nel frattempo partono verso il server: in Network le mutation
`graphql`. Nulla è andato perso.

**È un bug se** — il database si presenta vuoto, o i dati raccolti offline non arrivano al server.

---

## 8. Il logout ora chiede ⚠️

**Cosa fare** — Toccare l'icona di logout.

**Cosa deve succedere** — Compare la domanda: *"Vuoi uscire cancellando tutti i dati locali, oppure
solo chiudere la sessione mantenendo i dati su questo dispositivo?"* con tre risposte.

- **Annulla** → non succede niente: sessione intatta, dati al loro posto.
- **Chiudi la sessione e mantieni i dati** → si arriva al login, in IndexedDB i dati ci sono ancora,
  nessuna chiamata a `signout`.
- **Esci e cancella i dati** → chiamata a `signout`, IndexedDB **svuotato**, e sulla pagina di login
  nessun avviso su dati rimasti (giustamente: non ce ne sono più).

**È un bug se** — il logout cancella i dati senza chiedere, o se "mantieni i dati" li cancella
comunque.

---

## 9. Un altro utente sullo stesso dispositivo ⚠️

**Cosa fare** — Dal login, accedere con un account **diverso** da quello che ha raccolto i dati.

**Cosa deve succedere** — Il database locale viene ricreato vuoto: l'utente nuovo non vede i dati del
precedente. È voluto, ed è la ragione per cui l'avviso sulla pagina di login dice con quale account
bisogna rientrare per non perdere i dati.

**È un bug se** — il nuovo utente vede i dati di un altro operatore.

---

## Se compare "i dati sono corrotti"

Non è una prova da provocare, è una situazione da riconoscere. Se il server rifiuta dei documenti — di
norma dopo un import massivo di migliaia di form data — il badge resta acceso e un tocco sull'icona di
sync mostra: *"I dati sono corrotti, non possono essere salvati. Contatta l'amministratore, oppure
esporta i dati dalla tua area utente e poi esci."* Un solo pulsante, e nessuna azione che chiuda la
sessione.

**Come comportarsi**: la sessione viene tenuta aperta di proposito perché si possa **esportare il
database dall'area utente** (Backup and Restore → Backup Data), pannello visibile agli amministratori e
solo dove la funzione di backup è attiva — se l'operatore sul campo non è amministratore, l'export lo
fa qualcun altro da quel dispositivo. Il logout è l'unica via d'uscita e cancella i dati: va fatto
**dopo** l'export, e solo dopo che un amministratore ha guardato il file. Il messaggio non nomina il
documento colpevole: quello si trova nell'errore in console o su Sentry.

---

## Limite noto, da non segnalare come bug

Se va giù il **server dei dati** (le chiamate `graphql`) mentre quello di autenticazione risponde, il
badge non si accende e la rotellina può continuare a girare. È un buco conosciuto e già a elenco: da
non confondere con i casi della prova 5, dove il badge deve accendersi.

---

## Cosa non deve succedere mai, in nessuna prova

1. Dati raccolti che spariscono senza che nessuno abbia scelto di cancellarli.
2. L'app che porta al login senza aver chiesto niente.
3. L'utente bloccato su una pagina, con i click che non fanno niente.
4. Il badge acceso mentre tutto funziona, o spento mentre la sincronizzazione è ferma.
5. La rotellina che gira all'infinito.

## Come segnalare un problema

Utile allegare, oltre al numero della prova e a cosa si aspettava di vedere:

- l'ora esatta (serve a ritrovare la richiesta nei log del server);
- uno screenshot della **Console**, con eventuali righe rosse;
- uno screenshot della **Network** filtrata su `token`, oppure l'export in HAR (click destro →
  *Save all as HAR*) — attenzione: l'HAR contiene i token della sessione, va condiviso solo
  internamente;
- se il dubbio riguarda i dati: uno screenshot di Application → IndexedDB, per dire se i documenti
  c'erano ancora.
