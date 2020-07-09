const GRE_VOCABULARY_ENDPOINT = `https://gist.githubusercontent.com/nktx/aaea765bce12c6d21815b581b773c4a0/raw/b49c39093d612f775153d97144fa7c4b3f6f00ea/lln-vocabulary.json`;

async function main() {
  let words;
  if (localStorage.GRE_VOCABULARY) {
    words = JSON.parse(localStorage.GRE_VOCABULARY);
  } else {
    const res = await fetch(GRE_VOCABULARY_ENDPOINT, {
      headers: { accept: "application/json" }
    });
    words = await res.json();

    // Cache for later
    localStorage.GRE_VOCABULARY = JSON.stringify(words);
  }

  let { word, definition, passage, partOfSpeech } = words[
    Math.floor(Math.random() * words.length)
  ];

  // Some words contain newlines for some reason
  word = word.trim();

  // Remove whitespace and empasize current word
  passage = passage.trim().replace(new RegExp(`(${word}[a-z]*)`, "gi"), "$1");

  //old node with loading screen
  var oldVocab = document.getElementsByClassName("vocab")[0];

  //new parent node vocab
  var vocab = document.createElement("div");
  vocab.className = "vocab";

  //word node
  var vocabWord = document.createElement("h1");
  vocabWord.className = "vocab__word";
  var textWord = document.createTextNode(word);
  vocabWord.appendChild(textWord);

  //hr node
  var hr = document.createElement("hr");
  hr.className = "vocab__hr";

  //description node
  var vocabDescription = document.createElement("p");
  vocabDescription.className = "vocab__description";
  var textDescription = document.createTextNode(`${definition} [${partOfSpeech.toLowerCase()}] ${passage}`);
  vocabDescription.appendChild(textDescription);

  //appending dom elements in parent node
  vocab.appendChild(vocabWord);
  vocab.appendChild(hr);
  vocab.appendChild(vocabDescription);
  
  //replace oldVocab screen with new
  document.body.replaceChild(vocab, oldVocab);
}

main();
