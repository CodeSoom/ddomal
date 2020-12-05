import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

// eslint-disable-next-line new-cap
const recognition = new window.webkitSpeechRecognition();

console.log(1);

recognition.lang = 'ko';

export function recognize() {
  recognition.start();

  return fromEvent(recognition, 'result')
    .pipe(map((event) => event.results[0][0].transcript));
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
