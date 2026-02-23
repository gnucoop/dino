---
title: Creazione di un report
description: Come generare un nuovo report da uno schema di report in Dino, inclusa la selezione delle metriche e l'impostazione di un intervallo di date.
---

# Creazione di un report

Per generare un nuovo report, vai all'hub Report, apri uno schema di report e fai clic sul **pulsante +** (il pulsante circolare fluttuante in basso a destra della pagina).

![Creazione di un report](../imgs/reports/creating-a-report.png)

!!! note "Autorizzazione richiesta"
    Il pulsante di aggiunta è visibile solo se si dispone dell'autorizzazione per creare report per questo schema.

---

## Passaggio 1 — Metriche del report

Se lo schema del report richiede metriche, il primo passaggio ti chiede di selezionare i valori delle metriche che questo report coprirà (ad esempio: progetto, località o organizzazione).

1.  Compila tutti i campi delle metriche obbligatorie.
2.  Fai clic su **Avanti** per continuare.

---

## Passaggio 2 — Dati del report

Nel secondo passaggio, compila i seguenti campi:

- **Nome del report** *(obbligatorio)* — Un nome per identificare questo report.
- **Raccolti dal** *(opzionale)* — La data di inizio dell'intervallo per i dati inclusi nel report.
- **Raccolti fino al** *(opzionale)* — La data di fine dell'intervallo.

L'intervallo di date è opzionale. Se lasciato vuoto, il report includerà tutti i dati disponibili per le metriche selezionate.

!!! tip "Schemi senza metriche"
    Se lo schema del report non utilizza metriche, vedrai direttamente solo i campi del nome del report e dell'intervallo di date, senza procedura guidata.

---

## Salvataggio del report

Fai clic sul pulsante **Salva report** (il pulsante circolare fluttuante) per generare e salvare il report.

- Se il report viene generato con successo, apparirà un messaggio di conferma e tornerai all'elenco dei report.

!!! warning "Report basati su IA"
    Alcuni schemi di report utilizzano l'IA per generare contenuti. La creazione di un report da questi schemi costa crediti IA. Il costo in crediti viene mostrato nel tooltip del pulsante di aggiunta prima di iniziare. Se il tuo account non ha crediti sufficienti, apparirà un messaggio e il report non potrà essere creato.