const speech = new SpeechSynthesisUtterance();

function speak(message) {
  if (!message) return;
  speech.text = message;
  speech.volume = 4;
  speech.rate = 1;
  speechSynthesis.speak(speech);
}


export { speak };