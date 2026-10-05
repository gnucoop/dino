---
title: Modifica Form Schema
description: Costruisci e modifica form schema — imposta nome, icona, visibilità, stati, metriche, relazioni e la struttura del form stesso.
---

# Modifica Form Schema

La pagina Modifica Form Schema ti permette di creare un nuovo form schema o modificarne uno esistente. Qui definisci gli attributi generali del form, gestisci i suoi stati e le sue metriche, controlli la visibilità, lo colleghi ad altri form schema e costruisci le domande effettive a cui i tuoi utenti risponderanno.

Puoi raggiungere questa pagina:

- Cliccando il pulsante **+** (*Add New Forms Schema*) in basso a destra nella [panoramica dei form](index.md) per costruire un nuovo schema.
- Selezionando **Modifica** sulla card di uno schema esistente o dalla sua visualizzazione di dettaglio.

Il percorso di navigazione in alto mostra la tua posizione attuale (ad esempio, **Forms / Schema / My Survey / Modifica**).

![Vista principale della pagina Modifica Form Schema](../imgs/forms/edit-form-schema.png)

L'editor è organizzato in schede — **Impostazioni**, **Metriche**, **Stato**, **Costruisci** e **Relazioni**. I pulsanti **Salva** e **Importa XLSForm** restano visibili sulla riga delle schede, così puoi salvare il tuo lavoro da qualsiasi scheda.

## Scheda Impostazioni

La scheda **Impostazioni** contiene i metadati e la configurazione generale del questionario.

| Campo | Descrizione |
|-------|-------------|
| **Nome del Form** | Un identificatore di sistema univoco (ad esempio, `survey_2025`). Dino ti avvisa se il nome è già in uso. |
| **Etichetta del Form** | Il nome leggibile visualizzato negli elenchi e nei report. |
| **Set di icone** | Scegli **Predefinito** (icone material) o **Humanitarian** (icone SVG personalizzate). |
| **Icona del Form** | Scegli un'icona dall'elenco con completamento automatico. L'anteprima accanto al campo si aggiorna in tempo reale. |
| **Visibilità** | **Privato** — solo gli utenti Dino con il permesso di inviare dati possono inviare dati a questo form schema. **Pubblico** — chiunque abbia il link può inviare dati. Vedi [form pubblici](../public-forms/index.md) per i dettagli. |
| **Generare report** | Se impostato su **Si**, Dino genera automaticamente un report per il form. Se un report esiste già, questa opzione è bloccata su **Si**; per disattivarla, elimina prima lo schema e i dati del report. Vedi [Report automatici](../reports/autoreports.md) per maggiori dettagli. |

!!! tip "Vai direttamente alle domande"
    Clicca **Vai alla costruzione** in fondo alla scheda Impostazioni per aprire subito la scheda **Costruisci**.

## Scheda Metriche

Nella scheda **Metriche** scegli quali metriche si applicano a questo questionario e come si comportano.

- **Metriche dei Form** — le metriche da raccogliere per ogni dato. Selezionane una o più dall'elenco.
- **Modalità Set di Metriche** — **Predefinito** consente a ciascun valore di metrica di comparire più volte nei dati. **Unico** permette a un valore di metrica (ad esempio, il nome di un distretto) di essere utilizzato una sola volta per form.
- **Metriche da includere nel form** — seleziona le metriche i cui dati devono essere inclusi nel form.
- **Metriche incluse come opzioni di scelta** — aggiungi una riga per ogni metrica che vuoi esporre come origine di scelta. Per ogni riga, scegli la metrica, elenca facoltativamente attributi aggiuntivi da trasferire nella scelta e aggiungi una condizione di filtro se vuoi restringere le opzioni disponibili. La nuova origine di scelta è denominata `$metricName_metric_choice`.

!!! warning "Modalità Set di Metriche Unico"
    Usa **Unico** con attenzione — una volta che un valore è utilizzato per una metrica, non può essere riutilizzato in un altro dato dello stesso form schema.

## Scheda Stato

Nella scheda **Stato** definisci gli stati che un dato di questo questionario può avere (ad esempio Bozza, Approvato, Rifiutato).

1. Clicca il campo **Stati del Form** per espandere l'elenco.
2. Per aggiungere uno stato esistente, selezionalo nell'elenco.
3. Per creare un nuovo stato, clicca **Crea nuovo stato**. Si apre una finestra di dialogo dove puoi inserire un'etichetta, scegliere un colore e salvare.
4. Per modificare uno stato esistente, clicca l'icona **Modifica** (matita) accanto ad esso.
5. Clicca fuori dal menu a tendina per chiuderlo.

Puoi anche associare un livello a ciascuno stato per stabilire un ordine. Quando vengono creati nuovi dati del form, ricevono lo stato con il livello più basso.

## Scheda Costruisci

La scheda **Costruisci** contiene il costruttore di form, dove puoi trascinare, rilasciare e configurare singoli campi, slide e sezioni. Le modifiche si riflettono immediatamente nell'anteprima. Usa questa scheda per definire le domande a cui gli utenti risponderanno effettivamente.

## Scheda Relazioni

Le relazioni richiamano valori di campo o scelte da altri form schema in questo — ad esempio, un sotto-form che dipende da una scelta effettuata nel form principale.

1. Apri la scheda **Relazioni**.
2. Clicca **Aggiungi una relazione con altri form**.
3. Nella nuova riga, scegli il **Form Schema** da cui richiamare i dati, poi seleziona i **Campi** da portare in questo form.
4. Facoltativamente scegli uno o più valori di **Metrica** per filtrare la relazione.
5. Per usare un singolo campo come opzione di scelta, attiva **Campo come opzione**, poi scegli il **Campo etichetta** e, se necessario, un **Campi addizionali**.

![Scheda Relazioni dell'editor del form schema](../imgs/forms/edit-form-schema-relationships.png)

!!! tip "Salva prima"
    La scheda Relazioni e le sezioni dei dati delle metriche richiedono un form schema salvato. Mentre stai ancora creando uno schema, restano bloccate con il promemoria *Salva prima il form per aggiungere relazioni*.

## Salvataggio e importazione

- **Salva** — memorizza tutte le modifiche. Il pulsante è disabilitato mentre il form non è valido o è già in fase di salvataggio.
- **Importa XLSForm** — apre una finestra di dialogo dove puoi trascinare un file XLSForm o cliccare **Seleziona un file** (`.xls` o `.xlsx`; il file deve contenere i fogli *survey*, *choices* e *settings*), poi clicca **Applica** per caricarlo nell'editor. Usalo per riutilizzare la struttura di uno schema da un altro progetto. Nulla viene memorizzato finché non clicchi **Salva**.