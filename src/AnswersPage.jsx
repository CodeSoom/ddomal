import React from 'react';

import styled from '@emotion/styled';

import AnswersContainer from './AnswersContainer';

const Box = styled.div({
  marginTop: '1rem',
});

export default function AnswersPage() {
  return (
    <div>
      <h1>
        결과 확인
      </h1>
      <Box>
        <AnswersContainer />
      </Box>
    </div>
  );
}
