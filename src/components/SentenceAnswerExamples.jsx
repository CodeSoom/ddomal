import React from 'react';

import styled from '@emotion/styled';

import { highlight } from '../utils';

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

export default function SentenceAnswer({ examples, prompt, onClickReplay }) {
  return (
    <>
      {examples.map((example) => (
        <Example key={example}>
          {highlight({
            sentence: example,
            word: prompt,
          })}
          <ReplayButton
            type="button"
            title="replay"
            onClick={() => onClickReplay(example)}
          />
        </Example>
      ))}
    </>
  );
}
