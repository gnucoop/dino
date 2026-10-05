---
title: Mappa dei form
description: Visualizza i dati dei form su una mappa interattiva con opzioni di filtro.
---

# Mappa dei form

La pagina Mappa dei form mostra i dati dei tuoi form su una mappa interattiva, permettendoti di visualizzare i dati geograficamente. Puoi filtrare i dati per data e per specifici campi per concentrarti sulle informazioni di cui hai bisogno.

Questa pagina è disponibile solo se la metrica posizione è attiva sul form schema. Inoltre, ogni posizione deve avere le proprie coordinate compilate.

![Vista principale della pagina Mappa dei form](../imgs/forms/forms-map.png)

La pagina è composta da due aree principali:

*   **La Mappa**: una mappa interattiva che mostra indicatori raggruppati per ogni dato. Ogni indicatore è posizionato in base ai dati della posizione nel dato.
*   **La barra dei Filtri**: una serie di controlli nella parte superiore della pagina per filtrare i dati mostrati sulla mappa.

Nella parte superiore della pagina, un contatore mostra quanti indicatori sono attualmente tracciati e quanti elementi sono stati trovati dai filtri attivi.

!!! tip "Cambiare visualizzazione"
    Usa i pulsanti **Dati**, **Mappa** e **AI** nella barra degli strumenti per passare dalla tabella alla mappa e a Datachat per lo stesso form schema. Il pulsante **Mappa** è attivo solo quando la metrica posizione è abilitata.

## Visualizzare i dettagli dei dati

Ogni indicatore sulla mappa rappresenta uno o più dati in una posizione specifica.

1.  Clicca su un indicatore per aprire il suo popup.
2.  Il popup mostra il nome della posizione seguito dai valori delle colonne che hai visualizzato per questo form.
3.  Quando più dati condividono la stessa posizione, gli indicatori vengono raggruppati in un cluster. Clicca sul cluster per ingrandire finché non compaiono i singoli indicatori.

## Filtrare i dati sulla mappa

Usa i filtri per restringere quali dati compaiono sulla mappa. La maggior parte di essi si trova nella finestra **Filtri**: clicca su **Filtri** nella barra degli strumenti per aprirla, imposta i filtri nella scheda **Semplice**, poi clicca su **Cerca** per applicarli.

### 1. Filtra per intervallo di date

1.  Nella finestra **Filtri**, clicca sull'icona del calendario del campo **Data di partenza**.
2.  Seleziona una data di inizio.
3.  Ripeti per il campo **Fino ad oggi** per impostare la fine dell'intervallo.

### 2. Filtra per campi dati

Sotto i campi data, la scheda **Semplice** mostra diversi campi di input. Ogni campo corrisponde a una colonna del tuo form (ad esempio, "Punto di assistenza" o "Nazionalità") e può anche includere campi relativi a stato, utente, posizione, area, caso, organizzazione o progetto.

1.  Clicca su un campo qualsiasi (ad esempio, "Nazionalità").
2.  Inizia a digitare. Un elenco a discesa mostra i valori corrispondenti dai tuoi dati esistenti.
3.  Seleziona un valore dall'elenco oppure digita il tuo testo per filtrare i dati che contengono quel testo.
4.  Per cancellare un filtro, clicca sull'icona **X** che appare all'interno del campo.

Per i campi che accettano più di un valore, puoi selezionare diverse opzioni nell'elenco a discesa prima di chiuderlo.

!!! tip "Usare più filtri"
    Puoi applicare filtri su più campi contemporaneamente. La mappa mostra solo i dati che soddisfano **tutti** i criteri di filtro attivi.

### 3. Usare i filtri avanzati

1.  Clicca su **Filtri** nella barra degli strumenti per aprire la finestra dei filtri.
2.  Passa alla scheda **Avanzati** per costruire condizioni precise, scegliendo il campo, l'operatore e il valore, poi clicca su **Crea Filtro**.
3.  Usa **Tutti** o **Qualsiasi** per decidere se i dati devono soddisfare tutte le condizioni o almeno una.
4.  Clicca su **Cerca** per applicare le tue condizioni, oppure su **Azzera filtri** per ricominciare.

I filtri applicati appaiono come chip sotto la barra degli strumenti. Clicca sull'icona **cancella** su un chip per rimuovere quel singolo filtro.

### 4. Salvare e riutilizzare i filtri

Se filtri spesso questo form, puoi salvare le tue impostazioni come preimpostazione dalla finestra **Filtri**. I controlli delle preimpostazioni non vengono mostrati sugli schermi piccoli.

1.  Digita un nome nel campo **Scegli un nome preimpostato**.
2.  Clicca su **Salva** per memorizzare la selezione corrente di filtri.
3.  In seguito, scegli la preimpostazione dall'elenco e clicca su **Applica** per ripristinarla.

### 5. Esportare i risultati

1.  Clicca su **Esporta** nella barra degli strumenti.
2.  Scegli il formato di esportazione e le colonne che vuoi includere.
3.  Conferma per scaricare un file contenente i dati attualmente filtrati.

!!! warning "Dati sulla posizione richiesti"
    I dati possono comparire sulla mappa solo se hanno coordinate geografiche valide associate alla loro posizione. I dati senza queste informazioni non vengono visualizzati e non vengono conteggiati tra gli indicatori tracciati.

## Pagine correlate

*   [Form](index.md)
*   [Modifica form schema](edit-form-schema.md)
*   [Posizioni](../metrics/locations.md)
*   [Importa dati](import.md)