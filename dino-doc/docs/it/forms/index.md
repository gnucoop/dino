---
title: Moduli
description: Gestisci la raccolta di dati strutturati con moduli, visualizza e modifica le risposte, filtra, esporta e importa i dati.
---
# Moduli

La pagina **Moduli** è il tuo centro di controllo per tutta la raccolta di dati strutturati in Dino. Qui puoi gestire gli schemi dei moduli, visualizzare e modificare le risposte, ed eseguire azioni di massa sui tuoi dati.

![Main view of the Forms page](../imgs/forms/index.png)

## Griglia degli schemi dei moduli

Quando apri per la prima volta la pagina Moduli, vedi una griglia di tutti gli schemi dei moduli disponibili. Ogni riquadro mostra il nome e l'icona dello schema. Passa il mouse su un riquadro per visualizzare i pulsanti delle azioni:

- **Modifica schema** — Apre l'editor dello schema per modificare la struttura del modulo.
- **Elimina schema** — Rimuove lo schema e tutte le sue risposte.
- **Condividi URL pubblico** — Genera un link pubblico allo schema per la raccolta dati esterna.
- **Visualizza mappa** — Apre la [Mappa dei moduli](forms-map.md) che mostra le risposte geolocalizzate.
- **Chatta con i tuoi dati** — Avvia [DataChat](datachat.md) per fare domande sulle risposte.

Clicca su un riquadro per aprire l'elenco delle risposte per quello schema.

!!! tip "Usa la barra dei filtri"
    Nella parte superiore della pagina puoi filtrare gli schemi per parola chiave. La griglia si aggiorna automaticamente.

## Elenco delle risposte

Dopo aver selezionato uno schema di modulo, vieni portato a una vista elenco dettagliata. Questa tabella mostra tutte le risposte (voci) per quello schema. Ogni riga mostra i campi chiave, inclusi lo stato (se definito) e eventuali metriche personalizzate.

![Elenco degli invii per uno schema modulo](../imgs/forms/index-list.png)

Da questo elenco puoi:

- **Aggiungi una nuova risposta** — Clicca sul pulsante **+** fluttuante (in basso a destra) per aprire un modulo vuoto.
- **Modifica una risposta esistente** — Clicca sull'icona **modifica** della riga.
- **Visualizza i dettagli della risposta** — Clicca sull'icona **visualizza**.
- **Elimina una risposta** — Clicca sull'icona **elimina**.
- **Stampa o scarica** un PDF o DOCX della risposta.
- **Stampa un badge** (se la metrica del caso è attiva).
- **Espandi una riga** per vedere i dettagli annidati (se configurati).

### Filtraggio e ricerca

Usa il pannello dei filtri espandibile nella parte superiore dell'elenco:

- **Ricerca per parola chiave** — Trova risposte per qualsiasi testo.
- **Intervallo di date** — Filtra per data di creazione.
- **Filtri metrici** — Restringi per località, progetto, area, caso, organizzazione o altre metriche personalizzate.
- **Filtro stato** — Filtra per stato del modulo (es. Approvato, In attesa).
- **Filtro utente** — Mostra solo le risposte create da un utente specifico.

Puoi salvare e ricaricare i preset dei filtri usando il **gestore dei preset**.

### Azioni di massa

Seleziona più righe usando le caselle di spunta. Quindi esegui operazioni di massa:

- **Elimina** — Rimuovi le risposte selezionate.
- **Modifica di massa** — Modifica un campo in tutte le risposte selezionate.

### Esportazione e importazione

![Export dialog for downloading form submissions](../imgs/forms/index-export.png)

Clicca sul pulsante **esporta** (icona di download cloud) per aprire la finestra di esportazione. Scegli tra formato CSV o XLSX e scarica tutte le risposte filtrate.

![Import dialog for uploading multiple submissions from a file](../imgs/forms/index-import.png)

Se appare un pulsante **importa** (icona di upload cloud), puoi caricare un file (CSV o XLSX) per aggiungere più risposte in una volta.

!!! warning "Autorizzazioni"
    Alcune azioni (modifica schema, elimina, esporta, importa) sono disponibili solo se hai le autorizzazioni necessarie. Contatta il tuo amministratore per richiedere l'accesso.

## Pagine correlate

- [Modifica schema del modulo](edit-form-schema.md) — Personalizza la struttura di un modulo.
- [Mappa dei moduli](forms-map.md) — Visualizza le risposte geolocalizzate su una mappa.
- [DataChat](datachat.md) — Fai domande sui dati del tuo modulo.
- [Modifica modulo](edit-form.md) — Compila o modifica una singola risposta.
- [Report](../reports/index.md) — Crea riepiloghi e visualizzazioni dai tuoi dati.
