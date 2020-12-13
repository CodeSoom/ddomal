import React from 'react';

import styled from '@emotion/styled';

import { emphasisColor, normalColor } from '../styles/colors';

import { titleFont } from '../styles/fonts';

import { highlight } from '../utils';

import SentenceAnswerExamples from './SentenceAnswerExamples';

const Prompt = styled.h3({
  textAlign: 'center',
  display: 'inline-block',
  borderBottom: '3px solid #EEE',
  color: emphasisColor,
  fontFamily: titleFont,
  fontSize: '2.5rem',
});

const Sentence = styled.div({
  paddingTop: '1rem',
});

const ExamplesBox = styled.div({
  marginTop: '8vh',
  fontSize: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ExamplesHeading = styled.p({
  borderBottom: `2px solid ${normalColor}`,
  fontWeight: '700',
  width: 'max-content',
});

export default function SentenceAnswer({
  answer: { prompt, spokenSentence, examples },
  onClickReplay,
}) {
  return (
    <>
      <Prompt>
        {prompt}
      </Prompt>
      <Sentence>
        {highlight({
          sentence: spokenSentence,
          word: prompt,
        })}
      </Sentence>
      <ExamplesBox>
        <ExamplesHeading>
          예시 문장
        </ExamplesHeading>
        <SentenceAnswerExamples
          examples={examples}
          prompt={prompt}
          onClickReplay={onClickReplay}
        />
      </ExamplesBox>
    </>
  );
}
