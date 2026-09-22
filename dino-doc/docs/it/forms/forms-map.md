---
title: Mappa dei form
description: Visualizza i dati dei form su una mappa interattiva con opzioni di filtro.
---

# Mappa dei form

La pagina Mappa dei form mostra i dati dei form su una mappa interattiva, permettendoti di visualizzarli geograficamente. Puoi filtrare i dati per data e per campi specifici, per concentrarti sulle informazioni di cui hai bisogno.

Questa funzionalità è disponibile solo se la metrica posizione è attiva su questo form schema. Inoltre, per ogni posizione è necessario compilare l'attributo delle coordinate.

![Main view of the Forms Map page](../imgs/forms/forms-map.png)

La pagina è composta da due aree principali:

*   **La mappa**: una mappa interattiva che mostra i marker raggruppati per ogni dato. Ogni marker viene posizionato in base alla posizione associata al dato.
*   **Il pannello dei filtri**: una serie di controlli laterali per filtrare i dati mostrati sulla mappa.

## Visualizzare i dettagli dei dati

Ogni marker sulla mappa rappresenta uno o più dati in una posizione specifica.

1.  Clicca su un marker per aprire il suo popup.
2.  Il popup mostra il nome della posizione e i valori dei campi principali di quel dato.

## Filtrare i dati sulla mappa

Usa i filtri per restringere i dati che compaiono sulla mappa.

### 1. Filtro per intervallo di date

1.  Nel campo **Intervallo di date**, clicca sull'icona del calendario.
2.  Seleziona una data di inizio e una data di fine nel selettore di date.

### 2. Filtro per campi

Sotto il selettore di date vedrai diversi campi di input di testo. Ogni campo corrisponde a una colonna del tuo form (ad es. "Point of care", "Nationality").

1.  Clicca su un campo qualsiasi (ad es. "Nationality").
2.  Inizia a digitare. Un elenco a discesa mostrerà i valori corrispondenti presenti nei tuoi dati.
3.  Puoi selezionare un valore dall'elenco oppure digitare il tuo testo per filtrare i dati che contengono quel testo.
4.  Per cancellare un filtro, clicca sull'icona **X** che appare all'interno del campo.

!!! tip "Usare più filtri"
    Puoi applicare filtri su più campi contemporaneamente. La mappa mostrerà solo i dati che soddisfano **tutti** i criteri di filtro attivi.

### 3. Applicare i filtri

Dopo aver impostato l'intervallo di date e i filtri sui campi, clicca sul pulsante **Applica filtri**.

La mappa si aggiornerà, mostrando solo i marker dei dati che soddisfano tutti i criteri selezionati. La visualizzazione della mappa si adatterà inoltre automaticamente per includere i marker filtrati.

!!! warning "Dati di posizione obbligatori"
    I dati possono comparire sulla mappa solo se hanno coordinate geografiche valide associate alla loro posizione. I dati privi di queste informazioni non verranno visualizzati.