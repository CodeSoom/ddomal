import React from 'react';

import styled from '@emotion/styled';

import { emphasisColor, normalColor } from '../styles/colors';
import { titleFont } from '../styles/fonts';

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

const Example = styled.div({
  marginTop: '1rem',
  fontSize: '1.2rem',
  fontWeight: '300',
});

const ReplayButton = styled.button({
  backgroundImage: 'url("/assets/images/replay.png")',
  width: '1.5rem',
  height: '1.5rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transform: 'translate(.4rem, .3rem)',
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
        {spokenSentence}
      </Sentence>
      <ExamplesBox>
        <ExamplesHeading>
          예시 문장
        </ExamplesHeading>
        {examples.map((example) => (
          <Example key={example}>
            {example}
            <ReplayButton
              type="button"
              title="replay"
              onClick={() => onClickReplay(example)}
            />
          </Example>
        ))}
      </ExamplesBox>
    </>
  );
}
