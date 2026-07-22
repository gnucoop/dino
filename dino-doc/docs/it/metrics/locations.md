---
title: Posizioni
description: Gestisci le posizioni geografiche utilizzate in tutte le metriche e i moduli di Dino.
---

# Posizioni

La pagina **Posizioni** ti consente di gestire le posizioni geografiche a cui fanno riferimento i tuoi moduli, i casi e altre metriche. Puoi aggiungere nuove posizioni, modificare quelle esistenti, importare dati in blocco ed esportare l'elenco corrente.

![Vista principale della pagina Posizioni](../imgs/metrics/locations.png)

## Cosa vedi

- **Breadcrumb** – mostra la tua posizione corrente nella navigazione.
- **Ricerca e filtri** – ricerca per parola chiave, selettore intervallo di date e filtri avanzati configurabili (ad es. per metrica, stato, utente). Puoi anche salvare e caricare preset di filtri.
- **Tabella** – mostra per impostazione predefinita Nome posizione e Posizione padre. Le colonne nascoste (ID, Data di creazione, Coordinate, Attributi aggiuntivi) possono essere visualizzate tramite il pulsante **Personalizza colonne** (in basso a destra dell'intestazione della tabella).
- **Paginazione** – controlli per navigare tra le pagine.
- **Azioni bulk** – seleziona le righe usando le caselle di controllo per eliminare o modificare più posizioni contemporaneamente.
- **Pulsanti di azione flottanti** – **Aggiungi nuovo** (icona più) e **Importa** (icona di caricamento cloud) rimangono disponibili mentre scorri.

## Azioni sulle righe

Ogni riga ha tre azioni rapide (visibili passando il mouse sulla riga):

- **Modifica** – apre il dialogo della posizione per modificarne i dettagli.
- **Elimina** – rimuove la posizione dopo conferma.
- **Visualizza** – apre un dialogo di sola lettura che mostra tutti i campi.

Cliccando su una riga la si seleziona (evidenzia) e, se l'elenco è espandibile, mostra un pannello dettagli con dati aggiuntivi.

## Lavorare con le posizioni

### Aggiungere una nuova posizione

1. Clicca sul pulsante flottante **Aggiungi nuovo** (angolo in basso a destra).
2. Nel dialogo, compila i campi obbligatori (ad es. Nome posizione).
3. Opzionalmente, imposta una Posizione padre, Coordinate e Attributi aggiuntivi.
4. Clicca **Salva**.

### Modificare una posizione

1. Clicca sull'icona **Modifica** (matita) sulla riga desiderata.
2. Aggiorna i campi nel dialogo.
3. Clicca **Salva**.

### Eliminare una posizione

1. Clicca sull'icona **Elimina** (cestino) sulla riga.
2. Conferma l'eliminazione nel prompt.

### Importare posizioni da un file

1. Clicca sul pulsante flottante **Importa** (icona di caricamento cloud).
2. Seleziona un file CSV o Excel seguendo il formato previsto.
3. Mappa le colonne ai campi della posizione, se necessario.
4. Clicca **Importa**.

!!! tip "Modifica bulk"
    Seleziona più righe usando le caselle di controllo, quindi clicca sul pulsante **Modifica** (icona edit_note) che appare sopra la tabella per aggiornare più posizioni contemporaneamente.

### Esportare l'elenco delle posizioni

1. Clicca sul pulsante **Esporta** (icona di download cloud) nella barra dei filtri.
2. Scegli il formato di esportazione (CSV o Excel).
3. Il file viene scaricato automaticamente.

## Pagine correlate

- [Panoramica metriche](index.md) – torna alla home delle metriche.
- [Casi](cases.md) – gestisci i casi che fanno riferimento alle posizioni.
- [Organizzazioni](organizations.md) – gestisci le organizzazioni collegate alle posizioni.
- [Progetti](projects.md) – visualizza i progetti associati alle posizioni.

!!! warning "Eliminazione di una posizione"
    Eliminare una posizione potrebbe influire su moduli e casi che vi fanno riferimento. Assicurati che nessun record attivo dipenda dalla posizione prima di rimuoverla.
