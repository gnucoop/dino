---
title: Lista gruppi
description: Gestisci i gruppi utente in Dino — visualizza, crea, modifica ed elimina gruppi di autorizzazioni con ruoli, form, report e metriche assegnati.
---

# Lista gruppi

La pagina **Lista gruppi** mostra tutti i gruppi utente in Dino. Da qui puoi visualizzare, modificare, eliminare e creare gruppi. Ogni gruppo definisce un insieme di autorizzazioni e regole di accesso collegando un ruolo utente a specifici form schema, report schema, stati del form e tipi di metrica (come aree, casi, progetti, posizioni o organizzazioni).

![Main view of the Groups List page](../imgs/administration/groups-list.png)

## Panoramica della lista

La tabella mostra le seguenti colonne:

- **Nome gruppo** – il nome del gruppo utente (visibile per impostazione predefinita).
- **ID** – identificatore interno (nascosto per impostazione predefinita).
- **Data di creazione** – data in cui il gruppo è stato creato (nascosta per impostazione predefinita).

Puoi personalizzare le colonne visualizzate facendo clic sull'icona **Visualizza colonne** (chiamata anche icona **hotdog** dai programmatori!) sul lato destro dell'intestazione della tabella.

## Ricerca e filtro

Usa la **barra di ricerca** nella parte superiore della pagina per filtrare i gruppi per parola chiave. Il pannello **Filtri** (espandibile) ti permette di restringere la lista per:

- Intervallo di date (da/a)
- Qualsiasi tipo di metrica definito nella tua installazione, ovvero uno o più dei seguenti: Progetto, Posizione, Area, Caso, Organizzazione

Puoi anche salvare e caricare preset di filtro tramite il gestore dei preset.

## Azioni sui gruppi

Ogni riga presenta tre icone di azione sulla destra:

- **Visualizza** – visualizza i dettagli del gruppo (apre l'editor in modalità di sola lettura)
- **Modifica** – modifica le proprietà del gruppo
- **Elimina** – rimuovi il gruppo (è richiesta la conferma)


## Creare un nuovo gruppo

1. Fai clic sul pulsante flottante **+** in basso a destra nella schermata.
2. Nella finestra dell'editor che si apre, inserisci un **Nome gruppo** (obbligatorio).
3. Naviga tra le schede per selezionare:
    - **Ruolo utente** (obbligatorio – devi scegliere esattamente un ruolo)
    - **Form schema**
    - **Stati del form**
    - **Report schema**
    - **Tipi di metrica** (tutti i tipi attivi nella tua installazione: Area, Caso, Progetto, Posizione, Organizzazione) – se attivi
4. Nella finestra degli **elementi disponibili** sulla destra, seleziona uno o più elementi facendo clic sull'icona **aggiungi** accanto a ciascuno per spostarlo nel pannello **Elementi del gruppo**.
5. Fai clic su **Salva**.

!!! tip "Opzione Tutti"
    Per i tipi di metrica e altre categorie, potresti vedere un'opzione «Tutti …». Selezionandola, la restrizione viene applicata a ogni elemento di quel tipo.

## Modificare o visualizzare un gruppo

1. Nella tabella, fai clic sull'icona **Modifica** (edit) o **Visualizza** (view) del gruppo che vuoi modificare.
2. Nella finestra dell'editor puoi:
    - Modificare il **Nome gruppo**.
    - Aggiungere o rimuovere elementi da qualsiasi scheda (solo in modalità modifica).
    - Rimuovere elementi facendo clic sull'icona **elimina** accanto a ciascuno.
3. Fai clic su **Salva** per applicare le modifiche (la modalità visualizzazione mostra solo un pulsante **Chiudi**).

## Eliminare un gruppo

1. Fai clic sull'icona **elimina** del gruppo.
2. Conferma l'eliminazione nella finestra che appare.

!!! warning "Azione irreversibile"
    L'eliminazione di un gruppo non può essere annullata. Assicurati che nessun utente utilizzi il gruppo prima di rimuoverlo.

## Pagine correlate

- [Lista utenti](users-list.md) – gestisci i singoli account utente e le relative assegnazioni ai gruppi.
- [Metriche](../metrics/index.md) – configura i tipi di metrica che possono essere assegnati ai gruppi (aree, casi, progetti, ecc.).
- [Form schema](../forms/edit-form-schema.md) – crea e modifica i form schema che possono essere collegati ai gruppi.
- [Report schema](../reports/edit-report-schema.md) – gestisci i report schema disponibili per i gruppi.
- [Panoramica dell'interfaccia](../interface/index.md) – scopri la navigazione e il layout generale.