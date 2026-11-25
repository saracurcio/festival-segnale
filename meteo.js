
const messaggioMeteo = document.querySelector("#meteo-messaggio");
const datiMeteo = document.querySelector("#dati-meteo");

async function caricaMeteo() {
  const indirizzo =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=45.0703" +
    "&longitude=7.6869" +
    "&current=temperature_2m,wind_speed_10m" +
    "&timezone=Europe%2FRome";

  try {
    const risposta = await fetch(indirizzo);

    if (!risposta.ok) {
      throw new Error("Richiesta meteo non riuscita.");
    }

    const dati = await risposta.json();
    const attuali = dati.current;

    if (!attuali) {
      throw new Error("Dati meteo non disponibili.");
    }

    document.querySelector("#temperatura-meteo").textContent =
      `${attuali.temperature_2m} °C`;

    document.querySelector("#vento-meteo").textContent =
      `${attuali.wind_speed_10m} km/h`;

    const ora = document.querySelector("#ora-meteo");
    ora.textContent = attuali.time.replace("T", " ");
    ora.dateTime = attuali.time;

    datiMeteo.hidden = false;
    messaggioMeteo.hidden = true;

  } catch (errore) {
    console.error("Errore nel caricamento del meteo:", errore);

    messaggioMeteo.textContent =
      "I dati meteo non sono disponibili al momento.";
  }
}

caricaMeteo();
