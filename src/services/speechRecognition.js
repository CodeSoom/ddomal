// eslint-disable-next-line new-cap
const recognition = new window.webkitSpeechRecognition();

recognition.lang = 'ko';

// TODO: error handling
const getRecognitionResult = () => new Promise((resolve) => {
  recognition.onresult = (event) => {
    resolve(event.results[0][0].transcript);
  };
});

export async function recognize() {
  recognition.start();

  return getRecognitionResult();
}

// TODO: delete this
export function xx() {}
