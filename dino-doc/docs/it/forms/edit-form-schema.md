---
title: Modifica schema modulo
description: Crea e modifica schemi di modulo — imposta nome, icona, stati, metriche, visibilità e definisci relazioni.
---

# Modifica schema modulo

La pagina Modifica schema modulo ti consente di creare un nuovo schema di modulo o modificarne uno esistente. Qui definisci gli attributi base del modulo, gestisci i suoi stati e le metriche, controlli la visibilità e colleghi lo schema ad altri moduli tramite relazioni.

Puoi raggiungere questa pagina:

- Cliccando su **Crea** nella [Panoramica moduli](index.md) per creare un nuovo schema.
- Selezionando **Modifica** sulla scheda di uno schema esistente o dalla sua vista dettagli.

I breadcrumb in alto mostrano la tua posizione corrente (es. **Moduli > Mio Sondaggio > Modifica**).

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

## Attributi del modulo

Compila o modifica i seguenti campi:

| Campo | Descrizione |
|-------|-------------|
| **Nome modulo** | Un identificatore univoco di sistema (es. `survey_2025`). Dino avvisa se il nome è già in uso. |
| **Etichetta modulo** | Il nome leggibile visualizzato negli elenchi e nei report. |
| **Set icone** | Scegli **Default** (icone material) o **Humanitarian** (icone SVG personalizzate). |
| **Identificatore icona** | Scegli un'icona dall'elenco di completamento automatico. L'anteprima si aggiorna in tempo reale. |
| **Stati del modulo** | Una o più etichette che descrivono lo stato di un invio (es. Bozza, Approvato, Rifiutato). Seleziona stati esistenti o **Crea nuovo stato** per aggiungerne al volo. |
| **Metriche del modulo** | Metriche da raccogliere per ogni invio. Seleziona una o più dall'elenco. |
| **Visibilità** | **Privato** – solo i membri dei gruppi assegnati possono vedere il modulo. **Pubblico** – chiunque abbia il link può visualizzare e inviare. |
| **Comportamento insieme metriche** | **Default** – ogni valore metrico può apparire più volte tra gli invii. **Univoco** – un valore metrico (es. nome del distretto) può essere usato una sola volta per modulo. |
| **Genera report** | Quando **Sì**, Dino genera automaticamente un report dopo ogni invio. Questa opzione è nascosta se un report automatico è già configurato. |

!!! warning "Comportamento insieme metriche univoco"
    Usa **Univoco** con cautela — una volta che un valore è stato utilizzato per una metrica, non può essere riutilizzato in un altro invio dello stesso modulo.

## Gestione degli stati del modulo

1. Clicca sul campo **Stati del modulo** per espandere l'elenco.
2. Per aggiungere uno stato esistente, seleziona la sua casella di spunta.
3. Per creare un nuovo stato, clicca su **Crea nuovo stato**. Si apre una finestra di dialogo in cui puoi inserire un'etichetta, scegliere un colore e salvare.
4. Per modificare uno stato esistente, clicca sull'icona **modifica** (matita) accanto ad esso.
5. Clicca all'esterno del menu a discesa per chiuderlo.

## Definizione delle relazioni

Le relazioni consentono di collegare campi tra diversi schemi di modulo (es. un sotto‑modulo che dipende da una scelta nel modulo principale).

1. Clicca sul pulsante **Relazioni**.
2. Nella finestra di dialogo, aggiungi, modifica o rimuovi connessioni tra schemi.

![Form relationships (dependencies) editor dialog](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Le relazioni sono disponibili solo quando si modifica uno schema esistente, non durante la creazione iniziale."

## Salvataggio e importazione

- **Salva** – memorizza tutte le modifiche. Il pulsante è disabilitato se il modulo non è valido o è ancora in fase di salvataggio.
- **Importa** – apre un selettore di file per caricare uno schema di modulo da un file JSON o CSV. Usalo per riutilizzare una struttura di schema da un altro progetto.

## Il costruttore di moduli

Sotto gli attributi, l'area **Costruttore di moduli** ti consente di trascinare, rilasciare e configurare singoli campi (domande, sezioni, ecc.). Le modifiche si riflettono immediatamente nell'anteprima sul lato destro del costruttore.
