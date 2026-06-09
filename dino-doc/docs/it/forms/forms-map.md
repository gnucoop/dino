---
title: Mappa dei Moduli
description: Visualizza le risposte ai moduli su una mappa interattiva con opzioni di filtro.
---

# Mappa dei Moduli

La pagina Mappa dei Moduli mostra le risposte ai tuoi moduli su una mappa interattiva, permettendoti di visualizzare i dati geograficamente. Puoi filtrare le risposte per data e per campi dati specifici per concentrarti sulle informazioni che ti servono.

![Main view of the Forms Map page](../imgs/forms/forms-map.png)

La pagina è composta da due aree principali:

*   **La Mappa**: Una mappa interattiva che mostra marcatori raggruppati per ogni risposta. Ogni marcatore è posizionato in base ai dati di posizione della risposta.
*   **Il Pannello dei Filtri**: Un insieme di controlli laterali per filtrare i dati mostrati sulla mappa.

## Visualizzare i Dettagli delle Risposte

Ogni marcatore sulla mappa rappresenta una o più risposte in una posizione specifica.

1.  Fai clic su un marcatore per aprire il suo popup.
2.  Il popup mostra il nome della posizione e i valori per i campi dati chiave di quella risposta.

## Filtrare le Risposte sulla Mappa

Usa i filtri per restringere quali risposte appaiono sulla mappa.

### 1. Filtrare per Intervallo di Date

1.  Nel campo **Intervallo di date**, fai clic sull'icona del calendario.
2.  Seleziona una data di inizio e una data di fine nel selettore di date.

### 2. Filtrare per Campi Dati

Sotto il selettore di date, vedrai diversi campi di input di testo. Ogni campo corrisponde a una colonna di dati del tuo modulo (ad esempio, "Punto di cura", "Nazionalità").

1.  Fai clic su un campo qualsiasi (ad esempio, "Nazionalità").
2.  Inizia a digitare. Un elenco a discesa mostrerà i valori corrispondenti dai tuoi dati esistenti.
3.  Puoi selezionare un valore dall'elenco o digitare il tuo testo per filtrare le risposte che contengono quel testo.
4.  Per cancellare un filtro, fai clic sull'icona **X** che appare all'interno del campo.

!!! tip "Utilizzare Più Filtri"
    Puoi applicare filtri su più campi contemporaneamente. La mappa mostrerà solo le risposte che corrispondono a **tutti** i criteri di filtro attivi.

### 3. Applicare i Filtri

Dopo aver impostato l'intervallo di date e i filtri sui campi, fai clic sul pulsante **Applica Filtri**.

La mappa si aggiornerà, mostrando solo i marcatori per le risposte che corrispondono a tutti i criteri selezionati. La vista della mappa si adatterà anche automaticamente per includere i marcatori filtrati.

!!! warning "Dati di Posizione Necessari"
    Le risposte possono apparire sulla mappa solo se dispongono di coordinate geografiche valide associate alla loro posizione. Le risposte senza questi dati non verranno visualizzate.