---
title: Posizioni
description: Gestisci le posizioni geografiche utilizzate nelle metriche e nei form di Dino.
---

# Posizioni

La pagina **Posizioni** ti permette di gestire le posizioni geografiche a cui fanno riferimento i tuoi form, i casi e le altre metriche. Puoi aggiungere nuove posizioni, modificare quelle esistenti, importare dati in blocco ed esportare la lista corrente.

![Vista principale della pagina Posizioni](../imgs/metrics/locations.png)

## Cosa trovi nella pagina

- **Percorso di navigazione** – mostra la tua posizione attuale all'interno della navigazione.
- **Ricerca e filtri** – ricerca per parola chiave, selettore di intervallo di date e filtri avanzati configurabili (ad esempio per metrica, stato, utente). Puoi anche salvare e caricare preset di filtri.
- **Tabella** – mostra per impostazione predefinita Nome posizione e Posizione padre. Le colonne nascoste (ID, Data di creazione, Coordinate, Attributi aggiuntivi) possono essere visualizzate tramite il pulsante **Personalizza le colonne** (in basso a destra nell'intestazione della tabella).
- **Impaginazione** – controlli per navigare tra le pagine.
- **Azioni multiple** – seleziona le righe con le caselle di controllo per eliminare o modificare più posizioni in una sola volta.
- **Pulsanti di azione flottanti** – **Aggiungi nuovo** (icona con il più) e **Importa** (icona di caricamento su cloud) restano disponibili mentre scorri la pagina.

## Azioni sulle righe

Ogni riga dispone di tre azioni rapide (visibili quando passi il mouse sulla riga):

- **Modifica** – apre la finestra di dialogo della posizione per modificarne i dettagli.
- **Elimina** – rimuove la posizione dopo la conferma.
- **Visualizza** – apre una finestra di sola lettura che mostra tutti i campi.

Facendo clic su una riga questa viene selezionata (evidenziata) e, se la lista è espandibile, viene mostrato un pannello di dettaglio con dati aggiuntivi.

## Lavorare con le posizioni

### Aggiungere una nuova posizione

1. Fai clic sul pulsante flottante **Aggiungi nuovo** (in basso a destra).
2. Nella finestra di dialogo, compila i campi obbligatori (ad esempio Nome posizione).
3. Facoltativamente, imposta una Posizione padre, le Coordinate e gli Attributi aggiuntivi.
4. Fai clic su **Salva**.

### Modificare una posizione

1. Fai clic sull'icona **Modifica** (matita) sulla riga desiderata.
2. Aggiorna i campi nella finestra di dialogo.
3. Fai clic su **Salva**.

### Eliminare una posizione

1. Fai clic sull'icona **Elimina** (cestino) sulla riga.
2. Conferma l'eliminazione nella finestra di richiesta.

### Importare posizioni da un file

1. Fai clic sul pulsante flottante **Importa** (icona di caricamento su cloud).
2. Seleziona un file CSV o Excel conforme al formato previsto.
3. Se necessario, associa le colonne ai campi della posizione.
4. Fai clic su **Importa**.

!!! tip "Modifica multipla"
    Seleziona più righe con le caselle di controllo, quindi fai clic sul pulsante **Modifica** (icona edit_note) che compare sopra la tabella per aggiornare più posizioni in una sola volta.

### Esportare la lista delle posizioni

1. Fai clic sul pulsante **Esporta** (icona di download dal cloud) nella barra dei filtri.
2. Scegli il formato di esportazione (CSV o Excel).
3. Il file viene scaricato automaticamente.

### Coordinate della posizione

Se imposti l'attributo "coordinates" di uno specifico valore di posizione, l'informazione verrà usata per visualizzare i dati del tuo form su una [mappa](../forms/forms-map.md).

## Pagine correlate

- [Panoramica delle metriche](index.md) – torna alla home delle metriche.
- [Casi](cases.md) – gestisci i casi che fanno riferimento alle posizioni.
- [Organizzazioni](organizations.md) – gestisci le organizzazioni collegate alle posizioni.
- [Progetti](projects.md) – consulta i progetti associati alle posizioni.