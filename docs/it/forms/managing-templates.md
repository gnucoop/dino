---
title: Gestione degli schemi di modulo
description: Come creare e modificare gli schemi di modulo in Dino, inclusi il generatore di moduli, gli stati, le metriche e le opzioni di importazione.
---

# Gestione degli schemi di modulo

Gli schemi di modulo definiscono la struttura e i campi utilizzati durante la raccolta dei dati. Gli amministratori e gli utenti con le autorizzazioni appropriate possono creare nuovi schemi, modificare quelli esistenti e configurare il loro comportamento.

![Gestione degli schemi di modulo](../imgs/forms/managing-templates.png)

!!! warning "Autorizzazione richiesta"
    La gestione degli schemi di modulo richiede autorizzazioni specifiche. Se non riesci a vedere le opzioni di creazione o modifica, contatta il tuo amministratore.

---

## Accesso alla gestione degli schemi

Dall'hub di Raccolta Dati, naviga fino allo schema che desideri modificare e fai clic sulla sua azione **modifica**, oppure usa la navigazione per raggiungere l'opzione **Crea** per un nuovo schema. Entrambi i percorsi aprono lo stesso editor di schemi.

---

## Impostazioni dello schema

Nella parte superiore dell'editor, compila i seguenti campi prima di progettare la struttura del modulo:

- **Nome modulo** — un identificatore interno univoco per questo schema. Apparirà un errore se il nome è già in uso.
- **Etichetta modulo** — il nome visualizzato mostrato agli utenti nell'interfaccia.
- **Set di icone** — scegli tra *Predefinito* (icone standard) e *Umanitario* (icone specifiche per contesti umanitari).
- **Identificatore icona** — digita per cercare e selezionare l'icona che rappresenta questo modulo.
- **Stati del modulo** — seleziona uno o più stati del flusso di lavoro attraverso i quali possono passare le voci create con questo schema. Puoi anche creare nuovi stati o modificare quelli esistenti in linea: fai clic sull'icona **modifica** accanto a uno stato, oppure seleziona **Crea nuovo stato** in fondo al menu a discesa.
- **Metriche del modulo** — seleziona i tipi di metrica (come progetto, località o organizzazione) a cui saranno collegate le voci create con questo schema.
- **Visibilità** — imposta su *Privato* (accessibile solo agli utenti autorizzati) o *Pubblico* (condivisibile tramite un link pubblico).
- **Comportamento set metriche** — *Predefinito* consente più voci con la stessa combinazione di metriche; *Univoco* impedisce set di metriche duplicati per questo modulo.
- **Genera report** — se impostato su *Sì*, verrà generato automaticamente un report e collegato a questo schema quando viene salvato. Questa opzione viene mostrata solo se non esiste già un report automatico per lo schema.

---

## Costruzione della struttura del modulo

La sezione inferiore della pagina contiene il generatore di moduli, dove puoi aggiungere, organizzare e configurare i campi che appariranno quando gli utenti compilano questo modulo.

Usa i controlli del generatore di moduli per:

- Aggiungere nuovi campi (testo, numero, data, file, scelta e altro)
- Organizzare i campi in pagine o sezioni
- Impostare etichette, suggerimenti e regole di validazione dei campi

Il pulsante **Salva** rimane disabilitato se il generatore di moduli segnala errori di validazione. Risolvi tutti gli errori prima di tentare di salvare.

---

## Importazione di una struttura di modulo

Se disponi di una definizione di modulo esistente in formato XLSForm, puoi importarla invece di costruire la struttura manualmente.

1. Fai clic sul pulsante **Importa** nella barra degli strumenti.
2. Seleziona il tuo file XLSForm dal tuo dispositivo.
3. Rivedi la struttura importata nel generatore di moduli.
4. Apporta le eventuali modifiche necessarie, quindi salva.

---

## Configurazione delle relazioni

!!! note "Solo schemi esistenti"
    Il pulsante Relazioni è disponibile solo durante la modifica di uno schema esistente, non durante la creazione di uno nuovo.

Fai clic sul pulsante **Relazioni** per aprire l'editor delle relazioni. Questo ti consente di collegare i campi in questo modulo ai dati di altri moduli, in modo che determinati valori di campo o scelte a discesa possano essere precompilati in base ai dati dei moduli correlati.

---

## Salvataggio dello schema

Fai clic su **Salva** per salvare lo schema. Un messaggio di conferma apparirà brevemente nella parte inferiore dello schermo.

Dopo il salvataggio, verrai reindirizzato all'hub di Raccolta Dati.

!!! warning "Ops! Si è verificato un errore durante il salvataggio del modulo"
    Se appare un messaggio di errore durante il salvataggio, verifica che i campi **Nome modulo** e **Etichetta modulo** siano compilati e che il Nome modulo non sia già utilizzato da un altro schema. Se il problema persiste, contatta il tuo amministratore.