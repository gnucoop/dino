---
title: Accesso
description: Come accedere a Dino, reimpostare la password, creare un account e utilizzare provider di accesso esterni.
---

# Accedere a Dino

La pagina di accesso è il punto di partenza per utilizzare Dino. Da qui puoi accedere al tuo account, creare un nuovo account o recuperare l'accesso se hai dimenticato la password. A seconda di come la tua organizzazione ha configurato Dino, alcune delle opzioni descritte di seguito potrebbero non essere visibili.

![Vista principale della pagina di accesso](../imgs/getting-started/login.png)

---

## Accedere

Usa le tue credenziali per entrare nella piattaforma.

1.  Nella pagina di accesso, inserisci il tuo **nome utente o indirizzo email** nel primo campo.
2.  Inserisci la tua **password** nel secondo campo.
3.  Fai clic sul **pulsante a freccia** per accedere.

Se le credenziali sono corrette, verrai indirizzato automaticamente alla [Dashboard](../dashboard/index.md).

Se l'accesso non riesce, sotto il form comparirà un messaggio di errore. Verifica che email e password siano corrette, assicurandoti che non ci siano spazi aggiuntivi, e riprova.

---

## Reimpostare la password

Se hai dimenticato la password, puoi richiedere un link di reimpostazione via email.

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. Se non vedi il link "Password dimenticata?", contatta il tuo amministratore.

1.  Nella pagina di accesso, fai clic su **"Password dimenticata?"** sotto il form di accesso.
2.  Inserisci l'**indirizzo email** associato al tuo account.
3.  Fai clic sul **pulsante a freccia** per inviare la richiesta.

Riceverai un messaggio di conferma nella parte superiore dello schermo. Controlla la tua casella di posta per un'email contenente un link per impostare una nuova password. Se l'email non arriva entro qualche minuto, controlla la cartella dello spam.

Per tornare al form di accesso senza reimpostare la password, fai clic su **"In realtà, mi ricordo la password"**.

Per maggiori dettagli, consulta la pagina [Reimpostare la password](reset-password.md).

---

## Creare un nuovo account

Se non hai ancora un account, potresti essere in grado di registrarti direttamente dalla pagina di accesso.

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. Se non vedi il link "Nuovo utente? Crea un nuovo account", contatta il tuo amministratore per farti creare un account.

1.  Nella pagina di accesso, fai clic su **"Nuovo utente? Crea un nuovo account"**.
2.  Inserisci il tuo **nome completo**.
3.  Inserisci il tuo **indirizzo email**.
4.  Scegli una **password** (lunga almeno 9 caratteri).
5.  Reinserisci la password nel campo **Conferma password** per assicurarti che coincida.
6.  Se viene mostrata un'**Informativa sulla privacy**, leggi il testo e seleziona la casella per accettare i termini e le condizioni. Devi accettare per poter procedere.
7.  Fai clic sul **pulsante a freccia** per creare il tuo account.

Una volta creato l'account, verrai connesso e indirizzato automaticamente alla [Dashboard](../dashboard/index.md).

Se hai già un account, fai clic su **"Hai già un account? Accedi"** per tornare al form di accesso.

---

## Accedere con un account esterno

La tua organizzazione potrebbe consentirti di accedere utilizzando il tuo account Microsoft o Google esistente, invece di una password Dino separata.

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. I pulsanti compariranno solo se il tuo amministratore ha abilitato l'accesso esterno.

1.  Nella pagina di accesso, fai clic su **"Accedi con Microsoft"** o **"Accedi con Google"**, a seconda dell'account che vuoi usare.
2.  Verrai reindirizzato a Microsoft o Google per confermare la tua identità.
3.  Dopo aver autorizzato l'accesso, tornerai a Dino e verrai connesso automaticamente.

---

## Impostazioni della pagina

Sulla pagina di accesso sono disponibili direttamente alcune preferenze di visualizzazione.

### Tema chiaro / scuro

In fondo al form è disponibile un interruttore, tra un'icona a forma di sole e una a forma di luna. Fai clic o fai scorrere per passare dalla **modalità chiara** alla **modalità scura**. Questa impostazione ha effetto immediato.

### Selezione della piattaforma

!!! note "Funzionalità opzionale"
    Questa opzione potrebbe non essere disponibile nella tua installazione. Viene mostrata solo nelle installazioni multi-piattaforma.

Se è visibile un menu a tendina **"Scegli la tua piattaforma"**, seleziona la piattaforma a cui vuoi connetterti prima di accedere. Il menu a tendina elencherà gli ambienti configurati dal tuo amministratore.

---

## Risoluzione dei problemi

### "Si è verificato un problema durante la connessione al server di autenticazione o il tuo token è scaduto."

!!! warning
    La sessione precedente è scaduta o la connessione al server di autenticazione è stata interrotta. Non si tratta di un errore da parte tua. Inserisci semplicemente le tue credenziali e accedi di nuovo.

### "Si è verificato un problema durante il processo di sincronizzazione."

!!! warning
    Si è verificato un errore durante la sincronizzazione dei tuoi dati, che potrebbe essere legato a una recente importazione di form. Controlla i form che stavi importando per individuare eventuali problemi, poi accedi di nuovo. Se il problema persiste, contatta il tuo amministratore.

### "Caricamento dell'autenticazione esterna…" senza reindirizzamento

!!! warning
    Questo messaggio compare brevemente quando si completa un accesso tramite Microsoft o Google. Se la pagina non prosegue automaticamente dopo qualche secondo, prova ad accedere di nuovo. Se il problema si ripresenta, contatta il tuo amministratore per verificare che il servizio di autenticazione esterna sia configurato correttamente.