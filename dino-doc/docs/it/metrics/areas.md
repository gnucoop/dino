---
title: Gestione dei valori delle metriche – Aree tematiche
description: Scopri come visualizzare, aggiungere, modificare, eliminare e cercare le aree tematiche nella sezione di gestione delle metriche di Dino.
---

# Gestione dei valori delle metriche – Aree tematiche

La pagina **Aree tematiche** (accessibile dalla sezione Metrics) ti consente di organizzare i dati delle metriche in categorie gerarchiche. Qui puoi visualizzare, creare, modificare ed eliminare le aree tematiche, oltre a filtrare ed esportare la lista.

![Visualizzazione principale della pagina Aree tematiche](../imgs/metrics/areas.png)

## Cosa vedi

- Il **percorso di navigazione** in alto mostra la tua posizione attuale nell'applicazione (ad es. **Metrics > Aree tematiche**).
- La tabella principale elenca tutte le aree tematiche, mostrando colonne come **Area Name**, **Area genitore** e (se configurati) altri attributi. Puoi personalizzare le colonne visibili cliccando il pulsante **Colonne** sopra la tabella.
- Un campo **cerca per parola chiave** e il pulsante **Filtri** ti permettono di trovare le aree per nome o per data di creazione.
- Il pulsante **Esporta** (cloud_download) ti consente di scaricare la lista corrente come file.
- Sono disponibili due pulsanti nella barra degli strumenti:
    - **Add new AREA** – crea una nuova area tematica.
    - **Import AREA** – apre la pagina di importazione, dove carichi un file `.xls`, `.xlsx` o `.csv`, mappi le sue colonne e controlli il risultato. Le aree il cui nome esiste già vengono riutilizzate, non aggiornate.

## Lavorare con le Aree tematiche

### Aggiungere una nuova area tematica

1. Clicca il pulsante **Add new AREA** nella barra degli strumenti.
2. Nella finestra che si apre, compila il campo **Area Name** e, se necessario, **Area genitore** ed eventuali attributi aggiuntivi. I campi opzionali sono contrassegnati con *(optional)*.
3. Clicca **Salva** per creare la nuova area.

!!! tip "Area genitore"
    Per creare una sotto-area, inizia a digitare nel campo **Area genitore** e scegli l'area genitore dai suggerimenti. Se lasciato vuoto, la nuova area diventa una voce di primo livello.

### Modificare un'area esistente

1. Trova nella tabella l'area che vuoi modificare.
2. Passa il mouse sopra la sua riga e clicca l'icona **Modifica** (matita), oppure clicca la riga per selezionarla e clicca **Modifica** nella barra delle azioni sopra la tabella.
3. Modifica i campi nella finestra e clicca **Salva**.

![Finestra di modifica per modificare un valore di metrica](../imgs/metrics/areas-edit.png)

### Visualizzare i dettagli

- Passa il mouse sopra una riga e clicca l'icona **Visibilità** (occhio), oppure seleziona la riga e clicca **Vedi** nella barra delle azioni, per aprire una finestra di sola lettura che mostra tutti i campi dell'area.

### Eliminare un'area

1. Clicca la riga dell'area per selezionarla, poi clicca **Elimina** nella barra delle azioni sopra la tabella.
2. Conferma l'eliminazione nella finestra che appare.

!!! warning "Considerazioni sull'eliminazione"
    Un'area utilizzata da form, o che ha aree figlie, non può essere eliminata. Se solo i report la utilizzano, Dino ti avvisa e ti consente di confermare. I gruppi di utenti che concedono l'area non vengono controllati: rimuovila prima da essi. Vedi [Metriche](index.md).

## Ricerca e filtro

- Usa il campo di **ricerca per parola chiave** sopra la lista per filtrare le aree per nome.
- Clicca **Filtri** per impostare una **Data di partenza** e una **Fino ad oggi**, che filtrano per data di creazione, poi clicca **Cerca**.
- I filtri applicati appaiono come chip sotto la barra degli strumenti; clicca l'icona **cancella** su un chip per rimuoverlo.

## Esportare la lista

1. Clicca il pulsante **Esporta** nella barra degli strumenti.
2. Scegli cosa esportare: *Elementi nella pagina* (predefinito), gli elementi che corrispondono ai tuoi filtri, oppure *Tutti gli elementi*.
3. Scegli il formato: *csv*, *xlsx* o *splitted xlsx*, poi clicca **Esporta**.

## Azioni in blocco

Per eseguire azioni su più aree contemporaneamente, seleziona le caselle accanto alle righe. Quando è selezionata una riga, le sue azioni individuali appaiono nella barra delle azioni sopra la tabella; quando sono selezionate più righe, la barra offre le azioni in blocco. La schermata Aree tematiche attualmente supporta solo l'**eliminazione in blocco**.

## Navigare con il percorso di navigazione

Il percorso di navigazione mostra la tua posizione attuale (ad es. **Metrics > Aree tematiche**). Clicca qualsiasi link del percorso di navigazione per saltare a un livello superiore.

## Pagine correlate

- [Panoramica delle metriche](index.md)
- [Gestione dei valori delle metriche – Cases](cases.md)
- [Gestione dei valori delle metriche – Posizioni](locations.md)
- [Gestione dei valori delle metriche – Organizzazioni](organizations.md)
- [Gestione dei valori delle metriche – Progetti](projects.md)
- [Utenti e gruppi](../administration/users.md)