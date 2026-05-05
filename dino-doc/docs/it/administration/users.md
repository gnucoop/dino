---
title: Gestione Utenti e Gruppi
description: Come creare, modificare e gestire account utente e gruppi di autorizzazioni in Dino.
---

# Gestione Utenti e Gruppi

L'area Utenti consente agli amministratori di gestire chi può accedere a Dino e cosa è autorizzato a fare. È divisa in due sezioni: **Utenti**, per gli account individuali, e **Gruppi**, per insiemi di autorizzazioni che possono essere assegnati a più utenti contemporaneamente.

![Gestione Utenti e Gruppi](../imgs/administration/users.png)

!!! warning "Solo accesso amministratore"
    Questa area è visibile solo agli utenti con il ruolo di Amministratore. Se non la vedi nella navigazione, contatta il tuo amministratore di sistema.

---

## Navigare nell'Area Utenti

Quando apri l'area Utenti, vedrai un menu con due opzioni:

- **Utenti** — gestisci account utente individuali.
- **Gruppi** — gestisci gruppi di autorizzazioni.

Clicca su una delle opzioni per aprire la sezione corrispondente.

---

## Utenti

### Esplorare l'Elenco Utenti

L'elenco Utenti mostra tutti gli account nel sistema, visualizzando per ciascun utente l'**indirizzo email**, il **nome completo** e un interruttore **Disabilitato** che indica se l'account è attualmente attivo.

Il numero totale di utenti corrispondenti ai filtri attuali è mostrato in cima all'elenco.

### Ricerca e Filtri

- Digita nel campo **ricerca per parole chiave** per filtrare gli utenti in base a qualsiasi testo nei loro dettagli.
- Usa i campi **Data da** e **Data a** per filtrare in base alla data di creazione dell'account.
- Usa il filtro **Gruppi Utenti** per mostrare solo gli utenti che appartengono a un gruppo di autorizzazioni specifico.
- Cancella qualsiasi filtro cliccando sull'icona **×** all'interno del campo.

### Abilitare o Disabilitare un Utente

Ogni riga contiene un interruttore nella colonna **Disabilitato**. Clicca direttamente sull'interruttore nell'elenco per abilitare o disabilitare un account utente senza aprire l'editor.

### Aggiungere un Nuovo Utente

!!! note
    La creazione di nuovi account richiede una connessione internet attiva. Se sei offline, il pulsante di aggiunta mostrerà un'icona di connettività e l'azione non sarà disponibile.

1. Clicca sul **pulsante +** (pulsante fluttuante in basso a destra della pagina).
2. Si aprirà una finestra di dialogo. Compila i seguenti campi:
    - **Nome Completo** — obbligatorio.
    - **Email** — obbligatorio.
    - **Password** e **Conferma Password** — obbligatori in alcune installazioni (almeno 9 caratteri).
    - **Gruppi di Autorizzazioni Utente** — seleziona uno o più gruppi dal menu a discesa per controllare a cosa può accedere questo utente.
3. Clicca su **Salva** per creare l'account.

Un messaggio di conferma apparirà in fondo allo schermo quando l'utente è stato salvato con successo.

### Modificare un Utente

1. Trova l'utente nell'elenco e clicca sull'**icona della matita** sulla sua riga.
2. La finestra di dialogo dell'editor si aprirà in modalità modifica. Puoi aggiornare il **Nome Completo** e i **Gruppi di Autorizzazioni Utente**.
3. Clicca su **Salva** per applicare le modifiche, o su **Chiudi** per annullarle.

### Visualizzare un Utente

Clicca sull'**icona dell'occhio** sulla riga di un utente per aprire i suoi dettagli in modalità di sola lettura. In questa modalità non è possibile apportare modifiche. Clicca su **Chiudi** quando hai finito.

### Eliminare un Utente

1. Clicca sull'**icona del cestino** sulla riga dell'utente.
2. Apparirà una richiesta di conferma. Conferma per eliminare definitivamente l'account.

!!! warning
    L'eliminazione di un account utente è permanente e non può essere annullata.

---

## Gruppi

I gruppi di autorizzazioni definiscono quali aree, moduli, report e dati un insieme di utenti può accedere. Assegnare un utente a un gruppo gli concede tutte le autorizzazioni definite per quel gruppo.

### Esplorare l'Elenco Gruppi

L'elenco Gruppi mostra tutti i gruppi di autorizzazioni per nome. Il conteggio totale è mostrato in cima alla pagina.

### Ricerca e Filtri

- Usa il campo **ricerca per parole chiave** per filtrare i gruppi per nome.
- Usa i campi **Data da** e **Data a** per filtrare in base alla data di creazione.
- Usa i filtri metrici (**Progetto**, **Luogo**, **Area Tematica**, **Caso**, **Organizzazione**) per trovare gruppi associati a specifici ambiti di dati.
- Cancella qualsiasi filtro cliccando sull'icona **×** all'interno del campo.

### Aggiungere un Nuovo Gruppo

1. Clicca sul **pulsante +** (pulsante fluttuante in basso a destra della pagina).
2. Si aprirà una finestra di dialogo che mostra un elenco categorizzato degli elementi disponibili da assegnare al gruppo. Gli elementi sono raggruppati in categorie come **Ruoli**, **Schemi Modulo**, **Stati Modulo**, **Schemi Report** e qualsiasi tipo di metrica attiva.
3. Inserisci un **nome gruppo** nel campo nome in cima alla finestra di dialogo.
4. Seleziona gli elementi che desideri includere nel gruppo cliccandoci sopra. Almeno un **Ruolo** deve essere selezionato prima di poter salvare.
5. Clicca su **Salva** per creare il gruppo.

Apparirà un messaggio di conferma con il nome del gruppo quando è stato salvato.

### Modificare un Gruppo

1. Clicca sull'**icona della matita** sulla riga di un gruppo.
2. La finestra di dialogo dell'editor si aprirà con la configurazione attuale del gruppo precaricata.
3. Aggiorna il nome o aggiungi e rimuovi elementi secondo necessità. Almeno un Ruolo deve rimanere selezionato.
4. Clicca su **Salva** per applicare le modifiche.

### Visualizzare un Gruppo

Clicca sull'**icona dell'occhio** sulla riga di un gruppo per aprire la sua configurazione in modalità di sola lettura. Clicca su **Chiudi** quando hai finito.

### Eliminare un Gruppo

1. Clicca sull'**icona del cestino** sulla riga del gruppo.
2. Apparirà una richiesta di conferma. Conferma per eliminare definitivamente il gruppo.

!!! warning
    L'eliminazione di un gruppo è permanente. Gli utenti che erano assegnati solo a quel gruppo perderanno immediatamente le autorizzazioni associate.

---

## Risoluzione dei Problemi

### "Non è possibile creare nuovi account utente mentre si è offline."

!!! warning
    Il tuo dispositivo non è connesso a internet. I nuovi account utente possono essere creati solo quando si è online. Controlla la tua connessione e riprova. La modifica e la visualizzazione degli utenti esistenti rimangono disponibili anche offline.

### "Ops! Si è verificato un errore durante il salvataggio dell'Utente."

!!! warning
    L'utente non è stato salvato, probabilmente a causa di un errore di validazione o di un problema temporaneo del server. Verifica che tutti i campi obbligatori siano compilati correttamente e riprova. Se il problema persiste, contatta il tuo amministratore di sistema.

### "Ops! Si è verificato un errore durante l'esecuzione dell'azione richiesta."

!!! warning
    Questo messaggio può apparire durante il salvataggio o l'eliminazione di un gruppo. Potrebbe indicare un problema lato server o un conflitto con dati esistenti. Riprova dopo un momento. Se il problema continua, contatta il tuo amministratore di sistema.