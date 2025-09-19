      // Toggle Dark/Light Mode
    function toggleMode() {
      document.body.classList.toggle("light-mode");
    }

    // Fetch Word Data
    async function getWord() {
      const word = document.getElementById('wordInput').value.trim();
      const resultDiv = document.getElementById('result');
      
      if (!word) {
        resultDiv.innerHTML = "<p>Please enter a word.</p>";
        return;
      }

      resultDiv.innerHTML = "<p>Loading...</p>";

      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
          throw new Error("Word not found");
        }
        const data = await response.json();

        // Word details
        const definitionList = data[0].meanings
          .map(m => `<li><b>${m.partOfSpeech}</b>: ${m.definitions[0].definition}</li>`)
          .join("");

        const phonetic = data[0].phonetic || "";
        const audio = data[0].phonetics.find(p => p.audio) ? data[0].phonetics.find(p => p.audio).audio : "";
        const synonyms = data[0].meanings[0].synonyms.length > 0 ? 
          data[0].meanings[0].synonyms.slice(0,5).join(", ") : "None";

        resultDiv.innerHTML = `
          <div class="word">${word}</div>
          <div class="phonetic">/${phonetic}/</div>
          <ul class="meaning">${definitionList}</ul>
          <div class="synonyms"><strong>Synonyms:</strong> ${synonyms}</div>
          ${audio ? `<audio controls><source src="${audio}" type="audio/mpeg"></audio>` : ""}
        `;
      } catch (error) {
        resultDiv.innerHTML = "<p>❌ Word not found. Try another.</p>";
      }
    }
 