---
title: Metriche
description: Una panoramica dell'area Metriche in Dino — i tipi di dati di riferimento utilizzati per classificare e collegare i dati dei form e i report.
---

# Metriche

Le metriche sono le categorie di dati di riferimento utilizzate in tutto Dino per classificare, organizzare e filtrare i dati raccolti. Le metriche possono essere associate ai form raccolti e poi utilizzate per definire visualizzazioni sui dati della tua installazione. Per esempio, le metriche possono essere utilizzate per definire i permessi degli utenti: a un determinato utente può essere concesso l'accesso solo ad alcuni valori specifici delle metriche. Questo può essere utile, per esempio, in un'organizzazione presente in più paesi, se vuoi limitare l'accesso di alcuni utenti ai soli dati del paese in cui operano. Allo stesso modo, puoi limitare l'accesso degli utenti Dino seguendo altri criteri utilizzando altre metriche, come la metrica progetto, per limitare l'accesso solo ad alcuni progetti, o la metrica organizzazione, per limitare l'accesso solo ai dati di alcuni partner.

Oltre a essere utilizzate per limitare l'accesso ai dati, le metriche possono anche essere usate per facilitare i filtri e le aggregazioni. Per esempio, potrei voler contare quanti form sono stati raccolti per un determinato paese. In questo caso posso filtrare i dati dei miei form in base al valore della metrica posizione. I filtri possono anche trarre vantaggio dalla struttura gerarchica delle metriche. Per esempio, se ho una struttura di posizioni su, diciamo, tre livelli, perché mappo le province (cioè un valore di metrica per ogni provincia), raggruppate in regioni (cioè un valore di metrica per ogni regione, utilizzato anche come genitore per le province), raggruppate in paesi (cioè un valore di metrica per ogni paese, utilizzato come genitore per le regioni). Quindi, in questo caso potrei filtrare tutti i form di una determinata regione semplicemente filtrando la regione, selezionando così tutte le province che condividono la stessa regione.

Questo meccanismo può anche essere utilizzato quando si generano report. I dati di un report di un determinato report schema possono essere generati utilizzando un particolare valore di una metrica. Ciò implica che il report schema viene applicato a tutti i form che hanno lo stesso valore di metrica, seguendo una gerarchia di valori di metrica.

Infine, le metriche possono essere utilizzate per collegare diversi dati dei form. Per esempio, posso avere un form per i dati personali dei beneficiari - uno per persona - e poi un altro form per le loro visite mediche - più di uno per persona. La metrica caso può essere utilizzata per collegare il form dei dati personali ai form delle visite e anche per copiare alcuni dati del form personale, come la data di nascita, nei form delle visite mediche.

I diversi modi di utilizzare le metriche rendono questa entità uno strumento potente per gestire i dati.

La sezione Metriche è dove gestisci gli elenchi dei valori disponibili per ciascuna categoria. Funge da hub centrale per tutti i tuoi dati di riferimento.

![Vista principale della pagina Metriche](../imgs/metrics/index.png)

---

## Tipi di metrica

La pagina principale mostra i tipi di metrica attivi nella tua installazione Dino. Ogni tipo è mostrato come una scheda con un'icona e un'etichetta. Clicca su una qualsiasi scheda per aprire la sua pagina di gestione.

A seconda della configurazione del tuo sistema, alcuni o tutti i seguenti tipi di metrica possono essere disponibili:

| Tipo di metrica | Descrizione |
|---|---|
| **Aree tematiche** | Aree di lavoro o raggruppamenti tematici per le tue attività. |
| **Casi** | Casi individuali, persone o beneficiari tracciati attraverso i dati dei form. |
| **Posizioni** | Posizioni geografiche in cui i dati vengono raccolti o si svolgono le attività. |
| **Progetti** | Progetti a cui sono collegati i dati dei form e i report. |
| **Organizzazioni** | Organizzazioni coinvolte o responsabili delle attività. |

!!! tip "Accesso alle metriche"
    Puoi accedere all'area Metriche cliccando su **Metriche** nel menu principale dell'applicazione.

---

## Cosa puoi fare

Dalla pagina principale delle Metriche, puoi:

1.  **Visualizzare tutti i tipi di metrica attivi** disponibili per i tuoi dati.
2.  **Accedere a un tipo di metrica specifico** cliccando sulla sua scheda. Questo ti porta a una pagina dedicata dove puoi gestire l'elenco dei valori per quel tipo (ad es., aggiungere una nuova posizione o modificare il nome di un progetto).
3.  **Utilizzare il percorso di navigazione** nella parte superiore della pagina per tenere traccia del tuo percorso all'interno della sezione Metriche.

Per istruzioni dettagliate su come aggiungere, modificare o eliminare valori all'interno di un tipo di metrica specifico, consulta la documentazione per ogni tipo di metrica:

- [Aree](areas.md)
- [Casi](cases.md)
- [Posizioni](locations.md)
- [Organizzazioni](organizations.md)
- [Progetti](projects.md).
---

## Navigare nella sezione Metriche

1.  Nella pagina principale delle Metriche, esamina le schede per ciascun tipo di metrica disponibile.
2.  Clicca sulla scheda del tipo di metrica che vuoi gestire (ad es., **Posizioni**).
3.  Verrai portato a una pagina dedicata per quel tipo di metrica, dove puoi visualizzare, aggiungere, modificare o eliminare valori specifici.
4.  Utilizza il percorso di navigazione nella parte superiore della pagina per tornare facilmente alla pagina principale delle Metriche o ad altre sezioni.

!!! warning "Configurazione del sistema"
    I tipi di metrica disponibili sono configurati dall'amministratore del tuo sistema. Se non vedi un tipo di metrica specifico di cui hai bisogno, contatta il tuo amministratore.

!!! warning "Eliminazione di un valore di metrica"
    Questo vale per tutte le metriche. L'eliminazione di un valore di metrica, per esempio una determinata posizione o un caso, può influire sui form che lo referenziano. Ecco perché, prima di eliminare un valore di metrica, il sistema verifica se c'è qualche elemento in Dino associato a quel valore. Se esiste un dato di form, o un dato di report o qualsiasi riferimento all'interno dei permessi, l'eliminazione di quel valore non sarà consentita. Assicurati che nessun record attivo dipenda da un valore di metrica prima di rimuoverlo.