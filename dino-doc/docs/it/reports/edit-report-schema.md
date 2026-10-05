---
title: Modifica il Report Schema
description: Crea o modifica un report schema importando un file XLSReport, poi controllalo nell'anteprima prima di salvare.
---

# Modifica il Report Schema

La pagina **Modifica il Report Schema** consente di creare un nuovo report schema o modificarne uno esistente. Un report schema definisce la struttura, il layout e le origini dati di un report in Dino. Il suo contenuto proviene da un file [XLSReport](xlsreport.md) che si importa in questa pagina.

![Vista principale della pagina Modifica il Report Schema](../imgs/reports/edit-report-schema.png)

## Campi della pagina

| Campo | Descrizione |
|-------|-------------|
| **Nome report** | Obbligatorio. Deve essere univoco: se è già in uso, la pagina mostra *Questo nome è già usato.* |
| **Etichetta report** | Obbligatorio. Il nome visualizzato negli elenchi e nelle schede. |
| **Set di icone** | **Predefinito** o **Humanitarian**. |
| **Icona del Form** | Scegli un'icona dall'elenco di completamento automatico. L'anteprima si aggiorna in tempo reale. |
| **Metriche richieste** | Le metriche che devono essere scelte quando viene generato un report da questo schema. |

Sotto i campi, la pagina mostra:

- **Form schema associati** – i form schema utilizzati dal report, in sola lettura. Vengono presi dal file XLSReport importato al momento del salvataggio.
- **Anteprima del report** – il report generato dallo schema importato o salvato.

Le origini dati, le colonne e i filtri sono tutti definiti nel file XLSReport: la pagina non dispone di controlli per sceglierli.

## Creare un nuovo Report Schema

1. Apri la sezione **Report** nel menu principale.
2. Clicca il pulsante **+** (*Aggiungi nuovo schema Report*) nell'angolo in basso a destra.
3. Inserisci il **Nome report** e l'**Etichetta report** e, facoltativamente, l'icona e le **Metriche richieste**.
4. Clicca **Importa**, poi **Seleziona un file** e scegli il tuo file XLSReport (.xls o .xlsx).
5. Clicca **Applica**: il file viene caricato nella pagina e mostrato nell'**Anteprima del report**.
6. Clicca **Salva** per memorizzare lo schema. **Salva** resta disabilitato finché i campi obbligatori non sono validi.

!!! warning "Importa prima di salvare"
    Un nuovo report schema non può essere salvato senza un file importato: salvare a vuoto mostra *Oops! Something went wrong saving the Report*. **Applica** carica solo il file nella pagina; nulla viene memorizzato finché non clicchi **Salva**.

## Modificare un Report Schema esistente

1. Apri la sezione **Report**.
2. Sulla scheda del report schema, clicca l'icona della matita (*Modifica il Report Schema*).
3. Modifica i campi oppure importa un nuovo file XLSReport per sostituire il contenuto del report.
4. Clicca **Salva** per aggiornare lo schema.

Per eliminare un report schema, clicca l'icona del cestino (*Elimina Report Schema*) sulla sua scheda. Uno schema che ha ancora dei report non può essere eliminato: elimina prima i suoi report.

## Passaggi successivi

Dopo aver salvato il tuo report schema, puoi:

* Passare alla pagina [Report](index.md) per visualizzare ed eseguire il tuo nuovo report.
* Usare [Modifica report](edit-report.md) per lavorare sul report stesso una volta che lo schema è pronto.
* Tornare a questa pagina per apportare ulteriori modifiche secondo necessità.