import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

// eslint-disable-next-line new-cap
const recognition = new window.webkitSpeechRecognition();

recognition.lang = 'ko';

export function recognize() {
  recognition.start();

  return map((event) => event.results[0][0].transcript)(
    fromEvent(recognition, 'result'),
  );
}

export function soundStart() {
  return fromEvent(recognition, 'soundstart');
}

export function soundEnd() {
  return fromEvent(recognition, 'soundend');
}

export function start() {
  return fromEvent(recognition, 'start');
}

export function end() {
  return fromEvent(recognition, 'end');
}
