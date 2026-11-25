# Schema dei dati — Segnale

## Scheda dati

### Entità: Evento

| Campo | Tipo | Esempio | Descrizione |
|---|---|---|---|
| `id` | numero intero | `1` | Identificativo univoco e stabile dell'evento. |
| `titolo` | testo | `"Lettere in movimento"` | Titolo dell'evento. |
| `data` | testo | `"Venerdì 12 giugno"` | Giorno e data dell'evento. |
| `ora` | testo | `"10:00"` | Ora di inizio. |
| `tipo` | testo | `"Incontro"` | Tipologia dell'appuntamento. |
| `descrizione` | testo | `"Come cambia un messaggio..."` | Breve descrizione dell'evento. |
| `immagine` | testo | `"assets/lettere-in-movimento.svg"` | Percorso dell'immagine associata. |
| `testo_alt` | testo | `"Lettere geometriche disposte su una griglia"` | Testo alternativo dell'immagine. |
| `sede_id` | numero intero | `1` | Identificativo della sede in cui si svolge l'evento. |

### Entità: Sede

| Campo | Tipo | Esempio | Descrizione |
|---|---|---|---|
| `id` | numero intero | `1` | Identificativo univoco e stabile della sede. |
| `nome` | testo | `"Officina Nord"` | Nome della sede nel festival. |
| `indirizzo` | testo | `"Corso Duca degli Abruzzi 24, Torino"` | Indirizzo della sede. |

### Chiavi e relazione

La chiave primaria di entrambe le entità è `id`: è numerica, univoca all'interno della rispettiva entità e stabile nel tempo. Una sede può ospitare più eventi; ogni evento si svolge in una sede. `Evento.sede_id` fa riferimento a `Sede.id`.

### Quantità

I dati comprendono sei eventi e tre sedi.

### Aggiornamento dei dati

Chi gestisce il sito modifica i file `eventi.json` e `sedi.json` nella repository, rispettando questo schema, e pubblica le modifiche sulla stessa GitHub Pages.

### Che cosa mostra la pagina

La pagina Programma legge i due file JSON e mostra per ogni evento titolo, data, ora, tipologia, descrizione, immagine e nome della sede. Se l'identificativo della sede non corrisponde a nessuna sede, mostra «Sede da definire». Mostra inoltre un messaggio durante il caricamento, quando non ci sono eventi e se i file non sono leggibili.

## Schema Evento–Sede

```mermaid
erDiagram
    SEDE ||--o{ EVENTO : ospita
    SEDE {
        int id PK
        string nome
        string indirizzo
    }
    EVENTO {
        int id PK
        string titolo
        string data
        string ora
        string tipo
        string descrizione
        string immagine
        string testo\_alt
        int sede\_id FK
    }
