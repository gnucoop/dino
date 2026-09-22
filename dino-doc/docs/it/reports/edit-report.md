---
title: Modifica report
description: Scopri come modificare un report esistente in Dino, inclusi l'aggiornamento delle metriche e dei dettagli.
---

# Modifica report

La pagina Modifica report ti permette di modificare un report esistente. Dopo averlo creato, puoi aggiornarne le metriche, i dettagli e altre informazioni.

![Vista principale della pagina Modifica report](../imgs/reports/edit-report.png)

## Accedere alla pagina di modifica

Puoi raggiungere la pagina Modifica report in due modi:

* Dalla lista principale [Report](index.md), fai clic sul titolo di un report o sull'azione **Modifica** (spesso rappresentata da un'icona a forma di matita).
* Dall'interno della visualizzazione dettagliata di un report (dopo aver fatto clic su **Visualizza il report**), cerca un pulsante o un link **Modifica**.

## Modificare le informazioni del report

Una volta sulla pagina Modifica report, vedrai un form simile a quello usato per creare un report. Il form è precompilato con i dati attuali del report.

### Passaggi per modificare un report

1. **Controlla i dati precompilati** nei campi del form.
2. **Apporta le tue modifiche** a uno qualsiasi dei campi disponibili:
   - **Metriche primarie:** aggiorna i valori numerici principali del report.
   - **Metriche secondarie:** modifica ulteriori punti dati (se configurati per il tuo form schema).
   - **Dettagli:** modifica il testo descrittivo, le date o altre informazioni di supporto.
3. **Salva le modifiche** facendo clic sul pulsante **Salva** o **Aggiorna** in fondo al form.

!!! tip "Campi opzionali"
    A seconda della configurazione della tua organizzazione, alcuni campi delle metriche potrebbero essere opzionali. Di solito sono contrassegnati come tali. Puoi lasciare vuoti i campi opzionali se non sono disponibili dati.

## Visualizzare il report renderizzato

Dopo aver salvato le modifiche, puoi visualizzare il report formattato. Fai clic sul pulsante o sul link **Visualizza il report** per vedere una versione pulita e renderizzata dei dati del report.

![Vista del report renderizzato dopo aver fatto clic su Visualizza il report](../imgs/reports/edit-report-view.png)

## Comprendere il form schema

La struttura e i campi disponibili nella pagina Modifica report sono determinati dal **form schema** configurato dal tuo amministratore. Questo garantisce che i dati vengano raccolti in modo coerente.

![Vista principale della pagina Modifica report schema](../imgs/reports/edit-report-schema.png)

Se devi modificare informazioni che non compaiono come campo, contatta il tuo amministratore: potrebbe essere necessario aggiornare il form schema. Puoi saperne di più sulla struttura sottostante nella documentazione [Modifica report schema](edit-report-schema.md).

!!! warning "Integrità dei dati"
    Fai attenzione quando modifichi dati storici dei report, perché le modifiche possono influire sull'analisi delle tendenze e sui record storici. Assicurati che i tuoi aggiornamenti siano accurati.