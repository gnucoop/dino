---
title: Gestione delle Lingue
description: Come gestire le traduzioni dell'applicazione, inclusa l'aggiunta di lingue, la modifica del testo e l'esportazione dei file.
---

# Gestione delle Lingue

La pagina **Lingue** consente agli amministratori di gestire tutto il testo tradotto utilizzato in Dino. Da qui puoi sfogliare, modificare e aggiungere traduzioni, gestire quali lingue sono disponibili ed esportare file di traduzione per backup o modifica.

![Gestione delle Lingue](../imgs/administration/languages.png)

!!! warning "Accesso solo per amministratori"
    Questa area è visibile solo agli utenti con il ruolo di Amministratore. Se non la vedi nella navigazione, contatta il tuo amministratore di sistema.

---

## Sfogliare le Traduzioni

La vista principale mostra un elenco di tutte le voci di traduzione. Ogni voce mostra la sua **chiave** — l'identificatore interno utilizzato dall'applicazione — e, quando una lingua è selezionata, il corrispondente testo tradotto.

Viene mostrato un indicatore di caricamento mentre i dati di traduzione vengono recuperati.

### Filtrare l'Elenco

Due controlli nella parte superiore della pagina ti permettono di restringere le voci mostrate:

- **Ricerca per parola chiave** — digita qualsiasi parola per filtrare le voci la cui chiave o traduzione contiene quel testo. L'elenco si aggiorna mentre digiti.
- **Selettore lingua** — una riga di pulsanti mostra **Chiave** e un pulsante per ogni lingua disponibile. Clicca sul nome di una lingua per visualizzare le traduzioni di quella lingua accanto a ogni chiave. Le voci senza traduzione per la lingua selezionata sono mostrate come *(Nessuna traduzione)*.

---

## Modificare una Voce di Traduzione

1. Clicca su qualsiasi voce nell'elenco per aprire la finestra di dialogo **Modifica Traduzione**.
2. La finestra mostra la **chiave** e un campo di testo per ogni lingua disponibile.
3. Aggiorna le traduzioni secondo necessità.
4. Clicca **Salva** per applicare le modifiche, o **Annulla** per chiudere senza salvare.

Puoi anche rimuovere definitivamente una singola voce da questa finestra di dialogo cliccando il pulsante **Rimuovi**. Questo cancella la chiave di traduzione e tutte le sue traduzioni associate.

!!! warning
    La rimozione di una voce di traduzione è permanente. La chiave e tutti i suoi valori per ogni lingua verranno eliminati.

---

## Aggiungere una Nuova Voce di Traduzione

Usa questa funzione quando devi aggiungere una chiave di traduzione che non esiste ancora nel sistema.

1. Clicca il pulsante **+ Traduzione** nella barra degli strumenti.
2. Si aprirà la finestra di dialogo **Aggiungi Traduzione**. Contiene un campo di testo per ogni lingua attualmente attiva.
3. Inserisci il testo tradotto per ogni lingua secondo necessità.
4. Clicca **Salva** per aggiungere la nuova voce, o **Annulla** per annullare.

Un messaggio di conferma apparirà brevemente dopo che la voce è stata salvata.

---

## Gestire le Lingue

Usa questa funzione per aggiungere una nuova lingua, aggiornare le traduzioni di una lingua esistente o rimuovere un set di traduzioni personalizzato.

1. Clicca il pulsante **Lingua** nella barra degli strumenti.
2. Si aprirà la finestra di dialogo **Impostazioni Lingua**. Mostra un elenco delle lingue disponibili e fornisce le seguenti azioni:

### Aggiungere una Nuova Lingua

1. Clicca il **pulsante +** nella parte superiore della finestra di dialogo.
2. Apparirà un modulo che chiede un **etichetta lingua** (il nome che apparirà nell'interfaccia, ad esempio "Francese" o "fr").
3. Facoltativamente, carica un **file JSON di traduzione** cliccando **Aggiungi JSON** e selezionando un file dal tuo dispositivo. Il contenuto del file sarà visualizzato in anteprima prima del salvataggio.
4. Clicca **Salva** per aggiungere la lingua, o **Annulla** per annullare.

### Visualizzare una Lingua Esistente

Clicca un pulsante con il nome di una lingua per selezionarla. La finestra di dialogo mostrerà un'anteprima di tutte le chiavi e i valori di traduzione attualmente memorizzati per quella lingua.

### Aggiornare le Traduzioni di una Lingua

Con una lingua selezionata, clicca **Aggiorna traduzione** per caricare un nuovo file JSON. La finestra di dialogo mostrerà in anteprima le modifiche — nuove chiavi aggiunte e chiavi modificate — prima di salvare.

1. Clicca **Aggiorna traduzione** e seleziona un file JSON dal tuo dispositivo.
2. Rivedi l'anteprima che mostra le righe aggiunte e modificate.
3. Clicca **Salva** per applicare l'aggiornamento, o **Annulla** per annullare.

### Rimuovere una Traduzione Personalizzata

Con una lingua selezionata, clicca **Rimuovi traduzione personalizzata** per eliminare i dati di traduzione personalizzati per quella lingua.

!!! warning
    Questo rimuove le traduzioni personalizzate per la lingua selezionata. La lingua stessa potrebbe rimanere nel sistema ma il suo contenuto personalizzato andrà perso.

---

## Esportare le Traduzioni

Puoi scaricare i dati di traduzione per qualsiasi lingua come file JSON.

1. Clicca il pulsante **Esporta** (icona di download) nella barra degli strumenti.
2. Si aprirà la finestra di dialogo **Esporta** mostrando un elenco delle lingue disponibili.
3. Clicca il nome della lingua che desideri esportare. Un'anteprima dei suoi dati di traduzione apparirà a destra.
4. Clicca **Scarica** per salvare il file sul tuo dispositivo.