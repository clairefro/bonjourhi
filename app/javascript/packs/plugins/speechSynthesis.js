// unclog speechSynthesis if still stuck speaker after x milliseconds
const timeoutSpeech = (wait) => {
  setTimeout(() => {
    if (speechSynthesis.speaking){
      window.speechSynthesis.cancel();
      console.log('speech timed out. Canceled.')
    }
  }, wait);
}

const speakWithTimeout = (utterance) => {
  window.speechSynthesis.speak(utterance)
  timeoutSpeech(8000);
}

const speakText = (text, lang) => {
  let u = new SpeechSynthesisUtterance();
  u.text = text;
  u.lang = lang;
  speakWithTimeout(u);
};

const listenForSpeakerClick = () => {
   const vocabItemList = document.querySelectorAll('.vocab-item-list');
   vocabItemList.forEach((vocabGroup) => {
     vocabGroup.addEventListener('click', (e) => {
     // only fire if speaker icon (<i>) was clicked
      if(e.target.nodeName === "I") {
        const text = e.target.dataset.text;
        const lang = e.target.dataset.isoCode;
        speakText(text,lang);
      }
    });
  });
};


export { listenForSpeakerClick }
