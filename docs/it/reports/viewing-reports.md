---
title: Visualizzare e Gestire i Report
description: Come sfogliare, filtrare, visualizzare, esportare, aggiungere ai preferiti ed eliminare i report in Dino.
---

# Visualizzare e Gestire i Report

Questa pagina elenca tutti i report generati da uno specifico schema di report. Da questo elenco centrale puoi sfogliare, cercare, visualizzare, esportare, contrassegnare come preferito ed eliminare singoli report.

---

## Sfogliare l'Elenco

L'elenco mostra tutti i report per lo schema selezionato. Ogni riga rappresenta un report.

L'elenco include le seguenti colonne:

*   **Utente**: La persona che ha creato il report.
*   **Nome**: Il titolo del report.
*   **Stato**: Lo stato attuale del report.
*   **Raccolto Dal / Raccolto Fino Al**: L'intervallo di date dei dati inclusi nel report.
*   **Data di Creazione**: Quando è stato creato il report.
*   **Progetto, Luogo, Area, Caso, Organizzazione**: Queste colonne appaiono solo se i corrispondenti tipi di metrica sono attivi nel tuo spazio di lavoro.

Usa i controlli di impaginazione in fondo all'elenco per navigare tra le pagine.

---

## Cercare e Filtrare

Usa la barra dei filtri sopra l'elenco per restringere i report visualizzati.

1.  Fai clic su qualsiasi campo filtro (come **Progetto** o **Luogo**) per selezionare valori specifici.
2.  Puoi combinare più filtri.
3.  Per salvare la tua combinazione di filtri per un uso successivo, fai clic sull'icona del menu dei preset nella barra dei filtri e seleziona **Salva come preset**.
4.  Per caricare un filtro salvato, apri il menu dei preset e seleziona il nome del preset.

---

## Azioni sui Report

Ogni riga del report ha delle icone di azione sulla destra. Le azioni disponibili per te dipendono dai tuoi permessi utente.

*   **Visualizza** (![icona occhio](../imgs/reports/eye-icon.png)): Apre il report in una visualizzazione di sola lettura.
*   **Aggiungi ai preferiti** (![icona stella](../imgs/reports/star-outline-icon.png)): Contrassegna questo report come preferito per un accesso rapido.
*   **Rimuovi dai preferiti** (![icona stella](../imgs/reports/star-filled-icon.png)): Rimuove il report dalla tua lista dei preferiti.
*   **Elimina** (![icona cestino](../imgs/reports/delete-icon.png)): Elimina definitivamente il report. Ti verrà chiesto di confermare questa azione.

!!! tip "Azioni basate sui permessi"
    Potresti non vedere tutte le azioni. Le icone visualizzate si basano sui permessi concessi al tuo ruolo utente.

---

## Aggiungere un Nuovo Report

Un pulsante galleggiante **+** è disponibile se hai il permesso di creare nuovi report per questo schema.

1.  Fai clic sul pulsante **+**.
2.  Se lo schema del report utilizza funzionalità AI, un suggerimento mostrerà quanti crediti verranno utilizzati. La creazione del report procederà automaticamente.

!!! warning "Crediti insufficienti"
    Se non hai abbastanza crediti AI, apparirà un messaggio di avviso. Dovrai aggiungere più crediti al tuo account prima di poter creare questo report.

---

## Visualizzare un Report

Per visualizzare un report, fai clic sulla sua riga nell'elenco o usa l'icona di azione **Visualizza**.

### 1. Selezionare le Metriche

Se lo schema del report è collegato a delle metriche, vedrai prima un passaggio di selezione delle metriche.

1.  Scegli i valori per le metriche richieste (ad es., Progetto, Luogo).
2.  Regola **Data Inizio** e **Data Fine** se necessario.
3.  Fai clic su **Avanti** per generare e caricare il report.

### 2. Visualizzazione del Report

La vista del report mostra il titolo del report, l'intervallo di date, le metriche selezionate e il contenuto principale del report, che è strutturato secondo il suo schema.

!!! note "Contenuto generato da AI"
    Se il report include testo generato da AI, vedrai un indicatore di avanzamento (ad es., "Generazione prompt report 1 di 3") mentre il contenuto viene preparato. Questo avviene automaticamente.

### 3. Esportare un Report

Dalla vista del report, puoi esportarlo in diversi formati.

*   **PDF**: Fai clic sul pulsante PDF per scaricare un file PDF.
*   **Excel (XLSX)**: Fai clic sul pulsante Excel per scaricare un foglio di calcolo.
*   **Word (DOCX)**: Fai clic sul pulsante Word per scaricare un documento Word.

!!! warning "Nessun contenuto esportabile"
    Se provi a esportare in Excel e vedi un messaggio che dice "Nessun widget esportabile trovato", significa che il report non contiene alcun dato di tabella o grafico che possa essere inserito in un foglio di calcolo.

---

## Risoluzione dei Problemi

### "Non sono stati trovati Moduli per questo Report"

!!! warning
    Questo errore significa che il report non può essere generato perché non ci sono dati inviati collegati ad esso. Assicurati che siano state raccolte delle compilazioni di moduli utilizzando lo schema del modulo connesso a questo report prima di tentare di visualizzarlo.