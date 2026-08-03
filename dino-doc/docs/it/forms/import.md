---
title: Importazione dati
description: Scopri come importare in blocco dati strutturati in qualsiasi schema di modulo utilizzando un file CSV o Excel. La procedura guidata in due passaggi ti consente di caricare un file e di mapparne le colonne sui campi del modulo.
---

# Importazione dati

La pagina **Importazione dati** consente di caricare in blocco gli invii in uno schema di modulo da un file `.xls`, `.xlsx` o `.csv`. Una procedura guidata in due passaggi ti guida attraverso il caricamento del file e la mappatura delle colonne del file sui campi del modulo.

![Main view of the Import Data page](../imgs/forms/import.png)

## Accesso alla pagina di importazione

1. Vai all'elenco **Moduli** e seleziona uno schema di modulo.
2. Dalla vista dati del modulo, fai clic su **Importa** (il pulsante della barra degli strumenti).

## Passaggio 1 — Carica file

Il primo passaggio mostra un'area di trascinamento o un selettore di file.

- **Formati accettati:** `.xls`, `.xlsx`, `.csv`
- **Dimensione massima del file:** 20 MB

Per caricare un file:

1. Trascina un file nell'area tratteggiata **oppure** fai clic su **Scegli un file** per sfogliare.
2. Dopo la selezione, il nome del file appare in un chip insieme al numero di colonne rilevate.
3. (Facoltativo) Lascia selezionata l'opzione **Riutilizza le metriche esistenti con lo stesso nome** (impostazione predefinita) in modo che qualsiasi metrica nel file il cui nome corrisponde a una metrica già presente nel sistema venga collegata a quella metrica esistente invece di crearne una duplicata. Deselezionala per creare sempre nuove metriche.
4. Fai clic su **Avanti** (o sull'etichetta dello stepper "2 · Mappa i campi") per continuare.

!!! tip "Formati di file"
    Dino accetta gli stessi tipi di file utilizzati per la raccolta dati standard. Assicurati che le intestazioni delle colonne siano chiare: verranno utilizzate come suggerimenti durante la mappatura.

!!! note "Metriche identificate tramite ID"
    Se una colonna di metriche nel file fornisce l'**ID** (UUID) della metrica, quella riga viene collegata alla metrica esistente con quell'ID e non viene creata alcuna nuova metrica. L'ID ha la precedenza sul nome della metrica, quindi questo avviene indipendentemente dall'opzione **Riutilizza le metriche esistenti con lo stesso nome** (che si applica solo alla corrispondenza per nome).

## Passaggio 2 — Mappa i campi

Dopo il caricamento, vedi una tabella che elenca tutte le colonne del file. Ogni riga ha tre colonne:

- **Colonna del file** – l'intestazione originale del file.
- **Campo del modulo** – un menu a tendina in cui selezioni il campo del modulo corrispondente.
- **Stato** – indica se la colonna è mappata, ignorata o presenta un errore.

### Operazioni di mappatura

- **Seleziona un campo del modulo** – apri il menu a tendina di una colonna e scegli il campo corretto. Puoi effettuare una ricerca all'interno del menu a tendina.
- **Ignora una colonna** – seleziona l'opzione **— Ignora questa colonna —** nel menu a tendina, oppure fai clic sul pulsante **Ignora** nella colonna Stato. Le colonne ignorate vengono disattivate (in grigio).
- **Ripristina una colonna ignorata** – fai clic sul pulsante **Ripristina** nella colonna Stato.

### Corrispondenza automatica

Fai clic su **Corrispondenza automatica** per consentire a Dino di abbinare automaticamente le colonne ai campi del modulo in base alla somiglianza dei nomi. Questo è un buon punto di partenza: rivedi e modifica le mappature secondo necessità.

!!! tip "La corrispondenza automatica funziona al meglio con intestazioni che corrispondono esattamente alle etichette dei campi o che contengono parole chiave simili."

### Ripetizione

Se un campo del modulo selezionato è un campo ripetibile (ad esempio, più numeri di telefono), sotto il menu a tendina appare un campo **Ripetizione**. Inserisci l'indice di ripetizione (0, 1, 2, …) per assegnare questa colonna del file a una occorrenza del gruppo ripetibile.

### Riepilogo della barra degli strumenti

In cima all'area di mappatura puoi vedere tre chip:

- **Colonne totali** – numero di colonne del file.
- **Mappate** – colonne assegnate a un campo del modulo.
- **Ignorate** – colonne che hai scelto di ignorare.

Usa il campo **Cerca colonne** per filtrare la tabella in base al nome della colonna del file.

## Applica importazione

Quando tutte le colonne desiderate sono mappate e non ci sono errori, il pulsante **Applica importazione** diventa abilitato. Fai clic su di esso per avviare l'importazione. Durante l'elaborazione appare uno spinner. Puoi fare clic su **Indietro** per tornare al passaggio 1 o annullare l'importazione.

Dopo un'importazione riuscita, vieni riportato all'elenco dei dati del modulo, dove compaiono i nuovi invii.

!!! warning "Mappatura duplicata"
    Se mappi lo stesso campo del modulo su più di una colonna del file, viene mostrato un errore di validazione e il pulsante **Applica importazione** rimane disabilitato finché non correggi il problema.