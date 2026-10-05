---
title: Modifica report
description: Scopri come creare un report da un report schema in Dino, aprire un report salvato ed esportare i risultati.
---

# Modifica report

Un report viene generato da un [report schema](edit-report-schema.md): applica lo schema ai dati che corrispondono alle metriche e alle date che scegli. Questa pagina spiega come creare un nuovo report e come aprire ed esportare un report salvato.

![Un report salvato aperto sul suo passaggio Metriche del report](../imgs/reports/edit-report.png)

## Creare un report

1. Vai alla pagina [Report](index.md) e clicca sulla card del report schema che vuoi usare. Si apre la lista dei suoi report.
2. Clicca **Aggiungi nuovo report** sopra la tabella. Se il report usa prompt AI, il numero di token DINO-AI che consumerà è mostrato sul pulsante.
3. Se il tuo Dino usa le metriche, la pagina si apre sul passaggio **Metriche del report**:
    1. Controlla la **Data di creazione** e clicca **Modifica** per sceglierne un'altra se necessario.
    2. Facoltativamente, scegli uno **Stato del Form**, tra gli stati del form che ti è consentito usare. Il campo è mostrato solo quando ce ne sono.
    3. Scegli i valori delle metriche a cui si riferisce il report, come una posizione o un progetto. Le metriche contrassegnate da un asterisco (*) sono richieste dal report schema; le altre sono facoltative e restringono ulteriormente i dati. Se un valore che ti serve non esiste ancora, clicca **Nuovo** accanto al suo campo per crearlo, quando ti è consentito.
    4. Clicca **Continua**.
4. Nel passaggio **DATI DEL REPORT**:
    1. Inserisci il **Nome report**. È obbligatorio.
    2. Facoltativamente, imposta **Raccolto da** e **Raccolto fino a**: solo i dati creati all'interno di quell'intervallo sono inclusi nel report. Puoi impostare solo uno dei due, o nessuno, nel qual caso non viene applicato alcun filtro sulle date.
5. Clicca il pulsante **Salva report** in basso a destra. È attivo una volta compilate le metriche richieste e il nome.

Dino conferma che il documento è stato creato e ti riporta alla lista dei report, dove appare il nuovo report.

!!! warning "Report con prompt AI"
    Creare un report che usa prompt AI consuma token DINO-AI. Se non ne hai abbastanza, Dino non crea il report e ti chiede di aggiungere altri token.

!!! tip "I valori delle metriche non possono essere modificati in seguito"
    Le metriche, lo stato e l'intervallo di date sono fissati quando il report viene creato. Per vedere lo stesso schema applicato ad altri valori, crea un altro report.

## Aprire un report salvato

1. Vai alla pagina [Report](index.md) e clicca sulla card del report schema.
2. Nella lista dei report, passa il mouse sulla riga del report e clicca l'icona **Vedi** (occhio), oppure clicca la riga per selezionarla e clicca **Vedi** nella barra delle azioni sopra la tabella.

Se il tuo Dino usa le metriche, il report si apre sul passaggio **Metriche del report**, che mostra i valori con cui il report è stato creato. Qui non possono essere modificati. Clicca **Visualizza il report** per passare al passaggio **DATI DEL REPORT**, dove il report viene mostrato.

Mentre il report si carica, Dino mostra uno spinner. Un report che usa prompt AI mostra invece una barra di avanzamento, con il messaggio *Generating report prompt X of Y*. Se nessun dato corrisponde al report, la pagina mostra *Non sono stati trovati form per questo report*.

![Visualizzazione del report generato dopo aver cliccato Visualizza il report](../imgs/reports/edit-report-view.png)

## Leggere il report

La parte superiore del passaggio **DATI DEL REPORT** mostra il titolo del report schema, le date **Raccolto da** e **Raccolto fino a** quando il report le ha, e i valori delle metriche con cui è stato creato. Segue il report stesso, come definito nel suo file [XLSReport](xlsreport.md): tabelle, grafici e testo.

Se il report contiene widget di filtro, puoi usarli per restringere i dati mostrati, senza modificare il report salvato.

## Esportare un report

Accanto a **Esporta come:**, nella parte superiore del passaggio **DATI DEL REPORT**, scegli un formato:

* **pdf portrait** / **pdf landscape** — un documento PDF nell'orientamento scelto.
* **docx portrait** / **docx landscape** — un documento Word nell'orientamento scelto.
* **xlsx** — un file Excel con i dati del report.

!!! note "Dove sono i pulsanti di esportazione"
    I pulsanti di esportazione appartengono al passaggio **DATI DEL REPORT**. Quando il tuo Dino non ha metriche attive, e nella [Dashboard](../dashboard/index.md), il report viene mostrato direttamente, senza i passaggi e senza i pulsanti di esportazione.

## Pagine correlate

* [Report](index.md) — sfoglia i report schema e i loro report.
* [Modifica report schema](edit-report-schema.md) — crea o modifica lo schema da cui viene generato un report.
* [Report automatici](autoreports.md) — report generati automaticamente da un form schema.