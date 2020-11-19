import React from 'react';

import styled from '@emotion/styled';

import MakeSentenceContainer from './MakeSentenceContainer';

const HeadingBox = styled.div({
  textAlign: 'center',
});

export default function MakeSentencePage() {
  return (
    <div>
      <HeadingBox>
        <h1>문장 만들기</h1>
        <p>제시어를 보고 문장을 만들어 보세요!</p>
      </HeadingBox>
      <MakeSentenceContainer />
    </div>
  );
}
