---
title: Navigazione e interfaccia
description: Una panoramica della struttura dell'applicazione Dino — la barra laterale, la sincronizzazione dei dati, le notifiche, il menu utente e l'uscita.
---

# Navigazione e interfaccia

Dopo aver effettuato l'accesso, ogni pagina di Dino è incorniciata da una **barra laterale** sulla sinistra. Contiene la navigazione tra le aree dell'applicazione e, in basso, la sincronizzazione dei dati, le notifiche e la tua scheda utente.

![Vista principale della pagina di navigazione principale](../imgs/interface/index.png)

---

## La barra laterale

In cima alla barra laterale ci sono il logo e il **pulsante del menu**, che espande la barra laterale per mostrare i nomi delle sezioni o la comprime mostrando solo le icone.

!!! tip "Menu compresso"
    Quando la barra laterale è compressa e mostra solo le icone, passa il mouse su un'icona per vedere il nome della sua sezione come suggerimento.

Su un telefono o uno schermo piccolo la barra laterale è nascosta. Una barra sottile in cima alla pagina mostra quindi il pulsante del menu, che apre la barra laterale sopra la pagina, il logo e il pulsante di sincronizzazione.

### Sezioni

La navigazione elenca le aree di Dino che puoi utilizzare. Quali compaiono dipende da come è configurata la tua istanza di Dino e dai tuoi permessi.

**Sezioni utente**, sotto l'intestazione **Utente**:

| Sezione | Descrizione |
|---|---|
| Dashboard | La schermata iniziale. Vedi [Dashboard](../dashboard/index.md). |
| Form | Form di raccolta dati e dati inviati. Vedi [Form](../forms/index.md). |
| Report | Report generati. Vedi [Report](../reports/index.md). |
| Aggregazione | Visualizzazione unificata dei dati inviati attraverso tutti i form. Vedi [Aggregazione](../aggregation/index.md). |
| AI | L'assistente DinoAi, quando è abilitato per la tua istanza. |
| Metriche | Dati di riferimento (progetti, posizioni, organizzazioni, ecc.). Vedi [Metriche](../metrics/index.md). *(Nascosta per gli utenti solo ospiti.)* |

**Sezioni di amministrazione**, sotto l'intestazione **Amministrazione**, visibili solo agli amministratori:

| Sezione | Descrizione |
|---|---|
| Utenti | Account utente e gruppi di permessi. Vedi [Utenti](../administration/users.md). |
| Lingue | Gestione della traduzione dell'interfaccia. Vedi [Gestione delle lingue](../administration/languages.md). |

La tua istanza potrebbe spostare alcune sezioni, come Metriche, Report o Aggregazione, tra le sezioni di amministrazione. Quando la barra laterale è compressa, i due gruppi sono separati da una linea invece che dalle loro intestazioni.

---

## Sincronizzazione dei dati

Dino mantiene i tuoi dati sul dispositivo e li sincronizza con il server in background. Il pulsante **Sincronizza** in fondo alla barra laterale mostra lo stato attuale e, quando la barra laterale è espansa, l'ora dell'ultima sincronizzazione completata (o *Mai sincronizzato*). Fai clic per avviare una sincronizzazione.

| Pulsante | Significato |
|---|---|
| icona `sync` | Tutti i dati sono aggiornati. |
| icona `sync`, rotante | Una sincronizzazione è in corso. |
| icona `sync_problem` su un pulsante colorato | Hai modifiche locali che non sono ancora state sincronizzate. Fai clic per sincronizzarle. |
| badge `!` sull'icona | Si è verificato un problema durante l'ultima sincronizzazione. Controlla le tue notifiche per i dettagli. |
| icona `sync_disabled`, *Offline* | Il dispositivo è offline; la sincronizzazione non è disponibile finché la connessione non viene ripristinata. |

Al termine di una sincronizzazione, un messaggio appare brevemente in fondo allo schermo:

- *"Sincronizzazione completata"* — tutti i dati sono stati sincronizzati correttamente.
- *"Sincronizzazione completata con errori. Impossibile sincronizzare: [elementi]. Controlla le tue notifiche."* — una o più raccolte di dati non è stato possibile sincronizzarla. Viene anche creata una notifica nella tua lista di notifiche.

!!! warning "Sessione scaduta"
    Se la tua sessione è scaduta, la sincronizzazione si interrompe e il pulsante di sincronizzazione mostra `sync_problem`. I tuoi dati restano su questo dispositivo. Fai clic sul pulsante: Dino tenta di rinnovare la sessione e, se non ci riesce, offre **Vai alla pagina di accesso**, mantenendo i dati su questo dispositivo, oppure **Più tardi**. Accedi di nuovo con lo stesso account per sincronizzare i dati.

---

## Pulsanti di utilità

Sotto il pulsante di sincronizzazione, una riga di piccoli pulsanti dà accesso a:

- **Nuova versione** — un'icona di download appare quando è pronta una nuova versione di Dino. Fai clic per ricaricare l'applicazione e applicare l'aggiornamento.
- **Notifiche** — la campanella, con un badge che conta le tue notifiche non lette. Vedi [Notifiche](#notifiche) di seguito.
- **Modalità chiara / scura** — un pulsante sole e uno luna. Sono mostrati quando la barra laterale è espansa e sugli schermi piccoli; puoi anche cambiare modalità dall'[Area utente](../user-area/index.md).
- **DINO-AI Credits** — un badge con i tuoi crediti AI rimanenti, mostrato solo quando DINO-AI è configurato per il tuo account. Fai clic per aprire la scheda AI dell'Area utente.

---

## Notifiche

Fai clic sulla **campanella** per aprire il pannello delle notifiche. La sua intestazione mostra quante notifiche non sono lette. Le notifiche sono raggruppate per giorno, ciascuna con la sua età, e i messaggi ripetuti sono compressi in un'unica riga con un contatore (per esempio ×3).

![Menu a tendina delle notifiche aperto](../imgs/interface/index-notifications.png)

Dal pannello puoi:

1.  **Fare clic su una notifica** per contrassegnarla come letta. Se rimanda a un punto di Dino, indicato da una freccia sulla destra, il clic ti porta anche lì.
2.  **Segna tutto come letto** — mostrato quando ci sono notifiche non lette.
3.  **Vedi tutte le notifiche** — apre la pagina completa [Notifiche](../notifications/index.md).

---

## Scheda utente e menu

In fondo alla barra laterale, la scheda utente mostra le tue iniziali, il tuo nome e una riga con il tuo ruolo, la lingua dell'interfaccia attiva e la versione di Dino. Fai clic sulla scheda per aprire il menu utente:

- **Area utente** — la pagina del tuo account, per cambiare la password, vedere la tua chiave e i tuoi crediti DINO-AI, personalizzare il tema e altro ancora. Vedi [Area utente](../user-area/index.md).
- **Lingua** — scegli la lingua dell'interfaccia.
- **Aiuto** — un link alle linee guida configurate per la tua istanza, quando ce ne sono.
- Le informazioni di build dell'installazione.

---

## Uscita

Fai clic sul pulsante **Esci** accanto alla tua scheda utente. Dino chiede sempre cosa fare con i dati su questo dispositivo:

- **Esci e cancella i dati** — chiude la sessione ed elimina tutti i dati locali da questo dispositivo.
- **Chiudi la sessione e mantieni i dati** — chiude la sessione e ti porta alla pagina di accesso, mantenendo i dati su questo dispositivo per il tuo prossimo accesso.
- **Annulla** — rimani connesso.

Il pulsante Esci è disattivato e non può essere utilizzato mentre è in corso una sincronizzazione o quando il dispositivo è offline.

!!! warning "Dati non ancora sincronizzati"
    I dati che non hai ancora sincronizzato esistono solo su questo dispositivo: cancellarli all'uscita li perde definitivamente. Se non sei sicuro, sincronizza prima, oppure scegli **Chiudi la sessione e mantieni i dati**. Accedere successivamente con un account diverso li cancella comunque — vedi [Accesso](../getting-started/login.md).