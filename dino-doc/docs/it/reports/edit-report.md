---
title: Modifica report
description: Scopri come modificare un report esistente in Dino, inclusi l'aggiornamento di metriche e dettagli.
---

# Modifica report

La pagina Modifica report consente di modificare un report esistente. Puoi aggiornarne le metriche, i dettagli e altre informazioni dopo la creazione.

![Main view of the Edit Report page](../imgs/reports/edit-report.png)

## Accesso alla pagina di modifica

Puoi accedere alla pagina Modifica report in due modi:

* Dall'elenco principale [Report](index.md), fai clic sul titolo di un report o sull'azione **Modifica** (spesso rappresentata da un'icona a matita).
* Dalla vista dettagliata di un report (dopo aver fatto clic su **Visualizza il report**), cerca un pulsante o un collegamento **Modifica**.

## Modifica delle informazioni del report

Una volta nella pagina Modifica report, vedrai un modulo simile a quello usato per creare un report. Il modulo è precompilato con i dati attuali del report.

### Passaggi per modificare un report

1. **Esamina i dati precompilati** nei campi del modulo.
2. **Apporta le tue modifiche** a uno qualsiasi dei campi disponibili:
   - **Metriche principali:** aggiorna i principali valori numerici del report.
   - **Metriche secondarie:** modifica punti dati aggiuntivi (se configurati per lo schema del tuo modulo).
   - **Dettagli:** modifica testo descrittivo, date o altre informazioni di supporto.
3. **Salva le modifiche** facendo clic sul pulsante **Salva** o **Aggiorna** in fondo al modulo.

!!! tip "Campi facoltativi"
    A seconda della configurazione della tua organizzazione, alcuni campi delle metriche possono essere facoltativi. Di solito sono contrassegnati come tali. Puoi lasciare vuoti i campi facoltativi se non sono disponibili dati.

## Visualizzazione del report formattato

Dopo aver salvato le modifiche, puoi visualizzare il report formattato. Fai clic sul pulsante o sul collegamento **Visualizza il report** per vedere una versione pulita e formattata dei dati del report.

![Rendered report view after clicking View the Report](../imgs/reports/edit-report-view.png)

## Comprendere lo schema del modulo

La struttura e i campi disponibili nella pagina Modifica report sono determinati dallo **schema del modulo** configurato dall'amministratore. Questo garantisce che i dati vengano raccolti in modo coerente.

![Main view of the Edit Report Schema page](../imgs/reports/edit-report-schema.png)

Se devi modificare informazioni che non compaiono come campo, contatta il tuo amministratore: potrebbe essere necessario aggiornare lo schema del modulo. Puoi saperne di più sulla struttura sottostante nella documentazione [Modifica schema report](edit-report-schema.md).

!!! warning "Integrità dei dati"
    Presta attenzione quando modifichi dati storici del report: le modifiche possono influire sull'analisi delle tendenze e sui record storici. Assicurati che gli aggiornamenti siano accurati.