---
title: Organizzazioni
description: "Gestisci le organizzazioni in Dino: visualizza, aggiungi, modifica, elimina e importa organizzazioni."
---

# Organizzazioni

La pagina **Organizzazioni** elenca tutti i valori possibili della metrica organizzazione. Le organizzazioni possono essere i partner del tuo progetto o qualsiasi entità coinvolta nelle tue attività. Usa questa schermata per visualizzare, aggiungere, modificare, eliminare e importare organizzazioni, oltre che per gestire la gerarchia organizzativa.

![Main view of the Organizations page](../imgs/metrics/organizations.png)

## Colonne della tabella

Per impostazione predefinita, la tabella mostra le seguenti colonne:

- **Nome organizzazione** – il nome dell'organizzazione. Questa colonna è ordinabile.
- **Organizzazione padre** – il nome dell'organizzazione padre, se presente.

Le colonne aggiuntive (ID, Data di creazione, Percorso del logo, URL del sito web, Attributi aggiuntivi) sono nascoste, ma disponibili quando personalizzi la visualizzazione delle colonne tramite l'icona **Visualizza colonne** (in basso a destra nell'intestazione della tabella).

## Azioni sulle righe

Ogni riga ha tre azioni accessibili facendo clic sul pulsante **Altro** (tre puntini) accanto alla riga:

- **Visualizza** (icona a forma di occhio) – apre una finestra di sola lettura con i dettagli dell'organizzazione.
- **Modifica** (icona a forma di matita) – apre una finestra per modificare i dettagli dell'organizzazione.
- **Elimina** (icona a forma di cestino) – elimina definitivamente l'organizzazione. Prima dell'eliminazione compare una finestra di conferma.

!!! warning "Elimina le organizzazioni con cautela"
    L'eliminazione di un'organizzazione non può essere annullata. Assicurati che nessun caso attivo o form dipenda da essa prima di rimuoverla.

Puoi anche fare clic direttamente su una riga per **selezionarla** (per le azioni di massa) o **espanderla** per visualizzare ulteriori dettagli in linea.

## Azioni di massa e filtri

Seleziona più righe usando le caselle di controllo nella prima colonna, poi utilizza i pulsanti di eliminazione o modifica di massa che compaiono nella barra degli strumenti.

### Ricerca e filtri

La barra del filtro nella parte superiore della pagina offre:

- **Ricerca per parola chiave** – filtra le organizzazioni in base a qualsiasi testo.
- **Intervallo di date** – filtra per intervallo della data di creazione.
- **Gestione dei preset** – salva e carica i preset del filtro di ricerca.
- **Esporta** – scarica l'elenco filtrato come file.

Fai clic sul pulsante **Filtro** per aprire i filtri avanzati e ottenere un controllo più granulare.

## Aggiungere e importare organizzazioni

Due pulsanti di azione flottanti sono sempre visibili nell'angolo in basso a destra:

- **Aggiungi nuovo** (icona con il più) – apre una finestra per creare una nuova organizzazione. Ti verrà chiesto di inserire il nome dell'organizzazione, l'organizzazione padre, l'URL del sito web e altri dettagli.
- **Importa** (icona di caricamento sul cloud) – ti consente di caricare un file (CSV, JSON o XML) per importare organizzazioni in blocco. Segui le istruzioni sullo schermo per mappare i campi.

!!! tip "Internazionalizzazione"
    I nomi e le etichette delle organizzazioni possono essere tradotti se la tua istanza di Dino supporta più lingue. Per i dettagli vedi [Lingue](../administration/languages.md).

## Procedura: creare una nuova organizzazione

1. Fai clic sul pulsante flottante **Aggiungi nuovo**.
2. Nella finestra che si apre, compila i campi obbligatori (Nome organizzazione e almeno un attributo).
3. Facoltativamente, imposta un'**Organizzazione padre** per creare una gerarchia.
4. Fai clic su **Salva**. La nuova organizzazione compare immediatamente nell'elenco.

## Procedura: esportare le organizzazioni

1. Applica i filtri che ti servono nella barra di ricerca.
2. Fai clic sul pulsante **Esporta** (icona di download dal cloud) nella barra del filtro.
3. Scegli il formato di esportazione (CSV, Excel, ecc.) e conferma.
4. Il file viene scaricato sul tuo dispositivo.

## Pagine correlate

- [Panoramica delle metriche](index.md) – tutte le pagine di gestione delle metriche.
- [Aree tematiche](areas.md) – gestisci le aree tematiche per le organizzazioni.
- [Casi](cases.md) – associa i casi alle organizzazioni.
- [Posizioni](locations.md) – collega le posizioni alle organizzazioni.
- [Progetti](projects.md) – collega le organizzazioni ai progetti.