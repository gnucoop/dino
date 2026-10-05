---
title: Importa dati
description: Scopri come importare in blocco dati strutturati in qualsiasi form schema usando un file CSV o Excel. La procedura guidata ti permette di caricare un file, associare le sue colonne ai campi del form e rivedere l'esito dell'importazione.
---

# Importa dati

La pagina **Importa dati** ti permette di caricare in blocco dei dati in un form schema da un file `.xls`, `.xlsx` o `.csv`. Una procedura guidata in tre passaggi — **Carica file**, **Associa campi**, **Esito** — ti guida nel caricamento del file, nell'associazione delle sue colonne ai campi del form e nella revisione del risultato.

![Vista principale della pagina Importa dati](../imgs/forms/import.png)

## Accedere alla pagina di importazione

1. Vai alla lista **Form** e seleziona un form schema.
2. Dalla visualizzazione dei dati del form, clicca **Importa form** nella barra degli strumenti.

## Passaggio 1 — Carica file

Il primo passaggio mostra un'area di trascinamento o un selettore di file.

- **Formati accettati:** `.xls`, `.xlsx`, `.csv`
- **Dimensione massima del file:** 20 MB

Per caricare:

1. (Opzionale) Lascia selezionata l'opzione **Riutilizza le metriche esistenti con lo stesso nome** (impostazione predefinita) in modo che ogni metrica nel file il cui nome corrisponde a una metrica già presente nel sistema venga collegata a quella metrica esistente invece di crearne un duplicato. Deselezionala per creare sempre nuove metriche.
2. Trascina un file sull'area tratteggiata **oppure** clicca **Scegli un file** per sfogliare.
3. Una volta letto il file, la procedura guidata passa da sola a **Associa campi**.

### Formattare il file di importazione
Vedi la descrizione nella sezione [sottostante](#formato-del-file)

!!! tip "Formati di file semplici"
    Dino accetta lo stesso file ottenuto durante l'[esportazione](index.md#esporta). Quindi, il modo più semplice per ottenere un file formattato correttamente per l'importazione è esportare prima alcuni dati del form dallo stesso schema e poi eliminare le righe contenenti i dati esportati, mantenendo solo le intestazioni delle colonne. In ogni caso, assicurati che le intestazioni delle colonne siano chiare – verranno usate come suggerimenti durante l'associazione.

!!! note "Metriche identificate tramite ID"
    Se una colonna di metrica nel tuo file fornisce l'**ID** (UUID) della metrica, quella riga viene collegata alla metrica esistente con quell'ID e non viene creata alcuna nuova metrica. L'ID ha la precedenza sul nome della metrica, quindi questo avviene indipendentemente dall'opzione **Riutilizza le metriche esistenti con lo stesso nome** (che si applica solo alla corrispondenza per nome).

## Passaggio 2 — Associa campi

Dopo il caricamento, vedi una tabella che elenca tutte le colonne del tuo file. Ogni riga ha tre colonne:

- **Colonna del file** – l'intestazione originale del tuo file.
- **Campo** – un menu a tendina in cui selezioni il campo del form corrispondente.
- **Stato** – mostra se la colonna è associata, ignorata o presenta un errore.

### Azioni di associazione

- **Selezionare un campo del form** – apri il menu a tendina di una colonna e scegli il campo corretto. Puoi cercare all'interno del menu a tendina.
- **Ignorare una colonna** – seleziona l'opzione **— Ignora questa colonna —** nel menu a tendina, oppure clicca il pulsante **Ignora** nella colonna dello stato. Le colonne ignorate sono in grigio.
- **Ripristinare una colonna ignorata** – clicca il pulsante **Ripristina** nella colonna dello stato.

### Corrispondenza automatica

Quando il file viene letto, Dino associa ogni colonna la cui intestazione è esattamente il nome di un campo del form, o il nome di un campo ripetuto seguito da `__N` (vedi [Slide ripetute](#slide-ripetute)). Le altre colonne restano da associare a te.

Clicca **Riassocia tutto** per reimpostare ogni colonna e lasciare che Dino le associ di nuovo, questa volta abbinando le colonne anche ai campi con nomi o etichette simili. Rivedi il risultato e correggi le associazioni come necessario.

!!! tip "L'abbinamento funziona meglio con intestazioni che sono i nomi dei campi, come in un file esportato."

### Ripetizione

Se un campo del form selezionato è un campo ripetuto (ad esempio, più numeri di telefono), sotto il menu a tendina compare un input **Ripetizione**. Inserisci l'indice di ripetizione (0, 1, 2, …) per assegnare questa colonna del file a una occorrenza del gruppo ripetuto.

### Riepilogo della barra degli strumenti

In cima all'area di associazione, puoi vedere tre indicatori:

- **Colonne totali** – numero di colonne del file.
- **Associato** – colonne che sono state assegnate a un campo del form.
- **Ignorato** – colonne che hai scelto di ignorare.

Usa l'input **Cerca colonne…** per filtrare la tabella per nome della colonna del file.

Clicca **Indietro** per tornare al passaggio di caricamento: il file e le associazioni vengono scartati e scegli di nuovo il file.

Quando tutte le colonne desiderate sono associate e non ci sono errori, il pulsante **Applica importazione** diventa attivo. Cliccalo per avviare l'importazione. Durante l'elaborazione compare un indicatore di caricamento.

!!! warning "Associazione duplicata"
    Se associ lo stesso campo del form a più di una colonna del file, viene mostrato un errore di convalida (*Campo associato a più di una colonna*) e il pulsante **Applica importazione** resta disattivato finché non viene corretto.

## Passaggio 3 — Esito

L'ultimo passaggio riporta cosa è successo:

- Un banner ti indica se l'importazione è **riuscita**, **parziale** (alcune righe sono state scartate) o si è conclusa con un **ERRORE** (non è stato importato nulla).
- I contatori mostrano **Righe importate**, **Righe scartate**, **Righe nel file** e **Metriche create**.
- Gli elenchi dei problemi mostrano le righe del file interessate e il motivo. Usa **Cerca per riga o errore** per filtrare elenchi lunghi.

Clicca **Chiudi** per tornare alla lista di form, dove compaiono i nuovi dati. Dopo un errore, **Indietro** ti riporta al passaggio di associazione per correggere i problemi.


## Formato del file

Descriviamo la procedura per importare alcuni dati in blocco usando un file Excel generato da un Google Sheet. La stessa procedura vale per i file CSV o se lavori direttamente con Excel. 

Supponiamo che tu voglia importare dati in un form chiamato Projects che ha 2 slide, una delle quali è una slide ripetuta:

![Il form Projects, con due slide una delle quali è una slide ripetuta](../imgs/forms/import-repeating-slide.png)

Il form Projects è stato creato usando il seguente XLSForm. Il foglio "survey" è 

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
2. Nella prima riga devi inserire i nomi dei campi del form e dei campi specifici di DINO. In questo esempio, i campi del form possono essere:  
   1. **country**  
   2. **country\_other**  
   3. **title**  
   4. **project\_date\_start**  
   5. **selected\_donor**  
   6. **budget**  
   7. **isleader**  
   8. ***indic*** (\*)  
   9. ***value\_indic*** (\*)

   attenzione che i campi che si trovano all'interno di slide ripetute devono essere trattati diversamente (ecco perché abbiamo messo un asterisco). Fai riferimento alla sezione specifica qui sotto. 

   I campi specifici di DINO possono essere:

   10. **created\_at**. La data di creazione del form. Specifica questo valore solo se vuoi che i tuoi form abbiano una data di creazione diversa da quella dell'importazione;  
   11. **user\_data\_ref\_id**. L'ID dell'utente che sarà associato al form. Si applica solo quando importa un amministratore; per gli altri utenti il valore viene ignorato e i form sono assegnati all'utente che li sta importando;  
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
   23. **form\_status\_name**. Il nome di uno degli stati del form schema. Le righe che non lo contengono ricevono il primo stato dello schema. Se un valore non corrisponde al nome di uno stato esistente, il file non viene importato (*Stati non validi*);  
   24. **dinoinvalid**. Contrassegna il form come non valido. Usa `true`, `1`, `yes`, `y` o `x`; qualsiasi altro valore o una cella vuota lascia il form valido.

3. ogni riga corrisponderà a un diverso nuovo form. Quindi, se creiamo un file con una intestazione \+ diciamo 5 righe di dati, se il caricamento ha successo, creeremo 5 nuovi form in DINO.   
4. Non è necessario avere una colonna per ogni campo del form; non è necessario riempire tutte le righe di una determinata colonna, ma se un campo è vuoto per tutte le righe, può essere omesso,   
5. I campi data devono essere formattati YYYY-MM-DD come testo (attenzione).   
6. I campi a scelta singola devono contenere una delle opzioni accettate come specificato nel foglio "choices" (vedi il form builder o il file XLSForm).   
7. I campi a scelta multipla devono essere formattati secondo il seguente schema: \[opt1, opt2\] (cioè un elenco di opzioni tra parentesi quadre). 

Ad esempio, un file valido potrebbe essere il seguente:

| country | country\_other | title | project\_date\_start | budget | isleader | area\_id |
| :---- | :---- | :---- | :---- | ----- | :---- | :---- |
| ALB | \[AFG,DZA\] | Human rights in education | 2022-01-28 | 120000 | true | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |
| ASM |  | A new approach to social justice | 2022-02-14 | 20000 |  | 81387ff7-5c7d-44e7-9dc6-76b8d09265ac |

In questo caso stiamo importando 2 form, per entrambi selezioniamo solo la metrica AREA. Inoltre, nota che non forniamo tutti i campi del form per tutti i form, ma per i campi in cui forniamo un valore, seguiamo rigorosamente le indicazioni descritte sopra. 

### Gestire le metriche durante l'importazione

Durante l'importazione di alcuni dati di un form, per quanto riguarda le metriche, potresti voler:

- creare nuove metriche durante l'importazione  
- riutilizzare metriche già create

Le regole da seguire per gestire correttamente le metriche sono le seguenti:

| METRICA | CREA DALL'INTERFACCIA | CREA DALL'IMPORTAZIONE | CREA \+ ASSEGNA DALL'IMPORTAZIONE | USA DALL'IMPORTAZIONE | CREA \+ ASSEGNA DALL'IMPORTAZIONE (genitore) | USA COME GENITORE |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **Caso** | nome | nome | nome | id, oppure nome (con l'opzione di riutilizzo), oppure entrambi | nome, in un'altra riga dello stesso file | id oppure nome |
| **Organizzazione** | nome | nome | nome | id, oppure nome (con l'opzione di riutilizzo), oppure entrambi | nome, in un'altra riga dello stesso file | id oppure nome |
| **Posizione** | nome | nome | nome | id, oppure nome (con l'opzione di riutilizzo), oppure entrambi | nome, in un'altra riga dello stesso file | id oppure nome |
| **Area** | nome | nome | nome | id, oppure nome (con l'opzione di riutilizzo), oppure entrambi | nome, in un'altra riga dello stesso file | id oppure nome |
| **Progetto** | nome, codice | nome, codice | nome, codice | id, oppure nome (con l'opzione di riutilizzo), oppure entrambi | nome e codice, in un'altra riga dello stesso file | id oppure nome |

Quando una riga contiene sia l'id che il nome di una metrica, vince l'id e il nome viene ignorato. Una nuova metrica viene creata solo quando viene fornito il nome e l'id è vuoto.

I genitori si impostano con le colonne `<metric>_parent_id` e `<metric>_parent_name` (ad esempio `location_parent_name`), e si applicano solo alle metriche create dall'importazione. Il genitore deve essere dello stesso tipo di metrica e deve già esistere oppure essere creato da un'altra riga dello stesso file, in qualsiasi ordine. Un genitore che non corrisponde a nulla non viene creato: quella metrica viene segnalata come *metrica con parent non valido*.

## Slide ripetute

Se hai un campo in slide ripetute, deve essere denominato diversamente. Ogni campo nella slide ripetuta deve essere chiamato \<field\_name\>\_\_X dove X è il numero di ripetizione, da 0 (corrispondente a una ripetizione) a N-1 dove N è il numero totale di ripetizioni della slide in quel form.   
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

- **ID sconosciuti** – se una colonna fa riferimento a un utente o a una metrica tramite un ID che non esiste in Dino, l'intero file non viene importato (*File non importato!*), e il risultato elenca gli *Id utente non validi* o gli *Id metrica non validi*. Controlla gli ID nel tuo file prima di importare.
- **Stato del form sconosciuto** – un `form_status_name` che non corrisponde a nessuno stato dello schema blocca anch'esso l'importazione (*Stati non validi*).
- **Metriche che non possono essere collegate** – una riga che indica una metrica che Dino non riesce a creare o trovare viene scartata, e il risultato mostra il motivo; le altre righe vengono importate.