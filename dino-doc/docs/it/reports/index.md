---
title: Report
description: Una panoramica dell'area Report in Dino — come trovare i report schema e navigare tra i tuoi report.
---

# Report

L'area Report è il tuo punto di accesso a tutti i report schema disponibili. Un report schema definisce la struttura e il contenuto di un report che può essere generato dai dati raccolti. Da qui puoi sfogliare gli schemi e accedere ai report già creati per ciascuno di essi.

![Vista principale della pagina Report](../imgs/reports/index.png)

I report schema vengono creati da un formato basato su Excel chiamato [XLSReport](xlsreport.md), oppure generati automaticamente da un form schema (vedi [Report automatici](autoreports.md)). Per crearne uno da un file, devi prima preparare un file XLSReport e poi importarlo in Dino. Per la procedura completa, vedi [Modifica report schema](edit-report-schema.md).

---

## Sfogliare i report schema

Quando apri la pagina Report, vedi una scheda per ogni report schema a cui hai il permesso di accedere. Le schede sono ordinate alfabeticamente in base all'etichetta dello schema.

Per trovare uno schema specifico:

1. Usa il campo **Filtra** nella parte superiore della pagina.
2. Digita una qualsiasi parte del nome o dell'etichetta dello schema.
3. L'elenco si filtra mentre digiti, mostrando solo gli schemi corrispondenti.

Per aprire i report di uno schema, clicca in un punto qualsiasi della sua scheda.

Su ogni scheda che puoi modificare, le icone nell'angolo in alto a destra ti permettono di gestire direttamente lo schema:

- **Modifica** (icona a matita) — apre lo schema per la modifica. Vedi [Modifica report schema](edit-report-schema.md).
- **Elimina** (icona a cestino) — rimuove lo schema dopo la conferma. Uno schema che ha ancora dei report non può essere eliminato: elimina prima i suoi report.

Un'icona a impronta digitale su una scheda indica che il report schema è *univoco*: può produrre un solo report per un insieme esatto di metriche. Se provi a creare un report che esiste già per quelle metriche, Dino non creerà un duplicato.

!!! tip "Nessuno schema ancora?"
    Se vedi il messaggio "There are not any Reports currently available", non è ancora stato creato né condiviso con te alcun report schema. Chiedi al tuo amministratore Dino di crearne uno, oppure aggiungine uno tu stesso se hai i permessi.

---

## Aggiungere un nuovo report schema

Puoi iniziare a creare un nuovo report schema dalla pagina principale Report.

1. Clicca il pulsante **+** (*Add new Reports schema*) nell'angolo in basso a destra dello schermo. Viene mostrato solo se hai il permesso di creare report schema.
2. Segui i passaggi descritti in [Modifica report schema](edit-report-schema.md).

---

## Aprire i report di uno schema

Cliccando sulla scheda di uno schema accedi all'elenco dei report generati da quello schema. Da qui puoi:

1. Sfogliare i report esistenti in una tabella, con dettagli come l'utente che ha creato il report, il nome del report e l'intervallo di date raccolte.
2. Filtrare e cercare nell'elenco per restringere i report che ti servono. Usa la ricerca per parola chiave, i campi dell'intervallo di date e il pulsante **Filtri** per condizioni più avanzate. Puoi anche salvare un insieme di filtri come preset e applicarlo di nuovo in seguito.
3. Aprire un report per esaminarlo: passa il mouse sulla sua riga e clicca l'icona **Vedi** (occhio), oppure seleziona la riga e clicca **Vedi** nella barra delle azioni sopra la tabella. Vedi [Modifica report](edit-report.md).
4. Eliminare un report che non ti serve più: seleziona la sua riga, poi clicca **Elimina** nella barra delle azioni.

Per creare un nuovo report dallo schema selezionato, clicca **Aggiungi nuovo report** sopra la tabella. I report che usano prompt AI consumano DINO-AI Token. Il numero di token che il report utilizzerà è mostrato accanto al pulsante, così conosci sempre il costo prima di iniziare.

!!! warning "Token insufficienti"
    Se non hai abbastanza DINO-AI Token nel tuo account, Dino non avvierà il report e mostrerà un messaggio che ti chiede di aggiungere altri token. Aggiungi token al tuo account e riprova.

---

## Cosa puoi fare dopo

Dall'area Report puoi passare a queste attività:

* **[Modifica report](edit-report.md)** — Esamina un report ed esportalo.
* **[Modifica report schema](edit-report-schema.md)** — Crea nuovi report schema o modifica quelli esistenti per definire cosa appare nei tuoi report. Di solito richiede permessi di amministratore.
* **[Aggregazione](../aggregation/index.md)** — Sfoglia i dati di tutti i tuoi form schema in un unico elenco.