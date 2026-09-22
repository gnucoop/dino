---
title: Gestione delle lingue
description: Come gestire le traduzioni dell'applicazione, inclusa l'aggiunta di lingue, la modifica del testo e l'esportazione dei file.
---

# Gestione delle lingue

La pagina **Lingue** permette agli amministratori di gestire tutto il testo tradotto utilizzato in Dino. Da qui puoi sfogliare, modificare e aggiungere traduzioni, gestire quali lingue sono disponibili ed esportare i file di traduzione per il backup o la modifica.

![Vista principale della pagina Lingue](../imgs/administration/languages.png)

!!! warning "Solo per amministratori"
    Questa area è visibile solo agli utenti con il ruolo di Amministratore. Se non la vedi nella navigazione, contatta l'amministratore di sistema.

---

## Consultare le traduzioni

La visualizzazione principale mostra un elenco di tutte le voci di traduzione. Ogni voce mostra la sua **chiave** — l'identificatore interno usato dall'applicazione — e, quando è selezionata una lingua, il testo tradotto corrispondente.

Mentre i dati delle traduzioni vengono caricati, viene mostrato un indicatore di caricamento.

### Filtro dell'elenco

Due controlli nella parte superiore della pagina ti permettono di restringere le voci mostrate:

- **Ricerca per parola chiave** — digita una parola qualsiasi per filtrare le voci la cui chiave o traduzione contiene quel testo. L'elenco si aggiorna mentre digiti.
- **Selettore di lingua** — una riga di pulsanti mostra **Chiave** e un pulsante per ogni lingua disponibile. Fai clic sul nome di una lingua per visualizzare le traduzioni di quella lingua accanto a ciascuna chiave. Le voci senza traduzione per la lingua selezionata vengono mostrate come *(Nessuna traduzione)*.

---

## Modificare una voce di traduzione

1. Fai clic su una qualsiasi voce dell'elenco per aprire la finestra di dialogo **Modifica traduzione**.
2. La finestra di dialogo mostra la **chiave** e un campo di testo per ogni lingua disponibile.
3. Aggiorna le traduzioni secondo necessità.
4. Fai clic su **Salva** per applicare le modifiche, oppure su **Annulla** per chiudere senza salvare.

Puoi anche rimuovere definitivamente una singola voce da questa finestra di dialogo facendo clic sul pulsante **Rimuovi**. Questa operazione elimina la chiave di traduzione e tutte le traduzioni associate.

!!! warning
    La rimozione di una voce di traduzione è permanente. La chiave e tutti i suoi valori per le varie lingue verranno eliminati.

---

## Aggiungere una nuova voce di traduzione

Usa questa funzione quando devi aggiungere una chiave di traduzione che non esiste ancora nel sistema.

1. Fai clic sul pulsante **+ Traduzione** nella barra degli strumenti.
2. Si aprirà la finestra di dialogo **Aggiungi traduzione**. Contiene un campo di testo per ogni lingua attualmente attiva.
3. Inserisci il testo della traduzione per ogni lingua secondo necessità.
4. Fai clic su **Salva** per aggiungere la nuova voce, oppure su **Annulla** per annullare.

Dopo il salvataggio della voce apparirà brevemente un messaggio di conferma.

---

## Gestione delle lingue

Usa questa funzione per aggiungere una nuova lingua, aggiornare le traduzioni di una lingua esistente o rimuovere un set di traduzioni personalizzato.

1. Fai clic sul pulsante **Lingua** nella barra degli strumenti.
2. Si aprirà la finestra di dialogo **Impostazioni lingua**. Mostra un elenco delle lingue disponibili e offre le seguenti azioni:
   - **Pulsante +** per aggiungere una nuova lingua.
   - Fai clic sul nome di una lingua nell'elenco per selezionarla e visualizzare un'anteprima delle sue traduzioni.
   - **Aggiorna traduzione** (con una lingua selezionata) per caricare un nuovo file JSON.
   - **Rimuovi traduzione personalizzata** per eliminare i dati di traduzione personalizzati della lingua selezionata.

### Aggiungere una nuova lingua

1. Fai clic sul **pulsante +** nella parte superiore della finestra di dialogo.
2. Apparirà un form che chiede una **etichetta della lingua** (il nome che apparirà nell'interfaccia, ad esempio "French" o "fr").
3. Facoltativamente, carica un **file JSON di traduzione** facendo clic su **Aggiungi JSON** e selezionando un file dal tuo dispositivo. Il contenuto del file verrà mostrato in anteprima prima del salvataggio.
4. Fai clic su **Salva** per aggiungere la lingua, oppure su **Annulla** per annullare.

### Visualizzare una lingua esistente

Fai clic sul pulsante con il nome di una lingua per selezionarla. La finestra di dialogo mostrerà un'anteprima di tutte le chiavi e i valori di traduzione attualmente memorizzati per quella lingua.

### Aggiornare le traduzioni di una lingua

Con una lingua selezionata, fai clic su **Aggiorna traduzione** per caricare un nuovo file JSON. Prima del salvataggio, la finestra di dialogo mostrerà un'anteprima delle modifiche — nuove chiavi aggiunte e chiavi modificate.

1. Fai clic su **Aggiorna traduzione** e seleziona un file JSON dal tuo dispositivo.
2. Esamina l'anteprima che mostra le righe aggiunte e modificate.
3. Fai clic su **Salva** per applicare l'aggiornamento, oppure su **Annulla** per annullare.

### Rimuovere una traduzione personalizzata

Con una lingua selezionata, fai clic su **Rimuovi traduzione personalizzata** per eliminare i dati di traduzione personalizzati di quella lingua.

!!! warning
    Questa operazione rimuove le traduzioni personalizzate della lingua selezionata. La lingua stessa potrebbe rimanere nel sistema, ma i suoi contenuti personalizzati andranno persi.

---

## Esportare le traduzioni

Puoi scaricare i dati di traduzione di qualsiasi lingua come file JSON.

1. Fai clic sul pulsante **Esporta** (icona di download) nella barra degli strumenti.
2. Si aprirà la finestra di dialogo **Esporta**, che mostra un elenco delle lingue disponibili.
3. Fai clic sul nome della lingua che vuoi esportare. A destra apparirà un'anteprima dei suoi dati di traduzione.
4. Fai clic su **Scarica** per salvare il file sul tuo dispositivo.