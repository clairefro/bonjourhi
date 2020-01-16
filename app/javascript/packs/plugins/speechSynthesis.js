// unclog speechSynthesis if still stuck speaker after x milliseconds
// const timeoutSpeech = (wait) => {
//   setTimeout(() => {
//     if (speechSynthesis.speaking){
//       window.speechSynthesis.cancel();
//       console.log('speech timed out. Canceled.')
//     }
//   }, wait);
// }
//
// const speakWithTimeout = (utterance) => {
//   window.speechSynthesis.speak(utterance)
//   timeoutSpeech(8000);
// }

const speakText = (text, lang) => {
  let u = new SpeechSynthesisUtterance();
  u.text = text;
  u.lang = lang;
  window.speechSynthesis.speak(u);
};

const listenForSpeakerClick = () => {
   const vocabItemList = document.querySelectorAll('.vocab-item-list');
   vocabItemList.forEach((vocabGroup) => {
     vocabGroup.addEventListener('click', (e) => {
     // only fire if speaker icon (<i>) was clicked
      if(e.target.nodeName === "I") {
        // check browser for speech synthesis compatibility
        if (!window.speechSynthesis) {
          alert('Your browser cannot read text out loud. Please use any of these browsers to use this feature: \n\nChrome (desktop/Android), Firefox (desktop/Android), Safari, Edge, Opera, Samsung Internet, QQ, KaiOS');
        } else {
          const text = e.target.dataset.text;
          const lang = e.target.dataset.isoCode;
          speakText(text,lang);
        }
      }
    });
  });
};


export { listenForSpeakerClick }
