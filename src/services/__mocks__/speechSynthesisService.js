import { of } from 'rxjs';

export const play = jest.fn();

export const stop = jest.fn();

export function playEnded() {
  return of('');
}
