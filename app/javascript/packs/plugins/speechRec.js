const toggleElementAnimation = (verb, el) => {
  el.classList[verb]('listening');
  el.classList[verb]('animated');
  el.classList[verb]('infinite');
  el.classList[verb]('pulse');
}

const recognizeSpeech = (lang, outputLocation) => {
  // check browser compatibility
  const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Your browser does not support speech recognition. Please try any of these browsers to use this feature: \n\nChrome (desktop/Android), Android Browser, Samsung Internet');
  } else {
    // setup and start recognition
    const micButton = document.getElementById('mic-button');
    const recognition = new webkitSpeechRecognition();
    recognition.lang = lang;

    recognition.onstart = () => {
      console.log('speech rec started');
      toggleElementAnimation('add', micButton);
    }

    recognition.onend = () => {
      console.log('speech rec ended');
      toggleElementAnimation('remove', micButton);
    }

    recognition.onresult = (event) => {
      if (event.results.length > 0) {
        const transcript = event.results[0][0].transcript;
        console.log({transcript});
        outputLocation.value = transcript;
      }
    };
    recognition.start();
  }
};

const listenForMicClick = () => {
  const micButton = document.getElementById('mic-button');
  micButton.addEventListener('click', (e) => {
    // toggle animation class

    // get current lang id in selected in select box
    const selectorLang = document.getElementById('vocab_item_language_id').value
    // translate lang name into iso code using meta-data
    const langCode = document.getElementById('language-meta-'+ selectorLang).dataset.isoCode;
    console.log(langCode)
    const outputLocation = document.getElementById('vocab_item_content');
    // call recognizeSpeech
    recognizeSpeech(langCode, outputLocation);
  });
};

export { listenForMicClick };
