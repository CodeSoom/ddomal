import uniqueRandomRange from 'unique-random-range';

import examples from '../../data/examples';
import prompts from '../../data/prompts';
import yesNoQuestions from '../../data/yesNoQuestions';

const dataIndexGenerator = (data) => uniqueRandomRange(0, data.length - 1);
const promptsIndexGenerator = dataIndexGenerator(prompts);
const yesnoIndexGenerator = dataIndexGenerator(yesNoQuestions);

export function fetchNextPrompt() {
  return prompts[promptsIndexGenerator()];
}

export function getExamples(prompt) {
  return examples[prompt] || [];
}

export function fetchNextYesNoQuestion() {
  return yesNoQuestions[yesnoIndexGenerator()];
}
