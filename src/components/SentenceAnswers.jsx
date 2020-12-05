import React from 'react';

import styled from '@emotion/styled';

const Container = styled.div({
  minWidth: '23rem',
  padding: '1rem 1rem',
  border: '#DDD 1px solid',
  borderTop: '#555 4px solid',
  borderBottom: '#444 4px solid',
  borderRadius: '3px',
});

const AnswerBox = styled.div({
  fontSize: '1.4rem',
  marginTop: '1.3rem',
  marginBottom: '1.3rem',
});

const Prompt = styled.span({
  textAlign: 'center',
  display: 'inline-block',
  width: '6rem',
  padding: '0 .5rem',
  marginRight: '.5rem',
  borderBottom: '1px solid #EEE',
});

const Sentence = styled.span({
  display: 'inline-block',
  marginLeft: '1rem',
  paddingTop: '.3rem',
});

export default function SentenceAnswersContainer({ answers }) {
  return (
    <Container>
      {answers.map(({ prompt, spokenSentence }) => (
        <AnswerBox key={prompt}>
          <Prompt>
            {prompt}
          </Prompt>
          :
          <Sentence>
            {spokenSentence}
          </Sentence>
        </AnswerBox>
      ))}
    </Container>
  );
}
