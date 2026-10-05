---
title: Casi
description: Gestisci i casi in Dino — crea, modifica, visualizza, stampa, filtra ed esporta i record dei casi da una tabella dati strutturata.
---

# Casi

La pagina Casi è uno spazio di lavoro centralizzato per tracciare e gestire i singoli record dei casi. Ogni caso è un record strutturato che può contenere un nome, un codice, un'immagine, una relazione con un caso genitore, note e attributi aggiuntivi. Da questa pagina puoi creare nuovi casi, modificare o visualizzare quelli esistenti, stampare le schede dei casi, eliminare record ed esportare la tua lista di casi — tutto da un'unica tabella interattiva.

![Vista principale della pagina Casi](../imgs/metrics/cases.png)

## Panoramica della tabella

La tabella mostra le seguenti colonne per impostazione predefinita:

- **Case Name** – Il nome assegnato al caso (ordinabile).
- **Codice** – Un codice che identifica il caso. Lo genera Dino: non lo inserisci tu e non viene mostrato nella finestra del caso.
- **Case Image** – Un file immagine caricato che rappresenta il caso.
- **Caso genitore** – Il nome dell'eventuale caso genitore a cui appartiene questo caso.

Le colonne aggiuntive — **ID**, **Notes**, **Data di creazione** e **Attributi aggiuntivi** — sono nascoste per impostazione predefinita. Clicca **Colonne** sopra la tabella per scegliere quali colonne visualizzare. Puoi anche trascinare le intestazioni delle colonne per riordinarle; la pagina mostra il numero totale di elementi trovati accanto al paginatore.

## Lavorare con un singolo caso

Passa il mouse su una riga per mostrare le icone **Modifica** e **Vedi**. Clicca sulla riga per selezionarla: la barra delle azioni sopra la tabella mostra quindi tutte le azioni disponibili:

- **Modifica** – Apre una finestra in cui puoi modificare i dettagli del caso.
- **Stampa** – Genera una scheda PDF stampabile per il caso.
- **Vedi** – Apre una finestra di sola lettura per consultare le informazioni del caso.
- **Elimina** – Apre una finestra di conferma per rimuovere definitivamente il caso.

## Lavorare con più casi

1. Seleziona una o più righe usando le caselle di controllo nella prima colonna.
2. Quando è selezionata una sola riga, tutte le sue azioni diventano disponibili nella barra delle azioni sopra la tabella.
3. Quando sono selezionate più righe, restano solo le azioni di massa — attualmente **Elimina**.

!!! warning "L'eliminazione è definitiva"
    I casi eliminati non possono essere recuperati. Controlla attentamente la selezione prima di confermare un'eliminazione di massa. Un caso utilizzato da form, o che ha casi figli, non può essere eliminato; vedi [Metriche](index.md).

## Creare un caso

1. Clicca **Add new CASE** nella barra degli strumenti sopra la tabella.
2. Nella finestra, compila i dettagli del caso. I campi opzionali sono contrassegnati con *(optional)*.
    - **Case Name** – Inserisci un nome descrittivo.
    - **Case Image** – Carica un file immagine.
    - **Caso genitore** – Collega facoltativamente questo caso a un caso genitore esistente.
    - **Notes** – Aggiungi eventuali note rilevanti.
3. Clicca **Salva** per creare il caso.

## Importare casi

Clicca **Import CASE** nella barra degli strumenti per caricare in blocco i casi da un file `.xls`, `.xlsx` o `.csv`. La pagina di importazione ti guida attraverso il caricamento del file, la mappatura delle sue colonne e la verifica del risultato. I casi il cui nome esiste già vengono riutilizzati, non aggiornati; il codice è generato da Dino e non può essere importato.

## Ricerca e filtro

Usa la barra degli strumenti per restringere la tabella:

- **Ricerca per parola chiave** – Digita nel campo di ricerca per trovare corrispondenze nel testo dei campi visualizzati.
- **Filtri** – Apri il pannello dei filtri per impostare una **Data di partenza** e una **Fino ad oggi**, che filtrano per data di creazione, poi clicca **Cerca**. Il badge sul pulsante **Filtri** mostra quanti filtri sono attivi.
- I filtri applicati appaiono come chip sotto la barra degli strumenti; clicca sull'icona di annullamento su un chip per rimuovere quel filtro.

## Esportare casi

1. Clicca **Esporta** nella barra degli strumenti.
2. Scegli cosa esportare: *Elementi nella pagina* (l'opzione predefinita), gli elementi corrispondenti ai tuoi filtri oppure *Tutti gli elementi*.
3. Scegli il formato: *csv*, *xlsx* o *splitted xlsx*, poi clicca **Esporta**.

## Pagine correlate

- [Panoramica delle metriche](index.md) – Torna alla dashboard principale delle metriche.
- [Aree tematiche](areas.md) – Organizza i casi per area tematica.
- [Posizioni](locations.md) – Associa i casi a posizioni geografiche.
- [Organizzazioni](organizations.md) – Collega i casi alle organizzazioni.
- [Progetti](projects.md) – Raggruppa i casi in progetti.