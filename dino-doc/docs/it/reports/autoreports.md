---
title: Auto Report
description: Crea o modifica un report generato automaticamente
---

# Auto report

Un auto report è un report che Dino costruisce per te a partire da un form schema. Non
lo scrivi tu: lo attivi mentre modifichi il form schema, e Dino crea
il report schema e un primo report per te.

Usa un auto report quando vuoi vedere i dati che un form raccoglie senza progettare prima un
report. Quando ti serve il pieno controllo sul layout, sui calcoli o sui
grafici, costruisci il report con il [formato XLSReport](xlsreport.md).

## Attivare un auto report

1. Apri la sezione **Forms** e seleziona il form schema per cui vuoi il report.
2. Vai alla scheda **Impostazioni**.
3. Imposta **Genera report** su **Sì**.
4. Salva il form schema.

Dino crea il report pochi secondi dopo il salvataggio. Lo trovi nella
sezione [Report](index.md), elencato come qualsiasi altro report.

## Cosa crea Dino

Salvare un form schema con **Genera report** impostato su **Sì** produce due cose:

| Elemento | Dettagli |
|---|---|
| Un report schema | Intitolato come il form, con l'etichetta **&lt;etichetta del form&gt; Auto Report** e la stessa icona del form. Resta collegato al form schema da cui è stato generato. |
| Un primo report | Creato pochi secondi dopo, datato con il giorno corrente e attribuito a te. Non ha filtri per area, caso, posizione, organizzazione o progetto, quindi copre tutti i dati raccolti dal form. |

Puoi aprire il report generato e lavorarci come con qualsiasi altro: il report che
produce è un punto di partenza, non un risultato fisso.

## Disattivare un auto report

Una volta che un auto report esiste, il campo **Genera report** sul form schema si blocca su
**Sì** e mostra un suggerimento in tal senso. Non c'è modo di ritirare il report da quella
schermata.

Per rimuoverlo, vai alla sezione **Reports** ed elimina il report schema generato
insieme ai suoi dati. Il campo sul form schema si sblocca non appena il report
non c'è più, e puoi reimpostarlo su **No**.

## Pagine correlate

- [Modifica form schema](../forms/edit-form-schema.md) — dove si trova l'opzione
  **Genera report**
- [Il formato XLSReport](xlsreport.md) — per i report che progetti tu stesso
- [Report](index.md) — la sezione in cui compaiono i report generati