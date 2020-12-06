import uniqueRandom from 'unique-random';
import examples from '../../data/examples';

import prompts from '../../data/prompts';

const getRandomIndex = uniqueRandom(0, prompts.length - 1);

export function fetchNextPrompt() {
  return prompts[getRandomIndex()];
}

export function getExamples(prompt) {
  return examples[prompt] || [];
}
