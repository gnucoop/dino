---
title: Modifica schema del modulo
description: Crea e modifica gli schemi dei moduli — imposta nome, icona, stati, metriche, visibilità e definisci le relazioni.
---

# Modifica schema del modulo

La pagina Modifica schema del modulo consente di creare un nuovo schema di modulo o modificarne uno esistente. Qui è possibile definire gli attributi di base del modulo, gestirne stati e metriche, controllare la visibilità e collegare lo schema ad altri moduli tramite relazioni.

Puoi raggiungere questa pagina:

- Facendo clic su **Crea** nella [Panoramica dei moduli](index.md) per creare un nuovo schema.
- Selezionando **Modifica** sulla scheda di uno schema esistente o dalla relativa vista di dettaglio.

Il breadcrumb in alto mostra la posizione corrente (ad es., **Moduli > Il mio sondaggio > Modifica**).

![Main view of the Edit Form Schema page](../imgs/forms/edit-form-schema.png)

## Attributi del modulo

Compila o modifica i seguenti campi:

| Campo | Descrizione |
|-------|-------------|
| **Nome modulo** | Un identificatore di sistema univoco (ad es. `survey_2025`). Dino avvisa se il nome è già utilizzato. |
| **Etichetta modulo** | Il nome leggibile visualizzato in elenchi e report. |
| **Set di icone** | Scegli **Predefinito** (icone material) o **Umanitario** (icone SVG personalizzate). |
| **Identificatore icona** | Seleziona un'icona dall'elenco di autocompletamento. L'anteprima si aggiorna in tempo reale. |
| **Stati del modulo** | Una o più etichette che descrivono lo stato di un invio (ad es. Bozza, Approvato, Rifiutato). Seleziona stati esistenti oppure **Crea nuovo stato** per aggiungerne uno al volo. |
| **Metriche del modulo** | Metriche da raccogliere per ogni invio. Selezionane una o più dall'elenco. |
| **Visibilità** | **Privato** – solo i membri dei gruppi assegnati possono vedere il modulo. **Pubblico** – chiunque abbia il link può visualizzarlo e inviarlo. |
| **Comportamento del set di metriche** | **Predefinito** – ogni valore di metrica può comparire più volte negli invii. **Univoco** – un valore di metrica (ad es. il nome di un distretto) può essere usato una sola volta per modulo. |
| **Genera report** | Se **Sì**, Dino genera automaticamente un report dopo ogni invio. Questa opzione è nascosta se è già configurato un report automatico. |

!!! warning "Comportamento del set di metriche univoco"
    Usa **Univoco** con cautela: una volta che un valore è stato usato per una metrica, non può essere riutilizzato in un altro invio dello stesso modulo.

## Gestione degli stati del modulo

1. Fai clic sul campo **Stati del modulo** per espandere l'elenco.
2. Per aggiungere uno stato esistente, seleziona la relativa casella.
3. Per creare un nuovo stato, fai clic su **Crea nuovo stato**. Si apre una finestra di dialogo in cui puoi inserire un'etichetta, scegliere un colore e salvare.
4. Per modificare uno stato esistente, fai clic sull'icona **modifica** (matita) accanto ad esso.
5. Fai clic all'esterno del menu a discesa per chiuderlo.

## Definizione delle relazioni

Le relazioni consentono di collegare campi tra diversi schemi di modulo (ad es. un sotto-modulo che dipende da una scelta nel modulo principale).

1. Fai clic sul pulsante **Relazioni**.
2. Nella finestra di dialogo, aggiungi, modifica o rimuovi connessioni tra schemi.

![Form relationships (dependencies) editor dialog](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Le relazioni sono disponibili solo quando si modifica uno schema esistente, non durante la creazione iniziale."

## Salvataggio e importazione

- **Salva** – archivia tutte le modifiche. Il pulsante è disabilitato se il modulo non è valido o se è ancora in fase di salvataggio.
- **Importa** – apre un selettore di file per caricare uno schema di modulo da un file JSON o CSV. Usalo per riutilizzare la struttura di uno schema da un altro progetto.

## Il Form Builder

Sotto gli attributi, l'area **Form Builder** consente di trascinare, rilasciare e configurare i singoli campi (domande, sezioni, ecc.). Le modifiche vengono riflesse immediatamente nell'anteprima sul lato destro del builder.