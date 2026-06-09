---
title: Modifica Schema del Modulo
description: Scopri come creare e modificare gli schemi dei moduli in Dino per definire la struttura dei tuoi moduli di raccolta dati.
---

# Modifica Schema del Modulo

La pagina **Modifica Schema del Modulo** ti consente di progettare o modificare la struttura di un modulo — i campi, i loro tipi, le regole di validazione e le relazioni tra di essi. Puoi creare un nuovo schema o aggiornarne uno esistente.

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

## Creare un Nuovo Schema del Modulo

1. Dalla sezione **Moduli**, fai clic su **Crea Schema del Modulo**.
2. Inserisci un **Nome** e opzionalmente una **Descrizione** per lo schema.
3. Aggiungi campi usando il pulsante **Aggiungi Campo**. Per ogni campo puoi impostare:
   - **Etichetta Campo** – la domanda o il prompt mostrato ai raccoglitori di dati.
   - **Tipo di Campo** – ad esempio testo, numero, data, selezione, geolocalizzazione.
   - Interruttore **Obbligatorio** – rende il campo obbligatorio.
   - Regole di **Validazione** – come valori minimi/massimi, estensioni file consentite, ecc.
4. Riorganizza i campi trascinandoli nell'ordine desiderato.
5. Fai clic su **Salva** per creare lo schema.

## Modificare uno Schema del Modulo Esistente

1. Vai alla pagina **Moduli** e fai clic sullo schema che desideri modificare.
2. Fai clic sul pulsante **Modifica** (oppure apri il menu delle azioni dello schema e seleziona **Modifica**).
3. L'editor si apre con tutti i campi esistenti caricati. Puoi:
   - Aggiungere nuovi campi.
   - Modificare le impostazioni dei campi esistenti facendo clic sul campo.
   - Eliminare un campo usando l'icona del cestino.
   - Riorganizzare i campi tramite trascinamento.
4. Fai clic su **Salva** per applicare le modifiche.

!!! warning "Modifica di uno schema che ha già invii"
    La modifica dei tipi di campo o la rimozione di campi potrebbe influenzare gli invii esistenti. Dino ti avviserà prima di salvare se vengono rilevate incompatibilità.

## Definire le Relazioni tra Campi (Dipendenze)

Puoi impostare una logica condizionale in modo che determinati campi appaiano solo quando viene selezionato un valore specifico in un altro campo.

1. Durante la modifica di uno schema, seleziona un campo che desideri rendere condizionale.
2. Fai clic sulla scheda o sul pulsante **Relazioni**.
3. Nella finestra di dialogo che si apre, scegli il **campo padre** e il **valore** che deve essere selezionato affinché questo campo venga mostrato. Puoi anche aggiungere più condizioni (logica AND/OR).
4. Fai clic su **Applica** per salvare la relazione.

![Form relationships (dependencies) editor dialog](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Testare le dipendenze"
    Dopo aver salvato lo schema, puoi testare la tua logica condizionale aprendo il modulo nella vista [Modifica Modulo](edit-form.md) e verificando che i campi dipendenti appaiano o scompaiano correttamente.

## Passaggi Successivi

Una volta che lo schema del modulo è pronto, puoi [creare un'istanza del modulo](edit-form.md) basata su di esso, oppure utilizzare lo schema in una [Mappa dei Moduli](forms-map.md) per assegnarlo ad aree e raccoglitori specifici.