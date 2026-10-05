---
title: Utenti
description: Gestisci gli account utente di Dino e i gruppi di autorizzazioni da un'unica area di amministrazione centrale.
---

# Utenti

L'area **Utenti** è il fulcro centrale per gestire chi può accedere a Dino e cosa può fare. Dà accesso a due sezioni di amministrazione: **Utenti** per i singoli account e **Gruppi** per i set di autorizzazioni che controllano l'accesso a form, report e dati.

![Vista principale della pagina Utenti](../imgs/administration/users.png)

La pagina mostra un menu con un riquadro per ciascuna sezione. Fai clic su un riquadro per aprire quella sezione.

## Sezioni disponibili

### Utenti

Il riquadro **Utenti** apre la pagina [Gestire gli utenti](users-list.md). Usala per creare nuovi account, rivedere quelli esistenti, aggiornare i dettagli degli utenti e disattivare gli account non più necessari.

![Vista principale della pagina Lista utenti](../imgs/administration/users-list.png)

### Gruppi

Il riquadro **Gruppi** apre la pagina [Gruppi](groups-list.md). I gruppi raggruppano le autorizzazioni insieme, così puoi assegnare gli stessi diritti di accesso a più utenti contemporaneamente. Usa questa sezione per creare gruppi e modificarne le autorizzazioni. Gli utenti vengono assegnati ai gruppi dall'editor di ciascun utente, nel campo **Gruppi di autorizzazioni utente**.

## Aprire una sezione

1. Apri la pagina **Utenti** dalla navigazione principale.
2. Fai clic sul riquadro della sezione in cui vuoi lavorare — **Utenti** o **Gruppi**.
3. Dino ti porta alla lista di quella sezione, dove puoi lavorare con i singoli account o con le definizioni dei gruppi.

!!! tip "Inizia dai gruppi"
    Se più persone hanno bisogno dello stesso livello di accesso, configura prima un gruppo e poi assegnalo a ciascuna di esse nel campo **Gruppi di autorizzazioni utente** dell'editor utente. In questo modo le autorizzazioni restano coerenti e non devi modificare ogni account separatamente.

!!! warning "Accesso amministratore richiesto"
    L'area Utenti è visibile solo agli utenti con il ruolo di amministratore. Se non riesci a vedere questa pagina, contatta l'amministratore del sistema.

## Pagine correlate

*   [Gestire gli utenti](users-list.md): Crea, modifica e gestisci i singoli account utente.
*   [Gruppi](groups-list.md): Crea e gestisci i gruppi di autorizzazioni che controllano l'accesso a form, report e dati.