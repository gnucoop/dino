---
title: Area utente
description: Gestisci le impostazioni del tuo account in Dino — cambia la password, visualizza la tua chiave DINO-AI e i crediti, personalizza il tema DINO, esegui il backup o il ripristino dei tuoi dati e avvia il Dino Tour.
---

# Area utente

L'**Area utente** è la tua pagina personale dell'account. Raccoglie tutto ciò che appartiene a te e non all'intera installazione di Dino: i tuoi dati di accesso, la tua chiave DINO-AI e i crediti, i colori che Dino usa per te, il backup e il ripristino dei dati e il tour guidato.

L'intestazione della pagina mostra le tue iniziali, il tuo nome completo e il tuo indirizzo email, così puoi sempre verificare con quale account hai effettuato l'accesso. In alto a destra è indicata la versione di Dino attualmente in esecuzione.

![Vista principale della pagina Area utente](../imgs/user-area/index.png)

L'Area utente è organizzata in schede. La scheda su cui ti trovi fa parte dell'indirizzo della pagina, quindi puoi aggiungere una scheda specifica ai preferiti e tornarci direttamente. Passare da una scheda all'altra non modifica la cronologia del browser — premendo Indietro esci dall'Area utente invece di scorrere le schede visitate.

## Cambiare la password

La scheda **Password** è dove aggiorni la password che usi per accedere a Dino.

1. Nel campo **password attuale**, digita la password che stai usando ora.
2. Nel campo **Nuova password**, digita la tua nuova password. Deve contenere almeno il numero di caratteri indicato sotto il campo.
3. Nel campo **Conferma nuova password**, digita di nuovo la nuova password.
4. Seleziona **Aggiorna password**.

Se vuoi ricominciare da capo, seleziona **Annulla** per svuotare tutti e tre i campi. Se la password attuale non corrisponde, Dino te lo segnala e non viene apportata alcuna modifica.

!!! tip "Scegli una password sicura"
    Usa una password che non utilizzi da nessun'altra parte e conservala in un gestore di password. Consulta [Reimpostare la password](../getting-started/reset-password.md) se hai dimenticato quella attuale e non riesci ad accedere.

## Chiave DINO-AI e crediti

La scheda **AI** mostra la chiave DINO-AI che appartiene al tuo account, insieme al numero di crediti DINO-AI che ti rimangono.

- Seleziona **Mostra** per visualizzare la chiave, oppure **Nascondi** per mascherarla di nuovo.
- Seleziona **Copia** per copiare la chiave negli appunti.
- Se la tua installazione supporta l'acquisto di crediti, seleziona **Aggiungi altro** per ricaricarli.

La chiave viene assegnata automaticamente al tuo account quando effettui l'accesso — non c'è nulla da incollare qui. Se nessuna chiave è associata al tuo account, la scheda lo indica.

## DINO Theme

La scheda **DINO Theme** controlla i colori che Dino usa per te. Le modifiche ai colori vengono applicate solo dopo che le hai salvate, quindi puoi sperimentare liberamente; la scelta tra tema chiaro e scuro viene applicata immediatamente.

1. Seleziona i campi **Colore primario**, **Colore accento** e **Colore di warning** e scegli un colore dal selettore.
2. Usa il campo **Nome preimpostato** per dare un nome alla combinazione, oppure scegli un nome esistente dall'elenco.
3. Passa dalla modalità chiara a quella scura usando i pulsanti del sole e della luna.
4. Seleziona **Salva tema** per applicare le tue scelte.

Il pannello **Anteprima** mostra come appariranno i colori selezionati prima che tu li confermi. **Carica preimpostato** ripristina una combinazione salvata, mentre **Ripristina** annulla le tue modifiche e torna al tema attualmente applicato.

!!! tip "I temi sono conservati in questo browser"
    Il tuo tema e i tuoi preset salvati sono memorizzati nel browser che stai usando. Su un altro browser o dispositivo, Dino parte dal tema predefinito.

## Backup e ripristino

La scheda **Backup e ripristino** ti consente di scaricare una copia completa dei tuoi dati o di ricaricarne una. È mostrata solo agli amministratori e solo quando il backup e il ripristino sono abilitati per la tua installazione.

Per eseguire il backup dei tuoi dati:

1. Seleziona **Scarica backup**.
2. Salva il file, denominato `dino_db_export.json`, in un luogo sicuro.

Per ripristinare i dati:

1. Seleziona **Scegli un file di backup** e scegli un file `.json` esportato da Dino.
2. Conferma il ripristino quando Dino lo richiede.
3. Attendi mentre Dino ripristina i dati. Viene mostrato un indicatore di caricamento fino al termine del processo.

!!! warning "Il ripristino sovrascrive i dati corrispondenti"
    I dati contenuti nel file vengono scritti nel database locale di questo dispositivo: qualsiasi record con lo stesso ID di uno importato viene sovrascritto. Esegui un backup aggiornato prima di ripristinare e assicurati che il file sia proprio quello che desideri.

## Tutorial

La scheda **Tutorial** è mostrata solo quando il tour guidato è configurato per la tua installazione e contiene un'unica azione. Seleziona **Inizia Dino Tour** per avviare la visita guidata delle principali funzionalità di Dino — un utile ripasso se sei nuovo alla piattaforma o vuoi rivedere un'area specifica.

## Pagine correlate

- [Accesso](../getting-started/login.md)
- [Reimpostare la password](../getting-started/reset-password.md)
- [Interfaccia e navigazione](../interface/index.md)