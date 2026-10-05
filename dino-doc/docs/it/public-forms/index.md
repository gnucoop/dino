---
title: Form pubblici
description: Come accedere, compilare e inviare un form pubblico in Dino senza bisogno di un account.
---

# Form pubblici

I form pubblici consentono a chiunque disponga di un link di inviare dati a Dino senza dover effettuare l'accesso o possedere un account. Sono comunemente utilizzati per sondaggi, iscrizioni o raccolta di feedback. Se hai ricevuto un link pubblico a un form, puoi usare questa pagina per compilarlo.

Gli indirizzi dei form pubblici seguono lo schema `/f/` seguito da un identificatore univoco (ad esempio, `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a`). L'identificatore è l'ID del form schema. Se si deve aggiungere un valore di metrica ai dati del form, è possibile includerlo nell'url usando la seguente sintassi (ad esempio per il caso della metrica): `https://your-dino-instance.com/f/963f643f-ad55-4b85-a3d6-100b113f2e9a?case=a6408e72-c60c-4d54-ad2f-44fd4a90cdb2`
dove l'ID del valore della metrica è ancora una volta l'ID della metrica assegnato da Dino.

Non è necessario ricordare questa sintassi, poiché il link viene generato automaticamente da Dino quando si clicca sull'icona di condivisione del form schema. Una volta generato, il link può essere condiviso via email, WhatsApp o qualsiasi altro mezzo.

---

## Accedere a un form pubblico

1.  Clicca sul link del form pubblico che hai ricevuto (ad esempio, via email o in un messaggio condiviso). Il link ti porterà a `/f/...` sulla tua istanza Dino.
2.  Il form si aprirà direttamente nel tuo browser web. Non è necessario effettuare l'accesso.
3.  Controlla il titolo del form e l'eventuale testo introduttivo per confermare che si tratti del form corretto.

Un selettore di lingua nella barra superiore dello schermo ti consente di scegliere la lingua del form. Usalo per passare al form nella lingua che preferisci prima di iniziare a compilarlo.

Se il form include più sezioni, sotto il titolo viene mostrata una barra di avanzamento che ti permette di vedere a che punto sei.

!!! tip
    I link dei form pubblici contengono un identificatore lungo (come `/f/abc123def`). Se la pagina non si carica, assicurati che il link sia stato copiato per intero.

---

## Compilare e inviare

1.  Compila tutti i campi del form. I campi contrassegnati con un asterisco (*) sono **necessario**.
2.  Se il form ha più sezioni, usa i pulsanti **Successiva** e **Precedente** in fondo al form per spostarti tra esse. Il titolo della sezione è mostrato nella parte superiore di ogni passaggio.
3.  Mentre compili i campi, il form convalida i tuoi inserimenti. I valori non validi sono in genere evidenziati.
4.  Una volta che tutti i campi necessari sono validi, il pulsante **Invia** diventa attivo.
5.  Clicca **Invia** per inviare i tuoi dati.

!!! warning
    Il pulsante **Successiva** resta disattivato se la sezione corrente non è ancora valida, e il pulsante **Invia** resta disattivato (in grigio) se un campo necessario è vuoto o contiene dati non validi. Controlla la sezione corrente, o torna indietro nelle sezioni precedenti, per individuare e correggere eventuali problemi evidenziati.

---

## Dopo l'invio

Dopo un invio riuscito, vedrai una schermata di conferma con un segno di spunta e il messaggio: **"Il form è stato inviato con successo."**

Inoltre, per qualche secondo compare una notifica nella parte inferiore dello schermo. Clicca **Compila un altro** per ricaricare la pagina con una copia nuova e vuota dello stesso form, così da poter effettuare un altro invio.

---

## Risoluzione dei problemi

### Il pulsante Successiva o Invia è disattivato.
Ciò significa che la sezione corrente o il form nel suo complesso non è ancora valido. Verifica se ci sono:

*   **Campi necessari vuoti**: assicurati che tutti i campi contrassegnati con un asterisco (*) siano compilati.
*   **Dati non validi**: cerca i campi evidenziati in rosso e correggi le informazioni (ad esempio, un formato email non valido).

### "Impossibile aprire questo form perché mancano alcune informazioni necessarie nel link."
Il link che hai usato è incompleto. Alcuni form richiedono informazioni sulla metrica (come un caso, una posizione o un'organizzazione) da includere nell'indirizzo.

*   Contatta la persona che ti ha inviato il link del form e chiedile di condividere il link completo.

### "Impossibile salvare il form."
Il tuo invio ha riscontrato un errore temporaneo, spesso legato alla tua connessione internet.

1.  Controlla la tua connessione internet.
2.  Clicca **"Riprova"** nella notifica in fondo allo schermo. Dino invia di nuovo il form con le risposte che hai digitato: non devi compilarlo di nuovo.
3.  Se l'errore persiste, contatta la persona che ti ha inviato il link del form.

### "Ops! Non è stato possibile trovare questo Form Schema."
Il link che stai usando non è corretto oppure il form è stato rimosso.

*   Verifica di avere l'URL completo e corretto.
*   Contatta la persona che ti ha condiviso il link per riceverne uno aggiornato.

### Il form non si carica (pagina vuota).

*   Aggiorna la pagina del browser.
*   Assicurati che la tua connessione internet sia stabile.
*   Verifica che il link sia completo e non sia stato troncato.

---

## Pagine correlate

*   [Form](../forms/index.md)
*   [Modifica form schema](../forms/edit-form-schema.md)
*   [Lingue](../administration/languages.md)
*   [Metriche](../metrics/index.md)