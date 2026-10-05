---
title: Progetti
description: Gestisci i tuoi progetti in Dino. Visualizza, aggiungi, modifica, elimina, importa ed esporta i dati dei progetti con filtro e azioni in blocco.
---

# Progetti

La pagina **Progetti** di Dino ti permette di gestire tutti i valori della metrica Progetto. Può essere utilizzata per mappare i progetti della tua organizzazione, un programma, le collaborazioni con i Donatori o qualsiasi altro gruppo strutturato di attività rilevante per il tuo lavoro. Puoi visualizzare una lista ordinabile di progetti, aggiungerne di nuovi, modificare quelli esistenti, eliminarli, importare dati in blocco ed esportare la lista per l'analisi offline. La pagina offre anche strumenti di filtro per trovare rapidamente il progetto che ti serve.

![Visualizzazione principale della pagina Progetti](../imgs/metrics/projects.png)

## Come accedere ai Progetti

Per aprire la pagina Progetti, clicca su **Metriche** nella navigazione principale, poi sulla scheda **Progetti**. L'URL del browser terminerà con `/metrics/projects`.

## Come leggere la lista dei Progetti

La tabella principale mostra una lista di tutti i progetti. Ogni riga corrisponde a un progetto e visualizza le seguenti Colonne per impostazione predefinita:

- **Project Name** – Il nome del progetto. Puoi ordinare la lista per questa colonna.
- **Progetto genitore** – Il progetto di livello superiore a cui appartiene questo progetto, se presente.
- **Codice** – Un codice di progetto assegnato manualmente.
- **Auto Code** – Un codice generato automaticamente. Lo imposta Dino: non è mostrato nella finestra del progetto e non può essere modificato.
- **Settori di intervento** – I settori su cui si concentra il progetto.
- **Donatori** – Le fonti di finanziamento del progetto.
- **Data di inizio** – La data in cui inizia il progetto.
- **Data di fine** – La data in cui termina il progetto.

Le Colonne nascoste (ID, Creation Date e Additional Attributes) possono essere mostrate con il pulsante **Colonne** (tooltip *Personalizza le colonne*), sopra la tabella a destra.

!!! tip "Campi di sola lettura"
    Il campo **Auto Code** è generato automaticamente e non può essere modificato. È mostrato nella lista ma non nella finestra del progetto.

La barra degli strumenti in alto mostra il numero totale di elementi trovati e un paginatore. Puoi scegliere quanti progetti visualizzare per pagina.

## Gestire i Progetti

### Aggiungere un nuovo Progetto

1. Clicca sul pulsante **Add new PROJECT** nella barra degli strumenti sopra la tabella.
2. Si apre una finestra in cui inserisci i dettagli del progetto. I campi opzionali sono contrassegnati con *(optional)*.
3. Premi **Salva** per creare il progetto. Appare immediatamente nella lista.

### Modificare un Progetto

1. Passa il mouse sulla riga del progetto e clicca sull'icona **Modifica** (matita), oppure seleziona la riga e clicca su **Modifica** nella barra delle azioni sopra la tabella.
2. Modifica i campi nella finestra.
3. Clicca su **Salva** per applicare le modifiche.

### Visualizzare un Progetto

- Passa il mouse sulla riga del progetto e clicca sull'icona **Vedi** (occhio), oppure seleziona la riga e clicca su **Vedi** nella barra delle azioni, per aprire una versione di sola lettura della finestra dei dettagli del progetto.

### Eliminare un Progetto

1. Clicca sulla riga del progetto per selezionarla, poi clicca su **Elimina** nella barra delle azioni sopra la tabella.
2. Conferma l'eliminazione nella finestra pop-up. Il progetto viene rimosso permanentemente.

!!! warning "Eliminare un progetto"
    Eliminare un progetto lo rimuove dal sistema. Questa azione non può essere annullata. Un progetto utilizzato da form, o che ha progetti figli, non può essere eliminato; vedi [Metriche](index.md).

## Ricerca e filtro

La barra di **ricerca e filtri** si trova sotto il titolo della pagina. Puoi:

- **cerca per parola chiave** – Digita un termine nel campo della parola chiave; la lista si filtra automaticamente.
- **Filtra per intervallo di date** – Clicca su **Filtri**, imposta una **Data di partenza** e una **Fino ad oggi**, poi clicca su **Cerca**. Le date filtrano per la data di creazione del progetto, non per la sua data di inizio o fine.

Le etichette dei filtri appaiono sotto la barra dei filtri, mostrando i filtri attivi. Puoi rimuovere le singole etichette cliccando sull'icona **cancella** di ciascuna.

## Esportare e importare

### Esportare i Progetti

1. Clicca sul pulsante **Esporta** nella barra degli strumenti.
2. Scegli cosa esportare: *Elementi nella pagina* (predefinito), gli elementi che corrispondono ai tuoi filtri, oppure *Tutti gli elementi*.
3. Scegli il formato: *csv*, *xlsx* o *splitted xlsx*, poi clicca su **Esporta**.

### Importare i Progetti

1. Clicca sul pulsante **Import PROJECT** nella barra degli strumenti sopra la tabella.
2. Carica un file `.xls`, `.xlsx` o `.csv` e mappa le sue colonne ai campi del progetto.
3. Clicca su **Applica importazione** e controlla il risultato per eventuali errori o avvisi. I progetti il cui nome esiste già vengono riutilizzati, non aggiornati.

## Azioni in blocco

Puoi selezionare più progetti usando le caselle di controllo a sinistra di ogni riga. Con diversi progetti selezionati, la barra delle azioni sopra la tabella offre **Elimina**, che rimuove tutti i progetti selezionati dopo la conferma. Non è disponibile la modifica in blocco.

Dopo l'eliminazione, la lista si aggiorna automaticamente.

## Pagine correlate

- [Panoramica sulle Metriche](index.md)
- [Aree tematiche](areas.md)
- [Organizzazioni](organizations.md)
- [Posizioni](locations.md)
- [Casi](cases.md)