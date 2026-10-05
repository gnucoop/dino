---
title: Metriche
description: Una panoramica dell'area Metriche in Dino — i tipi di dati di riferimento usati per classificare e collegare i dati dei form e i report.
---

# Metriche

Le metriche sono le categorie di dati di riferimento utilizzate in Dino per classificare, organizzare e filtrare i dati raccolti. Le metriche possono essere associate ai form raccolti e poi utilizzate per definire visualizzazioni sui dati della tua installazione. Ad esempio, le metriche possono essere usate per definire i permessi degli utenti: a un determinato utente può essere concesso l'accesso solo ad alcuni valori specifici delle metriche. Questo può essere utile, ad esempio, in un'organizzazione presente in più paesi, se vuoi limitare alcuni utenti ad accedere solo ai dati del paese in cui operano. Allo stesso modo, puoi limitare l'accesso degli utenti Dino seguendo altri criteri usando altre metriche, come la metrica progetto, per limitare l'accesso solo ad alcuni progetti, o la metrica organizzazione, per limitare l'accesso solo ai dati di alcuni partner.

Oltre che per limitare l'accesso ai dati, le metriche possono essere utilizzate anche per facilitare i filtri e le aggregazioni. Ad esempio, potrei voler contare quanti form sono stati raccolti per un determinato paese. In questo caso posso filtrare i dati dei miei form in base al valore della metrica posizione. I filtri possono trarre vantaggio anche dalla struttura gerarchica delle metriche. Ad esempio, se ho una struttura di posizioni su, diciamo, tre livelli, perché mappo le province (cioè un valore di metrica per ogni provincia), raggruppate in regioni (cioè un valore di metrica per ogni regione, usato anche come genitore delle province), raggruppate in paesi (cioè un valore di metrica per ogni paese, usato come genitore delle regioni). Quindi, in questo caso potrei filtrare tutti i form di una determinata regione semplicemente filtrando la regione, selezionando così tutte le province che condividono la stessa regione.

Questo meccanismo può essere utilizzato anche quando si generano report. I dati di un report di un determinato report schema possono essere generati utilizzando un particolare valore di una metrica. Questo implica che il report schema viene applicato a tutti i form che hanno lo stesso valore di metrica, seguendo una gerarchia di valori di metrica.

Infine, le metriche possono essere utilizzate per collegare dati di form diversi. Ad esempio, posso avere un form per i dati personali dei beneficiari - uno per persona - e poi un altro form per le loro visite mediche - più di uno per persona. La metrica caso può essere utilizzata per collegare il form dei dati personali ai form delle visite e anche per copiare alcuni dei dati del form personale, come la data di nascita, nei form delle visite mediche.

I diversi modi di utilizzare le metriche rendono questa entità uno strumento potente per gestire i dati.

La sezione Metriche è dove gestisci gli elenchi dei valori disponibili per ciascuna categoria. Funge da hub centrale per tutti i tuoi dati di riferimento.

![Visualizzazione principale della pagina Metriche](../imgs/metrics/index.png)

---

## Tipi di metrica

La pagina principale mostra i tipi di metrica attivi nella tua installazione Dino. Ogni tipo è mostrato come una scheda con un'icona e un'etichetta. Clicca su una scheda qualsiasi per aprire la sua pagina di gestione.

A seconda della configurazione del tuo sistema, alcuni o tutti i seguenti tipi di metrica potrebbero essere disponibili:

| Tipo di metrica | Descrizione |
|---|---|
| **Aree tematiche** | Aree di lavoro o raggruppamenti tematici per le tue attività. |
| **Casi** | Casi individuali, persone o beneficiari tracciati attraverso i dati dei form. |
| **Posizioni** | Posizioni geografiche in cui i dati vengono raccolti o si svolgono le attività. |
| **Progetti** | Progetti a cui sono collegati i dati dei form e i report. |
| **Organizzazioni** | Organizzazioni coinvolte o responsabili delle attività. |

!!! tip "Accedere alle Metriche"
    Puoi navigare verso l'area Metriche cliccando su **Metriche** nel menu principale dell'applicazione.

---

## Cosa puoi fare

Dalla pagina principale delle Metriche, puoi:

1.  **Visualizzare tutti i tipi di metrica attivi** disponibili per i tuoi dati.
2.  **Navigare verso un tipo di metrica specifico** cliccando sulla sua scheda. Questo ti porta a una pagina dedicata dove puoi gestire l'elenco dei valori per quel tipo (ad esempio, aggiungere una nuova posizione o modificare il nome di un progetto).
3.  **Usare il percorso di navigazione** in cima alla pagina per seguire il tuo percorso di navigazione all'interno della sezione Metriche.

Per istruzioni dettagliate su come aggiungere, modificare o eliminare valori all'interno di un tipo di metrica specifico, consulta la documentazione per ciascun tipo di metrica:

- [Aree tematiche](areas.md)
- [Casi](cases.md)
- [Posizioni](locations.md)
- [Organizzazioni](organizations.md)
- [Progetti](projects.md).

---

## Navigare nella sezione Metriche

1.  Nella pagina principale delle Metriche, esamina le schede per ciascun tipo di metrica disponibile.
2.  Clicca sulla scheda del tipo di metrica che vuoi gestire (ad esempio, **Posizioni**).
3.  Verrai portato a una pagina dedicata per quel tipo di metrica, dove puoi visualizzare, aggiungere, modificare o eliminare valori specifici.
4.  Usa il percorso di navigazione in cima alla pagina per tornare facilmente alla pagina principale delle Metriche o ad altre sezioni.

!!! warning "Configurazione del sistema"
    I tipi di metrica disponibili sono configurati dall'amministratore del tuo sistema. Se non vedi un tipo di metrica specifico di cui hai bisogno, contatta il tuo amministratore.

!!! warning "Eliminare un valore di metrica"
    Questo vale per tutte le metriche. Prima di eliminare un valore di metrica, ad esempio una determinata posizione o un caso, Dino verifica se è ancora in uso. Se qualche form lo utilizza, o se ha valori figli, l'eliminazione viene rifiutata (*Some forms use these metrics. You cannot delete them.* / *Some metrics have children. You cannot delete them.*). Se solo i report lo utilizzano, ricevi un avviso e puoi comunque confermare. I permessi di gruppo che fanno riferimento al valore **non** vengono controllati: rimuovilo da qualsiasi gruppo prima di eliminarlo.