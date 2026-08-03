---
title: Moduli
description: Gestisci gli schemi dei moduli e raccogli invii di dati strutturati in Dino.
---

# Moduli

La pagina **Moduli** è il tuo punto di partenza per la raccolta di dati strutturati in Dino. Da qui puoi sfogliare, creare e gestire schemi di moduli, quindi visualizzare e lavorare con gli invii raccolti tramite ciascun modulo.

![Main view of the Forms page](../imgs/forms/index.png)

La vista principale mostra una **griglia di riquadri degli schemi di moduli**. Ogni riquadro mostra l'etichetta e l'icona del modulo. Passando il mouse sopra un riquadro vengono mostrati i pulsanti di azione:

- **Modifica schema** – Modifica la struttura del modulo (campi, validazione, metriche).
- **Elimina schema** – Rimuove lo schema del modulo (e tutti i suoi invii).
- **Condividi URL** – Ottieni un link pubblico per consentire invii esterni.
- **Visualizza mappa** – Apre la vista mappa per gli invii con dati di posizione.
- **Chat con i tuoi dati** – Usa la funzionalità [DataChat](datachat.md) per fare domande sugli invii in linguaggio naturale.

!!! tip
    Le azioni disponibili su un riquadro dipendono dai tuoi permessi. Potresti non vedere tutti i pulsanti.

Per creare un nuovo schema di modulo, fai clic sul pulsante fluttuante **+** in basso a destra. Verrai portato alla pagina [Modifica schema modulo](edit-form-schema.md) per progettare il tuo modulo.

## Lavorare con gli invii

Fai clic su un riquadro dello schema di modulo per accedere al suo **elenco degli invii**. Questa tabella mostra tutte le voci di dati raccolte per quello schema.

![Submission list (data table) for a form schema](../imgs/forms/index-list.png)

L'elenco include una **barra dei filtri** che consente di cercare per parola chiave, intervallo di date, metriche, stato, utente e altro. Puoi anche salvare preimpostazioni di filtro per un riutilizzo rapido.

Usa il pulsante **Esporta** per scaricare gli invii in formato CSV o XLSX.

![Export dialog for downloading form submissions](../imgs/forms/index-export.png)

### Azioni sulle righe

Fai clic su una riga per espandere i dettagli oppure usa le azioni sulla riga (visualizza, modifica, elimina, stampa come PDF, scarica come DOCX, stampa badge). Le azioni disponibili dipendono dai tuoi permessi e dalla configurazione del modulo.

### Creare un nuovo invio

Fai clic sul pulsante fluttuante **+** nella pagina dell'elenco per aprire un modulo vuoto per l'inserimento dei dati.

![Blank form opened to submit a new data entry](../imgs/forms/index-create.png)

Compila i campi e invia. Il nuovo invio apparirà nell'elenco.

### Operazioni in blocco

Seleziona più invii utilizzando le caselle di spunta per eseguire un'**eliminazione** o una **modifica** in blocco (cambia lo stesso valore di campo in tutte le voci selezionate).

## Altre viste

- **Mappa** – Visualizza gli invii con coordinate geografiche su una mappa interattiva. Scopri di più in [Mappa dei moduli](forms-map.md).
- **DataChat** – Interroga i dati dei tuoi moduli usando il linguaggio naturale. Vedi [DataChat](datachat.md) per i dettagli.

!!! warning
    La funzionalità DataChat potrebbe consumare crediti. Controlla il saldo crediti del tuo account prima di utilizzarla.