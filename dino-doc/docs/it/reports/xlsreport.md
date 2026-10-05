---
title: XLSReport
description: Una panoramica del formato basato su Excel usato per creare report in Dino.
---

# Il formato XLSReport

## Cos'è XLSReport

XLSReport è un formato di authoring basato su fogli di calcolo per costruire **report DINO / AJF (Advanced JSON Forms)** senza scrivere JSON o codice a mano. Chi redige un report compila un normale foglio di lavoro Excel (`.xlsx`) seguendo una serie di convenzioni, e un convertitore (`xls-report.ts`, parte della libreria `reports` di AJF) analizza quel foglio di lavoro producendo un form schema `AjfReport` che la piattaforma DINO può rendere come una dashboard live: tabelle, grafici, numeri KPI, immagini, graph, heatmap e altro.

Due cose rendono possibile tutto questo:

- **Mappatura foglio → widget** — ogni foglio del workbook (con alcune eccezioni speciali) diventa un widget del report. L'ordine dei fogli nel workbook è l'ordine in cui i widget vengono impilati nel report renderizzato.
- **Un piccolo DSL per le formule** ("linguaggio degli indicatori") — le celle non contengono solo valori letterali; la maggior parte contiene brevi espressioni (ad es. `SUM(D04, $persone, $tipo='corso')`) scritte in un mini-linguaggio compatto e con whitelist. Questo DSL è analizzato da `hindikit-parser.ts` e tradotto in JavaScript, che viene poi eseguito sui dati del form sottostante al momento del render/refresh usando una libreria di funzioni integrate (`expression-utils.ts`).

Questo significa che un XLSReport è in realtà due cose sovrapposte: una **descrizione del layout** (quali fogli producono quali widget, in quale ordine) e una **descrizione dei calcoli** (quali formule calcolano i numeri, gli array e i dataset che quei widget mostrano). Poiché i dati sottostanti provengono da form DINO (dati), qualsiasi formula di un XLSReport legge in ultima analisi da uno o più dataset di form e li modella in ciò che serve a un widget (un singolo numero, un array per un grafico o una tabella di righe).

XLSReport è indipendente da piattaforma e progetto: le stesse convenzioni del workbook si applicano a qualsiasi istanza DINO e a qualsiasi insieme di form — nulla nel formato è specifico di una particolare organizzazione o installazione.

## Struttura del file

Un XLSReport è un singolo workbook `.xlsx`. Il convertitore itera i fogli del workbook **in ordine** e decide cosa fare con ciascuno cercando una **sottostringa chiave nel nome del foglio** (non una corrispondenza esatta) — ad es. un foglio chiamato `table_activities` o `2_table` viene riconosciuto entrambi come foglio "table" perché il nome *contiene* `table`.

### Categorie di fogli

| Il nome del foglio contiene | Ruolo |
|---|---|
| `variables` (nome esatto) | Dichiara variabili/dataset con nome usati dai fogli successivi. Non produce di per sé un widget. |
| `filter` | Dichiara un form di filtro (in stile ODK/XLSForm `survey` + `choices`) associato al foglio *successivo* nel workbook. Non produce un widget proprio. |
| `filter` **e** `global` | Come sopra, ma il filtro risultante si applica all'intero report invece che a un singolo widget. |
| `choices` | Un foglio di supporto che contiene liste di scelte (`list_name`, `name`, `label`), usato insieme ai fogli `filter`. |
| `table` | Un widget `DynamicTable` o `PaginatedTable`. |
| `chart` | Un widget `Chart` (a barre, a linee, a torta, ecc.). |
| `image` | Un widget `Image`. |
| `html` | Un widget `Text` che rende HTML grezzo. |
| `graph` | Un widget `Graph` (nodi/rete). |
| `heatmap` | Un widget `HeatMap`. |
| `single` | Uno o più widget `Text` che formano una card KPI/"big number". |
| `paginatedlist` | Un widget `PaginatedList` (una riga = un mini widget tabella). |
| `paginatedDialogList` | Un widget `PaginatedList` le cui righe aprono una finestra di dettaglio. |

I nomi dei fogli sono per il resto liberi — usali per rendere il workbook auto-documentante (ad es. `table_beneficiaries_by_month`, `chart_gender_split`). Poiché la corrispondenza è una verifica di sottostringa, evita nomi che contengano accidentalmente un'altra parola chiave (ad es. non chiamare un foglio di grafico `charttable`).

### Convenzioni sulle righe all'interno di un foglio

Ogni foglio widget viene letto come una normale conversione da foglio di calcolo a JSON: **la riga 1 contiene le intestazioni di colonna** e **dalla riga 2 in poi ci sono i dati**, un oggetto JSON per riga con chiavi basate sul testo dell'intestazione. Oltre a questa regola generica, ogni tipo di foglio definisce un proprio significato per la riga di intestazione e per la prima o le prime due righe di dati (documentato per widget nella sezione 5).

### Layout complessivo

L'intero workbook viene racchiuso in **un unico layout di primo livello contenente una sola colonna**, e ogni foglio non speciale contribuisce con esattamente un widget (o, per `single`, diversi) aggiunto a quella colonna nell'ordine dei fogli. In altre parole:

- Il report è sempre un **unico stack verticale di widget** — non esiste un modo a livello di foglio di calcolo per creare colonne affiancate o contenitori annidati; l'unico "annidamento" esistente è generato internamente da `paginatedlist` / `paginatedDialogList` (ogni riga è a sua volta un piccolo widget tabella o finestra).
- Un foglio con nome contenente `filter` associa il suo filtro al foglio widget che lo **segue immediatamente**; un foglio `global filter` si associa al contenitore esterno del report invece che a un singolo widget.

### La via di fuga universale: `js:`

Qualsiasi cella normalmente analizzata tramite il DSL delle formule può invece iniziare con `js:` — tutto ciò che segue quel prefisso viene trattato come **JavaScript grezzo** e passato non analizzato. Questo dà accesso a ogni funzione esportata dalla libreria di utilità di runtime, non solo a quelle in whitelist nella grammatica del DSL (vedi sezione 4), e a espressioni JS arbitrarie (IIFE, uso di `Set`/`Map`, funzioni helper inline personalizzate, ecc.). Usalo quando un calcolo non rientra nella whitelist delle funzioni del DSL o nelle forme degli argomenti previste.

## Dichiarare le variabili

Il foglio `variables` è dove carichi i dati dei form e precalcoli tutto ciò che viene riutilizzato da più widget nel workbook (dataset, filtri, valori degli indicatori, etichette).

### Colonne

| Colonna | Significato |
|---|---|
| `name` | L'identificatore della variabile. Deve essere un identificatore valido (lettere, cifre, underscore, non iniziare con una cifra) — i nomi non validi vengono rifiutati. |
| `value` | Un'espressione, analizzata tramite lo stesso DSL delle formule di ogni altra cella (o JavaScript grezzo con prefisso `js:`). |
| `isAIPrompt` (facoltative) | Booleano; contrassegna la variabile come risultato di un prompt AI invece che di una formula semplice, così che possa essere recuperata in seguito con `PROMPT_RESULT`. |

Le righe con `name` vuoto vengono saltate. Le variabili sono valutate dall'alto verso il basso e **ogni variabile può referenziare qualsiasi variabile dichiarata sopra di essa** con il suo nome semplice (senza prefisso `$` — quel prefisso è riservato ai *campi* del form, vedi sezione 4).

### Caricare i dati dei form

Due lookup di runtime sono sempre disponibili:

- `forms['<nome form>']` — l'array grezzo dei dati per un dato form DINO.
- `schemas['<nome form>']` — il form schema del form (usato per risolvere la struttura dei gruppi ripetuti e le etichette delle scelte).

La stringa esatta del nome del form da usare è l'identificatore che DINO assegna a quel form — ricavalo dalla configurazione admin/form della tua istanza DINO (di norma coinciderà, ma non è garantito che coincida esattamente, con il nome file xlsform del form; verifica eventuali differenze di spaziatura, maiuscole/minuscole o spazi in coda).

Il blocco di apertura standard di un foglio `variables` carica ogni form di cui hai bisogno e lo trasforma in un dataset strutturato:

```
name  | value
F01   | forms['my_form_name']
S01   | schemas['my_form_name']
D01   | BUILD_DATASET(F01,S01)
```

`BUILD_DATASET(forms, schema)` suddivide ogni dato piatto in campi di primo livello non ripetuti più un oggetto `reps` che raggruppa le istanze dei gruppi ripetuti ("repeat"/slide) per il loro vero nome di gruppo (derivato dallo schema). Senza uno schema, ricade su una euristica generica. Da questo punto in poi, `D01` è il dataset che filtri, aggreghi e visualizzi.

### Delimitare/filtrare un dataset una volta, per ogni uso successivo

Un pattern molto comune e consigliato è **filtrare un dataset e riassegnarlo allo stesso nome di variabile**, così che ogni formula che referenzia quella variabile da quel momento in poi erediti automaticamente il filtro — invece di ripetere la condizione di filtro in ogni singola formula:

```
name | value
D01  | FILTER_BY(D01, $status='active')
```

Questo è particolarmente importante perché **i dataset dei form sono spesso condivisi tra più progetti, campagne o ambiti sulla stessa istanza DINO** — non dare mai per scontato che un array `forms['...']` sia già delimitato solo ai dati che ti interessano. Se i tuoi form portano un campo di progetto/ambito (il cui nome esatto dipende dal design dei form della tua istanza, ad es. qualcosa come `$project_name`), filtra ogni dataset esplicitamente:

```
scope_name = 'MY PROJECT'
D0X = FILTER_BY(D0X, $project_field = scope_name OR $secondary_project_field = scope_name)
```

Se un dataset ha un gruppo ripetuto le cui singole istanze necessitano di un proprio filtro di ambito (ad es. un repeat "partecipanti" in cui un singolo record collettivo può includere partecipanti appartenenti ad ambiti diversi), filtra anche a livello di singola istanza, tipicamente tramite `FLATTEN_REPS` combinato con `FILTER_BY` sull'array appiattito, prima di estrarre i valori che ti servono con `ALL_VALUES_OF` (vedi sezione 4 per queste funzioni). Controlla sempre il campo che contiene effettivamente il valore identificativo/di riferimento di un'istanza ripetuta — potrebbe non contenere ciò che il suo nome suggerisce (per esempio, un campo di riferimento "participant" dentro un repeat potrebbe memorizzare il *nome visualizzato* del record collegato invece del suo *codice/id*; verifica sui dati reali esportati prima di fare join/deduplicazione su di esso e usa la stessa chiave su entrambi i lati di qualsiasi confronto).

### Variabili da prompt AI

Se `isAIPrompt` è impostato su una riga di variabile, il suo valore rappresenta il risultato di un prompt generato dall'AI invece che di una semplice formula calcolata. Altrove nel workbook puoi recuperare quel testo con `PROMPT_RESULT(report_data, '<nome variabile>')` e interpolarlo in un widget HTML o single-indicator.

## Panoramica del DSL delle formule

Ogni cella senza `js:` viene analizzata da un piccolo parser recursive-descent in un'espressione JavaScript, poi valutata su un contesto dati a runtime.

### Sintassi di base

| Sintassi | Significato |
|---|---|
| `$fieldname` | Un riferimento a un campo del form. Tradotto in `form.fieldname` (`form` è qualunque record sia nel contesto in quella parte dell'espressione). |
| `bareIdentifier` | Un riferimento a un nome del foglio `variables`, a un nome di funzione o a una parola chiave letterale. |
| `'text'` / `"text"` | Stringa letterale. |
| `123`, `1.5`, `1e3` | Numero letterale. |
| `[a, b, c]` | Array letterale. |
| `func(arg1, arg2, ...)` | Chiamata di funzione — sono accettati solo i nomi di funzione in whitelist (vedi sotto); qualsiasi altra cosa deve passare per `js:`. |
| `=` | Uguaglianza (compila in `==` di JS). |
| `!=` | Disuguaglianza. |
| `+ - * /` , `< <= > >=` | Aritmetica / confronto, con lo stesso significato di JavaScript. |
| `AND` / `OR` | And/or logico (compilano in `&&` / `\|\|`). |
| `!expr` | Negazione logica. |
| `(expr)` | Raggruppamento. |
| `IF(cond, thenExpr, elseExpr)` | Condizionale ternario — una forma speciale integrata, non una funzione normale. |

Esempio:

```
IF($age >= 18 AND $status = 'active', 'adult-active', 'other')
→ (form.age >= 18 && form.status == 'active' ? 'adult-active' : 'other')
```

### Tipi di argomento

Poiché il DSL compila in JavaScript ma deve sapere *come* interpretare ogni argomento di funzione, ogni funzione in whitelist ha una firma fissa degli argomenti composta da questi tipi:

- **`arg`** — analizzato come espressione normale e passato così com'è (quindi `$field` diventa `form.field`, cioè il *valore* del campo).
- **`field`** — analizzato come espressione; se risulta essere un riferimento `$field` nudo, viene convertito nella **stringa quotata con il nome del campo** invece che nel valore del campo (ad es. `$age` → `'age'`), perché la funzione si aspetta di sapere *su quale campo* operare, non un valore.
- **`func(form)`**, **`func(elem)`**, **`func(elemA, elemB)`** — analizzato come espressione (tipicamente una condizione booleana/relazionale scritta con `$field`), poi racchiuso in una funzione freccia JS con i nomi dei parametri indicati, ad es. `$gender = 'male'` come argomento `func(form)` diventa `(form) => form.gender == 'male'`.
- Un `?` finale su un argomento lo contrassegna come **facoltative** — ometti sia esso sia tutto ciò che segue.

Conoscere il tipo di argomento ti dice quando scrivere `$field` (per referenziare il valore corrente di un campo) e quando la stessa sintassi `$field` viene invece silenziosamente trasformata in una stringa con il nome del campo.

### Riferimento delle funzioni

**Caricare e modellare i dataset**

| Funzione | Firma (tipi) | Descrizione |
|---|---|---|
| `BUILD_DATASET` | `(arg, arg?)` | Suddivide i dati piatti in campi di primo livello + `reps` (istanze dei gruppi ripetuti), usando lo schema se fornito. |
| `FLATTEN_REPS` | `(arg, arg)` | Produce una riga di output per ogni istanza di un gruppo ripetuto con nome, unendo i campi di primo livello del genitore con i campi di quell'istanza. |
| `FROM_REPS` | `(arg, func(form))` | Valuta un'espressione una volta per ogni istanza di un gruppo ripetuto (su tutti i record forniti), raccogliendo i risultati non nulli in un array piatto. |
| `APPLY` | `(arg, field, func(form))` | Restituisce una copia del dataset con un campo nuovo/derivato impostato su ogni record (e sui suoi reps). |
| `APPLY_LABELS` | `(arg, arg, arg)` | Sostituisce i valori grezzi delle scelte con le loro etichette leggibili (dallo schema) per la lista di nomi di campo indicata, su ogni record e sui suoi reps. |
| `GET_LABELS` | `(arg, arg)` | Lookup autonomo: mappa un array di valori grezzi delle scelte alle loro etichette usando uno schema. |
| `MAP` | `(arg, func(elem))` | Semplice map su array. |
| `OP` | `(arg, arg, func(elemA, elemB))` | Combina due array indice per indice, unendo ogni coppia con un'espressione binaria. |
| `JOIN_FORMS` | `(arg, arg, field, field?)` | Left join di due dataset confrontando un campo chiave su ciascun lato. |
| `JOIN_REPEATING_SLIDES` | `(arg, arg, field, field, field, field?)` | Come `JOIN_FORMS`, ma unisce anche le istanze dei gruppi ripetuti di ogni coppia abbinata tramite una sotto-chiave. |

**Filtro**

| Funzione | Firma | Descrizione |
|---|---|---|
| `FILTER_BY` | `(arg, func(form))` | Restituisce una copia filtrata di un dataset; mantiene un record se corrisponde a livello di primo livello, oppure mantiene solo le istanze dei gruppi ripetuti corrispondenti se la corrispondenza è a quel livello. |

**Conteggio e aggregazione**

| Funzione | Firma | Descrizione |
|---|---|---|
| `COUNT_FORMS` | `(arg, func(form)?)` | Conta i record che soddisfano una condizione, contando ogni record una sola volta anche se la condizione corrisponde a più di una delle sue istanze ripetute. |
| `COUNT_REPS` | `(arg, func(form)?)` | Conta separatamente ogni record di primo livello corrispondente *e* ogni istanza ripetuta corrispondente — usa per "numero di occorrenze" invece che "numero di record". |
| `SUM` | `(arg, field, func(form)?)` | Somma di un campo numerico su record e istanze ripetute, con un filtro facoltative. |
| `MEAN` / `MEDIAN` / `MODE` / `MIN` / `MAX` | `(arg, field, func(form)?)` | Statistiche aggregate standard con un filtro facoltative. |
| `ALL_VALUES_OF` | `(arg, field, func(form)?)` | Raccoglie ogni valore che un campo assume su record e istanze ripetute che soddisfano un filtro facoltative, **deduplicati**. Lo strumento standard per "conteggio di X distinti": avvolgilo in `LEN(...)`. |
| `LEN` | `(arg)` | Lunghezza di un array. |
| `REMOVE_DUPLICATES` | `(arg)` | Deduplica un array (per identità di deep-equality), preservando l'ordine. |
| `INCLUDES` | `(arg, arg)` | Indica se un array (o una stringa) contiene un valore. |

**Date**

| Funzione | Firma | Descrizione |
|---|---|---|
| `TODAY` | `()` | La data odierna, `YYYY-MM-DD`. |
| `ADD_DAYS` | `(arg, arg)` | Una data più N giorni. |
| `DAYS_DIFF` | `(arg, arg)` | Differenza in giorni interi tra due date. |
| `GET_AGE` | `(arg, arg?)` | Età in anni interi data una data di nascita (e una data di riferimento facoltative, predefinita oggi). |
| `IS_BEFORE` / `IS_AFTER` | `(arg, arg)` | Confronti tra date. |
| `IS_WITHIN_INTERVAL` | `(arg, arg, arg)` | Verifica di intervallo di date inclusivo. |
| `COMPARE_DATE` | `(arg, arg, arg, arg?)` | Classifica una data come prima/dentro/dopo un intervallo, con etichette personalizzate facoltative. |

**Numeri e formattazione**

| Funzione | Firma | Descrizione |
|---|---|---|
| `ROUND` | `(arg, arg?)` | Arrotonda un numero a N decimali (predefinito 0). |
| `PERCENT` | `(arg, arg)` | `a/b` come stringa percentuale. |
| `PERCENTAGE_CHANGE` | `(arg, arg)` | Variazione percentuale tra un valore e un valore di riferimento. |
| `CHART_TO_DATA` | `(arg, arg)` | Combina array paralleli di etichette/valori in un unico oggetto. |
| `FORMAT_TABLE_ROWS` / `FORMAT_TABLE_COLS` / `FORMAT_TABLE_FIELDS` | varie | Rende un array di righe/colonne/record come stringa HTML `<table>`, utile all'interno dei widget `html`. |

**Selezione**

| Funzione | Firma | Descrizione |
|---|---|---|
| `FIRST` / `LAST` | `(arg, func(form), field?)` | Trova il record più vecchio/più recente in base a un campo data (predefinito un campo standard "created at") e valuta un'espressione su di esso. |

**AI / debug**

| Funzione | Firma | Descrizione |
|---|---|---|
| `PROMPT_RESULT` | `(arg, arg)` | Recupera il testo prodotto da una variabile `isAIPrompt`. |
| `CONSOLE_LOG` | `(arg)` | Registra un valore nella console e lo restituisce invariato — comodo per fare debug di una formula inline. |

**Deprecate (mantenute per compatibilità all'indietro; preferisci l'alternativa indicata)**

| Funzione | Preferisci invece |
|---|---|
| `FILTER_BY_VARS` | `FILTER_BY` |
| `COUNT_FORMS_UNIQUE` | `LEN(ALL_VALUES_OF(...))` |
| `ISIN` | `INCLUDES` |
| `REPEAT` | `MAP` |
| `EVALUATE` | `IF` |

**Oltre la whitelist**

Il DSL accetta solo le funzioni sopra (più `IF`). La libreria di runtime sottostante espone ulteriori funzioni di supporto (helper statistici come la deviazione standard, builder interni di tabelle/widget-dataset usati dal convertitore stesso, ecc.) che **non** sono raggiungibili tramite la semplice sintassi delle formule — solo attraverso la via di fuga del JavaScript grezzo `js:` descritta nella sezione 2.4.

## Widget supportati e loro proprietà

### `table` — tabella dinamica

Riga 1: etichette delle intestazioni di colonna. Riga 2: un breve codice di stile per colonna, `[colspan][alignment][sortable]`:

- Primo carattere: colspan (una cifra, di solito `1`).
- Secondo carattere: `l` = sinistra, `r` = destra, qualsiasi altro = centrato.
- Terzo carattere: `s` = colonna ordinabile, omesso/qualsiasi altro = non ordinabile.

Dalla riga 3 in poi, il foglio si comporta in una di due modalità:

**A. Tabella a lista di form** (collegata a un dataset) — usata quando è presente una colonna `dataset`:

| Colonna di configurazione | Significato |
|---|---|
| *(la colonna di ogni intestazione)* | Il nome del campo da mostrare in quella colonna, preso da ciascun record del dataset. |
| `dataset` | Nome della variabile (con valore array) da iterare — tipicamente un dataset costruito in `variables`. |
| `pagination` | Veritiero → produce una tabella paginata invece che semplice. |
| `dialog_fields` / `dialog_fields_labels` | Nomi di campo / etichette extra separati da virgole, mostrati in una finestra di dettaglio "leggi di più" per ogni riga. |
| `link_field` / `link_position` | Campo da usare come URL di un link e indice della colonna che deve renderizzarlo come link. |

**B. Tabella statica / calcolata** (nessuna colonna `dataset`) — ogni riga rimanente è una riga di output letterale, e ogni cella è essa stessa una formula (o un letterale, o un'espressione `js:`); racchiudi una stringa letterale tra virgolette così non viene scambiata per un riferimento a una variabile nuda (ad es. `"140"` per il testo `140`, rispetto a `my_indicator` per mostrare il valore di una variabile calcolata).

Le celle di intestazione sono stilizzate centrate, in grassetto, testo bianco su sfondo pieno; le celle del corpo alternano automaticamente i colori di sfondo delle righe.

### `chart`

Solo riga 1 (tranne Scatter/Bubble, vedi sotto). Colonne di opzione riconosciute (rimosse dalla riga prima che il resto venga trattato come serie di dati):

`chartType`, `title`, `stacked`, `beginAtZeroX`, `beginAtZeroY`, `axisLabelX`, `axisLabelY`, `axisMinX`, `axisMinY`, `axisMaxX`, `axisMaxY`, `removeZeroValues`, `mainDataNumberThreshold`.

- `chartType` deve essere uno tra: `Line`, `Bar`, `HorizontalBar`, `Radar`, `Scatter`, `Doughnut`, `Pie`, `PolarArea`, `Bubble`.
- `labels` (facoltative) — una formula che produce l'array di etichette di categoria/asse.
- Ogni altra intestazione di colonna indica una serie di dati; il valore della sua cella è una formula che produce l'array di numeri di quella serie.
- I grafici `Scatter` richiedono esattamente 2 righe di dati (valori X, valori Y); i grafici `Bubble` ne richiedono esattamente 3 (X, Y, raggio); ogni altro tipo di grafico richiede esattamente 1 riga di dati.
- I colori sono assegnati automaticamente da una palette integrata (un colore per serie, o uno per punto dati per torta/ciambella/polar-area).

### `image`

Solo riga 1. Obbligatori: `url` (una formula che produce l'URL dell'immagine, o una stringa letterale; prefisso `js:` per un'espressione JS grezza). Facoltative: `align` (`left`/`center`/`right`), `width`, `height` (stringhe di lunghezza CSS).

### `html`

Solo riga 1, singola colonna `html`, contenente una stringa HTML grezza (non analizzata dal DSL delle formule). Supporta marcatori di interpolazione tra doppie parentesi `[[expression]]`, che vengono valutati e sostituiti al momento del render — usali per incorporare il valore di una variabile calcolata dentro markup altrimenti statico.

### `single` — card KPI / big-number

Solo riga 1:

| Colonna | Significato |
|---|---|
| `html` (facoltative) | Un'intestazione mostrata sopra il numero. |
| `current_value` | Obbligatorio. La variabile/espressione il cui valore è mostrato come numero grande (renderizzato tramite `[[current_value]]`). |
| `percentage_change` (facoltative) | Se presente, aggiunge un indicatore di tendenza (freccia su/giù/piatto con colore) in base al suo segno, mostrato come `[[percentage_change]]%`. |

Poiché lo stesso testo di cella viene riutilizzato sia come valore interpolato sia come espressione di confronto grezza, `current_value` / `percentage_change` dovrebbero in genere essere semplici nomi di variabile definiti nel foglio `variables`, non formule inline complete.

### `graph`

Ogni riga necessita di una colonna `id` non vuota. **Ogni** colonna in ogni riga (a parte `id`) viene analizzata come formula, producendo un dataset di nodi del graph per riga.

### `heatmap`

Solo riga 1, tutte le colonne facoltative con valori predefiniti ragionevoli: `values` (una stringa formula/JS grezzo che produce i dati di intensità — non analizzata tramite il DSL tra parentesi, deve essere già valida), `idProp` (predefinito `'id'`), `features` (una stringa GeoJSON), `startColor`, `endColor`, `highlightColor`, `showVisualMap`.

### `paginatedlist`

Riga 1: una percentuale numerica di larghezza per ogni colonna. Riga 2 (riga di configurazione): il nome del campo per ogni colonna, più `dataset`, `title`, `pageSize` (predefinito 10), `link_field`/`link_position`, `cellStyles`, `rowStyle` (un letterale oggetto di stile grezzo), `backgroundColorA`/`backgroundColorB` (colori a strisce zebrate). Ogni riga risultante è renderizzata come un proprio widget tabella compatto invece che come un'unica grande tabella.

### `paginatedDialogList`

Stessa configurazione di `paginatedlist`, più due righe aggiuntive (quando presenti): **etichette** dei campi della finestra, poi **nomi** dei campi della finestra — cliccando su una riga si apre un popup che elenca quei campi come coppie etichetta/valore.

### `filter` / `global filter`

Strutturato come un foglio `survey` ODK/XLSForm (con un foglio `choices` di supporto nello stesso workbook), convertito in un form schema e associato come controllo di filtro interattivo:

- Un foglio con nome contenente `filter` (ma non `global`) si associa al widget del foglio immediatamente successivo.
- Un foglio con nome contenente sia `filter` sia `global` si associa all'intero report invece che a un singolo widget.

## Checklist rapida per costruire un nuovo XLSReport

1. Individua i form DINO di cui hai bisogno e i loro nomi/schemi esatti sulla tua istanza.
2. Inizia un foglio `variables`: carica ogni form con `forms[...]`/`schemas[...]`, costruisci i dataset con `BUILD_DATASET` e applica subito eventuali filtri di progetto/ambito (riassegnando lo stesso nome di variabile).
3. Precalcola come variabile con nome dedicata tutto ciò che è riutilizzato da più di un widget.
4. Aggiungi un foglio per widget, con il nome contenente la parola chiave giusta, nell'ordine in cui vuoi che appaiano.
5. Preferisci la whitelist del DSL nella sezione 4.3; ricorri a `js:` solo quando un calcolo non vi rientra.
6. Ricontrolla i nomi dei campi e i valori delle scelte rispetto allo schema reale/ai dati esportati sulla tua istanza, invece di dare per scontato che coincidano esattamente con i nomi dei campi dell'xlsform di origine.