---
title: Aggregazione
description: Visualizza e gestisci le submission aggregate dei moduli in Dino.
---

# Aggregazione

La pagina di Aggregazione offre una visualizzazione centralizzata di tutte le submission dei moduli nei tuoi progetti. Puoi sfogliare, filtrare ed eseguire azioni sulle submission senza dover aprire ogni singolo modulo.

![Main view of the Aggregation page](../imgs/aggregation/index.png)

## Visualizzazione dell'elenco di aggregazione

La tabella principale mostra una riga per submission. Per impostazione predefinita vedi le colonne **Schema modulo** e **Stato**, ma puoi personalizzare quali colonne appaiono usando l'icona **Vista settimana** nell'intestazione della tabella.

- Ogni riga mostra un'icona di stato e, se il modulo ha problemi di validazione, un'icona di avviso.
- Passa il mouse su una riga per vedere un'evidenziazione; clicca su una riga per selezionarla e visualizzare le azioni disponibili.

In cima all'elenco, il contatore **Elementi trovati** e il paginatore ti informano su quante submission esistono e ti permettono di navigare tra le pagine.

## Filtraggio e ricerca

Una barra di ricerca e un pannello filtri sono disponibili per restringere l'elenco.

1. Clicca l'**icona di ricerca** nella barra superiore per espandere il pannello filtri.
2. Usa il campo **parola chiave** per cercare in tutti i campi.
3. Usa i selettori **intervallo di date** per filtrare per data di creazione.
4. Filtri aggiuntivi appaiono per **Area**, **Caso**, **Località**, **Organizzazione**, **Progetto**, **Stato del modulo** e **Utente**. Sono dinamici e rispettano le definizioni delle metriche del tuo modulo.
5. I filtri attivi vengono mostrati come chips sotto la barra dei filtri – clicca l'icona **annulla** su un chip per rimuoverlo.

!!! tip "Filtri preimpostati"
    La pagina di Aggregazione non supporta filtri preimpostati salvati. Puoi combinare i filtri ogni volta che hai bisogno di una vista personalizzata.

## Azioni sulle righe

Dopo aver selezionato una riga, le icone delle azioni appaiono nella colonna **Azioni** sul lato destro della tabella.

| Icona | Azione | Descrizione |
|-------|--------|-------------|
| `visibility` | Visualizza | Apri la submission in modalità sola lettura. |
| `create` | Modifica | Modifica i dati della submission. |
| `printer` | Stampa | Genera un PDF della submission. |
| `delete` | Elimina | Rimuovi la submission dopo conferma. |

Clicca **Più opzioni** (tre puntini) per vedere azioni aggiuntive per quella riga. Le azioni **Stampa** e **Elimina** richiedono conferma prima di essere eseguite.

## Creare una nuova submission

Il pulsante **+** mobile nell'angolo in basso a destra dello schermo ti permette di iniziare una nuova submission.

![Dialog to choose a form schema and start a new submission](../imgs/aggregation/index-new.png)

1. Clicca il pulsante **+**. Si apre un dialogo che mostra gli schemi modulo disponibili.
2. Seleziona o cerca lo schema modulo che desideri utilizzare.
3. Dopo la selezione, vieni portato direttamente alla pagina [Modifica modulo](../forms/edit-form.md) per compilare i dati.

## Stampare un PDF

Puoi generare un PDF di qualsiasi submission che includa l'etichetta dello schema modulo, i nomi delle metriche attive e i dati compilati.

1. Sulla riga che vuoi stampare, clicca l'icona **Stampante** (o usa il menu **Più opzioni** se disponibile).
2. Conferma l'azione quando richiesto.
3. Il PDF si apre in una nuova scheda del browser o si scarica automaticamente.

L'intestazione del PDF include il titolo dello schema modulo e tutti i nomi delle metriche attualmente attive nel sistema.

!!! warning "Disponibilità delle metriche"
    Il PDF stampato include solo le metriche attive nel momento in cui avvii la stampa. Se una metrica è stata aggiunta dopo la creazione della submission, non apparirà.
