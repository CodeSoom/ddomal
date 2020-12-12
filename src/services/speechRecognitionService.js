import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import recognition from './instances/speechRecognition.instance';

export function recognize() {
  recognition.start();

  return fromEvent(recognition, 'result')
    .pipe(map((event) => event.results[0][0].transcript));
}

export function abortRecognition() {
  recognition.abort();
}

export function soundStart() {
  return fromEvent(recognition, 'soundstart');
}

export function soundEnd() {
  return fromEvent(recognition, 'soundend');
}

export function recognitionStart() {
  return fromEvent(recognition, 'start');
}

export function recognitionEnd() {
  return fromEvent(recognition, 'end');
}

recognition.onerror = () => {
  console.log('error');
};

recognition.onnomatch = () => {
  console.log('no match');
};
