---
title: Modifica un invio di modulo
description: Scopri come modificare un invio di modulo esistente in Dino.
---

# Modifica un invio di modulo

La schermata Modifica modulo ti consente di modificare un invio di modulo esistente. Puoi aggiornare i dati, aggiungere nuove informazioni o salvare le modifiche come bozza per completarle in seguito.

Quando apri un invio di modulo per modificarlo, vedi la stessa interfaccia del modulo utilizzata per l'inserimento dei dati, ma con tutti i dati precedentemente salvati già compilati.

![Vista principale della pagina Modifica modulo](../imgs/forms/edit-form.png)

## Come modificare un invio

1.  Vai all'elenco degli invii del tuo modulo.
2.  Individua l'invio specifico che desideri modificare.
3.  Fai clic sul pulsante **Modifica** (di solito rappresentato da un'icona a matita) per quell'invio. Questa azione apre il modulo in modalità di modifica.
4.  Apporta le modifiche desiderate a qualsiasi campo del modulo.
5.  Scegli un'azione in fondo al modulo:
    *   **Salva bozza**: Salva le modifiche correnti senza inviare il modulo. Puoi tornare e modificarlo di nuovo in seguito.
    *   **Invia**: Salva tutte le modifiche e invia i dati aggiornati del modulo.

!!! tip "Monitoraggio delle modifiche"
    Dino registra automaticamente le modifiche apportate tra l'invio originale e la versione modificata. Questo crea uno storico di chi ha cambiato cosa e quando.

## Funzionalità disponibili

Durante la modifica, hai accesso alle stesse funzionalità che hai quando crei un nuovo invio:

*   **Metriche opzionali**: Alcuni moduli possono avere sezioni o domande facoltative che puoi scegliere di compilare.
*   **Caricamento file**: Allega nuovi file o sostituisci quelli esistenti se questa funzionalità è abilitata per il tuo modulo.
*   **Campi secondari**: Per alcuni dati, possono essere visualizzati campi aggiuntivi correlati per un inserimento più dettagliato.
*   **Relazioni del modulo (dipendenze)**: Se il modulo include campi dipendenti, potresti vedere richieste aggiuntive in base alle risposte precedenti. Le dipendenze sono definite quando viene creato lo schema del modulo.

![Finestra di dialogo dell'editor delle relazioni del modulo (dipendenze)](../imgs/forms/edit-form-schema-relationships.png)

!!! warning "Integrità dei dati"
    Presta attenzione quando modifichi dati critici. Altri report o analisi potrebbero dipendere dai valori inviati originariamente. Valuta se creare un nuovo invio corretto possa essere più appropriato che modificarne uno vecchio.

## Comprendere la struttura del modulo

Il modulo che vedi durante la modifica si basa su uno **schema del modulo** — il progetto sottostante che definisce tutti i campi, le sezioni e le regole. Puoi visualizzare un'anteprima compilata dello schema del modulo dal designer.

![Vista del modulo compilata dopo aver fatto clic su Visualizza il modulo](../imgs/forms/edit-form-view.png)

Lo schema stesso può essere modificato separatamente. Se devi cambiare la struttura di un modulo (aggiungere o rimuovere campi, adattare la validazione), consulta [Modifica schema del modulo](edit-form-schema.md).

![Vista principale della pagina Modifica schema del modulo](../imgs/forms/edit-form-schema.png)

## Azioni correlate

*   Per comprendere la struttura del modulo stesso, consulta [Modifica schema del modulo](edit-form-schema.md).
*   Per creare un nuovo invio da zero, di solito si parte dalla pagina principale [Moduli](index.md).
*   Per esplorare moduli e invii su una mappa, consulta [Mappa dei moduli](forms-map.md).