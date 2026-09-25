---
title: Importa dati
description: Scopri come importare in blocco dati strutturati in qualsiasi form schema usando un file CSV o Excel. La procedura guidata in due passaggi ti permette di caricare un file e poi mappare le sue colonne ai campi del form.
---

# Importa dati

La pagina **Importa dati** ti permette di caricare in blocco dei dati in un form schema da un file `.xls`, `.xlsx` o `.csv`. Una procedura guidata in due passaggi ti accompagna nel caricamento del file e nella mappatura delle colonne del file ai campi del form.

![Visualizzazione principale della pagina Importa dati](../imgs/forms/import.png)

## Accedi alla pagina di importazione

1. Vai alla lista **Forms** e seleziona un form schema.
2. Dalla visualizzazione dei dati del form, clicca su **Importa** (il pulsante nella barra degli strumenti).

## Passaggio 1 — Carica file

Il primo passaggio mostra un'area drag‑and‑drop o un selettore di file.

- **Formati accettati:** `.xls`, `.xlsx`, `.csv`
- **Dimensione massima del file:** 20 MB

Per caricare:

1. Trascina un file sull'area tratteggiata **oppure** clicca su **Scegli un file** per sfogliare.
2. Dopo la selezione, il nome del file appare in un chip insieme al numero di colonne rilevate.
3. (Facoltativo) Lascia selezionata l'opzione **Riutilizza le metriche esistenti con lo stesso nome** (impostazione predefinita) in modo che qualsiasi metrica nel file il cui nome corrisponde a una metrica già presente nel sistema venga collegata a quella metrica esistente invece di creare un duplicato. Deselezionala per creare sempre nuove metriche.
4. Clicca su **Avanti** (o sull'etichetta dello stepper "2 · Mappa campi") per procedere.

### Formattare il file di importazione
Vedi la descrizione nella sezione [sottostante](#formato-del-file)

!!! tip "Formati di file semplici"
    Dino accetta lo stesso file ottenuto durante l'[esportazione](index.md#esportazione). Quindi, il modo più semplice per ottenere un file formattato correttamente per l'importazione è esportare prima alcuni dati del form dallo stesso schema e poi eliminare le righe contenenti i dati esportati, mantenendo solo le intestazioni delle colonne. In ogni caso, assicurati che le intestazioni delle colonne siano chiare – verranno usate come suggerimenti durante la mappatura.

!!! note "Metriche identificate tramite ID"
    Se una colonna metrica nel tuo file fornisce l'**ID** (UUID) della metrica, quella riga viene collegata alla metrica esistente con quell'ID e non viene creata alcuna nuova metrica. L'ID ha la precedenza sul nome della metrica, quindi questo avviene indipendentemente dall'opzione **Riutilizza le metriche esistenti con lo stesso nome** (che si applica solo alla corrispondenza per nome).

## Passaggio 2 — Mappa campi

Dopo il caricamento, vedi una tabella che elenca tutte le colonne del tuo file. Ogni riga ha tre colonne:

- **Colonna file** – l'intestazione originale del tuo file.
- **Campo del form** – un menu a tendina dove selezioni il campo del form corrispondente.
- **Stato** – mostra se la colonna è mappata, ignorata o presenta un errore.

### Azioni di mappatura

- **Seleziona un campo del form** – apri il menu a tendina di una colonna e scegli il campo corretto. Puoi cercare all'interno del menu a tendina.
- **Ignora una colonna** – seleziona l'opzione **— Ignora questa colonna —** nel menu a tendina, oppure clicca sul pulsante **Ignora** nella colonna dello stato. Le colonne ignorate sono in grigio.
- **Ripristina una colonna ignorata** – clicca sul pulsante **Ripristina** nella colonna dello stato.

### Corrispondenza automatica

Clicca su **Corrispondenza automatica** per lasciare che Dino associ automaticamente le colonne ai campi del form in base alla somiglianza dei nomi. Questo è un buon punto di partenza – rivedi e regola le mappature secondo necessità.

!!! tip "La corrispondenza automatica funziona al meglio con intestazioni che corrispondono esattamente alle etichette dei campi o che contengono parole chiave simili."

### Ripetizione

Se un campo del form selezionato è un campo ripetuto (ad esempio, più numeri di telefono), sotto il menu a tendina appare un input **Ripetizione**. Inserisci l'indice di ripetizione (0, 1, 2, …) per assegnare questa colonna del file a una occorrenza del gruppo ripetuto.

### Riepilogo della barra degli strumenti

Nella parte superiore dell'area di mappatura, puoi vedere tre chip:

- **Colonne totali** – numero di colonne del file.
- **Mappate** – colonne che sono state assegnate a un campo del form.
- **Ignorate** – colonne che hai scelto di ignorare.

Usa l'input **Cerca colonne** per filtrare la tabella in base al nome della colonna del file.

## Applica importazione

Quando tutte le colonne desiderate sono mappate e non ci sono errori, il pulsante **Applica importazione** diventa attivo. Cliccalo per avviare l'importazione. Durante l'elaborazione, appare uno spinner. Puoi cliccare su **Indietro** per tornare al passaggio 1 o annullare l'importazione.

Dopo un'importazione riuscita, vieni riportato alla lista di form del form, dove appaiono i nuovi dati.

!!! warning "Mappatura duplicata"
    Se mappi lo stesso campo del form a più di una colonna del file, viene mostrato un errore di validazione e il pulsante **Applica importazione** rimane disattivato finché non viene corretto.


## Formato del file

Descriviamo la procedura per importare alcuni dati in blocco usando un file Excel generato da un Google Sheet. La stessa procedura vale per i file CSV o se si lavora direttamente con Excel. 

Supponiamo che tu voglia importare dati in un form chiamato Progetti che ha 2 slide, una delle quali è una slide ripetuta:

![Il form Progetti, con due slide una delle quali è una slide ripetuta](../imgs/forms/import-repeating-slide.png)

Il form Progetti è stato creato usando il seguente XLSForm. Il foglio "survey" è 

| type | name | label |
| ----- | ----- | ----- |
| **begin group** | **start** | **Start** |
| select\_one countries | country | Country |
| select\_multiple countries | country\_other | Other Countries |
| text | title | Project Title |
| date | project\_date\_start | Start date |
| select\_one donors | selected\_donor | Donor |
| integer | budget | Budget |
| boolean | isleader | Leading applicant |
| **end group** |  |  |
| **begin repeat** | **indicators** | **Indicators** |
| text | indic | Indicator description |
| integer | value\_indic | Value reached |
| **end repeat** |  |  |

e il foglio "choices" è 

| list\_name | name | label |
| ----- | ----- | ----- |
| donors | ue | UE |
| donors | govita | ITALIAN GOVERNMENT |
| donors | un | UN |
| donors | pub | ALTRI DONATORI PUBBLICI |
| donors | la | ENTI LOCALI |
| donors | priv | DONATORI PRIVATI |
| donors | other | Others |
|  |  |  |
| countries | AFG | Afghanistan |
| countries | ALB | Albania |
| countries | DZA | Algeria |
| countries | ASM | American Samoa |

Segui questi passaggi:

1. Crea un file vuoto con un solo foglio (i nomi del file e del foglio non hanno importanza).   
2. Nella prima riga devi inserire i nomi dei campi del form e dei campi del form specifici di DINO. In questo esempio, i campi del form possono essere:  
   1. **country**  
   2. **country\_other**  
   3. **title**  
   4. **project\_date\_start**  
   5. **selected\_donor**  
   6. **budget**  
   7. **isleader**  
   8. ***indic*** (\*)  
   9. ***value\_indic*** (\*)

   fai attenzione che i campi che si trovano all'interno di slide ripetute devono essere trattati diversamente (è per questo che abbiamo messo un asterisco). Fai riferimento alla sezione specifica qui sotto. 

   I campi specifici di DINO possono essere:

   10. **created\_at**. La data di creazione del form. Specifica questo valore solo se vuoi che i tuoi form abbiano una data di creazione diversa da quella di importazione;  
   11. **user\_data\_ref\_id**. L'ID dell'utente che sarà associato al form (il valore predefinito è l'ID dell'utente che sta importando i form);  
   12. **area\_id**. L'ID della metrica AREA da associare al form;  
   13. \[area\_name\]  
   14. **case\_id**. L'ID della metrica CASE da associare al form;  
   15. \[case\_name\]	  
   16. **project\_id**. L'ID della metrica PROJECT da associare al form;  
   17. \[project\_name\]  
   18. \[project\_code\]  
   19. **location\_id**. L'ID della metrica LOCATION da associare al form;  
   20. \[location\_name\]  
   21. **organization\_id**. L'ID della metrica ORGANISATION da associare al form;  
   22. \[organization\_name\]

3. ogni riga corrisponderà a un nuovo form diverso. Quindi, se creiamo un file con un'intestazione \+ diciamo 5 righe di dati, se il caricamento ha successo, creeremo 5 nuovi form in DINO.   
4. Non è necessario avere una colonna per ogni campo del form; non è necessario riempire tutte le righe di una data colonna, ma se un campo è vuoto per tutte le righe, può essere omesso,   
5. I campi data devono essere formattati come testo nel formato YYYY-MM-DD (fai attenzione).   
6. I campi a scelta singola devono contenere una delle opzioni accettate come specificato nel foglio "choices" (vedi il form builder o il file XLSForm).   
7. I campi a scelta multipla devono essere formattati secondo il seguente schema: \[opt1, opt2\] (cioè una lista di opzioni tra parentesi quadre). 

Ad esempio, un file valido potrebbe essere il seguente:

| country | country\_other | title | project\_date\_start | budget | isleader | area\_id |
| :---- | :---- | :---- | :---- | ----- | :---- | :---- |
| ALB | \[AFG,DZA\] | Human rights in education | 2022-01-28 | 120000 | true | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |
| ASM |  | A new approach to social justice | 2022-02-14 | 20000 |  | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |

In questo caso stiamo importando 2 form; per entrambi selezioniamo solo la metrica AREA. Inoltre, nota che non forniamo tutti i campi del form per tutti i form, ma per i campi dove forniamo un valore, seguiamo rigorosamente le indicazioni descritte sopra. 

### Gestire le metriche durante l'importazione

Durante l'importazione di alcuni dati del form, per quanto riguarda le metriche, potresti voler:

- creare nuove metriche durante l'importazione  
- riutilizzare metriche già create

Le regole da seguire per gestire correttamente le metriche sono le seguenti:

| METRICA | CREAZIONE DA UI | CREAZIONE DA IMPORT | CREAZIONE \+ ASSEGNAZIONE DA IMPORT | UTILIZZO DA IMPORT | CREAZIONE \+ ASSEGNAZIONE DA IMPORT (parent) | UTILIZZO PARENT |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **Case** | name | name | name | id oppure name (con opzione reuse), oppure entrambi | name | id oppure name (con opzione reuse), oppure entrambi |
| **Organization** | name | name | name | id oppure name (con opzione reuse), oppure entrambi | name | id oppure name (con opzione reuse), oppure entrambi |
| **Location** | name | name | name | id oppure name (con opzione reuse), oppure entrambi | name | id oppure name (con opzione reuse), oppure entrambi |
| **Area** | name | name | name | id oppure name (con opzione reuse), oppure entrambi | name | id oppure name (con opzione reuse), oppure entrambi |
| **Project** | name, code | name, code | name, code | id | name, code | id |

## Slide ripetute

Se hai campi nelle slide ripetute, devono essere denominati diversamente. Ogni campo nella slide ripetuta deve essere chiamato \<field\_name\>\_\_X dove X è il numero di ripetizione, da 0 (corrispondente a una ripetizione) a N-1 dove N è il numero totale di ripetizioni della slide in quel form.   
Ad esempio, supponi di avere solo 1 ripetizione della slide ripetuta e di voler aggiungere entrambi i campi "Indicator description" e "Value reached". Dovresti aggiungere queste due colonne al tuo file di importazione:

| indic\_\_0 | value\_indic\_\_0 |
|  :---- | ----- |
| Number of children | 100 |

Quindi, ad esempio, potremmo avere:

| country | budget | indic\_\_0 | value\_indic\_\_0 | indic\_\_1 | value\_indic\_\_1 | isleader |
| :---- | ----- | :---- | ----- | :---- | ----- | :---- |
| ALB | 120000 | Children | 100 |  |  | true |
| ASM | 20000 |  |  |  |  |  |
| AFG | 15000 | Parents | 45 | Schools | 34 | true |

## Errori

Controlla gli ID nel tuo file prima dell'importazione. Se una colonna fa riferimento a un'entità tramite il suo ID (una metrica o un utente) e in Dino non esiste nessuna entità con quell'ID, i form importati non potranno essere sincronizzati con il server.