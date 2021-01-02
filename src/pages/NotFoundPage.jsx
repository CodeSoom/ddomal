import React from 'react';

import styled from '@emotion/styled';

import { normalColor } from '../styles/colors';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  color: normalColor,
  fontSize: '2rem',
});

function NotFoundPage() {
  return (
    <Container>
      페이지를 찾을수 없어요~
    </Container>
  );
}

export default NotFoundPage;
