import {
  bindCallback,
  from,
  fromEvent,
  of,
} from 'rxjs';

import { map, switchMap } from 'rxjs/operators';

import polly from './instances/polly.instance';
import context from './instances/audioContext.instance';

function decode(buffer) {
  return from(context.decodeAudioData(buffer));
}

function synthesizeQuestion(question) {
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

  const boundSynthesize = bindCallback(polly.synthesizeSpeech);

  return boundSynthesize.call(polly, speechParams).pipe(
    map(([, data]) => new Uint8Array(data.AudioStream)),
    map((uIntArray) => uIntArray.buffer),
    switchMap((buffer) => decode(buffer)),
  );
}

let playSound;

export function play(question) {
  playSound = context.createBufferSource();

  synthesizeQuestion(question).subscribe((decodedData) => {
    playSound.buffer = decodedData;
    playSound.connect(context.destination);
    playSound.start();
  });
}

export function stop() {
  if (playSound) {
    playSound.stop();
  }
}

export function playEnded() {
  return playSound ? fromEvent(playSound, 'ended') : of();
}
