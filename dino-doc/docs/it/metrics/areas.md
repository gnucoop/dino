---
title: Gestione dei valori metrici – Aree tematiche
description: Scopri come visualizzare, aggiungere, modificare, eliminare e cercare aree tematiche nella sezione di gestione delle metriche di Dino.
---

# Gestione dei valori metrici – Aree tematiche

La pagina **Aree tematiche** (accessibile dalla sezione Metriche) consente di organizzare i dati delle metriche in categorie gerarchiche. Qui puoi visualizzare, creare, modificare ed eliminare aree tematiche, oltre a filtrare ed esportare l'elenco.

![Main view of the Thematic Areas page](../imgs/metrics/areas.png)

## Cosa vedi

- I **breadcrumb** in alto mostrano la tua posizione corrente nell'applicazione (ad es., **Metriche > Aree tematiche**).
- La tabella principale elenca tutte le aree tematiche, mostrando colonne come **Nome area**, **Area padre** e (se configurati) altri attributi. Puoi personalizzare le colonne visibili facendo clic sull'icona **view_week** nell'intestazione.
- Una **barra di ricerca** e un **pannello dei filtri** ti permettono di trovare aree per parola chiave, intervallo di date o altri metadati.
- Il pulsante **Esporta** (cloud_download) consente di scaricare l'elenco corrente come file.
- Sono disponibili due pulsanti di azione flottanti:
    - **+ (Aggiungi nuovo)** – crea una nuova area tematica.
    - **cloud_upload** – importa aree da un file esterno.

## Lavorare con le aree tematiche

### Aggiungere una nuova area tematica

1. Fai clic sul pulsante flottante **+**.
2. Nella finestra di dialogo che si apre, compila i campi obbligatori (ad es., **Nome area**, **Area padre**).
3. Fai clic su **Crea** per salvare la nuova area.

!!! tip "Area padre"
    Per creare una sotto-area, seleziona un'**Area padre** dal menu a discesa. Se lasciato vuoto, la nuova area diventa una voce di primo livello.

### Modificare un'area esistente

1. Trova nella tabella l'area che vuoi modificare.
2. Fai clic sull'icona **edit** (matita) nella colonna delle azioni della riga.
3. Modifica i campi nella finestra di dialogo e fai clic su **Salva**.

### Visualizzare i dettagli

- Fai clic sull'icona **visibility** per aprire una finestra di dialogo di sola lettura che mostra tutti i campi dell'area.
- Puoi anche **fare clic su una riga** per espanderla e mostrare eventuali aree figlie (se la gerarchia è configurata).

### Eliminare un'area

1. Fai clic sull'icona **delete** (cestino) nella colonna delle azioni della riga.
2. Conferma l'eliminazione nella finestra di dialogo che appare.

!!! warning "Considerazioni sull'eliminazione"
    Eliminare un'area padre può influire sulle aree figlie. Dino ti avviserà se ci sono elementi associati. Procedi con cautela.

## Ricerca e filtri

- Usa il campo **ricerca per parola chiave** nella parte superiore dell'elenco per filtrare le aree per nome.
- Apri il pannello dei filtri facendo clic sulla freccia **expand**. Puoi impostare:
    - **Data da / Data a** – filtra per data di creazione.
    - **Filtri aggiuntivi** (ad es., campi specifici delle metriche) – se la tua istanza ha attributi personalizzati.
- Applica un **preset di filtro** (se disponibile) per caricare rapidamente combinazioni di filtri salvate.

## Esportazione dell'elenco

1. Fai clic sul pulsante **cloud_download** nella barra degli strumenti.
2. Scegli il formato di esportazione (ad es., CSV, Excel).
3. Il file verrà generato con l'insieme di aree attualmente visibile (filtrato).

## Azioni in blocco

Per eseguire azioni su più aree contemporaneamente (ad es., eliminarne diverse), seleziona le caselle di controllo accanto alle righe. I pulsanti delle azioni in blocco appariranno nell'intestazione della colonna. Attualmente, la schermata Aree tematiche supporta **l'eliminazione in blocco**.

## Navigare con i breadcrumb

I breadcrumb mostrano la tua posizione corrente (ad es., **Metriche > Aree tematiche**). Fai clic su un qualsiasi link dei breadcrumb per passare a un livello superiore.

## Pagine correlate

- [Panoramica delle metriche](index.md)
- [Gestione dei valori metrici – Casi](cases.md)
- [Gestione dei valori metrici – Posizioni](locations.md)
- [Gestione dei valori metrici – Organizzazioni](organizations.md)
- [Gestione dei valori metrici – Progetti](projects.md)
- [Utenti e gruppi](../administration/users.md)