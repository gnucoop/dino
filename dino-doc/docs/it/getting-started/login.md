---
title: Accesso
description: Come accedere a Dino, reimpostare la password, creare un account e usare provider di accesso esterni.
---

# Accesso a Dino

La pagina di accesso è il punto di partenza per utilizzare Dino. Da qui puoi accedere al tuo account, crearne uno nuovo o recuperare l'accesso se hai dimenticato la password. A seconda di come la tua organizzazione ha configurato Dino, alcune delle opzioni descritte di seguito potrebbero non essere visibili.

![Main view of the Login page](../imgs/getting-started/login.png)

---

## Accesso

Utilizza le tue credenziali per accedere alla piattaforma.

1.  Nella pagina di accesso, inserisci il **nome utente o l'indirizzo email** nel primo campo.
2.  Inserisci la **password** nel secondo campo.
3.  Fai clic sul **pulsante con la freccia** per accedere.

Se le credenziali sono corrette, verrai portato automaticamente alla [Dashboard](../dashboard/index.md).

Se l'accesso non riesce, sotto il modulo apparirà un messaggio di errore. Ricontrolla che email e password siano corrette, assicurandoti che non ci siano spazi extra, e riprova.

---

## Reimpostazione della password

Se hai dimenticato la password, puoi richiedere un collegamento di reimpostazione via email.

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. Se non vedi il collegamento "Hai dimenticato la password?", contatta il tuo amministratore.

1.  Nella pagina di accesso, fai clic su **"Hai dimenticato la password?"** sotto il modulo di accesso.
2.  Inserisci l'**indirizzo email** associato al tuo account.
3.  Fai clic sul **pulsante con la freccia** per inviare la richiesta.

Riceverai un messaggio di conferma nella parte superiore dello schermo. Controlla la tua casella di posta per un'email contenente un collegamento per impostare una nuova password. Se l'email non arriva entro pochi minuti, controlla la cartella dello spam.

Per tornare al modulo di accesso senza reimpostare la password, fai clic su **"In realtà, ricordo la mia password"**.

Per maggiori dettagli, consulta la pagina [Reimposta password](reset-password.md).

---

## Creazione di un nuovo account

Se non hai ancora un account, potresti essere in grado di registrarti direttamente dalla pagina di accesso.

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. Se non vedi il collegamento "Nuovo utente? Crea un nuovo account", contatta il tuo amministratore per farti creare un account.

1.  Nella pagina di accesso, fai clic su **"Nuovo utente? Crea un nuovo account"**.
2.  Inserisci il tuo **nome completo**.
3.  Inserisci il tuo **indirizzo email**.
4.  Scegli una **password** (lunga almeno 9 caratteri).
5.  Reinserisci la password nel campo **Conferma password** per assicurarti che corrisponda.
6.  Se viene mostrata un'**Informativa sulla privacy**, leggi il testo e spunta la casella per accettare i termini e le condizioni. Devi accettare per poter continuare.
7.  Fai clic sul **pulsante con la freccia** per creare il tuo account.

Una volta creato il tuo account, accederai e verrai portato automaticamente alla [Dashboard](../dashboard/index.md).

Se hai già un account, fai clic su **"Hai già un account? Accedi"** per tornare al modulo di accesso.

---

## Accesso con un account esterno

La tua organizzazione potrebbe consentirti di accedere utilizzando il tuo account Microsoft o Google esistente, invece di una password Dino separata.

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. I pulsanti appariranno solo se il tuo amministratore ha abilitato l'accesso esterno.

1.  Nella pagina di accesso, fai clic su **"Accedi con Microsoft"** o **"Accedi con Google"**, a seconda dell'account che vuoi utilizzare.
2.  Verrai reindirizzato a Microsoft o Google per confermare la tua identità.
3.  Dopo aver autorizzato l'accesso, verrai riportato a Dino e accederai automaticamente.

---

## Impostazioni della pagina

Un piccolo insieme di preferenze di visualizzazione è disponibile direttamente nella pagina di accesso.

### Tema chiaro / scuro

Nella parte inferiore del modulo è disponibile un interruttore, tra un'icona del sole e un'icona della luna. Fai clic o spostalo per passare da **modalità chiara** a **modalità scura**. Questa impostazione ha effetto immediato.

### Selezione della piattaforma

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. Viene mostrata solo nelle distribuzioni multi-piattaforma.

Se è visibile un menu a discesa **"Scegli la tua piattaforma"**, seleziona la piattaforma a cui vuoi connetterti prima di accedere. Il menu elencherà gli ambienti configurati dal tuo amministratore.

---

## Risoluzione dei problemi

### "Si è verificato un problema durante la connessione al server di autenticazione o il tuo token è scaduto."

!!! warning
    La sessione precedente è scaduta o la connessione al server di autenticazione è stata interrotta. Non è un errore da parte tua. Inserisci semplicemente le credenziali e accedi di nuovo.

### "Si è verificato un problema durante il processo di sincronizzazione."

!!! warning
    Si è verificato un errore durante la sincronizzazione dei dati, che potrebbe essere correlato a una recente importazione di moduli. Controlla i moduli che stavi importando per eventuali problemi, poi accedi di nuovo. Se il problema persiste, contatta il tuo amministratore.

### "Caricamento dell'autenticazione esterna…" senza reindirizzamento

!!! warning
    Questo messaggio appare brevemente quando si completa un accesso tramite Microsoft o Google. Se la pagina non prosegue automaticamente dopo alcuni secondi, prova ad accedere di nuovo. Se il problema si ripete, contatta il tuo amministratore per verificare che il servizio di autenticazione esterno sia configurato correttamente.