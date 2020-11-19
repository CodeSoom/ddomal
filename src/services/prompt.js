import uniqueRandom from 'unique-random';

import prompts from '../data/prompts';

const getRandomIndex = uniqueRandom(0, prompts.length - 1);

export function getRandomPrompt() {
  return prompts[getRandomIndex()];
}

// TODO: delete this
export function xx() {

}
