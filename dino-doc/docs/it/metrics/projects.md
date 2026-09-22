---
title: Progetti
description: Gestisci i tuoi progetti in Dino. Visualizza, aggiungi, modifica, elimina, importa ed esporta i record dei progetti con filtro e azioni in blocco.
---

# Progetti

La pagina **Progetti** di Dino ti permette di gestire tutti i valori della metrica Progetto. Puoi usarla per mappare i progetti della tua organizzazione, un programma, le collaborazioni con i donatori o qualsiasi altro tipo di gruppo strutturato di attività rilevante per il tuo lavoro. Puoi visualizzare un elenco ordinabile di progetti, aggiungerne di nuovi, modificare quelli esistenti, eliminarli, importare dati in blocco ed esportare l'elenco per l'analisi offline. La pagina offre inoltre potenti strumenti di filtro per trovare rapidamente il progetto che ti serve.

![Main view of the Projects page](../imgs/metrics/projects.png)

## Come raggiungere la pagina Progetti

Per aprire la pagina Progetti, espandi la sezione **Metrics** dalla navigazione principale e seleziona **Progetti**. L'URL del browser terminerà con `/metrics/projects`.

## Comprendere l'elenco dei progetti

La tabella principale mostra un elenco di tutti i progetti. Ogni riga corrisponde a un progetto e visualizza le seguenti colonne per impostazione predefinita:

- **Nome progetto** – Il nome del progetto. Puoi ordinare l'elenco in base a questa colonna.
- **Progetto principale** – Il progetto di livello superiore a cui appartiene questo progetto, se presente.
- **Codice** – Un codice assegnato manualmente al progetto.
- **Codice automatico** – Un codice generato automaticamente. Questo campo è di sola lettura e non può essere modificato.
- **Settori di intervento** – I settori su cui si concentra il progetto.
- **Donatori** – Le fonti di finanziamento del progetto.
- **Data di inizio** – La data in cui inizia il progetto.
- **Data di fine** – La data in cui termina il progetto.

Le colonne nascoste (ID, Data di creazione e Attributi aggiuntivi) possono essere mostrate facendo clic sul pulsante **Personalizza colonne** (l'icona ha l'aspetto di una vista settimanale) nell'angolo in alto a destra della tabella.

!!! tip "Campi di sola lettura"
    Il campo **Codice automatico** viene generato automaticamente e non può essere modificato. Apparirà in grigio nella finestra di dialogo di modifica.

La barra degli strumenti in alto mostra il numero totale di elementi trovati e un paginatore. Puoi scegliere quanti progetti visualizzare per pagina.

## Gestione dei progetti

### Aggiungere un nuovo progetto

1. Fai clic sul pulsante flottante **Aggiungi nuovo** (l'icona **+** cerchiata) in basso a destra dello schermo.
2. Si apre una finestra di dialogo in cui inserire i dettagli del progetto. I campi obbligatori sono contrassegnati di conseguenza.
3. Premi **Salva** per creare il progetto. Apparirà immediatamente nell'elenco.

### Modificare un progetto

1. Nella riga del progetto che vuoi modificare, fai clic sull'icona **modifica** (matita).
2. Modifica i campi nella finestra di dialogo. Il campo **Codice automatico** sarà in grigio.
3. Fai clic su **Salva** per applicare le modifiche.

### Visualizzazione di un progetto

- Fai clic sull'icona **visualizza** (occhio) nella riga del progetto per aprire una versione di sola lettura della finestra di dialogo con i dettagli del progetto.

### Eliminare un progetto

1. Fai clic sull'icona **elimina** (cestino) nella riga del progetto.
2. Conferma l'eliminazione nella finestra pop-up. Il progetto verrà rimosso definitivamente.

!!! warning "Eliminazione di un progetto"
    L'eliminazione di un progetto lo rimuove dal sistema. Questa azione non può essere annullata. Assicurati di aver selezionato il progetto corretto prima di confermare.

## Ricerca e filtro

La barra **ricerca e filtri** si trova sotto il percorso di navigazione. Puoi:

- **Cercare per parola chiave** – Digita un termine qualsiasi nel campo della parola chiave; l'elenco si filtra automaticamente.
- **Filtrare per intervallo di date** – Usa i selettori **Data da** e **Data a** per restringere i progetti in base alla data di inizio o di fine.
- **Applicare filtri aggiuntivi** – Fai clic sul pulsante **elenco dei filtri** (icona a imbuto) per aprire una finestra di dialogo con filtri più avanzati, come settori, donatori o altri attributi personalizzati.
- **Salvare e caricare i predefiniti dei filtri** – Usa il gestore dei predefiniti per salvare la combinazione di filtri corrente e ricaricarla in seguito.

I chip dei filtri appaiono sotto la barra dei filtri e mostrano i filtri attivi. Puoi rimuovere i singoli chip facendo clic sull'icona **annulla** di ciascuno.

## Esportazione e importazione

### Esportare i progetti

1. Fai clic sul pulsante **esporta** (icona di download dal cloud) nella barra dei filtri.
2. Scegli il formato di esportazione (ad es. CSV, Excel) e le colonne da includere.
3. Il file verrà scaricato sul tuo computer.

### Importare i progetti

1. Fai clic sul pulsante flottante **importa** (icona di caricamento sul cloud) in basso a destra.
2. Carica un file nel formato corretto (ad es. CSV o Excel). Il sistema creerà o aggiornerà i progetti in base ai dati.
3. Controlla i risultati dell'importazione per eventuali errori o avvisi.

## Azioni in blocco

Puoi selezionare più progetti usando le caselle di controllo a sinistra di ogni riga. Una volta selezionato almeno un progetto, la barra degli strumenti sopra la tabella mostra le azioni in blocco:

- **Elimina selezionati** – Rimuove tutti i progetti selezionati dopo la conferma.
- **Modifica selezionati (modifica in blocco del form)** – Apre una finestra di dialogo in cui puoi modificare un campo comune per tutti i progetti selezionati contemporaneamente.

Dopo la modifica o l'eliminazione in blocco, l'elenco si aggiorna automaticamente.