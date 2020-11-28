import prompts from '../../data/prompts';

import { fetchNextPrompt } from './promptService';

test('fetchNextPrompt', () => {
  expect(prompts).toContain(fetchNextPrompt());
});
