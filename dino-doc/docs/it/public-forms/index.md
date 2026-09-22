---
title: Form pubblici
description: Come accedere, compilare e inviare un form pubblico in Dino senza bisogno di un account.
---

# Form pubblici

I form pubblici consentono a chiunque disponga di un link di inviare dati a Dino senza bisogno di effettuare l'accesso o di avere un account. Sono comunemente utilizzati per sondaggi, iscrizioni o raccolta di feedback. Se hai ricevuto un link pubblico a un form, puoi usare questa pagina per compilarlo.

Gli indirizzi dei form pubblici seguono il pattern `/f/` seguito da un identificatore univoco (ad es. `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a`). L'identificatore è l'ID del form schema. Se un valore di metrica deve essere aggiunto ai dati del form, è possibile includerlo nell'URL usando la seguente sintassi (ad es. per il caso della metrica): `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a?case=a6408e72-c60c-4d54-ad2f-44fd4a90cdb2`
dove l'ID del valore di metrica è ancora una volta l'ID della metrica assegnato da Dino.

Non è necessario ricordare questa sintassi, poiché il link viene generato automaticamente da Dino quando fai clic sull'icona di condivisione del form schema. Una volta generato, il link può essere condiviso via email, WhatsApp o qualsiasi altro mezzo.

---

## Accedere a un form pubblico

1.  Fai clic sul link del form pubblico che hai ricevuto (ad es. via email o in un messaggio condiviso). Il link ti porterà a `/f/...` sulla tua istanza Dino.
2.  Il form si aprirà direttamente nel tuo browser web. Non devi effettuare l'accesso.
3.  Controlla il titolo del form e l'eventuale testo introduttivo per confermare che sia il form giusto.

!!! tip
    I link dei form pubblici contengono un identificatore lungo (come `/f/abc123def`). Se la pagina non si carica, assicurati che l'intero link sia stato copiato correttamente.

---

## Compilare e inviare

1.  Compila tutti i campi del form. I campi contrassegnati con un asterisco (*) sono **obbligatori**.
2.  Se il form ha più sezioni, usa le schede o i pulsanti di navigazione nella parte superiore del form per spostarti tra esse.
3.  Mentre compili i campi, il form convalida i dati inseriti. I valori non validi sono in genere evidenziati.
4.  Quando tutti i campi obbligatori sono validi, il pulsante di invio principale (di solito un pulsante circolare con l'icona di invio) diventa attivo.
5.  Fai clic sul pulsante di invio per inviare i tuoi dati.

!!! warning
    Il pulsante di invio rimane disabilitato (in grigio) se un campo obbligatorio è vuoto o contiene dati non validi. Scorri il form per individuare e correggere eventuali problemi evidenziati.

---

## Dopo l'invio

Dopo un invio riuscito, vedrai una schermata di conferma con un segno di spunta e il messaggio: **"Il form è stato inviato correttamente."**

Comparirà anche una notifica in fondo allo schermo. Da questa notifica puoi:

*   **Compilane un altro**: fai clic per ricaricare la pagina con una copia nuova e vuota dello stesso form, così puoi effettuare un altro invio.
*   **Chiudi**: chiude la notifica.

---

## Risoluzione dei problemi

### Il pulsante di invio è disabilitato.
Ciò significa che il form non è ancora valido. Verifica quanto segue:

*   **Campi obbligatori vuoti**: assicurati che tutti i campi contrassegnati con un asterisco (*) siano compilati.
*   **Dati non validi**: cerca i campi evidenziati in rosso e correggi le informazioni (ad es. un formato email non valido).

### "Impossibile salvare il form."
L'invio ha riscontrato un errore temporaneo, spesso legato alla tua connessione internet.

1.  Fai clic su **"Riprova"** nella notifica in fondo allo schermo.
2.  Se l'errore persiste, controlla la tua connessione internet e prova ad aggiornare la pagina.
3.  Se continua a non funzionare, contatta la persona che ti ha inviato il link del form.

### "Ops! Non è stato possibile trovare questo form schema."
Il link che stai usando non è corretto oppure il form è stato rimosso.

*   Verifica di avere l'URL completo e corretto.
*   Contatta la persona che ha condiviso il link con te per ottenerne uno aggiornato.

### Il form non si carica (pagina vuota).

*   Aggiorna la pagina del browser.
*   Assicurati che la tua connessione internet sia stabile.
*   Verifica che il link sia completo e non sia stato troncato.