```
---
title: Modificare un Invio del Modulo
description: Impara come modificare un invio esistente del modulo in Dino.
---

# Modificare un Invio del Modulo

La schermata Modifica Modulo ti consente di modificare un invio esistente del modulo. Puoi aggiornare i dati, aggiungere nuove informazioni o salvare le modifiche come bozza per completarle in seguito.

Quando apri un invio del modulo per modificarlo, vedi la stessa interfaccia del modulo utilizzata per l'immissione dei dati, ma con tutti i dati precedentemente salvati già compilati.

![Vista principale della pagina Modifica Modulo](../imgs/forms/edit-form.png)

## Come Modificare un Invio

1.  Vai all'elenco degli invii del tuo modulo.
2.  Individua l'invio specifico che desideri modificare.
3.  Fai clic sul pulsante **Modifica** (di solito rappresentato da un'icona a forma di matita) per quell'invio. Questo apre il modulo in modalità modifica.
4.  Apporta le modifiche desiderate a qualsiasi campo del modulo.
5.  Scegli un'azione in fondo al modulo:
    *   **Salva Bozza**: Salva le modifiche correnti senza inviare il modulo. Puoi tornare e modificarlo di nuovo in seguito.
    *   **Invia**: Salva tutte le modifiche e invia i dati aggiornati del modulo.

!!! tip "Tracciamento delle Modifiche"
    Dino registra automaticamente le modifiche apportate tra l'invio originale e la versione modificata. Questo crea una cronologia di chi ha cambiato cosa e quando.

## Funzionalità Disponibili

Durante la modifica, hai accesso alle stesse funzionalità della creazione di un nuovo invio:

*   **Metriche Opzionali**: Alcuni moduli possono avere sezioni o domande facoltative che puoi scegliere di compilare.
*   **Caricamento File**: Allega nuovi file o sostituisci quelli esistenti se questa funzione è abilitata per il tuo modulo.
*   **Campi Secondari**: Per alcuni punti dati, possono essere visualizzati campi aggiuntivi correlati per un inserimento più dettagliato.
*   **Relazioni del Modulo (Dipendenze)**: Se il modulo include campi dipendenti, potresti vedere ulteriori richieste in base alle risposte precedenti. Le dipendenze sono definite quando viene creato lo schema del modulo.

![Finestra di dialogo dell'editor delle relazioni (dipendenze) del modulo](../imgs/forms/edit-form-schema-relationships.png)

!!! warning "Integrità dei Dati"
    Fai attenzione quando modifichi dati critici. Altri report o analisi potrebbero dipendere dai valori originali inviati. Valuta se creare un nuovo invio corretto potrebbe essere più appropriato che modificarne uno vecchio.

## Comprendere la Struttura del Modulo

Il modulo che vedi durante la modifica si basa su uno **schema del modulo** — il progetto sottostante che definisce tutti i campi, le sezioni e le regole. Puoi visualizzare un'anteprima compilata dello schema del modulo dal designer.

![Vista del modulo compilato dopo aver cliccato su Visualizza il Modulo](../imgs/forms/edit-form-view.png)

Lo schema stesso può essere modificato separatamente. Se hai bisogno di cambiare la struttura di un modulo (aggiungere o rimuovere campi, regolare la convalida), consulta [Modificare lo Schema del Modulo](edit-form-schema.md).

![Vista principale della pagina Modifica Schema del Modulo](../imgs/forms/edit-form-schema.png)

## Azioni Correlate

*   Per comprendere la struttura del modulo stesso, consulta [Modificare lo Schema del Modulo](edit-form-schema.md).
*   Per creare un invio completamente nuovo, di solito si parte dalla pagina principale [Moduli](index.md).
*   Per sfogliare i tuoi moduli e invii su una mappa, consulta [Mappa dei Moduli](forms-map.md).
```