import React from 'react';

import {
  Container,
  AnswerBox,
  Prompt,
  Sentence,
} from './styled';

export default function SentenceAnswers({ answers }) {
  return (
    <Container>
      {answers.map(({ prompt, spokenSentence, examples }) => (
        <AnswerBox key={prompt}>
          <Prompt>
            {prompt}
          </Prompt>
          :
          <Sentence>
            {spokenSentence}
          </Sentence>
          {examples.map((example) => (
            <p>{example}</p>
          ))}
        </AnswerBox>
      ))}
    </Container>
  );
}
