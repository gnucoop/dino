---
title: Progetti
description: Gestisci i tuoi progetti in Dino. Visualizza, aggiungi, modifica, elimina, importa ed esporta record di progetto con filtri e azioni di massa.
---

# Progetti

La pagina **Progetti** in Dino ti consente di gestire tutti i tuoi record di progetto strutturati. Puoi visualizzare un elenco ordinabile di progetti, aggiungerne di nuovi, modificare quelli esistenti, eliminarli, importare dati in blocco ed esportare l'elenco per analisi offline. La pagina offre anche potenti strumenti di filtro per trovare rapidamente il progetto che ti serve.

![Main view of the Projects page](../imgs/metrics/projects.png)

## Navigazione verso Progetti

Per aprire la pagina Progetti, espandi la sezione **Metriche** dalla navigazione principale e seleziona **Progetti**. L'URL del browser terminerà con `/metrics/projects`.

## L'elenco dei progetti

La tabella principale mostra un elenco di tutti i progetti. Ogni riga corrisponde a un progetto e visualizza le seguenti colonne per impostazione predefinita:

- **Nome del progetto** – Il nome del progetto. Puoi ordinare l'elenco per questa colonna.
- **Progetto padre** – Il progetto di livello superiore a cui appartiene questo progetto, se presente.
- **Codice** – Un codice di progetto assegnato manualmente.
- **Codice automatico** – Un codice generato automaticamente. Questo campo è di sola lettura e non può essere modificato.
- **Settori di intervento** – I settori su cui si concentra il progetto.
- **Donatori** – Le fonti di finanziamento del progetto.
- **Data di inizio** – La data in cui inizia il progetto.
- **Data di fine** – La data in cui termina il progetto.

Le colonne nascoste (ID, Data di creazione e Attributi aggiuntivi) possono essere visualizzate facendo clic sul pulsante **Personalizza colonne** (l'icona raffigura una vista settimanale) in alto a destra della tabella.

!!! tip "Campi di sola lettura"
    Il campo **Codice automatico** viene generato automaticamente e non può essere modificato. Apparirà in grigio nella finestra di modifica.

La barra degli strumenti superiore mostra il numero totale di elementi trovati e un paginatore. Puoi scegliere quanti progetti visualizzare per pagina.

## Gestione dei progetti

### Aggiungere un nuovo progetto

1. Fai clic sul pulsante fluttuante **Aggiungi nuovo** (l'icona **+** cerchiata) in basso a destra dello schermo.
2. Si apre una finestra in cui inserire i dettagli del progetto. I campi obbligatori sono contrassegnati di conseguenza.
3. Premi **Salva** per creare il progetto. Apparirà immediatamente nell'elenco.

### Modificare un progetto

1. Nella riga del progetto che vuoi modificare, fai clic sull'icona di **modifica** (matita).
2. Modifica i campi nella finestra. Il campo **Codice automatico** sarà disattivato.
3. Fai clic su **Salva** per applicare le modifiche.

### Visualizzare un progetto

- Fai clic sull'icona di **visualizzazione** (occhio) nella riga del progetto per aprire una versione di sola lettura della finestra dei dettagli del progetto.

### Eliminare un progetto

1. Fai clic sull'icona di **eliminazione** (cestino) nella riga del progetto.
2. Conferma l'eliminazione nella finestra pop-up. Il progetto verrà rimosso definitivamente.

!!! warning "Eliminazione di un progetto"
    L'eliminazione di un progetto lo rimuove dal sistema. Questa azione non può essere annullata. Assicurati di aver selezionato il progetto corretto prima di confermare.

## Ricerca e filtri

La barra di **ricerca e filtri** si trova sotto il percorso di navigazione. Puoi:

- **Cercare per parola chiave** – Digita un termine nel campo della parola chiave; l'elenco viene filtrato automaticamente.
- **Filtrare per intervallo di date** – Usa i selettori **Data da** e **Data a** per restringere i progetti in base alla data di inizio o fine.
- **Applicare filtri aggiuntivi** – Fai clic sul pulsante **elenco filtri** (icona a imbuto) per aprire una finestra con filtri più avanzati, come settori, donatori o altri attributi personalizzati.
- **Salvare e caricare i preset dei filtri** – Usa il gestore dei preset per salvare la combinazione di filtri corrente e ricaricarla in seguito.

Sotto la barra dei filtri compaiono i chip dei filtri, che mostrano i filtri attivi. Puoi rimuovere i singoli chip facendo clic sull'icona di **annullamento** su ciascuno di essi.

## Esportazione e importazione

### Esportare progetti

1. Fai clic sul pulsante di **esportazione** (icona di nuvola con freccia in giù) nella barra dei filtri.
2. Scegli il formato di esportazione (ad esempio CSV, Excel) e le colonne da includere.
3. Il file verrà scaricato sul tuo computer.

### Importare progetti

1. Fai clic sul pulsante fluttuante di **importazione** (icona di nuvola con freccia in su) in basso a destra.
2. Carica un file formattato correttamente (ad esempio CSV o Excel). Il sistema creerà o aggiornerà i progetti in base ai dati.
3. Controlla i risultati dell'importazione per eventuali errori o avvisi.

## Azioni di massa

Puoi selezionare più progetti utilizzando le caselle di controllo a sinistra di ogni riga. Dopo aver selezionato almeno un progetto, la barra degli strumenti sopra la tabella mostra le azioni di massa:

- **Elimina selezionati** – Rimuove tutti i progetti selezionati dopo la conferma.
- **Modifica selezionati (modifica di massa del modulo)** – Apre una finestra in cui puoi modificare un campo comune per tutti i progetti selezionati contemporaneamente.

Dopo la modifica o l'eliminazione di massa, l'elenco si aggiorna automaticamente.