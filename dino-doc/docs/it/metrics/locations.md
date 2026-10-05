---
title: Posizioni
description: Gestisci le posizioni geografiche utilizzate nelle metriche e nei form di Dino.
---

# Posizioni

La pagina **Posizioni** ti permette di gestire le posizioni geografiche a cui fanno riferimento i tuoi form, i casi e altre metriche. Puoi aggiungere nuove posizioni, modificare quelle esistenti, importare dati in blocco ed esportare la lista attuale.

![Visualizzazione principale della pagina Posizioni](../imgs/metrics/locations.png)

## Cosa vedi

- **Percorso di navigazione** – mostra la tua posizione attuale nella navigazione.
- **Ricerca e Filtri** – un campo di ricerca per parole chiave e il pulsante **Filtri** per filtrare per data di creazione (**Data di partenza** / **Fino ad oggi**).
- **Contatore elementi trovati** – mostra quante posizioni corrispondono ai filtri attuali.
- **tabella** – mostra per impostazione predefinita Nome posizione e Posizione padre. Le colonne nascoste (ID, Data di creazione, Coordinate, Attributi aggiuntivi) possono essere visualizzate tramite il pulsante **Colonne**, sopra la tabella a destra.
- **Paginazione** – controlli per navigare tra le pagine.
- **Azioni in blocco** – seleziona le righe usando le caselle di controllo per eliminare più posizioni contemporaneamente.
- **Pulsanti della barra degli strumenti** – **Add new LOCATION** (icona più) e **Import LOCATION** (icona di caricamento cloud) si trovano sopra la tabella.

## Azioni sulle righe

Passa il mouse su una riga per mostrare le icone **Modifica** e **Vedi**. Clicca sulla riga per selezionarla ed evidenziarla: la barra delle azioni sopra la tabella mostrerà quindi tutte le azioni:

- **Modifica** – apre la finestra della posizione per modificarne i dettagli.
- **Elimina** – rimuove la posizione dopo conferma.
- **Vedi** – apre una finestra di sola lettura che mostra tutti i campi.

## Lavorare con le posizioni

### Aggiungere una nuova posizione

1. Clicca il pulsante **Add new LOCATION** sopra la tabella.
2. Nella finestra, compila i campi obbligatori (ad esempio, Nome posizione). I campi opzionali sono contrassegnati con *(opzionale)*.
3. Facoltativamente, imposta una Posizione padre, le Coordinate e gli Attributi aggiuntivi.
4. Clicca **Salva**.

### Modificare una posizione

1. Passa il mouse sulla riga e clicca l'icona **Modifica** (matita), oppure seleziona la riga e clicca **Modifica** nella barra delle azioni.
2. Aggiorna i campi nella finestra.
3. Clicca **Salva**.

### Eliminare una posizione

1. Clicca sulla riga per selezionarla, poi clicca **Elimina** nella barra delle azioni sopra la tabella.
2. Conferma l'eliminazione nella richiesta.

Una posizione utilizzata da form, o che ha posizioni figlie, non può essere eliminata; vedi [Metriche](index.md).

### Importare posizioni da un file

1. Clicca il pulsante **Import LOCATION** sopra la tabella.
2. Carica un file `.xls`, `.xlsx` o `.csv`.
3. Mappa le colonne del file ai campi della posizione.
4. Clicca **Applica importazione** e controlla il risultato.

Le posizioni il cui nome esiste già vengono riutilizzate, non aggiornate.

### Esportare la lista delle posizioni

1. Clicca **Esporta** nella barra degli strumenti.
2. Scegli cosa esportare: *Elementi nella pagina* (impostazione predefinita), gli elementi che corrispondono ai tuoi filtri, oppure *Tutti gli elementi*.
3. Scegli il formato: *csv*, *xlsx* o *splitted xlsx*, poi clicca **Esporta**.

!!! tip "Eliminazione in blocco"
    Seleziona più righe usando le caselle di controllo, poi clicca **Elimina** nella barra delle azioni sopra la tabella per eliminare più posizioni contemporaneamente.

### Coordinate della posizione

Se imposti l'attributo **Coordinate** per una posizione, tale informazione viene utilizzata per visualizzare i dati dei tuoi form su una [mappa](../forms/forms-map.md).

## Pagine correlate

- [Panoramica delle metriche](index.md) – torna alla home delle metriche.
- [Casi](cases.md) – gestisci i casi che fanno riferimento alle posizioni.
- [Organizzazioni](organizations.md) – gestisci le organizzazioni legate alle posizioni.
- [Progetti](projects.md) – visualizza i progetti associati alle posizioni.