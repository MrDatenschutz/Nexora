    // 🔍 Lunr.js Index erstellen
    const idx = lunr(function () {
      this.field('title');
      this.field('content');
      this.ref('id');

      // Hier fügst du deine Seiten ein
      this.add({
        id: 1,
        title: "Startseite",
        content: "Willkommen bei Nexora. Dies ist die Startseite deiner Suchmaschine."
      });

      this.add({
        id: 2,
        title: "Über Nexora",
        content: "Nexora ist eine moderne Suchmaschine, die deine Inhalte durchsucht."
      });

      this.add({
        id: 3,
        title: "Kontakt",
        content: "Hier kannst du den Entwickler von Nexora kontaktieren."
      });
    
      this.add({
        id: 4,
        title: "Tour",
        content: "Erkunde alle Features von Nexora."
      });
    
      this.add({
        id: 5,
        title: "Private.Server",
        content: "Erstelle, verwalte und nutze deine Server - alles unter einer Oberfläche!"
      });
    });

    // 🔗 Daten für die Ergebnisse (URLs)
    const indexData = {
      1: { title: "Startseite", url: "index.html", content: "Willkommen bei Nexora. Dies ist die Startseite deiner Suchmaschine." },
      2: { title: "Über Nexora", url: "ueber-nexora.html", content: "Nexora ist eine moderne Suchmaschine, die deine Inhalte durchsucht." },
      3: { title: "Kontakt", url: "kontakt.html", content: "Hier kannst du den Entwickler von Nexora kontaktieren." },
      4: { title: "Tour", url: "welcome_tour.html", content: "Erkunde alle Features von Nexora." },
      5: { title: "Private.Server", url: "linik_servermanager.html", content: "Erstelle, verwalte und nutze deine Server - alles unter einer Oberfläche!" }
    };

    // 🔍 Suchfeld-Logik
    const input = document.getElementById("searchInput");
    const resultsDiv = document.getElementById("results");

    input.addEventListener("input", function () {
      const query = this.value.trim();
      resultsDiv.innerHTML = "";

      if (query === "") return;

      const results = idx.search(query);

      if (results.length === 0) {
        resultsDiv.innerHTML = "<p>Keine Treffer gefunden.</p>";
        return;
      }

      results.forEach(result => {
        const item = indexData[result.ref];
        const div = document.createElement("div");
        div.className = "result-item";
        div.innerHTML = `
          <a href="${item.url}">${item.title}</a>
          <div class="result-desc">${item.content}</div>
        `;
        resultsDiv.appendChild(div);
      });
    });