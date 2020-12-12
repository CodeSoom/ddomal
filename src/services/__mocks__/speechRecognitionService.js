import { of } from 'rxjs';

export const recognize = jest.fn();

export function soundStart() {
  return of('');
}

export function soundEnd() {
  return of('');
}

export function recognitionStart() {
  return of('');
}

export function recognitionEnd() {
  return of('');
}

export const abortRecognition = jest.fn();
