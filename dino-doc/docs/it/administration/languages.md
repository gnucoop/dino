---
title: Gestione delle traduzioni
description: Come gestire le traduzioni di Dino — trovare una chiave, tradurla in ogni lingua, aggiungere o rinominare chiavi e importare o esportare il file di una lingua.
---

# Gestione delle traduzioni

La pagina **Traduzioni** consente agli amministratori di gestire tutti i testi tradotti usati in Dino. Ogni testo ha una **Chiave di traduzione** — di solito il testo inglese stesso — e un valore per ciascuna lingua disponibile. Da qui puoi trovare una chiave, tradurla, aggiungere nuove chiavi e importare o esportare l'intero dizionario di una lingua.

![Vista principale della pagina Traduzioni](../imgs/administration/languages.png)

L'intestazione della pagina mostra un riepilogo della copertura delle traduzioni: il numero totale di chiavi di traduzione e la percentuale completata. Sotto l'intestazione, la pagina è divisa in due aree — l'elenco delle chiavi di traduzione a sinistra e il dettaglio della chiave selezionata a destra.

!!! warning "Solo per amministratori"
    Questa area è visibile solo agli utenti con ruolo Amministratore. Se non la vedi nella navigazione, contatta l'amministratore di sistema.

---

## Esplorare le chiavi di traduzione

Ogni riga dell'elenco mostra una chiave e, in un anello sulla sinistra, la percentuale di lingue che la traducono già. Se il testo contiene segnaposto dinamici, come `{{language}}`, sono elencati sotto la chiave.

### Cercare e filtrare l'elenco

- Digita nel campo **Cerca chiave o testo…** per trovare una chiave. La ricerca cerca sia nelle chiavi sia nelle loro traduzioni.
- Usa i due pulsanti accanto al campo di ricerca per scegliere cosa viene elencato:
    - **Tutte** — ogni chiave di traduzione.
    - **Da tradurre** — solo le chiavi che mancano ancora in almeno una lingua.

La ricerca e il filtro funzionano insieme: con **Da tradurre** selezionato, la ricerca cerca solo tra le chiavi ancora da tradurre.

---

## Tradurre una chiave

1. Fai clic su una chiave nell'elenco. Il suo dettaglio si apre sulla destra.
2. Il dettaglio mostra una scheda per ogni lingua, contrassegnata come **Tradotto** o **Mancante**, con un campo di testo che contiene il suo valore.
3. Digita la traduzione nel campo di ogni lingua che vuoi completare.

Non c'è un pulsante di salvataggio: ogni modifica viene salvata automaticamente poco dopo che smetti di digitare. L'intestazione del dettaglio mostra **Salvataggio…** mentre viene memorizzata e **Salvato** quando è completato; se qualcosa va storto mostra **Salvataggio non riuscito**. Una barra di avanzamento accanto mostra quante lingue traducono la chiave.

!!! tip "Segnaposto"
    Mantieni invariati i segnaposto della chiave, come `{{language}}`, in ogni traduzione: Dino li sostituisce con il valore effettivo quando mostra il testo. Sono evidenziati nella chiave mostrata in cima al dettaglio.

### Rinominare o rimuovere una chiave

In cima al dettaglio, accanto alla chiave:

- **Rinomina chiave** (icona matita) — trasforma la chiave in un campo modificabile. Digita la nuova chiave e premi **Invio**, oppure fai clic fuori dal campo, per applicarla; premi **Esc** per annullare.
- **Rimuovi** (icona cestino) — elimina la chiave e tutte le sue traduzioni, dopo che hai confermato con **Si**.

!!! warning "Le chiavi sono usate dall'applicazione"
    Dino cerca i testi tramite la loro chiave. Rinominare o rimuovere una chiave usata dall'applicazione fa apparire quel testo non tradotto, quindi modifica le chiavi solo quando sai dove vengono usate.

---

## Aggiungere una nuova chiave di traduzione

1. Fai clic su **Traduzione** (icona più) nell'intestazione della pagina. Si apre la finestra **Nuova traduzione**.
2. Digita la **Chiave**. È obbligatoria. Usa `{{` e `}}` attorno a un nome, come `{{name}}`, per i segnaposto dinamici.
3. Facoltativamente, compila le traduzioni: la finestra elenca ogni lingua disponibile e un contatore mostra quante ne hai compilate. Le lingue che lasci vuote restano contrassegnate come mancanti e potrai completarle in seguito dal dettaglio.
4. Fai clic su **Salva traduzione**, oppure su **Annulla** per chiudere la finestra senza aggiungere la chiave.

---

## Lavorare con un'intera lingua

Fai clic su **Tutte le lingue** nell'intestazione della pagina per aprire la finestra che mostra il dizionario completo di ogni lingua.

1. A sinistra, scegli una lingua da **Lingue**. Usa **Cerca lingua…** per trovarla in un elenco lungo. Un pallino colorato accanto a ogni lingua mostra quanto è completa; passa il mouse su una lingua per vedere quanti valori ha.
2. A destra, la finestra mostra un'anteprima in sola lettura della lingua selezionata: ogni chiave con il suo valore, oppure *Mancante*. Usa **Cerca nel file…** per cercare una chiave o un valore. Le singole traduzioni si modificano dalla pagina principale, non qui.
3. Il piè di pagina mostra quanti valori sono presenti rispetto al totale.

### Esportare una lingua

Fai clic su **Esporta** seguito dal codice della lingua (ad esempio **Export ITA**). Dino scarica un file JSON con il nome della lingua, come `ita.json`, con le chiavi che la lingua traduce. Le chiavi ancora mancanti vengono omesse.

### Importare il file di una lingua

1. Seleziona la lingua che vuoi aggiornare.
2. Fai clic su **Importa file** e scegli un file `.json`. La finestra lo verifica e mostra **JSON valido** o **JSON non valido**; un file valido viene mostrato nell'anteprima con il suo nome e il numero di righe.
3. Fai clic su **Salva** per memorizzarlo. **Salva** è attivo solo dopo che è stato importato un file.

I valori nel file sostituiscono i valori esistenti con la stessa chiave; le chiavi che non sono nel file mantengono i valori attuali. Niente viene memorizzato finché non fai clic su **Salva**: **Chiudi** scarta il file importato.

!!! tip "Tradurre fuori da Dino"
    Per far tradurre una lingua da qualcuno che non ha accesso a Dino, esportala, fai completare il file JSON, poi importalo di nuovo nella stessa lingua.

---

## Pagine correlate

- [Interfaccia](../interface/index.md) — come cambiare la lingua con cui usi Dino.
- [Elenco utenti](users-list.md) — gestisci gli utenti che possono accedere a questa pagina.