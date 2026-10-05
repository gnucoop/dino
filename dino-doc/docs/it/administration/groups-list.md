---
title: Lista dei gruppi
description: Gestisci i gruppi utente in Dino — visualizza, crea, modifica ed elimina gruppi di permessi con ruoli, form schema, report e metriche assegnati.
---

# Lista dei gruppi

La pagina **Lista dei gruppi** mostra tutti i gruppi utente in Dino. Da qui puoi visualizzare, modificare, eliminare e creare gruppi. Ogni gruppo definisce un insieme di permessi e regole di accesso collegando un ruolo utente a specifici form schema, report schema, stati del form e tipi di metrica (come aree, casi, progetti, posizioni o organizzazioni).

![Vista principale della pagina Lista dei gruppi](../imgs/administration/groups-list.png)

## Panoramica della lista

La tabella mostra le seguenti colonne:

- **Nome del gruppo** – il nome del gruppo utente (visibile per impostazione predefinita).
- **ID** – identificatore interno (nascosto per impostazione predefinita).
- **Data di creazione** – quando il gruppo è stato creato (nascosta per impostazione predefinita).

Il numero di elementi trovati appare sopra la tabella, accanto al paginatore. Usa il pulsante **Colonne** (tooltip *Personalizza le colonne*), sopra la tabella a destra, per cambiare quali colonne vengono visualizzate.

## Ricerca e filtro

Usa il campo **cerca per parola chiave** nella barra degli strumenti per filtrare i gruppi per nome. Apri la finestra **Filtri** per ulteriori opzioni:

1. Clicca **Filtri**.
2. Imposta una **Data di partenza** e una **Fino ad oggi** per limitare i risultati ai gruppi creati in quel intervallo.
3. Restringi la lista con uno o più filtri di metrica — **Progetto**, **Posizione**, **Area**, **Caso** o **Organizzazione** — a seconda di quali sono attivi nella tua installazione.
4. Clicca **Cerca** per applicare i filtri, o **Azzera filtri** per rimuoverli.

I filtri applicati appaiono come chip sotto la barra degli strumenti. Clicca l'icona **cancella** su un chip per rimuovere quel filtro.

## Azioni sui gruppi

Passa il mouse su una riga per mostrare le icone **Modifica** e **Vedi**. Clicca una riga per selezionarla: la barra delle azioni sopra la tabella mostra quindi tutte le azioni che puoi utilizzare su di essa:

- **Vedi** – Visualizza i dettagli del gruppo (apre la pagina del gruppo in modalità di sola lettura)
- **Modifica** – Modifica le proprietà del gruppo
- **Elimina** – Rimuovi il gruppo (è richiesta conferma)

## Creare un nuovo gruppo

I gruppi vengono creati e modificati in una pagina dedicata, non in una finestra di dialogo.

1. Clicca **Aggiungi nuovo gruppo** nella barra degli strumenti. Si apre la pagina *Crea gruppo*.
2. Digita il **Nome del gruppo** nell'intestazione della pagina.
3. Scegli gli elementi del gruppo, una scheda alla volta. Ogni scheda mostra quanti elementi contiene e appare solo se la sua categoria ha elementi:
    - **Ruolo utente** (obbligatorio – un gruppo contiene esattamente un ruolo; aggiungerne un altro lo sostituisce)
    - **Form Schema**
    - **Stato del Form**
    - **Report Schema**
    - Una scheda per ogni tipo di metrica attivo (**Area**, **Caso**, **Progetto**, **Posizione**, **Organizzazione**)
4. Nel pannello di sinistra, cerca gli elementi e clicca **Aggiungi** accanto a ciascuno che desideri, oppure **Aggiungi tutti i mostrati** per aggiungere ogni elemento elencato. Il pannello di destra (*Nel gruppo*) mostra ciò che il gruppo contiene per quella categoria.
5. Clicca **Salva**. È abilitato solo quando il gruppo ha un nome e un ruolo utente.

!!! tip "Opzione Tutti"
    Ogni categoria tranne Ruolo utente ha un'opzione "Tutti …" in cima alla sua lista (ad esempio *Tutti i form schema*). Sceglierla sostituisce i singoli elementi; aggiungere un singolo elemento la rimuove. Per le metriche con una gerarchia, aggiungere un valore aggiunge anche i suoi figli.

!!! note "Gruppi amministratore"
    Se il ruolo del gruppo è un ruolo amministratore, **Form Schema** e **Report Schema** sono sempre impostati su **Tutti** e bloccati, come mostrato da un'icona a forma di lucchetto: solo un gruppo che li ha su **Tutti** può creare nuovi schema. Scegli un ruolo diverso per sbloccare.

## Modificare o visualizzare un gruppo

1. Nella tabella, clicca l'icona **Modifica** o **Vedi** per il gruppo. Si apre la pagina *Modifica gruppo* o *Vedi gruppo*.

    ![Editor per modificare un gruppo di permessi utente](../imgs/administration/groups-list-edit.png)

2. In modalità modifica puoi:
    - Cambiare il **Nome del gruppo**.
    - Aggiungere elementi dal pannello di sinistra, o rimuoverli dal pannello di destra con il pulsante × (**Svuota** rimuove ogni elemento della categoria).
3. Clicca **Salva** per applicare le modifiche. Non c'è un pulsante Annulla: per uscire senza salvare, torna indietro tramite il percorso di navigazione.

In modalità visualizzazione tutto è di sola lettura e non c'è **Salva**.

## Eliminare un gruppo

1. Clicca la riga del gruppo per selezionarla, poi clicca **Elimina** nella barra delle azioni.
2. Conferma l'eliminazione nella finestra che appare.

!!! warning "Azione irreversibile"
    L'eliminazione di un gruppo non può essere annullata. Assicurati che nessun utente dipenda dal gruppo prima di rimuoverlo.

## Pagine correlate

- [Lista utenti](users-list.md) – gestisci i singoli account utente e le loro assegnazioni ai gruppi.
- [Metriche](../metrics/index.md) – configura i tipi di metrica che possono essere assegnati ai gruppi (aree, casi, progetti, ecc.).
- [Form Schema](../forms/edit-form-schema.md) – crea e modifica form schema che possono essere collegati ai gruppi.
- [Report Schema](../reports/edit-report-schema.md) – gestisci i report schema disponibili per i gruppi.
- [Panoramica dell'interfaccia](../interface/index.md) – scopri la navigazione e il layout generale.