import uniqueRandom from 'unique-random';

import examples from '../../data/examples';
import prompts from '../../data/prompts';
import yesNoQuestions from '../../data/yesNoQuestions';

const randomIndexGenerator = (data) => uniqueRandom(0, data.length - 1);

export function fetchNextPrompt() {
  const getRandomIndex = randomIndexGenerator(prompts);

  return prompts[getRandomIndex()];
}

export function getExamples(prompt) {
  return examples[prompt] || [];
}

export function fetchNextYesNoQuestion() {
  const getRandomIndex = randomIndexGenerator(yesNoQuestions);

  return yesNoQuestions[getRandomIndex()];
}
