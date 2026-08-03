---
title: Posizioni
description: Gestisci le posizioni geografiche utilizzate nelle metriche e nei moduli di Dino.
---

# Posizioni

La pagina **Posizioni** consente di gestire le posizioni geografiche a cui fanno riferimento i tuoi moduli, casi e altre metriche. Puoi aggiungere nuove posizioni, modificare le voci esistenti, importare dati in blocco ed esportare l'elenco corrente.

![Main view of the Locations page](../imgs/metrics/locations.png)

## Cosa vedi

- **Percorso di navigazione** – mostra la tua posizione attuale nella navigazione.
- **Ricerca e filtri** – ricerca per parola chiave, selettore intervallo di date e filtri avanzati configurabili (ad es. per metrica, stato, utente). Puoi anche salvare e caricare preset dei filtri.
- **Tabella** – mostra Nome posizione e Posizione padre per impostazione predefinita. Le colonne nascoste (ID, Data di creazione, Coordinate, Attributi aggiuntivi) possono essere visualizzate tramite il pulsante **Personalizza colonne** (in basso a destra nell'intestazione della tabella).
- **Paginazione** – controlli per navigare tra le pagine.
- **Azioni in blocco** – seleziona le righe usando le caselle di controllo per eliminare o modificare più posizioni contemporaneamente.
- **Pulsanti di azione flottanti** – **Aggiungi nuovo** (icona più) e **Importa** (icona di caricamento sul cloud) restano disponibili mentre scorri.

## Azioni sulle righe

Ogni riga ha tre azioni rapide (visibili al passaggio del mouse sulla riga):

- **Modifica** – apre la finestra di dialogo della posizione per modificarne i dettagli.
- **Elimina** – rimuove la posizione dopo la conferma.
- **Visualizza** – apre una finestra di dialogo in sola lettura che mostra tutti i campi.

Facendo clic su una riga, questa viene selezionata (evidenziata) e, se l'elenco è espandibile, viene mostrato un pannello dei dettagli con dati aggiuntivi.

## Operare con le posizioni

### Aggiungere una nuova posizione

1. Fai clic sul pulsante flottante **Aggiungi nuovo** (angolo in basso a destra).
2. Nella finestra di dialogo, compila i campi obbligatori (ad es. Nome posizione).
3. Imposta opzionalmente una Posizione padre, le Coordinate e gli Attributi aggiuntivi.
4. Fai clic su **Salva**.

### Modificare una posizione

1. Fai clic sull'icona **Modifica** (matita) nella riga desiderata.
2. Aggiorna i campi nella finestra di dialogo.
3. Fai clic su **Salva**.

### Eliminare una posizione

1. Fai clic sull'icona **Elimina** (cestino) nella riga.
2. Conferma l'eliminazione nella richiesta di conferma.

### Importare posizioni da un file

1. Fai clic sul pulsante flottante **Importa** (icona di caricamento sul cloud).
2. Seleziona un file CSV o Excel seguendo il formato previsto.
3. Se necessario, associa le colonne ai campi della posizione.
4. Fai clic su **Importa**.

!!! tip "Modifica in blocco"
    Seleziona più righe usando le caselle di controllo, quindi fai clic sul pulsante **Modifica** (icona edit_note) che appare sopra la tabella per aggiornare più posizioni contemporaneamente.

### Esportare l'elenco delle posizioni

1. Fai clic sul pulsante **Esporta** (icona di download dal cloud) nella barra dei filtri.
2. Scegli il formato di esportazione (CSV o Excel).
3. Il file viene scaricato automaticamente.

## Pagine correlate

- [Panoramica metriche](index.md) – torna alla home delle metriche.
- [Casi](cases.md) – gestisci i casi che fanno riferimento alle posizioni.
- [Organizzazioni](organizations.md) – gestisci le organizzazioni collegate alle posizioni.
- [Progetti](projects.md) – visualizza i progetti associati alle posizioni.

!!! warning "Eliminazione di una posizione"
    L'eliminazione di una posizione può influire su moduli e casi che vi fanno riferimento. Assicurati che nessun record attivo dipenda dalla posizione prima di rimuoverla.