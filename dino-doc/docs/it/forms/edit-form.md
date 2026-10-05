---
title: Modifica i dati di un form
description: Scopri come modificare i dati di un form esistente in Dino, incluse le metriche del form, le bozze e il salvataggio delle modifiche.
---

# Modifica i dati di un form

La schermata Modifica form ti consente di modificare i dati già salvati. Vedi la stessa interfaccia del form usata per l'inserimento dei dati, ma con tutte le risposte salvate in precedenza già compilate. Da qui puoi correggere i valori, completare le informazioni mancanti o salvare i tuoi progressi come bozza e finire più tardi.

![Vista principale della pagina Modifica form](../imgs/forms/edit-form.png)

## Come aprire i dati per la modifica

1. Vai alla pagina [Form](index.md).
2. Apri il form schema che contiene i dati.
3. Individua nella lista di form i dati che vuoi modificare.
4. Passa il mouse sulla riga e clicca sull'icona **Modifica** (matita), oppure clicca sulla riga per selezionarla e clicca su **Modifica** nella barra delle azioni sopra la tabella. La schermata Modifica form si apre con i dati salvati caricati.

## Lavorare con le Metriche dei Form

Se il tuo form utilizza le metriche, la schermata si apre sul passaggio **Metriche dei Form** prima di mostrare il questionario. Questi valori determinano come i dati vengono datati e raggruppati nei report e nelle aggregazioni — non fanno parte del questionario stesso.

1. Rivedi o modifica la **Data di creazione** cliccando su **Modifica** e scegliendo una nuova data.
2. Compila i campi delle metriche mostrati, come posizione, progetto o organizzazione.
3. Se il form schema ha degli stati, scegli lo **Stato del Form** dei dati.
4. Clicca su **Compila il Form** per passare al questionario. Se hai aperto i dati con **Vedi**, il pulsante mostra **Vedi il Form**.

!!! tip "Creare una nuova metrica al volo"
    Se una metrica di cui hai bisogno non esiste ancora, clicca su **Nuovo** accanto al campo della metrica per crearla senza uscire dal form. Questa opzione appare solo se hai il permesso di creare metriche.

![Il passaggio Metriche dei Form](../imgs/forms/index-create.png)

## Modificare le tue risposte

Una volta visualizzato il questionario, puoi modificare qualsiasi campo per cui hai il permesso di modifica. A seconda di come è stato configurato il form, i campi possono essere disposti su una, due o tre colonne, e alcuni possono essere validati mentre digiti.

1. Clicca su un campo e aggiorna il suo valore.
2. Prosegui attraverso i passaggi o le sezioni rimanenti del questionario.
3. Quando hai finito, scegli un'azione in cima al form:
    * **Salva form**: salva tutte le modifiche e aggiorna i dati.
    * **Salva la bozza**: memorizza le modifiche attuali senza finalizzarle, così puoi tornare e continuare più tardi. Questo pulsante appare solo se le bozze sono abilitate per il tuo form.

!!! tip "Tracciare le modifiche"
    Quando il modulo dei log è abilitato per la tua istanza Dino, Dino registra le modifiche apportate a ciascun dato. Seleziona dei dati nella lista e clicca su **View History** nella barra delle azioni per vedere chi ha modificato cosa e quando.

!!! warning "Modificare dati critici"
    Altri report o analisi potrebbero dipendere dai valori di questi dati. Se stai correggendo un errore grave, valuta se nuovi dati potrebbero essere più appropriati invece di modificare quelli vecchi.

## Rivedere il form inviato

Se apri dei dati con l'azione **Vedi** invece di **Modifica**, il form si apre in modalità di sola lettura. Tutti i campi sono visibili ma non possono essere modificati, e le azioni di salvataggio non sono disponibili. Usa questa visualizzazione per verificare cosa è stato registrato.

![Vista del form compilato dopo aver cliccato su Vedi il Form](../imgs/forms/edit-form-view.png)

## Azioni correlate

* Per modificare la struttura del form stesso — i suoi campi, le sezioni e le regole di validazione — vedi [Modifica form schema](edit-form-schema.md).
* Per capire come i campi si relazionano tra loro e come si comportano le dipendenze, vedi le opzioni delle relazioni in [Modifica form schema](edit-form-schema.md).
* Per visualizzare i dati su una mappa, vedi [Mappa dei form](forms-map.md).
* Per creare invece dei dati completamente nuovi, parti dalla pagina [Form](index.md).