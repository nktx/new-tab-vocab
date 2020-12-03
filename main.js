const VOCABULARY_ENDPOINT = `https://nktx-vocab.firebaseio.com/words.json`;

async function main() {
  let words;
  let today = new Date().toLocaleDateString();

  if (localStorage.NKTX_VOCABULARY && localStorage.NKTX_VOCABULARY_UPDATEDDATE && localStorage.NKTX_VOCABULARY_UPDATEDDATE === today) {
    words = JSON.parse(localStorage.NKTX_VOCABULARY);
  } else {
    const res = await fetch(VOCABULARY_ENDPOINT, {
      headers: { accept: "application/json" }
    });
    words = await res.json();

    localStorage.NKTX_VOCABULARY = JSON.stringify(words);
    localStorage.NKTX_VOCABULARY_UPDATEDDATE = today;
  }

  let keys = Object.keys(words);
  let word = keys[keys.length * Math.random() << 0];
  let { definition, sub } = words[word];

  word = word.trim();
  sub = sub.trim().replace(new RegExp(`(${word}[a-z]*)`, "gi"), "$1");

  //old node with loading screen
  let oldVocab = document.getElementsByClassName("vocab")[0];

  //new parent node vocab
  let vocab = document.createElement("div");
  vocab.className = "vocab";

  //word node
  let vocabWord = document.createElement("h1");
  vocabWord.className = "vocab__word";
  let textWord = document.createTextNode(word);
  vocabWord.appendChild(textWord);

  //hr node
  let hr = document.createElement("hr");
  hr.className = "vocab__hr";

  //description node
  let vocabDescription = document.createElement("p");
  vocabDescription.className = "vocab__description";
  let textDescription = document.createTextNode(`${definition}`);
  vocabDescription.appendChild(textDescription);

  //sub node
  let vocabSub = document.createElement("p");
  vocabSub.className = "vocab__sub";
  let textSub = document.createTextNode(`${sub}`);
  vocabSub.appendChild(textSub);

  //appending dom elements in parent node
  vocab.appendChild(vocabWord);
  vocab.appendChild(hr);
  vocab.appendChild(vocabDescription);
  vocab.appendChild(vocabSub);
  
  //replace oldVocab screen with new
  document.body.replaceChild(vocab, oldVocab);
}

main();
