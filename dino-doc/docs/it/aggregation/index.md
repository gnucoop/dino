---
title: Aggregazione
description: Visualizza e gestisci gli invii di moduli aggregati in Dino.
---

# Aggregazione

La pagina Aggregazione offre una vista centralizzata di tutti gli invii dei moduli nei tuoi schemi di modulo. Puoi sfogliare, filtrare ed eseguire azioni sugli invii senza dover aprire ogni singolo modulo.

![Vista principale della pagina Aggregazione](../imgs/aggregation/index.png)

## Visualizzazione dell'elenco di aggregazione

La tabella principale mostra una riga per ogni invio. Per impostazione predefinita vedi le colonne **Schema del modulo** e **Stato**, ma puoi personalizzare le colonne visualizzate usando l'icona **Visualizza colonne** nell'intestazione della tabella.

- Ogni riga mostra un'icona di stato e, se il modulo presenta problemi di validazione, un'icona di avviso.
- Passa il mouse sopra una riga per evidenziarla; fai clic in un punto qualsiasi della riga per selezionarla e visualizzare le azioni disponibili.

Nella parte superiore dell'elenco, il contatore **Elementi trovati** e il paginatore ti permettono di sapere quanti invii esistono e di navigare tra le pagine.

Se non applichi alcun filtro all'elenco nella pagina Aggregazione, vedrai il numero totale di moduli inviati al tuo Dino che ti è consentito visualizzare, in base ai permessi del tuo utente.

## Filtraggio e ricerca

Una barra di ricerca e un pannello filtri sono disponibili per restringere l'elenco.

1. Fai clic sull'**icona di ricerca** nella barra superiore per espandere il pannello filtri.
2. Usa il campo **parola chiave** per cercare in tutti i campi.
3. Usa i selettori **intervallo di date** per filtrare in base alla data di creazione.
4. Filtri aggiuntivi compaiono per **Area**, **Caso**, **Posizione**, **Organizzazione**, **Progetto**, **Stato del modulo** e **Utente**. Sono dinamici e rispettano le definizioni delle metriche del modulo.
5. I filtri attivi vengono mostrati come chip sotto la barra dei filtri: fai clic sull'icona di **annullamento** su un chip per rimuoverlo.

!!! tip "Filtri preimpostati"
    La pagina Aggregazione non supporta filtri preimpostati salvati. Puoi combinare i filtri ogni volta che ti serve una vista personalizzata.

## Azioni sulle righe

Dopo aver selezionato una riga, le icone delle azioni compaiono nella colonna **Azioni** sul lato destro della tabella.

| Icona | Azione | Descrizione |
|------|--------|-------------|
| `view` | Visualizza | Apre l'invio in modalità di sola lettura. |
| `edit` | Modifica | Modifica i dati dell'invio. |
| `print` | Stampa | Genera un PDF dell'invio. |
| `delete` | Elimina | Rimuove l'invio dopo la conferma. |

Fai clic su **Altro** (tre puntini) per vedere ulteriori azioni per quella riga. Le azioni **Stampa** ed **Elimina** richiedono una conferma prima di essere eseguite.

## Creazione di un nuovo invio

Il pulsante fluttuante **+** in basso a destra dello schermo ti consente di iniziare un nuovo invio.

![Finestra di dialogo per scegliere uno schema di modulo e iniziare un nuovo invio](../imgs/aggregation/index-new.png)

1. Fai clic sul pulsante **+**. Si apre una finestra di dialogo che mostra gli schemi di modulo disponibili.
2. Seleziona o cerca lo schema di modulo che vuoi usare.
3. Dopo la selezione, vieni portato direttamente alla pagina [Modifica modulo](../forms/edit-form.md) per compilare i dati.

## Stampa di un PDF

Puoi generare un PDF di qualsiasi invio che includa l'etichetta dello schema di modulo, i nomi delle metriche attive e i dati compilati.

1. Sulla riga che vuoi stampare, fai clic sull'icona **Stampante** (oppure usa il menu **Altro** se disponibile).
2. Conferma l'azione quando richiesto.
3. Il PDF si apre in una nuova scheda del browser oppure viene scaricato automaticamente.

L'intestazione del PDF include il titolo dello schema di modulo e tutti i nomi delle metriche attualmente attive nel sistema.

!!! warning "Disponibilità delle metriche"
    Il PDF stampato include solo le metriche attive nel momento in cui avvii la stampa. Se una metrica è stata aggiunta dopo la creazione dell'invio, non comparirà.