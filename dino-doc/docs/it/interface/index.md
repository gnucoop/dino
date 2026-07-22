---
title: Navigazione e Interfaccia
description: Una panoramica della shell dell'applicazione Dino — barra degli strumenti, navigazione laterale, notifiche, sincronizzazione dati e area utente.
---

# Navigazione e Interfaccia

L'interfaccia di Dino è composta da una barra degli strumenti superiore e da un menu di navigazione laterale, presenti su ogni pagina dopo il login.

![Vista principale della pagina di navigazione principale](../imgs/interface/index.png)

---

## Navigazione Laterale

Il menu laterale consente di spostarsi tra le aree principali dell'applicazione.

**Sezioni standard** (visibili a tutti gli utenti autenticati):

| Sezione | Descrizione |
|---|---|
| Dashboard | La schermata iniziale. |
| Moduli | Moduli di raccolta dati e invii. |
| Report | Report generati. |
| Aggregazione | Vista unificata degli invii da più moduli. |
| Metriche | Dati di riferimento (progetti, posizioni, organizzazioni, ecc.). *(Nascosto per utenti solo ospiti.)* |
| AI | Assistente AI (DinoGPT). |

**Sezioni amministrative** (visibili solo agli amministratori, mostrate sotto un divisore):

| Sezione | Descrizione |
|---|---|
| Utenti | Account utente e gruppi di permessi. |
| Lingue | Gestione traduzioni dell'interfaccia. |

Su schermi grandi il menu è sempre visibile a sinistra. Su schermi più piccoli si comprime e può essere aperto con il **pulsante menu** (icona hamburger) nella barra degli strumenti superiore. Su entrambe le dimensioni dello schermo, clicca sul pulsante menu per espandere le etichette del menu o comprimerle in sole icone.

---

## Barra degli Strumenti Superiore

La barra degli strumenti nella parte superiore dello schermo contiene i seguenti controlli, da sinistra a destra:

- **Attivazione/disattivazione menu** — apre o comprime il menu laterale.
- **Logo** — visualizza il logo della tua organizzazione.
- **Indicatore nuova versione** — appare un'icona di download quando è disponibile una nuova versione di Dino. Clicca per ricaricare l'applicazione e applicare l'aggiornamento.
- **Crediti DINO-AI** — mostra il saldo crediti AI rimanente come badge. Clicca per aprire l'[Area Utente](#area-utente) sul pannello Crediti. *(Visibile solo se è stata configurata una chiave API DINO-AI.)*
- **Attivazione tema scuro/chiaro** — un'icona sole, un cursore e un'icona luna. Usa il cursore per passare da tema chiaro a scuro. *(Nascosto su mobile — usa invece l'Area Utente.)*
- **Icona info** — passa sopra per vedere le informazioni sulla versione di questa installazione.
- **Icona aiuto** — apre la playlist dei tutorial di Dino in una nuova scheda.
- **Icona impostazioni** — apre l'[Area Utente](#area-utente).
- **Icona sincronizzazione** — mostra lo stato attuale della sincronizzazione dati. Clicca per attivare una sincronizzazione manuale.
- **Campanella notifiche** — mostra il numero di notifiche non lette come badge. La campanella suona quando arrivano nuove notifiche. Vedi [Notifiche](#notifiche) più avanti.
- **Selettore lingua** — cambia la lingua dell'interfaccia.
- **Nome utente** — clicca per aprire l'[Area Utente](#area-utente).
- **Icona logout** — clicca per uscire. L'icona è disattivata mentre è in corso una sincronizzazione o quando il dispositivo è offline; il logout non è disponibile in questi stati.

---

## Sincronizzazione Dati

Dino sincronizza i tuoi dati con il server in background. L'**icona di sincronizzazione** nella barra degli strumenti mostra lo stato corrente:

| Icona | Significato |
|---|---|
| `sync` (statico) | Tutti i dati sono aggiornati. |
| `sync_problem` (pulsante) | Hai modifiche locali non ancora sincronizzate. Clicca per attivare la sincronizzazione. |
| `sync` (rotante) | Una sincronizzazione è in corso. |
| `sync_disabled` | Il dispositivo è offline; la sincronizzazione non è disponibile. |
| `sync` con badge `!` | Si è verificato un problema di sincronizzazione. Controlla le notifiche per i dettagli. |

Quando una sincronizzazione è completata, appare brevemente una notifica in fondo allo schermo:

- *"Sincronizzazione completata"* — tutti i dati sincronizzati con successo.
- *"Sincronizzazione completata con errori. Impossibile sincronizzare: [elementi]. Controlla le tue notifiche."* — una o più raccolte dati non possono essere sincronizzate. Viene anche creata una notifica nella tua lista delle notifiche.

---

## Notifiche

Clicca l'**icona campanella** nella barra degli strumenti per aprire il menu a discesa delle notifiche. Il badge sulla campanella mostra il numero di messaggi non letti.

![Menu a discesa delle notifiche aperto](../imgs/interface/index-notifications.png)

Dal menu a discesa puoi:

1.  **Cliccare su una notifica** per segnarla come letta.
2.  **Cliccare sul pulsante freccia** su una notifica (se presente) per navigare direttamente all'area pertinente dell'applicazione.
3.  **Segna tutte come lette** — segna tutte le notifiche correnti come lette.
4.  **Visualizza tutte le notifiche** — naviga alla pagina completa [Notifiche](../notifications/index.md).

---

## Area Utente

Clicca sull'**icona impostazioni**, sul tuo **nome utente** o sul **contatore crediti DINO-AI** per aprire la finestra di dialogo Area Utente. Mostra il tuo nome completo e indirizzo email in alto.

![Finestra di dialogo Area Utente aperta](../imgs/interface/index-user-area.png)

### Cambia Password

1.  Inserisci la tua **Password Corrente**.
2.  Inserisci una **Nuova Password**.
3.  **Conferma Nuova Password**.
4.  Clicca sul pulsante freccia per salvare.

Apparirà un messaggio di errore se la password corrente è errata o se le nuove password non corrispondono.

### Chiavi API

Visualizza o imposta la tua **Chiave API DINO-AI**. Una volta memorizzata una chiave valida, viene mostrata in modalità sola lettura. Usa l'icona occhio per mostrare o nascondere la chiave e l'icona copia per copiarla negli appunti.

### Crediti

Mostra il tuo **saldo crediti DINO-AI** corrente. Se è configurata un'integrazione di pagamento, è disponibile un pulsante **Aggiungi altro** per acquistare crediti aggiuntivi.

!!! tip "Visibilità"
    Questa sezione è visibile solo quando è stata configurata una chiave API DINO-AI.

### Tema DINO

Personalizza la combinazione di colori dell'applicazione:

- **Colore primario**, **Colore accentuato**, **Colore di avviso** — clicca sui campi colore per aprire un selettore colore.
- **Nome preimpostato** — digita o seleziona un nome per salvare o caricare una preimpostazione di colore.
- Clicca **Salva** per salvare i colori correnti come preimpostazione nominata, o **Carica** per applicare una preimpostazione salvata.

Su mobile, qui appare anche un **attivatore tema scuro/chiaro**.

### Tutorial

Clicca **Avvia Tour di Dino** per riavviare il tour guidato dell'applicazione dall'inizio.

!!! tip "Disponibilità"
    Questa sezione viene mostrata solo se il tour guidato è configurato nella tua installazione.

### Backup e Ripristino

*(Solo amministratori, se abilitato.)*

- **Backup Dati** — scarica un'esportazione completa del database dell'applicazione come file JSON.
- **Ripristina Dati** — carica un file JSON precedentemente esportato per ripristinare il database.

!!! warning "Attenzione al Ripristino"
    Il ripristino dei dati sostituirà il database corrente. Questa azione non può essere annullata.