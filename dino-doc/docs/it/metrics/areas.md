---
title: Gestione dei valori delle metriche – Aree tematiche
description: Scopri come visualizzare, aggiungere, modificare, eliminare e cercare le aree tematiche nella sezione di gestione delle metriche di Dino.
---

# Gestione dei valori delle metriche – Aree tematiche

La pagina **Aree tematiche** (accessibile dalla sezione Metrics) ti permette di organizzare i dati delle metriche in categorie gerarchiche. Qui puoi visualizzare, creare, modificare ed eliminare le aree tematiche, oltre a filtrare ed esportare la lista.

![Vista principale della pagina Aree tematiche](../imgs/metrics/areas.png)

## Cosa vedi

- Il **percorso di navigazione** in alto mostra la tua posizione attuale nell'applicazione (ad esempio, **Metrics > Aree tematiche**).
- La tabella principale elenca tutte le aree tematiche, mostrando colonne come **Nome area**, **Area padre** e (se configurati) altri attributi. Puoi personalizzare le colonne visibili facendo clic sull'icona **Visualizza colonna** nell'intestazione.
- Una **barra di ricerca** e un **pannello dei filtri** ti consentono di trovare le aree per parola chiave, intervallo di date o altri metadati.
- Il pulsante **Esporta** (cloud_download) ti permette di scaricare la lista corrente come file.
- Sono disponibili due pulsanti di azione flottanti:
    - **+ (Aggiungi nuovo)** – crea una nuova area tematica.
    - **cloud_upload** – importa le aree da un file esterno.

## Lavorare con le aree tematiche

### Aggiungere una nuova area tematica

1. Fai clic sul pulsante flottante **+**.
2. Nella finestra di dialogo che si apre, compila i campi obbligatori (ad esempio, **Nome area**, **Area padre**).
3. Fai clic su **Crea** per salvare la nuova area.

!!! tip "Area padre"
    Per creare una sotto‑area, seleziona un'**Area padre** dal menu a tendina. Se lasciato vuoto, il nuovo elemento diventa un'area di primo livello.

### Modificare un'area esistente

1. Individua nella tabella l'area che vuoi modificare.
2. Fai clic sull'icona **edit** (matita) nella colonna delle azioni della riga.
3. Modifica i campi nella finestra di dialogo e fai clic su **Salva**.

### Visualizzare i dettagli

- Fai clic sull'icona **visibility** per aprire una finestra di dialogo di sola lettura che mostra tutti i campi dell'area.
- Puoi anche **fare clic su una riga** per espanderla e mostrare le eventuali aree figlie (se la gerarchia è configurata).

### Eliminare un'area

1. Fai clic sull'icona **delete** (cestino) nella colonna delle azioni della riga.
2. Conferma l'eliminazione nella finestra di dialogo che appare.

!!! warning "Considerazioni sull'eliminazione"
    L'eliminazione di un'area padre può avere effetti sulle aree figlie. Dino ti avviserà se ci sono elementi associati. Procedi con cautela.

## Ricerca e filtro

- Usa il campo di **ricerca per parola chiave** in cima alla lista per filtrare le aree per nome.
- Apri il pannello dei filtri facendo clic sulla freccia **expand**. Puoi impostare:
    - **Data da / Data a** – filtra per data di creazione.
    - **Filtri aggiuntivi** (ad esempio, campi specifici delle metriche) – se la tua istanza ha attributi personalizzati.
- Applica una **preimpostazione di filtro** (se disponibile) per caricare rapidamente combinazioni di filtri salvate.

## Esportare la lista

1. Fai clic sul pulsante **cloud_download** nella barra degli strumenti.
2. Scegli il formato di esportazione (ad esempio, CSV, Excel).
3. Il file verrà generato con l'insieme di aree attualmente visibile (filtrato).

## Azioni multiple

Per eseguire azioni su più aree contemporaneamente (ad esempio, eliminarne diverse), seleziona le caselle di controllo accanto alle righe. I pulsanti per le azioni multiple appariranno nell'intestazione della colonna. Attualmente, la schermata Aree tematiche supporta l'**eliminazione multipla**.

## Navigare con il percorso di navigazione

Il percorso di navigazione mostra la tua posizione attuale (ad esempio, **Metrics > Aree tematiche**). Fai clic su un qualsiasi link del percorso per salire a un livello superiore.

## Pagine correlate

- [Panoramica delle metriche](index.md)
- [Gestione dei valori delle metriche – Casi](cases.md)
- [Gestione dei valori delle metriche – Posizioni](locations.md)
- [Gestione dei valori delle metriche – Organizzazioni](organizations.md)
- [Gestione dei valori delle metriche – Progetti](projects.md)
- [Utenti e gruppi](../administration/users.md)