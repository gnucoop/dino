---
title: Modifica schema report
description: Crea o modifica uno schema report per definire struttura, layout e origini dati dei report in Dino.
---

# Modifica schema report

La pagina **Modifica schema report** consente di creare un nuovo schema report o modificarne uno esistente. Uno schema report definisce la struttura, il layout e le origini dati per un report in Dino.

![Vista principale della pagina Modifica schema report](../imgs/reports/edit-report-schema.png)

In questa pagina puoi configurare il nome del report, la descrizione e i campi dati specifici che appariranno nel report a partire dalle tue compilazioni dei moduli.

## Creare un nuovo schema report

Per creare un nuovo schema report:

1. Vai alla sezione **Report** nel menu principale.
2. Fai clic su **Crea schema report**.
3. Verrai portato alla pagina Modifica schema report.
4. Inserisci un **Nome** descrittivo per il tuo report.
5. (Facoltativo) Fornisci una **Descrizione** per spiegare lo scopo del report.
6. Configura i dati e il layout del report utilizzando le opzioni disponibili.
7. Fai clic su **Salva** per creare lo schema.

## Modificare uno schema report esistente

Per modificare uno schema report già creato:

1. Vai alla sezione **Report**.
2. Trova lo schema report che desideri modificare nell'elenco e fai clic su di esso.
3. Fai clic sul pulsante **Modifica** (spesso rappresentato da un'icona a forma di matita).
4. Verrai portato alla pagina Modifica schema report con la configurazione corrente caricata.
5. Apporta le modifiche desiderate al nome, alla descrizione o alla configurazione dei dati.
6. Fai clic su **Salva** per aggiornare lo schema.

!!! tip "Salvare il lavoro"
    Ricorda sempre di fare clic su **Salva** dopo aver apportato modifiche. Le tue modifiche non vengono applicate fino a quando non salvi lo schema.

## Configurare i dati del report

Il cuore dello schema report è definire quali dati delle tue compilazioni dei moduli appariranno nel report. In genere puoi:

* **Selezionare l'origine dati:** scegli lo schema modulo che contiene i dati su cui desideri creare il report.
* **Selezionare i campi dati:** scegli campi specifici dagli schemi modulo collegati da includere come colonne nel report.
* **Impostare i nomi visualizzati:** personalizza l'intestazione di colonna mostrata nel report per ogni campo selezionato.
* **Definire i filtri:** imposta condizioni per includere solo determinate compilazioni che soddisfano i tuoi criteri (ad esempio, compilazioni di un determinato intervallo di date).

!!! warning "Origine dati"
    Uno schema report deve essere collegato ad almeno uno schema modulo per avere dati da visualizzare. Assicurati che il modulo pertinente esista prima di creare il report.

## Passaggi successivi

Dopo aver salvato lo schema report, puoi:

* Andare alla pagina [Report](index.md) per visualizzare ed eseguire il tuo nuovo report.
* Tornare a questa pagina per apportare ulteriori modifiche se necessario.