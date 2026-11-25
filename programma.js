

const grigliaEventi = document.querySelector("#event-grid");

function mostraMessaggio(testo) {
  const messaggio = document.createElement("p");
  messaggio.setAttribute("role", "status");
  messaggio.setAttribute("aria-live", "polite");
  messaggio.textContent = testo;

  grigliaEventi.replaceChildren(messaggio);
}

// Accetta sia un array diretto sia un array contenuto in un oggetto
function controllaArray(dati, nomeFile, possibiliChiavi) {
  if (Array.isArray(dati)) {
    return dati;
  }

  if (dati && typeof dati === "object") {
    for (const chiave of possibiliChiavi) {
      if (Array.isArray(dati[chiave])) {
        return dati[chiave];
      }
    }
  }

  console.error("Contenuto ricevuto da " + nomeFile + ":", dati);

  throw new Error(
    "Il file " + nomeFile + " non contiene un elenco valido."
  );
}

async function caricaEventi() {
  try {
    if (!grigliaEventi) {
      throw new Error("Non trovo l'elemento #event-grid nell'HTML.");
    }

    const [rispostaEventi, rispostaSedi] = await Promise.all([
      fetch("dati/eventi.json", { cache: "no-store" }),
      fetch("dati/sedi.json", { cache: "no-store" })
    ]);

    if (!rispostaEventi.ok) {
      throw new Error(
        "Errore nel file eventi.json: HTTP " + rispostaEventi.status
      );
    }

    if (!rispostaSedi.ok) {
      throw new Error(
        "Errore nel file sedi.json: HTTP " + rispostaSedi.status
      );
    }

    const [datiEventi, datiSedi] = await Promise.all([
      rispostaEventi.json(),
      rispostaSedi.json()
    ]);

    const eventi = controllaArray(
      datiEventi,
      "eventi.json",
      ["eventi", "events"]
    );

    const sedi = controllaArray(
      datiSedi,
      "sedi.json",
      ["sedi", "venues"]
    );

    console.log("Eventi caricati:", eventi.length);
    console.log("Sedi caricate:", sedi.length);

    if (eventi.length === 0) {
      mostraMessaggio("Al momento non ci sono appuntamenti.");
      return;
    }

    const sediPerId = new Map(
      sedi.map(sede => [Number(sede.id), sede])
    );

    const schede = document.createDocumentFragment();

    eventi.forEach(evento => {
      const scheda = document.createElement("article");
      scheda.className = "event-card";

      const immagine = document.createElement("img");
      immagine.src = evento.immagine || "";
      immagine.alt = evento.testo_alt || evento.immagine_alt || "";
      immagine.width = 900;
      immagine.height = 600;
      immagine.loading = "lazy";

      const corpo = document.createElement("div");
      corpo.className = "event-body";

      const meta = document.createElement("p");
      meta.className = "event-meta";

      const ora = evento.ora || evento.orario || "";
      const tipo = evento.tipo || evento.categoria || "";

      meta.textContent = [
        evento.data || "",
        ora,
        tipo
      ].filter(Boolean).join(" · ");

      const titolo = document.createElement("h3");
      titolo.textContent = evento.titolo || "Evento senza titolo";

      const descrizione = document.createElement("p");
      descrizione.textContent = evento.descrizione || "";

      const luogo = document.createElement("p");
      luogo.className = "event-place";

      const etichetta = document.createElement("strong");
      etichetta.textContent = "Sede: ";

      const sede = sediPerId.get(Number(evento.sede_id));

      luogo.append(
        etichetta,
        sede ? sede.nome : "Sede da definire"
      );

      corpo.append(meta, titolo, descrizione, luogo);
      scheda.append(immagine, corpo);

      schede.append(scheda);
    });

    grigliaEventi.replaceChildren(schede);

  } catch (errore) {
    console.error("Errore nel caricamento degli eventi:", errore);

    if (grigliaEventi) {
      mostraMessaggio(
        "Non è stato possibile caricare gli appuntamenti. Controlla la console."
      );
    }
  }
}

caricaEventi();
