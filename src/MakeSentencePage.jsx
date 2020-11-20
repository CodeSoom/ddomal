import React from 'react';

import styled from '@emotion/styled';

import MakeSentenceContainer from './MakeSentenceContainer';

const HeadingBox = styled.div({
  textAlign: 'center',
});

const Heading = styled.h1({
  marginBottom: '1rem',
});

const Paragraph = styled.p({
  fontSize: '.8rem',
  marginBottom: '1rem',
});

export default function MakeSentencePage() {
  return (
    <div>
      <HeadingBox>
        <Heading>
          문장 만들기
        </Heading>
        <Paragraph>
          제시어를 보고 문장을 만들어 보세요!
        </Paragraph>
      </HeadingBox>
      <MakeSentenceContainer />
    </div>
  );
}
