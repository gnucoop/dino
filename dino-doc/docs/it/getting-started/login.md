---
title: Accesso
description: Come accedere a Dino, reimpostare la password, creare un account e utilizzare provider di accesso esterni.
---

# Accesso a Dino

La pagina di accesso è il punto di partenza per accedere a Dino. Da qui puoi accedere al tuo account, crearne uno nuovo o recuperare l'accesso se hai dimenticato la password. A seconda di come la tua organizzazione ha configurato Dino, alcune delle opzioni descritte di seguito potrebbero non essere visibili.

![Main view of the Login page](../imgs/getting-started/login.png)

---

## Accesso

Usa le tue credenziali per accedere alla piattaforma.

1.  Nella pagina di accesso, inserisci il tuo **nome utente o indirizzo email** nel primo campo.
2.  Inserisci la tua **password** nel secondo campo.
3.  Fai clic sul **pulsante a freccia** per accedere.

Se le credenziali sono corrette, verrai reindirizzato automaticamente alla [Dashboard](../dashboard/index.md).

Se l'accesso fallisce, verrà visualizzato un messaggio di errore sotto il modulo. Ricontrolla che email e password siano corretti, assicurandoti che non ci siano spazi extra, e riprova.

---

## Reimpostazione della password

Se hai dimenticato la password, puoi richiedere un link di reimpostazione tramite email.

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. Se non vedi il link "Password dimenticata?", contatta il tuo amministratore.

1.  Nella pagina di accesso, fai clic su **"Password dimenticata?"** sotto il modulo di accesso.
2.  Inserisci l'**indirizzo email** associato al tuo account.
3.  Fai clic sul **pulsante a freccia** per inviare la richiesta.

Riceverai un messaggio di conferma nella parte superiore dello schermo. Controlla la tua casella di posta per un'email contenente un link per impostare una nuova password. Se l'email non arriva entro pochi minuti, controlla la cartella spam.

Per tornare al modulo di accesso senza reimpostare la password, fai clic su **"In realtà, ricordo la mia password"**.

Per maggiori dettagli, consulta la pagina [Reimpostazione della password](reset-password.md).

---

## Creazione di un nuovo account

Se non hai ancora un account, potresti registrarti direttamente dalla pagina di accesso.

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. Se non vedi il link "Nuovo utente? Crea un account", contatta il tuo amministratore per farti creare un account.

1.  Nella pagina di accesso, fai clic su **"Nuovo utente? Crea un account"**.
2.  Inserisci il tuo **nome completo**.
3.  Inserisci il tuo **indirizzo email**.
4.  Scegli una **password** (almeno 9 caratteri).
5.  Reinserisci la password nel campo **Conferma password** per assicurarti che corrisponda.
6.  Se viene visualizzata un'**Informativa sulla privacy**, leggi il testo e spunta la casella per accettare i termini e le condizioni. Devi accettare per procedere.
7.  Fai clic sul **pulsante a freccia** per creare il tuo account.

Una volta creato l'account, verrai automaticamente autenticato e reindirizzato alla [Dashboard](../dashboard/index.md).

Se hai già un account, fai clic su **"Hai già un account? Accedi"** per tornare al modulo di accesso.

---

## Accesso con un account esterno

La tua organizzazione potrebbe permetterti di accedere utilizzando il tuo account Microsoft o Google esistente, invece di una password separata per Dino.

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. I pulsanti appariranno solo se l'amministratore ha abilitato l'accesso esterno.

1.  Nella pagina di accesso, fai clic su **"Accedi con Microsoft"** o **"Accedi con Google"**, a seconda dell'account che vuoi utilizzare.
2.  Verrai reindirizzato a Microsoft o Google per confermare la tua identità.
3.  Dopo aver autorizzato l'accesso, verrai riportato a Dino e autenticato automaticamente.

---

## Impostazioni della pagina

Un piccolo set di preferenze di visualizzazione sono disponibili direttamente nella pagina di accesso.

### Tema chiaro / scuro

Un interruttore è disponibile nella parte inferiore del modulo, tra un'icona del sole e un'icona della luna. Fai clic o spostalo per passare dalla **modalità chiara** a quella **scura**. Questa impostazione ha effetto immediato.

### Selezione della piattaforma

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. Viene mostrata solo in distribuzioni multi-piattaforma.

Se è visibile un menu a discesa **"Scegli la tua piattaforma"**, seleziona la piattaforma a cui vuoi connetterti prima di accedere. Il menu elencherà gli ambienti configurati dal tuo amministratore.

---

## Risoluzione dei problemi

### "Si è verificato un problema durante la connessione al server di autenticazione oppure il token è scaduto."

!!! warning
    La sessione precedente è scaduta o la connessione al server di autenticazione è stata interrotta. Non si tratta di un errore da parte tua. Inserisci semplicemente le tue credenziali e accedi di nuovo.

### "Si è verificato un problema durante il processo di sincronizzazione."

!!! warning
    Si è verificato un errore durante la sincronizzazione dei dati, che potrebbe essere correlato a una recente importazione di moduli. Esamina eventuali moduli che stavi importando per potenziali problemi, quindi accedi di nuovo. Se il problema persiste, contatta il tuo amministratore.

### "Caricamento dell'autenticazione esterna…" senza reindirizzamento

!!! warning
    Questo messaggio appare brevemente quando si completa l'accesso tramite Microsoft o Google. Se la pagina non procede automaticamente dopo alcuni secondi, prova ad accedere di nuovo. Se il problema si ripete, cont