---
title: Navigazione e interfaccia
description: Una panoramica della struttura dell'applicazione Dino: barra degli strumenti, navigazione laterale, notifiche, sincronizzazione dei dati e area utente.
---

# Navigazione e interfaccia

L'interfaccia di Dino è composta da una barra degli strumenti superiore e da un menu di navigazione laterale, presenti in ogni pagina dopo l'accesso.

![Main view of the Main Nav page](../imgs/interface/index.png)

---

## Navigazione laterale

Il menu laterale consente di spostarsi tra le aree principali dell'applicazione.

**Sezioni standard** (visibili a tutti gli utenti autenticati):

| Sezione | Descrizione |
|---|---|
| Dashboard | La schermata iniziale. |
| Moduli | Moduli di raccolta dati e invii. |
| Report | Report generati. |
| Aggregazione | Vista unificata degli invii di più moduli. |
| Metriche | Dati di riferimento (progetti, posizioni, organizzazioni, ecc.). *(Nascosta per i soli utenti ospiti.)* |
| AI | Assistente AI (DinoGPT). |

**Sezioni di amministrazione** (visibili solo agli amministratori, mostrate sotto un separatore):

| Sezione | Descrizione |
|---|---|
| Utenti | Account utente e gruppi di autorizzazioni. |
| Lingue | Gestione delle traduzioni dell'interfaccia. |

Su schermi grandi il menu è sempre visibile a sinistra. Su schermi più piccoli si comprime e può essere aperto con il **pulsante del menu** (icona hamburger) nella barra degli strumenti superiore. Indipendentemente dalle dimensioni dello schermo, fare clic sul pulsante del menu per espandere le etichette del menu o comprimerle in sole icone.

---

## Barra degli strumenti superiore

La barra degli strumenti nella parte superiore dello schermo contiene i seguenti controlli, da sinistra a destra:

- **Attiva/disattiva menu** — apre o comprime il menu laterale.
- **Logo** — mostra il logo della tua organizzazione.
- **Indicatore di nuova versione** — un'icona di download appare quando è disponibile una nuova versione di Dino. Fai clic per ricaricare l'applicazione e applicare l'aggiornamento.
- **Crediti DINO-AI** — mostra il saldo residuo dei crediti AI come badge. Fai clic per aprire l'[Area utente](#user-area) sul pannello Crediti. *(Visibile solo se è stata configurata una chiave API DINO-AI.)*
- **Attiva/disattiva modalità scura/chiara** — un'icona sole, un cursore e un'icona luna. Usa il cursore per passare dal tema chiaro a quello scuro. *(Nascosto su mobile — usa invece l'Area utente.)*
- **Icona Info** — passa il mouse per vedere le informazioni sulla versione di questa installazione.
- **Icona Aiuto** — apre la playlist dei tutorial di Dino in una nuova scheda.
- **Icona Impostazioni** — apre l'[Area utente](#user-area).
- **Icona Sincronizzazione** — mostra lo stato attuale della sincronizzazione dei dati. Fai clic per avviare una sincronizzazione manuale.
- **Campanella delle notifiche** — mostra il numero di notifiche non lette come badge. La campanella suona quando arrivano nuove notifiche. Vedi [Notifiche](#notifications) sotto.
- **Nome utente** — fai clic per aprire l'[Area utente](#user-area).
- **Icona Esci** — fai clic per uscire. L'icona è disattivata durante una sincronizzazione in corso o quando il dispositivo è offline; in questi stati la disconnessione non è disponibile.

---

## Sincronizzazione dei dati

Dino sincronizza i tuoi dati con il server in background. L'**icona di sincronizzazione** nella barra degli strumenti mostra lo stato attuale:

| Icona | Significato |
|---|---|
| `sync` (statica) | Tutti i dati sono aggiornati. |
| `sync_problem` (pulsante) | Hai modifiche locali non ancora sincronizzate. Fai clic per avviare una sincronizzazione. |
| `sync` (rotante) | Una sincronizzazione è attualmente in corso. |
| `sync_disabled` | Il dispositivo è offline; la sincronizzazione non è disponibile. |
| `sync` con badge `!` | Si è verificato un problema di sincronizzazione. Controlla le notifiche per i dettagli. |

Al termine di una sincronizzazione, viene visualizzata brevemente una notifica nella parte inferiore dello schermo:

- *"Sincronizzazione completata"* — tutti i dati sincronizzati correttamente.
- *"Sincronizzazione completata con errori. Impossibile sincronizzare: [elementi]. Controlla le notifiche."* — una o più raccolte di dati non hanno potuto essere sincronizzate. Viene inoltre creata una notifica nel tuo elenco di notifiche.

---

## Notifiche

Fai clic sull'**icona a campanella** nella barra degli strumenti per aprire il menu a discesa delle notifiche. Il badge sulla campanella mostra il numero di messaggi non letti.

![Notifications dropdown open](../imgs/interface/index-notifications.png)

Dal menu a discesa puoi:

1.  **Fare clic su una notifica** per contrassegnarla come letta.
2.  **Fare clic sul pulsante freccia** su una notifica (se presente) per passare direttamente all'area corrispondente dell'applicazione.
3.  **Segna tutte come lette** — contrassegna tutte le notifiche correnti come lette.
4.  **Visualizza tutte le notifiche** — passa alla pagina completa [Notifiche](../notifications/index.md).

---

## Area utente

Fai clic sull'**icona delle impostazioni**, sul tuo **nome utente** o sul **contatore dei crediti DINO-AI** per aprire la finestra di dialogo dell'Area utente. In alto mostra il tuo nome completo e il tuo indirizzo email.

![User area dialog open](../imgs/interface/index-user-area.png)

### Cambia password

1.  Inserisci la **Password attuale**.
2.  Inserisci una **Nuova password**.
3.  **Conferma la nuova password**.
4.  Fai clic sul pulsante freccia per salvare.

Viene visualizzato un messaggio di errore se la password attuale non è corretta o se le nuove password non coincidono.

### Chiavi API

Visualizza o imposta la tua **chiave API DINO-AI**. Una volta salvata una chiave valida, viene mostrata in modalità di sola lettura. Usa l'icona dell'occhio per mostrare o nascondere la chiave e l'icona di copia per copiarla negli appunti.

### Crediti

Mostra il tuo **saldo crediti DINO-AI** attuale. Se è configurata un'integrazione di pagamento, è disponibile un pulsante **Aggiungi altri** per acquistare crediti aggiuntivi.

!!! tip "Visibilità"
    Questa sezione è visibile solo quando è stata configurata una chiave API DINO-AI.

### Tema DINO

Personalizza la combinazione di colori dell'applicazione:

- **Colore primario**, **Colore accento**, **Colore di avviso** — fai clic sui campi colore per aprire un selettore colore.
- **Nome preset** — digita o seleziona un nome per salvare o caricare un preset di colori.
- Fai clic su **Salva** per salvare i colori attuali come preset con nome, oppure su **Carica** per applicare un preset salvato.

Su mobile, qui appare anche un **interruttore modalità scura/chiara**.

### Tutorial

Fai clic su **Avvia il tour di Dino** per riavviare il tour guidato dell'applicazione dall'inizio.

!!! tip "Disponibilità"
    Questa sezione viene mostrata solo se il tour guidato è configurato nella tua installazione.

### Backup e ripristino

*(Solo amministratori, se abilitato.)*

- **Backup dei dati** — scarica un'esportazione completa del database dell'applicazione come file JSON.
- **Ripristino dei dati** — carica un file JSON precedentemente esportato per ripristinare il database.

!!! warning "Attenzione al ripristino"
    Il ripristino dei dati sostituirà il database corrente. Questa azione non può essere annullata.