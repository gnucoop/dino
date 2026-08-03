---
title: Organizzazioni
description: Gestisci le organizzazioni in Dino – visualizza, aggiungi, modifica, elimina e importa organizzazioni.
---

# Organizzazioni

La pagina **Organizzazioni** elenca tutte le organizzazioni configurate nella tua istanza Dino. Utilizza questa schermata per visualizzare, aggiungere, modificare, eliminare e importare organizzazioni, nonché per gestire la gerarchia organizzativa.

![Main view of the Organizations page](../imgs/metrics/organizations.png)

## Colonne della Tabella

Di default, la tabella mostra le seguenti colonne:

- **Nome organizzazione** – il nome dell'organizzazione. Questa colonna è ordinabile.
- **Organizzazione padre** – il nome dell'organizzazione padre, se presente.

Le colonne aggiuntive (ID, Data di creazione, Percorso del logo, URL del sito web, Attributi aggiuntivi) sono nascoste ma disponibili quando personalizzi la visualizzazione delle colonne utilizzando l'icona **Visualizza settimana** (in basso a destra nell'intestazione della tabella).

## Azioni sulle righe

Ogni riga ha tre azioni accessibili facendo clic sul pulsante **Altro** (tre puntini) accanto alla riga:

- **Visualizza** (icona di visibilità) – apre una finestra di dialogo di sola lettura con i dettagli dell'organizzazione.
- **Modifica** (icona della matita) – apre una finestra di dialogo per modificare i dettagli dell'organizzazione.
- **Elimina** (icona del cestino) – elimina definitivamente l'organizzazione. Prima dell'eliminazione appare una finestra di conferma.

!!! warning "Elimina le organizzazioni con cautela"
    L'eliminazione di un'organizzazione non può essere annullata. Assicurati che nessun caso o modulo attivo dipenda da essa prima di rimuoverla.

Puoi anche fare clic direttamente su una riga per **selezionarla** (per azioni bulk) o **espanderla** per vedere ulteriori dettagli inline.

## Azioni bulk e filtri

Seleziona più righe utilizzando le caselle di controllo nella prima colonna, quindi usa i pulsanti di eliminazione bulk o modifica bulk che compaiono nella barra degli strumenti.

### Ricerca e filtri

La barra dei filtri nella parte superiore della pagina offre:

- **Ricerca per parola chiave** – filtra le organizzazioni in base a qualsiasi testo.
- **Intervallo di date** – filtra per intervallo di date di creazione.
- **Gestione preset** – salva e carica preset di filtri di ricerca.
- **Esporta** – scarica l'elenco filtrato come file.

Fai clic sul pulsante **Filtro** per aprire filtri avanzati per un controllo più granulare.

## Aggiunta e importazione di organizzazioni

Due pulsanti di azione fluttuanti sono sempre visibili nell'angolo in basso a destra:

- **Aggiungi nuovo** (icona più) – apre una finestra di dialogo per creare una nuova organizzazione. Ti verrà chiesto di inserire il nome dell'organizzazione, l'organizzazione padre, l'URL del sito web e altri dettagli.
- **Importa** (icona di caricamento cloud) – ti consente di caricare un file (CSV, JSON o XML) per importare organizzazioni in blocco. Segui le istruzioni sullo schermo per mappare i campi.

!!! tip "Internazionalizzazione"
    I nomi e le etichette delle organizzazioni possono essere tradotti se la tua istanza Dino supporta più lingue. Vedi [Lingue](../administration/languages.md) per i dettagli.

## Passaggi: Creare una nuova organizzazione

1. Fai clic sul pulsante fluttuante **Aggiungi nuovo**.
2. Nella finestra di dialogo che si apre, compila i campi obbligatori (Nome organizzazione e almeno un attributo).
3. Facoltativamente, imposta un'**Organizzazione padre** per creare una gerarchia.
4. Fai clic su **Salva**. La nuova organizzazione appare immediatamente nell'elenco.

## Passaggi: Esportare le organizzazioni

1. Applica i filtri necessari nella barra di ricerca.
2. Fai clic sul pulsante **Esporta** (icona di download cloud) nella barra dei filtri.
3. Scegli il formato di esportazione (CSV, Excel, ecc.) e conferma.
4. Il file viene scaricato sul tuo dispositivo.

## Pagine correlate

- [Panoramica delle metriche](index.md) – tutte le pagine di gestione delle metriche.
- [Aree tematiche](areas.md) – gestisci le aree tematiche per le organizzazioni.
- [Casi](cases.md) – associa i casi alle organizzazioni.
- [Posizioni](locations.md) – collega le posizioni alle organizzazioni.
- [Progetti](projects.md) – connetti le organizzazioni ai progetti.