---
title: Moduli
description: Gestisci schemi di moduli e raccogli invii strutturati di dati in Dino.
---

# Moduli

La pagina **Moduli** è il punto di partenza per la raccolta strutturata di dati in Dino. Da qui puoi navigare, creare e gestire gli schemi di moduli, quindi visualizzare e lavorare con gli invii raccolti attraverso ciascun modulo.

![Main view of the Forms page](../imgs/forms/index.png)

La vista principale mostra una **griglia di schede degli schemi di moduli**. Ogni scheda mostra l'etichetta e l'icona del modulo. Passando il mouse su una scheda vengono visualizzati i pulsanti delle azioni:

- **Modifica Schema** – Modifica la struttura del modulo (campi, validazione, metriche).
- **Elimina Schema** – Rimuove lo schema del modulo (e tutti i suoi invii).
- **Condividi URL** – Ottieni un link pubblico per consentire invii esterni.
- **Visualizza Mappa** – Apre la vista mappa per gli invii con dati di posizione.
- **Chatta con i tuoi dati** – Utilizza la funzionalità [DataChat](datachat.md) per fare domande in linguaggio naturale sugli invii.

!!! tip
    Le azioni disponibili su una scheda dipendono dai tuoi permessi. Potresti non vedere tutti i pulsanti.

Per creare un nuovo schema di modulo, fai clic sul pulsante fluttuante **+** in basso a destra. Verrai portato alla pagina [Modifica Schema Modulo](edit-form-schema.md) per progettare il tuo modulo.

## Lavorare con gli Invii

Fai clic su una scheda dello schema del modulo per accedere al suo **elenco degli invii**. Questa tabella mostra tutte le voci di dati raccolte per quello schema.

![Submission list (data table) for a form schema](../imgs/forms/index-list.png)

L'elenco include una **barra dei filtri** che ti consente di cercare per parola chiave, intervallo di date, metriche, stato, utente e altro. Puoi anche salvare preimpostazioni di filtro per un riutilizzo rapido.

Utilizza il pulsante **esporta** per scaricare gli invii in formato CSV o XLSX.

![Export dialog for downloading form submissions](../imgs/forms/index-export.png)

### Azioni sulle Righe

Fai clic su una riga per espandere i dettagli, oppure utilizza le azioni sulla riga (visualizza, modifica, elimina, stampa come PDF, scarica come DOCX, stampa badge). Le azioni disponibili dipendono dai tuoi permessi e dalla configurazione del modulo.

### Creazione di un Nuovo Invio

Fai clic sul pulsante fluttuante **+** nella pagina dell'elenco per aprire un modulo vuoto per l'inserimento dati.

![Blank form opened to submit a new data entry](../imgs/forms/index-create.png)

Compila i campi e invia. Il nuovo invio apparirà nell'elenco.

### Operazioni in Blocco

Seleziona più invii utilizzando le caselle di controllo per eseguire un'operazione in blocco di **eliminazione** o **modifica** (cambiare lo stesso valore del campo in tutte le voci selezionate).

## Viste Aggiuntive

- **Mappa** – Visualizza gli invii con coordinate geografiche su una mappa interattiva. Scopri di più in [Mappa dei Moduli](forms-map.md).
- **DataChat** – Interroga i dati del modulo utilizzando il linguaggio naturale. Vedi [DataChat](datachat.md) per i dettagli.

!!! warning
    La funzionalità DataChat potrebbe consumare crediti. Controlla il saldo crediti del tuo account prima di utilizzarla.