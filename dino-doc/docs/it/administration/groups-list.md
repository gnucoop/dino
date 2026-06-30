---
title: Elenco dei gruppi
description: Gestisci i gruppi di utenti in Dino — visualizza, crea, modifica ed elimina gruppi di autorizzazioni con ruoli, moduli, report e metriche assegnati.
---

# Elenco dei gruppi

La pagina **Elenco gruppi** mostra tutti i gruppi di utenti in Dino. Da qui è possibile visualizzare, modificare, eliminare e creare gruppi. Ogni gruppo definisce un insieme di permessi e regole di accesso collegando un ruolo utente a specifici schemi di moduli, schemi di report, stati dei moduli e tipi di metrica (come aree, casi, progetti, località o organizzazioni).

![Vista principale della pagina Elenco gruppi](../imgs/administration/groups-list.png)

## Panoramica dell'elenco

La tabella mostra le seguenti colonne:

- **Nome gruppo** – il nome del gruppo di utenti (visibile per impostazione predefinita).
- **ID** – identificatore interno (nascosto per impostazione predefinita).
- **Data di creazione** – quando il gruppo è stato creato (nascosto per impostazione predefinita).

È possibile personalizzare le colonne visualizzate cliccando l'icona **view_week** nell'intestazione della tabella.

## Ricerca e filtro

Utilizza la **barra di ricerca** nella parte superiore della pagina per filtrare i gruppi per parola chiave. Il pannello **Filtri** (espandibile) consente di restringere l'elenco per:

- Intervallo di date (da/a)
- Progetto, località, area, caso, organizzazione e altri filtri disponibili

Puoi anche salvare e caricare preset di filtro utilizzando il gestore dei preset.

## Azioni sui gruppi

Ogni riga ha tre icone di azione a destra:

- **visibility** – Visualizza i dettagli del gruppo (apre l'editor in modalità sola lettura)
- **create** – Modifica le proprietà del gruppo
- **delete** – Elimina il gruppo (richiede conferma)

Cliccando su una riga si espande una sezione di dettaglio che mostra informazioni aggiuntive o elementi annidati (se presenti).

## Creare un nuovo gruppo

1. Fai clic sul pulsante fluttuante **+** in basso a destra dello schermo.
2. Nella finestra di dialogo dell'editor che si apre, inserisci un **Nome gruppo**.
3. Nel pannello **Elementi disponibili**, naviga tra le schede per selezionare:
    - **Ruolo utente** (obbligatorio – devi selezionare esattamente un ruolo)
    - **Schemi modulo**
    - **Schemi report**
    - **Stati modulo**
    - Tipi di metrica (Area, Caso, Progetto, Località, Organizzazione) – se attivi
4. Fai clic sull'icona **add** accanto a ciascun elemento per spostarlo nel pannello **Elementi del gruppo**.
5. Fai clic su **Salva**.

!!! tip "Opzione Tutti"
    Per i tipi di metrica e altre categorie, potresti vedere un'opzione “Tutti …”. Selezionando questa opzione si applica la restrizione a ogni elemento di quel tipo.

## Modificare o visualizzare un gruppo

1. Nella tabella, fai clic sull'icona **create** (modifica) o **visibility** (visualizza) per il gruppo che desideri modificare.
2. Nella finestra di dialogo dell'editor, puoi:
    - Modificare il **Nome gruppo**.
    - Aggiungere o rimuovere elementi da qualsiasi scheda (solo in modalità modifica).
    - Rimuovere elementi cliccando l'icona **delete** accanto a essi.
3. Fai clic su **Salva** per applicare le modifiche (la modalità visualizzazione mostra solo un pulsante **Chiudi**).

## Eliminare un gruppo

1. Fai clic sull'icona **delete** per il gruppo.
2. Conferma l'eliminazione nella finestra di dialogo che appare.

!!! warning "Azione irreversibile"
    L'eliminazione di un gruppo non può essere annullata. Assicurati che nessun utente dipenda dal gruppo prima di rimuoverlo.

## Pagine correlate

- [Elenco utenti](users-list.md) – gestisci account utente singoli e le loro assegnazioni ai gruppi.
- [Metriche](../metrics/index.md) – configura i tipi di metrica che possono essere assegnati ai gruppi (aree, casi, progetti, ecc.).
- [Schemi modulo](../forms/edit-form-schema.md) – crea e modifica schemi di modulo che possono essere collegati ai gruppi.
- [Schemi report](../reports/edit-report-schema.md) – gestisci gli schemi di report disponibili per i gruppi.
- [Panoramica dell'interfaccia](../interface/index.md) – scopri la navigazione e il layout generale.
