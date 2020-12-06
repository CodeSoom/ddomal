import React from 'react';

import styled from '@emotion/styled';

const Prompt = styled.h3({
  textAlign: 'center',
  display: 'inline-block',
  width: '6rem',
  padding: '0 .5rem',
  marginRight: '.5rem',
  borderBottom: '1px solid #EEE',
});

const Sentence = styled.div({
  marginLeft: '1rem',
  paddingTop: '.3rem',
});

const ExamplesBox = styled.div({
  marginTop: '8vh',
  fontSize: '1.5rem',
});

const Example = styled.div({
  fontSize: '1.2rem',
});

export default function SentenceAnswer({ answer: { prompt, spokenSentence, examples } }) {
  return (
    <>
      <Prompt>
        {prompt}
      </Prompt>
      :
      <Sentence>
        {spokenSentence}
      </Sentence>
      <ExamplesBox>
        <p>
          예시 문장:
        </p>
        {examples.map((example) => (
          <Example>{example}</Example>
        ))}
      </ExamplesBox>
    </>
  );
}
