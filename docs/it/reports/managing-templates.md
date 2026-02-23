---
title: Gestione degli schemi di report
description: Come creare e modificare gli schemi di report in Dino, inclusi campi, metriche obbligatorie, importazione XLS e anteprima in tempo reale.
---

# Gestione degli schemi di report

Gli schemi di report definiscono la struttura e il layout dei report generati. Gli amministratori e gli utenti con le autorizzazioni appropriate possono creare nuovi schemi e modificare quelli esistenti.

![Gestione degli schemi di report](../imgs/reports/managing-templates.png)

!!! note "Autorizzazione richiesta"
    La gestione degli schemi di report richiede autorizzazioni specifiche. Se non riesci a vedere le opzioni di creazione o modifica, contatta il tuo amministratore.

---

## Accesso alla gestione degli schemi

Dall'hub Report, naviga fino allo schema che desideri modificare e fai clic sulla sua azione **modifica**, oppure usa la navigazione per raggiungere l'opzione **Crea** per un nuovo schema.

---

## Impostazioni dello schema

Compila i seguenti campi per configurare lo schema:

- **Nome report** — un identificatore interno univoco per questo schema. Verrà visualizzato un errore se il nome è già in uso.
- **Etichetta report** — il nome visualizzato mostrato agli utenti nell'interfaccia.
- **Set di icone** — scegli tra *Predefinito* (icone standard) e *Umanitario* (icone specifiche per contesti umanitari).
- **Identificatore icona** — digita per cercare e selezionare l'icona che rappresenta questo schema.
- **Metriche obbligatorie** — seleziona uno o più tipi di metriche (come progetto, località o organizzazione) che devono essere forniti quando si genera un report da questo schema.

---

## Schemi di modulo associati

Sotto i campi delle impostazioni, una sezione di sola lettura elenca gli schemi di modulo collegati a questo schema di report. Questi sono impostati dal sistema e non possono essere modificati da questa schermata.

---

## Anteprima del report

Un'anteprima in tempo reale del layout del report viene visualizzata sul lato destro dello schermo. L'anteprima si aggiorna man mano che apporti modifiche alla struttura dello schema.

---

## Importazione di una struttura di report

Se disponi di una definizione di report esistente in formato XLS, puoi importarla invece di costruire la struttura manualmente.

1. Fai clic sul pulsante **Importa**.
2. Seleziona il tuo file XLS dal tuo dispositivo.
3. Rivedi la struttura importata nell'editor.
4. Apporta eventuali modifiche necessarie, quindi salva.

---

## Salvataggio dello schema

Fai clic su **Salva** per salvare lo schema. Un messaggio di conferma apparirà brevemente nella parte inferiore dello schermo. Dopo il salvataggio, verrai reindirizzato all'hub Report.

!!! warning "Ops! Si è verificato un errore durante il salvataggio del report"
    Se appare un messaggio di errore durante il salvataggio, verifica che i campi **Nome report** ed **Etichetta report** siano compilati e che il Nome report non sia già utilizzato da un altro schema. Se il problema persiste, contatta il tuo amministratore.