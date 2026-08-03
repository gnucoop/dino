---
title: Elenco dei gruppi
description: Gestisci i gruppi di utenti in Dino — visualizza, crea, modifica ed elimina gruppi di permessi con ruoli, moduli, report e metriche assegnati.
---

# Elenco dei gruppi

La pagina **Elenco dei gruppi** mostra tutti i gruppi di utenti in Dino. Da qui puoi visualizzare, modificare, eliminare e creare gruppi. Ogni gruppo definisce un insieme di permessi e regole di accesso collegando un ruolo utente a specifici schemi dei moduli, schemi dei report, stati dei moduli e tipi di metrica (come aree, casi, progetti, posizioni o organizzazioni).

![Vista principale della pagina Elenco dei gruppi](../imgs/administration/groups-list.png)

## Panoramica dell'elenco

La tabella mostra le seguenti colonne:

- **Nome gruppo** – il nome del gruppo di utenti (visibile per impostazione predefinita).
- **ID** – identificatore interno (nascosto per impostazione predefinita).
- **Data di creazione** – quando il gruppo è stato creato (nascosta per impostazione predefinita).

Puoi personalizzare le colonne visualizzate facendo clic sull'icona **Visualizza colonne** (chiamata anche icona **hotdog** dai programmatori!) nella parte destra dell'intestazione della tabella.

## Ricerca e filtri

Usa la **barra di ricerca** nella parte superiore della pagina per filtrare i gruppi per parola chiave. Il pannello **Filtri** (espandibile) consente di restringere l'elenco per:

- Intervallo di date (da/a)
- Qualsiasi tipo di metrica definito nella tua distribuzione, ovvero uno o più dei seguenti: Progetto, Posizione, Area, Caso, Organizzazione

Puoi anche salvare e caricare preset di filtri tramite il gestore dei preset.

## Azioni sui gruppi

Ogni riga ha tre icone di azione sulla destra:

- **Visualizza** – Visualizza i dettagli del gruppo (apre l'editor in modalità sola lettura)
- **Modifica** – Modifica le proprietà del gruppo
- **Elimina** – Rimuove il gruppo (è richiesta una conferma)

## Creazione di un nuovo gruppo

1. Fai clic sul pulsante flottante **+** in basso a destra dello schermo.
2. Nella finestra di dialogo dell'editor che si apre, inserisci un **Nome gruppo** (obbligatorio).
3. Naviga tra le schede per selezionare:
    - **Ruolo utente** (obbligatorio – devi scegliere esattamente un ruolo)
    - **Schemi dei moduli**
    - **Stati dei moduli**
    - **Schemi dei report**
    - **Tipi di metrica** (tutti i tipi attivi per la tua distribuzione: Area, Caso, Progetto, Posizione, Organizzazione) – se attivi
4. Nella finestra **elementi disponibili** sul lato destro, seleziona uno o più elementi facendo clic sull'icona **aggiungi** accanto a ciascun elemento per spostarlo nel pannello **Elementi del gruppo**.
5. Fai clic su **Salva**.

!!! tip "Opzione Tutti"
    Per i tipi di metrica e altre categorie, potresti vedere un'opzione “Tutti …”. Selezionandola, la restrizione viene applicata a tutti gli elementi di quel tipo.

## Modifica o visualizzazione di un gruppo

1. Nella tabella, fai clic sull'icona **Modifica** (modifica) o **Visualizza** (visualizza) per il gruppo che vuoi modificare.
2. Nella finestra di dialogo dell'editor, puoi:
    - Modificare il **Nome gruppo**.
    - Aggiungere o rimuovere elementi da qualsiasi scheda (solo in modalità modifica).
    - Rimuovere elementi facendo clic sull'icona **elimina** accanto a essi.
3. Fai clic su **Salva** per applicare le modifiche (in modalità visualizzazione è visibile solo il pulsante **Chiudi**).

## Eliminazione di un gruppo

1. Fai clic sull'icona **elimina** per il gruppo.
2. Conferma l'eliminazione nella finestra di dialogo che appare.

!!! warning "Azione irreversibile"
    L'eliminazione di un gruppo non può essere annullata. Assicurati che nessun utente dipenda dal gruppo prima di rimuoverlo.

## Pagine correlate

- [Elenco utenti](users-list.md) – gestisci i singoli account utente e le relative assegnazioni ai gruppi.
- [Metriche](../metrics/index.md) – configura i tipi di metrica che possono essere assegnati ai gruppi (aree, casi, progetti, ecc.).
- [Schemi dei moduli](../forms/edit-form-schema.md) – crea e modifica gli schemi dei moduli che possono essere collegati ai gruppi.
- [Schemi dei report](../reports/edit-report-schema.md) – gestisci gli schemi dei report disponibili per i gruppi.
- [Panoramica dell'interfaccia](../interface/index.md) – scopri la navigazione e il layout generale.