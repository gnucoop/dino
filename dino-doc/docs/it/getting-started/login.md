---
title: Accesso a Dino
description: Come accedere a Dino, reimpostare la Password, creare un account e utilizzare provider di accesso esterni.
---

# Accesso a Dino

La pagina di accesso è il punto di partenza per accedere a Dino. Da qui puoi accedere al tuo account, creare un nuovo account o recuperare l'accesso se hai dimenticato la Password. A seconda di come la tua organizzazione ha configurato Dino, alcune delle opzioni descritte di seguito potrebbero non essere visibili.

![Vista principale della pagina di accesso](../imgs/getting-started/login.png)

La pagina è composta da tre parti:

- un'**intestazione**, con il logo, il selettore della lingua e un link al codice sorgente di Dino su GitHub;
- la **scheda di accesso**, accanto a una breve introduzione alla piattaforma e ai suoi moduli. Su un telefono la scheda viene prima e l'introduzione la segue, così puoi accedere senza dover scorrere;
- un **piè di pagina**, con l'interruttore del tema chiaro/scuro e la versione dell'applicazione.

---

## Accedere

Usa le tue credenziali per accedere alla piattaforma. Se la tua installazione non ti consente di creare un account autonomamente, la scheda ti ricorda di usare l'account che il tuo amministratore ha creato per te.

1.  Nella pagina di accesso, inserisci il tuo **nome utente o indirizzo email** nel primo campo.
2.  Inserisci la tua **Password** nel secondo campo.
3.  Clicca **Accedi**. Mentre Dino verifica le tue credenziali, il pulsante mostra **Accesso in corso…**.

Se le tue credenziali sono corrette, verrai portato automaticamente alla [Dashboard](../dashboard/index.md).

Se l'accesso non riesce, apparirà un messaggio di errore sotto il form. Controlla che la tua email e la tua Password siano corrette, assicurandoti che non ci siano spazi aggiuntivi, e riprova.

!!! tip "Rimanere connessi"
    Se la tua sessione scade, Dino non ti disconnette e mantiene i dati sul dispositivo, ma la sincronizzazione si interrompe: il pulsante di sincronizzazione mostra un avviso. Cliccalo: Dino tenta di rinnovare la sessione e, se non ci riesce, ti offre **Vai alla pagina di accesso**, mantenendo i dati su questo dispositivo, oppure **Più tardi**. Accedi di nuovo con lo stesso account per sincronizzare i dati.

!!! warning "Dati non ancora sincronizzati"
    Se i dati raccolti su questo dispositivo non sono ancora stati sincronizzati, la pagina di accesso te lo segnala, indicando quando possibile l'account che li ha raccolti. Accedi con quell'account per sincronizzare i dati: **accedere con un account diverso li elimina**.

---

## Reimpostare la Password

Se hai dimenticato la Password, puoi richiedere un link di reimpostazione via email.

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. Se non vedi il link "Password dimenticata?", contatta il tuo amministratore.

1.  Nella pagina di accesso, clicca **"Password dimenticata?"** sotto il form di accesso.
2.  Inserisci l'**indirizzo email** associato al tuo account.
3.  Clicca **Invia** per inviare la richiesta.

Riceverai un messaggio di conferma nella parte superiore dello schermo. Controlla la tua casella di posta per un'email contenente un link per impostare una nuova Password. Se l'email non arriva entro qualche minuto, controlla la cartella dello spam.

Per tornare al form di accesso senza reimpostare la Password, clicca **"In realtà, mi ricordo la Password"**.

Per maggiori dettagli, consulta la pagina [Reimpostare la Password](reset-password.md).

---

## Creare un nuovo account

Se non hai ancora un account, potresti riuscire a registrarti direttamente dalla pagina di accesso.

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. Se non vedi il link "Nuovo utente? Crea un nuovo account", contatta il tuo amministratore per farti creare un account.

1.  Nella pagina di accesso, clicca **"Nuovo utente? Crea un nuovo account"**.
2.  Inserisci il tuo **Nome completo**.
3.  Inserisci il tuo **indirizzo email**.
4.  Scegli una **Password** (lunga almeno 9 caratteri).
5.  Reinserisci la Password nel campo **Conferma password** per assicurarti che corrisponda.
6.  Se viene mostrata una **Policy sulla riservatezza**, leggi il testo e spunta la casella per accettare i termini e le condizioni. Devi accettare per poter procedere.
7.  Clicca **Crea account**.

Una volta creato il tuo account, verrai connesso e portato automaticamente alla [Dashboard](../dashboard/index.md).

Se hai già un account, clicca **"Hai già un account? Accedi"** per tornare al form di accesso.

!!! tip "Scegliere una Password sicura"
    Usa una Password che non riutilizzi su altri siti web. Una combinazione di lettere maiuscole e minuscole, numeri e simboli rende più difficile per gli altri indovinarla.

---

## Accedere con un account esterno

La tua organizzazione potrebbe consentirti di accedere usando il tuo account Microsoft o Google esistente, invece di una Password Dino separata.

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. I pulsanti appariranno solo se il tuo amministratore ha abilitato l'accesso esterno.

1.  Nella pagina di accesso, clicca **"Accedi con Microsoft"** o **"Accedi con Google"**, a seconda dell'account che vuoi usare.
2.  Verrai reindirizzato a Microsoft o Google per confermare la tua identità.
3.  Dopo aver autorizzato l'accesso, verrai riportato a Dino e connesso automaticamente.

---

## Impostazioni della pagina

Un piccolo insieme di preferenze di visualizzazione è disponibile direttamente nella pagina di accesso.

### Lingua

Il selettore della lingua nell'intestazione, che mostra il codice della lingua corrente (ad esempio **ENG**), cambia la lingua della pagina prima che tu acceda. Dino ricorda la tua scelta su questo dispositivo.

### Tema chiaro / scuro

Due pulsanti nel piè di pagina, un sole (*Tema chiaro*) e una luna (*Tema scuro*), alternano tra **Tema chiaro** e **Tema scuro**. L'impostazione ha effetto immediato.

### Selezione della piattaforma

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. Viene mostrata solo nelle installazioni multi-piattaforma.

Se è visibile un menu a tendina **"Scegli la tua piattaforma"**, seleziona la piattaforma a cui vuoi connetterti prima di accedere. Il menu a tendina elencherà gli ambienti configurati dal tuo amministratore.

---

## Risoluzione dei problemi

### "There was a problem connecting to the Authentication server or your token has expired."

!!! warning
    La tua sessione precedente è scaduta o la connessione al server di autenticazione è stata interrotta. Non è un errore da parte tua. Inserisci semplicemente le tue credenziali e accedi di nuovo.

### "There was a problem during syncing process."

!!! warning
    Si è verificato un errore durante la sincronizzazione dei tuoi dati, che potrebbe essere legato a una recente importazione di form. Controlla eventuali form che stavi importando per potenziali problemi, poi accedi di nuovo. Se il problema persiste, contatta il tuo amministratore.

### "Loading external authentication…" senza reindirizzamento

!!! warning
    Questo messaggio appare brevemente quando si completa un accesso tramite Microsoft o Google. Se la pagina non procede automaticamente dopo qualche secondo, prova ad accedere di nuovo. Se il problema si ripete, contatta il tuo amministratore per verificare che il servizio di autenticazione esterna sia configurato correttamente.