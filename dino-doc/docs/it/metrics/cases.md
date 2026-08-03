---
title: Casi
description: Gestisci i casi in Dino — crea, modifica, visualizza, filtra, esporta e organizza le schede dei casi con una tabella dati strutturata.
---

# Casi

La pagina Casi offre uno spazio di lavoro centralizzato per tracciare e gestire i singoli casi. Ogni caso è una scheda strutturata che può contenere nome, codice, immagine, relazione con il caso padre, note e attributi aggiuntivi. Puoi creare nuovi casi, modificarne di esistenti, visualizzare i dettagli, eliminare le schede ed esportare l'elenco dei casi — il tutto da un'unica tabella interattiva.

![Vista principale della pagina Casi](../imgs/metrics/cases.png)

## Panoramica della tabella

La tabella principale visualizza le seguenti colonne per impostazione predefinita:

- **Nome caso** – Il nome che assegni al caso (ordinabile).
- **Codice** – Un codice generato dal sistema o assegnato manualmente (di sola lettura dopo la creazione).
- **Immagine del caso** – Un file immagine caricato che rappresenta il caso.
- **Caso padre** – Il nome di un eventuale caso padre a cui questo caso appartiene.

Le colonne aggiuntive (come **ID**, **Note**, **Data di creazione** e **Attributi aggiuntivi**) sono nascoste per impostazione predefinita. Puoi personalizzare quali colonne visualizzare facendo clic sul pulsante **Personalizza colonne** (icona a forma di occhio) nell'intestazione della tabella.

## Azioni su un singolo caso

Sul lato destro di ogni riga trovi le icone per le seguenti azioni:

- **Modifica** – Apre una finestra di dialogo per modificare i dettagli del caso.
- **Stampa** – Genera una scheda PDF stampabile per il caso.
- **Visualizza** – Apre una finestra di dialogo di sola lettura per esaminare le informazioni del caso.
- **Elimina** – Apre una finestra di conferma per rimuovere definitivamente il caso.

Fai clic sull'icona **Altro** (tre puntini verticali) per visualizzare tutte le azioni disponibili se alcune sono nascoste.

## Azioni di massa

Seleziona più casi utilizzando le caselle di controllo nella prima colonna. Quando è selezionato almeno un caso, nella parte superiore della tabella compare un pulsante **Elimina**. Puoi eliminare tutti i casi selezionati in una sola volta.

!!! warning "L'eliminazione di massa è permanente"
    I casi eliminati non possono essere recuperati. Usa l'eliminazione di massa con cautela.

## Creare un nuovo caso

1. Fai clic sul pulsante di azione fluttuante **Aggiungi nuovo** (icona più) in basso a destra della pagina.
2. Si aprirà una finestra di dialogo. Compila i campi obbligatori:
   - **Nome caso** – Inserisci un nome descrittivo.
   - **Codice** – (Facoltativo) Fornisci un codice univoco. Questo campo è di sola lettura dopo la creazione.
   - **Immagine del caso** – Carica un file immagine.
   - **Caso padre** – Collega facoltativamente questo caso a un caso padre esistente.
   - **Note** – Aggiungi eventuali note pertinenti.
3. Fai clic su **Salva** per creare il caso.

## Importare casi

Usa il pulsante di azione fluttuante **Importa** (icona di caricamento sul cloud) per caricare più casi da un file. I formati supportati sono definiti dall'amministratore di sistema.

## Filtrare e cercare

La barra di ricerca nella parte superiore ti consente di filtrare i casi per:

- **Parola chiave** – Cerca in tutti i campi visualizzati.
- **Intervallo di date** – Filtra per data di creazione (Da / A).
- **Filtri aggiuntivi** – Seleziona tra filtri predefiniti come metrica, stato, utente o gruppo di utenti.

Dopo aver applicato i filtri, puoi salvare la combinazione come **preimpostazione** per un riutilizzo rapido. Per salvare una preimpostazione:

1. Apri il pannello dei filtri.
2. Inserisci un nome nel campo della preimpostazione.
3. Fai clic su **Salva**.  
Per applicare una preimpostazione salvata, selezionala dall'elenco e fai clic su **Applica**.

## Esportare casi

Fai clic sul pulsante **Esporta** (icona di download sul cloud) nella barra dei filtri. Scegli il formato di esportazione (ad esempio CSV o Excel) e seleziona le colonne da includere. Il file esportato conterrà tutti i casi attualmente visibili, rispettando eventuali filtri attivi.

## Personalizzare la tabella

- **Ordina** – Fai clic su qualsiasi intestazione di colonna ordinabile (ad esempio **Nome caso**, **Data di creazione**) per ordinare la tabella.
- **Selettore colonne** – Apri la finestra di dialogo del selettore colonne per mostrare o nascondere le colonne.
- **Espandi righe** – Alcuni casi possono avere sotto-elementi (altri casi collegati come dettagli). Fai clic su una riga per espanderla e visualizzare le schede correlate.

La pagina visualizza anche un **percorso breadcrumb** nella parte superiore, così puoi tornare alla sezione principale Metriche.

## Pagine correlate

- [Panoramica metriche](index.md) – Torna alla dashboard principale delle metriche.
- [Aree tematiche](areas.md) – Organizza i casi per area tematica.
- [Posizioni](locations.md) – Associa i casi a posizioni geografiche.
- [Organizzazioni](organizations.md) – Collega i casi alle organizzazioni.
- [Progetti](projects.md) – Raggruppa i casi in progetti.