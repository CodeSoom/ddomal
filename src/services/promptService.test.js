import prompts from '../data/prompts';

import { getNextPrompt } from './promptService';

test('getNextPrompt', () => {
  expect(prompts).toContain(getNextPrompt());
});
