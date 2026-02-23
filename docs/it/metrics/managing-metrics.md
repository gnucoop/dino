---
title: Gestione delle Metriche
description: Come sfogliare, creare, modificare, visualizzare, importare ed eliminare le voci delle metriche (aree tematiche, casi, località, organizzazioni, progetti) in Dino.
---

# Gestione delle Metriche

In Dino, puoi gestire diversi tipi di dati strutturati, chiamati metriche. Questi includono Aree Tematiche, Casi, Località, Progetti e Organizzazioni. Puoi accedere a ciascun tipo dalla navigazione principale. Ogni tipo di metrica ha una pagina di gestione dedicata con un layout coerente per visualizzare e gestire le sue voci.

![Gestione delle Metriche](../imgs/metrics/managing-metrics.png)

!!! note "Autorizzazione richiesta"
    La gestione dei valori delle metriche richiede autorizzazioni specifiche. Se non riesci a vedere le opzioni per creare, modificare o eliminare, contatta il tuo amministratore.

---

## Sfogliare l'Elenco

La pagina principale mostra un elenco di tutte le voci per il tipo di metrica selezionato. Puoi:

*   **Cercare e Filtrare**: Usa la barra di ricerca sopra l'elenco per trovare voci per nome o altri attributi.
*   **Ordinare**: Clicca sulle intestazioni delle colonne contrassegnate da un'icona di ordinamento per riordinare l'elenco.
*   **Esportare**: Clicca sul pulsante **Esporta** nella barra degli strumenti per scaricare l'elenco corrente come file.
*   **Selezionare o Espandere**: Clicca in qualsiasi punto di una riga per selezionarla. Clicca sull'icona di espansione per vedere più dettagli.

---

## Creare una Nuova Voce

1.  Clicca sul pulsante **+** (il pulsante circolare fluttuante in basso a destra dello schermo).
2.  Si aprirà una finestra di dialogo con i campi per la nuova voce.
3.  Compila le informazioni richieste e clicca **Salva**.

---

## Modificare o Visualizzare una Voce

Ogni riga nell'elenco ha delle icone di azione sul lato destro.

1.  Per visualizzare i dettagli di una voce senza modificarla, clicca sull'icona **Visualizza (occhio)**.
2.  Per modificare una voce, clicca sull'icona **Modifica (matita)**.
3.  Si aprirà la stessa finestra di dialogo dell'editor, popolata con i dati correnti della voce. Apporta le tue modifiche e clicca **Salva**.

---

## Eliminare le Voci

Puoi eliminare le voci singolarmente o in blocco.

**Per eliminare una singola voce:**
1.  Clicca sull'icona **Elimina (cestino)** sulla riga che desideri rimuovere.
2.  Apparirà una finestra di dialogo di conferma. Clicca **Conferma** per eliminare definitivamente la voce.

**Per eliminare più voci:**
1.  Seleziona le voci spuntando le caselle sulle loro righe.
2.  Apparirà una barra degli strumenti. Clicca sull'azione **Elimina** in questa barra degli strumenti.
3.  Conferma l'eliminazione nella finestra di dialogo che appare.

---

## Importare Voci in Blocco

Puoi aggiungere molte voci contemporaneamente importandole da un file.

1.  Clicca sul pulsante **Importa (caricamento cloud)**, che è un pulsante fluttuante in basso a destra dello schermo.
2.  Nella finestra di dialogo, clicca **Scegli file** e seleziona un file `.xls`, `.xlsx` o `.csv` dal tuo dispositivo.
3.  (Opzionale) Spunta la casella per **Non importare metriche se il nome esiste già** per evitare di creare voci duplicate.
4.  Clicca **Applica** per avviare l'importazione.
5.  Clicca **Chiudi** quando il processo è completo.

---

## Comprendere l'Editor delle Voci

Quando crei, modifichi o visualizzi una voce, si apre una finestra di dialogo con i suoi campi. I campi disponibili dipendono dal tipo di metrica.

### Campi Comuni
*   **Nome** *(Obbligatorio)*: Il nome visualizzato per questa voce. Deve essere univoco all'interno del suo tipo di metrica.
*   **Genitore**: Un campo opzionale per collegare questa voce a un elemento genitore, creando una gerarchia (ad esempio, un sotto-progetto all'interno di un progetto). Inizia a digitare per cercare e selezionare un genitore.

### Campi Specifici per Metrica

| Tipo di Metrica | Campi Chiave (Oltre a Nome e Genitore) |
| :--- | :--- |
| **Aree Tematiche** | Nessun campo standard aggiuntivo. |
| **Casi** | **Codice** (sola lettura), **Immagine** (carica o scatta una foto). |
| **Località** | **Coordinate**. |
| **Organizzazioni** | **Percorso Logo**, **URL Sito Web**. |
| **Progetti** | **Codice**, **Settori di Intervento**, **Donatori**, **Data Inizio**, **Data Fine**. |

### Attributi Aggiuntivi

Sotto i campi standard, troverai una sezione **Attributi aggiuntivi**. Qui puoi allegare coppie chiave-valore personalizzate a una voce.
*   Clicca **+** per aggiungere una nuova riga di attributo.
*   Clicca **-** accanto a un attributo per rimuoverlo.
*   Questa sezione è nascosta in modalità visualizzazione se non esistono attributi personalizzati.

### Salvare il Lavoro
Clicca **Salva** per creare o aggiornare la voce. Apparirà un breve messaggio di conferma.

!!! warning "Errori di Salvataggio"
    Se vedi un errore durante il salvataggio, controlla che tutti i campi obbligatori siano compilati e che il nome della voce non sia già in uso. Se il problema persiste, contatta il tuo amministratore.

!!! warning "Caricamento Immagine Offline"
    Se salvi una voce con un'immagine mentre sei offline, l'immagine non verrà caricata. Devi salvare nuovamente la voce una volta tornato online per caricare il file immagine.