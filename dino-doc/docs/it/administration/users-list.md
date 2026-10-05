---
title: Lista utenti
description: Visualizza, modifica e gestisci gli account utente nella tua organizzazione Dino.
---

# Lista utenti

La pagina Lista utenti fornisce un elenco completo di tutti gli account utente nella tua organizzazione Dino. Da qui puoi visualizzare i dettagli degli utenti, modificare gli account e creare nuovi utenti.

![Vista principale della pagina Lista utenti](../imgs/administration/users-list.png)

## Comprendere la Lista utenti

L'elenco principale mostra le informazioni chiave per ogni utente:

*   **Email:** L'indirizzo email di accesso dell'utente.
*   **Nome completo:** Il nome associato all'account.
*   **Disabilitato:** Un interruttore che indica se l'account è attivo o disabilitato. Puoi fare clic su questo interruttore direttamente nell'elenco per cambiare lo stato.

Puoi ordinare l'elenco per le colonne **Email**, **Nome completo** o **Data di creazione**. Le colonne **ID** e **Data di creazione** sono nascoste per impostazione predefinita. Per mostrare o nascondere le colonne, fai clic sul pulsante **Colonne** sopra l'elenco, a destra, e seleziona quelle che vuoi visualizzare.

## Lavorare con l'elenco

### Ricerca e filtro

Usa la barra di ricerca in cima alla pagina per trovare gli utenti tramite la loro email o il nome completo.

Per applicare filtri più specifici:

1.  Fai clic sul pulsante **Filtri** nella barra di ricerca.
2.  Imposta una **Data di partenza** e una **Fino ad oggi** per filtrare per data di creazione, e seleziona uno o più gruppi utente per restringere l'elenco ai membri di quei gruppi.
3.  Fai clic su **Cerca** per applicare i filtri, o su **Azzera filtri** per rimuoverli.

I filtri applicati appaiono come chip sotto la barra di ricerca. Fai clic sull'icona **cancella** su un chip per rimuovere quel filtro.

### Azioni sull'utente

Passa il mouse sulla riga di un utente per mostrare le icone **Modifica** e **Vedi**. Fai clic in un punto qualsiasi della riga per selezionarla: la barra delle azioni sopra l'elenco mostra quindi tutte le azioni che puoi eseguire sull'utente selezionato:

*   **Modifica:** Apre l'editor utente per modificare i dettagli dell'account.
*   **Vedi:** Apre una visualizzazione in sola lettura dei dettagli dell'utente.
*   **Elimina:** Rimuove definitivamente l'account utente. Ti verrà chiesto di confermare questa azione.

## Creare un nuovo utente

Per aggiungere un nuovo utente alla tua organizzazione:

1.  Fai clic sul pulsante **Aggiungi nuovo utente** nella barra degli strumenti sopra l'elenco.
2.  Si aprirà un form. Inserisci il **Nome completo** e l'**Email** del nuovo utente, e assegnalo ai gruppi appropriati in **Gruppi di permessi utente**. Per maggiori informazioni sui gruppi, vedi [Lista gruppi](groups-list.md).
    A seconda di come il tuo Dino effettua l'accesso degli utenti, il form potrebbe anche richiedere una **Password** e **Conferma password**, di almeno 9 caratteri.
3.  Fai clic su **Salva** per creare l'account.

Il pulsante **Salva** rimane non disponibile finché tutti i campi obbligatori non sono compilati correttamente.

!!! tip "Modalità di visualizzazione e modifica"
    Lo stesso form viene utilizzato per creare, modificare e visualizzare gli utenti. In modalità **Vedi**, tutti i campi sono in sola lettura e viene mostrato solo il pulsante **Chiudi**.

## Modificare un utente

Per modificare le informazioni di un utente esistente:

1.  Passa il mouse sulla riga dell'utente e fai clic sull'icona **Modifica**, oppure seleziona la riga e fai clic su **Modifica** nella barra delle azioni.
2.  Nell'editor, aggiorna il nome completo dell'utente o l'assegnazione ai gruppi. L'indirizzo email non può essere modificato qui.
3.  Fai clic su **Salva** per applicare le modifiche.

!!! tip "Disattivazione rapida"
    Puoi abilitare o disabilitare rapidamente la possibilità di accesso di un utente facendo clic sull'interruttore **Disabilitato** direttamente nell'elenco, senza aprire l'editor completo.

## Pagine correlate

*   [Utenti](users.md)
*   [Lista gruppi](groups-list.md)