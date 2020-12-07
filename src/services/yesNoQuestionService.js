import uniqueRandom from 'unique-random';

import AWS from 'aws-sdk';

import { fromEvent, Observable } from 'rxjs';

import yesNoQuestions from '../../data/yesNoQuestions';

const getRandomIndex = uniqueRandom(0, yesNoQuestions.length - 1);

export function fetchNextYesNoQuestion() {
  return yesNoQuestions[getRandomIndex()];
}

AWS.config.region = process.env.AWS_REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: process.env.AWS_ID });

function synthesizeQuestion(context, question) {
  const speechParams = {
    Text: `
      <speak>
        <prosody rate="91%">${question}</prosody>
      </speak>
    `,
    OutputFormat: 'mp3',
    SampleRate: '24000',
    TextType: 'ssml',
    VoiceId: 'Seoyeon',
  };

  const polly = new AWS.Polly({ apiVersion: '2016-06-10' });

  return new Observable((subscriber) => polly.synthesizeSpeech(speechParams, (err, data) => {
    const uInt8Array = new Uint8Array(data.AudioStream);
    const arrayBuffer = uInt8Array.buffer;

    context.decodeAudioData(arrayBuffer)
      .then((decodedData) => {
        subscriber.next(decodedData);
      });
  }));
}

let context;

export function playQuestion(question) {
  if (!context) {
    context = new AudioContext();
  }

  const playSound = context.createBufferSource();

  synthesizeQuestion(context, question).subscribe((decodedData) => {
    playSound.buffer = decodedData;
    playSound.connect(context.destination);
    playSound.start();
  });

  return fromEvent(playSound, 'ended');
}
