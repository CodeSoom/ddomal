import yesNoQuestions from '../../data/yesNoQuestions';

import { fetchNextYesNoQuestion } from './yesNoQuestionService';

test('fetchNextYesNoQuestion', () => {
  expect(yesNoQuestions).toContain(fetchNextYesNoQuestion());
});
