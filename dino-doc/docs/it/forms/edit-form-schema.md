---
title: Modifica form schema
description: Crea e modifica i form schema — imposta nome, icona, stati, metriche, visibilità e definisci le relazioni.
---

# Modifica form schema

La pagina Modifica form schema ti consente di creare un nuovo form schema o di modificarne uno esistente. Qui definisci gli attributi di base del form, ne gestisci stati e metriche, controlli la visibilità e colleghi lo schema ad altri form tramite le relazioni.

Puoi raggiungere questa pagina:

- Cliccando su **Crea** nella [panoramica dei form](index.md) per creare un nuovo schema.
- Selezionando **Modifica** sulla scheda di uno schema esistente o dalla sua visualizzazione di dettaglio.

Il percorso di navigazione in alto mostra la tua posizione attuale (ad es. **Form > My Survey > Modifica**).

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

## Attributi del form

Compila o modifica i seguenti campi:

| Campo | Descrizione |
|-------|-------------|
| **Nome del form** | Un identificatore di sistema univoco (ad es. `survey_2025`). Dino avvisa se il nome è già utilizzato. |
| **Etichetta del form** | Il nome leggibile mostrato negli elenchi e nei report. |
| **Set di icone** | Scegli **Default** (icone material) oppure **Humanitarian** (icone SVG personalizzate). |
| **Identificatore dell'icona** | Scegli un'icona dall'elenco con completamento automatico. L'anteprima si aggiorna in tempo reale. |
| **Stati del form** | Una o più etichette che descrivono lo stato di un dato (ad es. Bozza, Approvato, Rifiutato). Seleziona stati esistenti oppure **Crea nuovo stato** per aggiungerne uno al momento. È possibile associare un livello a ciascuno stato, per stabilire un ordine tra gli stati. Quando viene creato un nuovo dato del form, il dato viene creato con lo stato corrispondente al livello più basso.|
| **Metriche del form** | Le metriche da raccogliere per ogni dato. Selezionane una o più dall'elenco. |
| **Visibilità** | **Private** – il form schema può accettare dati solo dagli utenti DINO, purché abbiano il permesso di inviare dati per quello specifico form schema. Se invece un form è impostato su **Public** – chiunque abbia il link può inviare dati. Per maggiori dettagli, consulta la pagina sui [form pubblici](../public-forms/index.md).|
| **Comportamento del set di metriche** | **Default** – il valore di ogni metrica può comparire più volte nei dati. **Unique** – il valore di una metrica (ad es. il nome di un distretto) può essere usato una sola volta per form. |
| **Genera report** | Se impostato su **Sì**, Dino genera automaticamente un report. Questa opzione è nascosta se è già presente un report automatico. Per maggiori dettagli, consulta la sezione sui [report automatici](../reports/autoreports.md). |

!!! warning "Comportamento Unique del set di metriche"
    Usa **Unique** con attenzione — una volta che un valore è stato usato per una metrica, non può essere riutilizzato in un altro dato dello stesso form schema.

## Gestire gli stati del form

1. Clicca sul campo **Stati del form** per espandere l'elenco.
2. Per aggiungere uno stato esistente, seleziona la relativa casella di controllo.
3. Per creare un nuovo stato, clicca su **Crea nuovo stato**. Si apre una finestra di dialogo in cui puoi inserire un'etichetta, scegliere un colore e salvare.
4. Per modificare uno stato esistente, clicca sull'icona **modifica** (matita) accanto ad esso.
5. Clicca fuori dal menu a tendina per chiuderlo.

## Definire le relazioni

Le relazioni ti permettono di collegare i campi tra form schema diversi (ad es. un sotto-form che dipende da una scelta effettuata nel form principale).

1. Clicca sul pulsante **Relazioni**.
2. Nella finestra di dialogo puoi aggiungere, modificare o rimuovere le connessioni tra gli schemi.

![Form relationships (dependencies) editor dialog](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Le relazioni sono disponibili solo quando si modifica uno schema esistente, non durante la creazione iniziale."

## Salvare e importare

- **Salva** – memorizza tutte le modifiche. Il pulsante è disabilitato se il form non è valido o se il salvataggio è ancora in corso.
- **Importa** – apre una finestra di selezione dei file per caricare un form schema da un file JSON o CSV. Usala per riutilizzare la struttura di uno schema proveniente da un altro progetto.

## Il builder del form

Sotto gli attributi, l'area **Builder del form** ti permette di trascinare, rilasciare e configurare i singoli campi (domande, sezioni, ecc.). Le modifiche si riflettono immediatamente nell'anteprima a destra del builder.