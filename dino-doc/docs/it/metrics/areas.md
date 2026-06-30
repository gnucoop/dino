---
title: Gestione dei Valori delle Metriche – Aree Tematiche
description: Scopri come visualizzare, aggiungere, modificare, eliminare e cercare aree tematiche nella sezione di gestione delle metriche di Dino.
---

# Gestione dei Valori delle Metriche – Aree Tematiche

La pagina **Aree Tematiche** (raggiungibile dalla sezione Metriche) ti consente di organizzare i dati delle tue metriche in categorie gerarchiche. Qui puoi visualizzare, creare, modificare ed eliminare aree tematiche, oltre a filtrare ed esportare l’elenco.

![Vista principale della pagina di gestione dei valori delle metriche](../imgs/metrics/areas.png)

## Cosa Vedi

- Il **percorso di navigazione** (breadcrumb) in alto mostra la tua posizione corrente nell’applicazione.
- La tabella principale elenca tutte le aree tematiche, mostrando colonne come **Nome Area**, **Area Genitore** e (se configurati) altri attributi. Puoi personalizzare le colonne visibili cliccando sull’icona **view_week** nell’intestazione.
- Una **barra di ricerca** e un **pannello dei filtri** ti permettono di trovare aree per parola chiave, intervallo di date o altri metadati.
- Il pulsante **Esporta** (cloud_download) consente di scaricare l’elenco corrente come file.
- Sono disponibili due pulsanti di azione fluttuanti:
    - **+ (Aggiungi Nuovo)** – crea una nuova area tematica.
    - **cloud_upload** – importa aree da un file esterno.

## Lavorare con le Aree Tematiche

### Aggiungere una Nuova Area Tematica

1. Clicca sul pulsante fluttuante **+** .
2. Nella finestra di dialogo che si apre, compila i campi obbligatori (ad es. **Nome Area**, **Area Genitore**).
3. Clicca su **Crea** per salvare la nuova area.

!!! tip "Area Genitore"
    Per creare una sotto‑area, seleziona un'**Area Genitore** dal menu a discesa. Se lasciato vuoto, la nuova area diventa un elemento di primo livello.

### Modificare un’Area Esistente

1. Trova nella tabella l’area che vuoi modificare.
2. Clicca sull’icona **edit** (matita) nella colonna delle azioni della riga.
3. Modifica i campi nella finestra di dialogo e clicca su **Salva**.

### Visualizzare i Dettagli

- Clicca sull’icona **visibility** per aprire una finestra di dialogo in sola lettura che mostra tutti i campi dell’area.
- Puoi anche **cliccare su una riga** per espanderla e rivelare eventuali aree figlie (se la gerarchia è configurata).

### Eliminare un’Area

1. Clicca sull’icona **delete** (cestino) nella colonna delle azioni della riga.
2. Conferma l’eliminazione nella finestra di dialogo che appare.

!!! warning "Considerazioni sull’Eliminazione"
    Eliminare un’area genitore potrebbe influenzare le aree figlie. Dino ti avviserà se sono presenti elementi associati. Procedi con cautela.

## Ricerca e Filtri

- Usa il campo di **ricerca per parola chiave** nella parte superiore dell’elenco per filtrare le aree per nome.
- Apri il pannello dei filtri cliccando sulla freccia **expand**. Puoi impostare:
    - **Da data / A data** – filtra per data di creazione.
    - **Filtri aggiuntivi** (ad es. campi specifici delle metriche) – se la tua istanza ha attributi personalizzati.
- Applica un **preset di filtro** (se disponibile) per caricare rapidamente combinazioni di filtri salvate.

## Esportare l’Elenco

1. Clicca sul pulsante **cloud_download** nella barra degli strumenti.
2. Scegli il formato di esportazione (ad es. CSV, Excel).
3. Il file verrà generato con l’insieme di aree attualmente visibili (filtrate).

## Azioni in Blocco

Per eseguire azioni su più aree contemporaneamente (ad es. eliminarne diverse), seleziona le caselle di controllo accanto alle righe. I pulsanti per le azioni in blocco appariranno nell’intestazione della colonna. Attualmente, la schermata Aree Tematiche supporta l’**eliminazione in blocco**.

## Navigare con il Percorso di Navigazione

Il percorso di navigazione mostra la tua posizione corrente (ad es. **Metriche > Aree Tematiche**). Clicca su qualsiasi collegamento del percorso per saltare a un livello superiore.

## Pagine Correlate

- [Panoramica delle Metriche](index.md)
- [Gestione dei Valori delle Metriche – Casi, Luoghi, Organizzazioni e Progetti](areas.md) (questa pagina)
- [Utenti e Gruppi](../administration/users.md)
