---
title: Aggregazione
description: Visualizza e gestisci i dati aggregati dei form in Dino.
---

# Aggregazione

La pagina Aggregazione offre una visualizzazione centralizzata di tutti i dati dei form inviati attraverso i tuoi form schema. Puoi sfogliare, filtrare ed eseguire azioni sui dati dei form senza dover aprire ogni form singolarmente.

![Main view of the Aggregation page](../imgs/aggregation/index.png)

## Visualizzazione della lista di aggregazione

La tabella principale mostra una riga per ogni dato. Per impostazione predefinita vedi le colonne **Form Schema** e **Stato**, ma puoi personalizzare quali colonne visualizzare usando l'icona **Visualizza colonne** nell'intestazione della tabella.

- Ogni riga mostra un'icona di stato e, se il form presenta problemi di validazione, un'icona di avviso.
- Passa il mouse su una riga per evidenziarla; fai clic in un punto qualsiasi della riga per selezionarla e mostrare le azioni disponibili.

Nella parte superiore della lista, il contatore **Elementi trovati** e il paginatore ti indicano quanti dati sono presenti e ti permettono di navigare tra le pagine.

Se non applichi alcun filtro alla lista nella pagina Aggregazione, vedrai il numero totale di form inviati al tuo Dino che ti è consentito vedere, in base ai permessi del tuo utente.

## Filtro e ricerca

Sono disponibili una barra di ricerca e un pannello di filtri per restringere la lista.

1. Fai clic sull'**icona di ricerca** nella barra superiore per espandere il pannello dei filtri.
2. Usa il campo **parola chiave** per cercare in tutti i campi.
3. Usa i selettori **intervallo di date** per filtrare per data di creazione.
4. Compaiono filtri aggiuntivi per **Area**, **Caso**, **Posizione**, **Organizzazione**, **Progetto**, **Stato del form** e **Utente**. Sono dinamici e rispettano le definizioni delle metriche del tuo form.
5. I filtri attivi sono mostrati come chip sotto la barra dei filtri: fai clic sull'**icona di annullamento** su un chip per rimuoverlo.

!!! tip "Filtri preimpostati"
    La pagina Aggregazione non supporta filtri preimpostati salvati. Puoi combinare i filtri ogni volta che hai bisogno di una visualizzazione personalizzata.

## Azioni sulle righe

Dopo aver selezionato una riga, le icone delle azioni compaiono nella colonna **Azioni** sul lato destro della tabella.

| Icona | Azione | Descrizione |
|------|--------|-------------|
| `view` | Visualizza | Apre i dati in modalità di sola lettura. |
| `edit` | Modifica | Modifica i dati. |
| `print` | Stampa | Genera un PDF dei dati. |
| `delete` | Elimina | Rimuove i dati dopo la conferma. |

Fai clic su **More Horiz** (tre puntini) per vedere azioni aggiuntive per quella riga. Le azioni **Stampa** ed **Elimina** richiedono una conferma prima di essere eseguite.

## Creazione di nuovi dati

Il pulsante flottante **+** in basso a destra dello schermo ti permette di creare nuovi dati.

![Dialog to choose a form schema and start a new submission](../imgs/aggregation/index-new.png)

1. Fai clic sul pulsante **+**. Si apre una finestra di dialogo che mostra i form schema disponibili.
2. Seleziona o cerca il form schema che vuoi usare.
3. Dopo la selezione, vieni portato direttamente alla pagina [Modifica form](../forms/edit-form.md) per inserire i dati.

## Stampa di un PDF

Puoi generare un PDF di qualsiasi dato, che include l'etichetta del form schema, i nomi delle metriche attive e i dati inseriti.

1. Sulla riga che vuoi stampare, fai clic sull'icona **Stampante** (oppure usa il menu **More Horiz**, se disponibile).
2. Conferma l'azione quando richiesto.
3. Il PDF si apre in una nuova scheda del browser o viene scaricato automaticamente.

L'intestazione del PDF include il titolo del form schema e tutti i nomi delle metriche attualmente attive nel sistema.

!!! warning "Disponibilità delle metriche"
    Il PDF stampato include solo le metriche attive nel momento in cui avvii la stampa. Se una metrica è stata aggiunta dopo la creazione dei dati, non comparirà.