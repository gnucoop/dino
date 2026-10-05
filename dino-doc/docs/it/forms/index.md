---
title: Form
description: Gestisci i form schema e raccogli dati strutturati in Dino.
---

# Form

La pagina **Form** è il punto di partenza per raccogliere dati strutturati in Dino. Da qui puoi sfogliare, creare e gestire i form schema, poi visualizzare e lavorare con i dati raccolti tramite ciascun form.

![Visualizzazione principale della pagina Form](../imgs/forms/index.png)

La visualizzazione principale mostra una **griglia di riquadri dei form schema**. Ogni riquadro mostra l'etichetta e l'icona del form. Un riquadro contrassegnato da un'icona a impronta digitale è unico: può esistere un solo dato con quell'esatto insieme di metriche. Passando il mouse su un riquadro compaiono i pulsanti di azione:

- **Modifica il Form Schema** – Modifica la struttura del form (campi, validazione, metriche).
- **Elimina Form Schema** – Rimuove il form schema. Dino rifiuta se il form schema ha ancora dati o se un report lo utilizza, e chiede conferma se altri form o gruppi di utenti vi fanno riferimento.
- **Condividi Link Pubblico** – Ottieni un link pubblico che consente l'invio di dati dall'esterno.
- **Visualizza la mappa** – Apri la visualizzazione mappa per i dati con informazioni sulla posizione.
- **Chatta con i tuoi dati** – Fai domande sui tuoi dati in linguaggio naturale usando [DataChat](datachat.md).

!!! tip
    Le azioni disponibili su un riquadro dipendono dai tuoi permessi. Potresti non vedere tutti i pulsanti.

Se non esiste ancora alcun form schema, la pagina mostra un messaggio che ti invita ad aggiungerne uno. Quando l'istanza lo abilita, un campo **Filtra** sopra i riquadri li restringe per nome.

## Creare un Form Schema

1. Clicca il pulsante flottante **+** in basso a destra nella pagina.
2. Progetta il tuo form nella pagina [Modifica il Form Schema](edit-form-schema.md).

## Lavorare con i Dati

Clicca sul riquadro di un form schema per aprire la sua **lista di form**. Questa tabella mostra ogni dato raccolto per quel form schema.

![Lista di form (tabella dati) per un form schema](../imgs/forms/index-list.png)

Sopra la tabella puoi vedere quanti elementi sono stati trovati e puoi spostarti tra le pagine. La barra degli strumenti offre:

- **Aggiungi nuovo form** – Crea un nuovo dato.
- **Importa form** – Importa dati da un file. Vedi [Importa dati](import.md).
- **Filtri** – Restringe la lista per intervallo di date, stato, utente, metriche e altro. Passa tra filtri *Semplice* e *Avanzato*, oppure salva un filtro predefinito per riutilizzarlo in seguito.
- **Esporta** – Scarica i dati in un file. Vedi [Esporta](#esporta).

A sinistra nella barra degli strumenti, il selettore **Dati** / **Mappa** / **AI** cambia visualizzazione; vedi [Visualizzazioni aggiuntive](#visualizzazioni-aggiuntive).

Una riga i cui dati potrebbero essere incompleti mostra un'icona di avviso. Le righe con file in attesa di sincronizzazione mostrano un'icona di caricamento su cloud.

### Esporta

Usa il pulsante **Esporta** nella barra degli strumenti per scaricare i dati.

![Finestra di esportazione per scaricare i dati dei form](../imgs/forms/index-export.png)

La finestra **Esporta dati** ti permette di scegliere:

1) Quali form esportare.
    1) *Elementi nella pagina*. Solo i form mostrati nella pagina corrente della lista (impostazione predefinita).
    2) *Con filtri attivi (N)*. Tutti i form che corrispondono ai filtri che hai applicato. Quando nessun filtro è attivo, questa opzione mostra *Aggiungi filtri*: chiude la finestra così puoi impostarne alcuni.
    3) *Tutti gli elementi*. Tutti i form, senza filtro né paginazione. Su un form di grandi dimensioni questo può rallentare il dispositivo.
2) Il formato.
    1) *csv*. Ogni form esportato è una riga e ogni campo una colonna.
    2) *xlsx*. Lo stesso, in formato Excel.
    3) *splitted xlsx*. Formato Excel, con un foglio per slide.
3) Nel menu **Campi e formati**:
    1) *Seleziona tutti i campi del Form*. Esporta ogni campo del form.
    2) *Valori delle etichette*. Per i campi con valori predefiniti (scelta singola o multipla), esporta l'etichetta visualizzata invece del codice interno.
    3) *Formato del valore*, uno tra:

        - *Predefinito*.
        - *Formato analisi dati*. Le slide ripetute e i campi a scelta multipla vengono esportati su più righe, una ripetizione e una scelta per riga; gli altri campi vengono ripetuti su ogni riga. Una colonna aggiuntiva, *conta*, è 1 sulla prima riga di ogni form e 0 sulle righe aggiuntive generate per lo stesso form, così sommando *conta* si contano i form.
        - *Colonne separate*. Ogni opzione di un campo a scelta multipla ottiene una propria colonna, con 1 o 0.
4) I campi da esportare. La lista **Sezioni** a sinistra mostra ogni sezione con i suoi campi selezionati e totali. Per la sezione attiva puoi cercare un campo, usare **Seleziona tutti** / **Deseleziona**, oppure spuntare singoli campi. Il piè di pagina mostra quanti campi sono selezionati; clicca **Esporta** per scaricare.

Alcune colonne vengono sempre esportate e non possono essere deselezionate:

- ID del form
- Data di creazione
- Data di aggiornamento
- Dati utente DINO (ID e nome completo)
- Dati delle metriche (id, nome, ecc...)
- Stato del form (id, nome, etichetta, livello, colore), quando il form ha stati
- Dinoinvalid

### Azioni sulle Righe

Passa il mouse su una riga per mostrare le icone **Vedi** e **Modifica**. Clicca una riga per selezionarla: la barra delle azioni sopra la tabella mostra quindi ogni azione che puoi usare su di essa (vedi, modifica, elimina, stampa come PDF, scarica come DOCX, stampa badge). Le azioni disponibili dipendono dai tuoi permessi e dalla configurazione del form.

### Creare un Nuovo Dato

1. Apri la lista di form per il form schema che desideri.
2. Clicca **Aggiungi nuovo form** nella barra degli strumenti.
3. Compila il form vuoto e salvalo. Vedi [Modifica Form](edit-form.md).

![Form vuoto aperto per inviare un nuovo dato](../imgs/forms/index-create.png)

Il nuovo dato appare nella lista.

### Operazioni in Blocco

Seleziona uno o più dati usando le caselle di controllo per rivelare le azioni in blocco. Puoi **elimina** i dati selezionati o **Modifica** li insieme, applicando lo stesso valore di campo a tutti.

!!! warning
    Eliminare un form schema o i suoi dati non può essere annullato. Fai attenzione quando usi le azioni di eliminazione.

## Visualizzazioni aggiuntive

Cambia visualizzazione con i pulsanti **Dati** / **Mappa** / **AI** a sinistra nella barra degli strumenti della lista di form, oppure dai pulsanti su un riquadro di form schema. I filtri che hai applicato vengono mantenuti.

- **Mappa** – Visualizza i dati con coordinate geografiche su una mappa interattiva. È disponibile solo quando il form schema raccoglie posizioni. Scopri di più in [Mappa dei Form](forms-map.md).
- **DataChat** (la visualizzazione **AI**) – Interroga i dati del tuo form usando il linguaggio naturale. Vedi [DataChat](datachat.md) per i dettagli.

!!! warning
    DataChat può consumare crediti. Controlla il saldo crediti del tuo account prima di usarlo.