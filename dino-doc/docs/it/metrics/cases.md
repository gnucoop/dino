---
title: Casi
description: "Gestisci i casi in Dino: crea, modifica, visualizza, filtra, esporta e organizza i record dei casi con una tabella dati strutturata."
---

# Casi

La pagina Casi offre uno spazio di lavoro centralizzato per monitorare e gestire i singoli casi. Ogni caso è un record strutturato che può contenere un nome, un codice, un'immagine, una relazione con un caso padre, note e attributi aggiuntivi. Puoi creare nuovi casi, modificare quelli esistenti, visualizzarne i dettagli, eliminare record ed esportare la tua lista di casi — tutto da un'unica tabella interattiva.

![Main view of the Cases page](../imgs/metrics/cases.png)

## Panoramica della tabella

La tabella principale mostra per impostazione predefinita le seguenti colonne:

- **Nome del caso** – Il nome che assegni al caso (ordinabile).
- **Codice** – Un codice generato dal sistema o assegnato manualmente (di sola lettura dopo la creazione).
- **Immagine del caso** – Un file immagine caricato che rappresenta il caso.
- **Caso padre** – Il nome dell'eventuale caso padre a cui appartiene questo caso.

Altre colonne (come **ID**, **Note**, **Data di creazione** e **Attributi aggiuntivi**) sono nascoste per impostazione predefinita. Puoi personalizzare le colonne visualizzate facendo clic sul pulsante **Personalizza le colonne** nell'intestazione della tabella.

## Azioni su un singolo caso

Sul lato destro di ogni riga trovi le icone per le seguenti azioni:

- **Modifica** – Apre una finestra di dialogo per modificare i dettagli del caso.
- **Stampa** – Genera una scheda PDF stampabile per il caso.
- **Visualizza** – Apre una finestra di dialogo di sola lettura per consultare le informazioni del caso.
- **Elimina** – Apre una finestra di dialogo di conferma per rimuovere definitivamente il caso.

Fai clic sull'icona **Altro** (tre punti verticali) per vedere tutte le azioni disponibili, nel caso alcune fossero nascoste.

## Azioni in blocco

Seleziona più casi usando le caselle di controllo nella prima colonna. Quando è selezionato almeno un caso, nella parte superiore della tabella compare un pulsante **Elimina**. Puoi eliminare tutti i casi selezionati in una sola volta.

!!! warning "L'eliminazione in blocco è definitiva"
    I casi eliminati non possono essere recuperati. Usa l'azione di eliminazione in blocco con attenzione.

## Creare un nuovo caso

1. Fai clic sul pulsante flottante **Aggiungi nuovo** (icona più) in basso a destra nella pagina.
2. Si aprirà una finestra di dialogo. Compila i campi obbligatori:
   - **Nome del caso** – Inserisci un nome descrittivo.
   - **Codice** – (Facoltativo) Fornisci un codice univoco. Questo campo è di sola lettura dopo la creazione.
   - **Immagine del caso** – Carica un file immagine.
   - **Caso padre** – Collega facoltativamente questo caso a un caso padre esistente.
   - **Note** – Aggiungi eventuali note pertinenti.
3. Fai clic su **Salva** per creare il caso.

## Importare i casi

Usa il pulsante flottante **Importa** (icona di caricamento su cloud) per caricare i casi in blocco da un file. I formati supportati sono definiti dall'amministratore del sistema.

## Filtro e ricerca

La barra di ricerca in alto ti consente di filtrare i casi per:

- **Parola chiave** – Cerca in tutti i campi visualizzati.
- **Intervallo di date** – Filtra per data di creazione (Da / A).
- **Filtri aggiuntivi** – Seleziona tra filtri predefiniti come metrica, stato, utente o gruppo di utenti.

Dopo aver applicato i filtri, puoi salvare la combinazione come **preset** per riutilizzarla rapidamente. Per salvare un preset:

1. Apri il pannello dei filtri.
2. Inserisci un nome nel campo del preset.
3. Fai clic su **Salva**.  
Per applicare un preset salvato, selezionalo dall'elenco e fai clic su **Applica**.

## Esportare i casi

Fai clic sul pulsante **Esporta** (icona di download da cloud) nella barra dei filtri. Scegli il formato di esportazione (ad es. CSV o Excel) e seleziona quali colonne includere. Il file esportato conterrà tutti i casi attualmente visibili, rispettando i filtri attivi.

## Personalizzare la tabella

- **Ordina** – Fai clic sull'intestazione di qualsiasi colonna ordinabile (ad es. **Nome del caso**, **Data di creazione**) per ordinare la tabella.
- **Selettore di colonne** – Apri la finestra di dialogo del selettore di colonne per mostrare o nascondere le colonne.
- **Espandi le righe** – Alcuni casi possono avere sotto-elementi (altri casi collegati come dettagli). Fai clic su una riga per espanderla e vedere i record correlati.

La pagina mostra inoltre un **percorso di navigazione** in alto, così puoi tornare alla sezione principale Metriche.

## Pagine correlate

- [Panoramica delle metriche](index.md) – Torna alla dashboard principale delle metriche.
- [Aree tematiche](areas.md) – Organizza i casi per area tematica.
- [Posizioni](locations.md) – Associa i casi a posizioni geografiche.
- [Organizzazioni](organizations.md) – Collega i casi alle organizzazioni.
- [Progetti](projects.md) – Raggruppa i casi in progetti.