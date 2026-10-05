---
title: Organizzazioni
description: Gestisci le organizzazioni in Dino – visualizza, aggiungi, modifica, elimina e importa organizzazioni.
---

# Organizzazioni

La pagina **Organizzazioni** elenca tutti i possibili valori della metrica organizzazione. Le organizzazioni possono essere i partner del tuo progetto o qualsiasi entità coinvolta nelle tue attività. Usa questa schermata per visualizzare, aggiungere, modificare, eliminare e importare organizzazioni, e per gestire la gerarchia organizzativa.

![Visualizzazione principale della pagina Organizzazioni](../imgs/metrics/organizations.png)

## Colonne della tabella

Per impostazione predefinita, la tabella mostra le seguenti colonne:

- **Nome organizzazione** – il nome dell'organizzazione. Questa colonna è ordinabile.
- **Organizzazione genitore** – il nome dell'organizzazione genitore, se presente.

Colonne aggiuntive (ID, Data di creazione, Percorso del logo, URL del sito web, Attributi aggiuntivi) sono nascoste per impostazione predefinita. Usa il pulsante **Colonne**, sopra la tabella a destra, per mostrarle o nasconderle.

## Azioni sulle righe

Passa il mouse su una riga per mostrare le icone **Vedi** e **Modifica**. Fai clic sulla riga per selezionarla: la barra delle azioni sopra la tabella mostra quindi tutte le azioni disponibili:

- **Vedi** (icona a forma di occhio) – apre una finestra di sola lettura con i dettagli dell'organizzazione.
- **Modifica** (icona a forma di matita) – apre una finestra per modificare i dettagli dell'organizzazione.
- **Elimina** (icona a forma di cestino) – elimina definitivamente l'organizzazione. Prima viene mostrata una finestra di conferma.

!!! warning "Elimina le organizzazioni con cautela"
    L'eliminazione di un'organizzazione non può essere annullata. Un'organizzazione utilizzata dai form, o che ha organizzazioni figlie, non può essere eliminata; vedi [Metriche](index.md).

## Azioni in blocco

Seleziona una o più righe usando le caselle di controllo nella prima colonna. Sopra la tabella compare una barra degli strumenti con le azioni che puoi applicare:

- Con una riga selezionata, puoi visualizzare, modificare o eliminare quell'organizzazione.
- Con più righe selezionate, puoi eliminarle tutte insieme.

## Ricerca e Filtri

La barra dei filtri nella parte superiore della pagina offre:

- **Ricerca per parola chiave** – filtra le organizzazioni in base a qualsiasi testo.
- **Filtri** – apri la finestra dei filtri per restringere la lista in base alla data di creazione (**Data di partenza** / **Fino ad oggi**).
- **Esporta** – scarica la lista come file.

I filtri applicati appaiono come chip sotto la barra dei filtri. Fai clic sull'icona di annullamento su un chip per rimuovere quel filtro.

## Aggiungere e importare organizzazioni

Nella barra degli strumenti sopra la tabella sono disponibili due pulsanti:

- **Aggiungi nuova ORGANIZZAZIONE** (icona a forma di più) – apre una finestra per creare una nuova organizzazione.
- **Importa ORGANIZZAZIONE** (icona di caricamento sul cloud) – carica un file per importare più organizzazioni in blocco.

!!! tip "Gerarchia organizzativa"
    Imposta un'**Organizzazione genitore** quando crei un'organizzazione per costruire una gerarchia di entità correlate.

## Passaggi: creare una nuova organizzazione

1. Fai clic sul pulsante **Aggiungi nuova ORGANIZZAZIONE** nella barra degli strumenti.
2. Nella finestra che si apre, compila i campi obbligatori, a partire dal Nome organizzazione. I campi facoltativi sono contrassegnati con *(facoltativo)*.
3. Facoltativamente, imposta un'**Organizzazione genitore** per collocare la nuova organizzazione in una gerarchia.
4. Facoltativamente, aggiungi un percorso del logo, l'URL del sito web e eventuali attributi aggiuntivi.
5. Fai clic su **Salva**. La nuova organizzazione appare immediatamente nella lista.

## Passaggi: importare organizzazioni

1. Fai clic sul pulsante **Importa ORGANIZZAZIONE** nella barra degli strumenti.
2. Carica un file `.xls`, `.xlsx` o `.csv` e mappa le sue colonne agli attributi dell'organizzazione.
3. Fai clic su **Applica importazione** e controlla il risultato. Le organizzazioni il cui nome esiste già vengono riutilizzate, non aggiornate.

## Passaggi: esportare organizzazioni

1. Applica i filtri di cui hai bisogno.
2. Fai clic sul pulsante **Esporta** nella barra degli strumenti.
3. Scegli cosa esportare: *Elementi nella pagina* (l'opzione predefinita), gli elementi corrispondenti ai tuoi filtri o *Tutti gli elementi*.
4. Scegli il formato: *csv*, *xlsx* o *splitted xlsx*, quindi fai clic su **Esporta**.

## Pagine correlate

- [Panoramica delle metriche](index.md) – tutte le pagine di gestione delle metriche.
- [Aree tematiche](areas.md) – gestisci le aree tematiche per le organizzazioni.
- [Casi](cases.md) – associa i casi alle organizzazioni.
- [Posizioni](locations.md) – collega le posizioni alle organizzazioni.
- [Progetti](projects.md) – collega le organizzazioni ai progetti.