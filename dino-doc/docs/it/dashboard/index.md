---
title: Dashboard
description: La Dashboard di Dino è la tua schermata iniziale e fornisce un accesso rapido a form, report e altre funzionalità.
---

# Dashboard

La Dashboard è la prima schermata che vedi dopo aver effettuato l'accesso a Dino. Funge da hub centrale per navigare nell'applicazione. A seconda della configurazione del tuo sistema, la Dashboard apparirà in uno dei due layout: una **Menu Dashboard** o una **Report Dashboard**.

![Visualizzazione principale della pagina Dashboard](../imgs/dashboard/index.png)

---

## Menu Dashboard

In questo layout, la Dashboard presenta una griglia di schede di navigazione. Ogni scheda fornisce un accesso rapido a un'area principale dell'applicazione per cui disponi dei permessi necessari.

In genere vedrai le seguenti schede:

*   **Form**: accedi all'area [Form](../forms/index.md) per creare form schema, raccogliere informazioni e consultare i dati.
*   **Report**: accedi all'area [Report](../reports/index.md) per creare, visualizzare e gestire report basati sui dati raccolti.
*   **Metriche**: accedi all'area [Metriche](../metrics/index.md) per gestire i dati di riferimento come progetti, posizioni e organizzazioni.
    !!! warning "Visibilità"
        La scheda Metriche è nascosta se il tuo account utente dispone solo di permessi guest.
*   **Utenti**: accedi all'area [Lista utenti](../administration/users-list.md) per gestire account utente e gruppi.
    !!! tip "Accesso amministratore"
        La scheda Utenti è visibile solo agli utenti con privilegi di amministratore.

Per navigare, è sufficiente fare clic sulla scheda dell'area a cui desideri accedere.

---

## Report Dashboard

In questo layout, la tua Dashboard è personalizzata per mostrare un singolo report che hai contrassegnato come preferito. Questo ti permette di visualizzare immediatamente le visualizzazioni dei dati principali al momento dell'accesso.

Se non hai ancora selezionato un report preferito, vedrai un messaggio di benvenuto che ti invita ad aggiungerne uno.

### Impostare un report preferito

1.  Vai all'area [Report](../reports/index.md).
2.  Apri il report che vuoi vedere sulla tua Dashboard.
3.  Nella lista del report, fai clic sulla riga del report per selezionarlo, poi fai clic sul pulsante a forma di cuore (**Aggiungi ai preferiti**) nella barra delle azioni. Questa opzione è disponibile solo se i preferiti sono abilitati per la tua istanza Dino.
4.  Aggiorna o torna alla tua Dashboard. Il report selezionato verrà ora visualizzato.

### Modificare o rimuovere un preferito

Per modificare il report preferito, è sufficiente aggiungere un altro report ai preferiti. Il nuovo report sostituirà il precedente sulla tua Dashboard. Per svuotare la Dashboard, seleziona il report preferito nella lista e fai clic sul pulsante a forma di cuore pieno per rimuoverlo dai preferiti.

!!! tip "Lavorare con il report visualizzato"
    Il report mostrato sulla tua Dashboard è lo stesso che apri dall'area [Report](../reports/index.md). Se contiene widget di filtro, puoi utilizzarli anche qui per restringere i dati mostrati.

## Tour guidato

La prima volta che accedi a Dino, potrebbe avviarsi automaticamente un tour guidato dalla Dashboard per presentarti le aree principali dell'applicazione.

*   Segui le indicazioni sullo schermo per conoscere la navigazione e le azioni principali.
*   Se salti o completi il tour, puoi riavviarlo in qualsiasi momento con **Inizia Dino Tour** nella scheda **Tutorial** della [Area utente](../user-area/index.md). La scheda viene mostrata solo quando il tour guidato è configurato per la tua istanza Dino.