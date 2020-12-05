import React from 'react';

import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

import Button from './styles/CommonButton';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
});

const ButtonBox = styled.div({
  position: 'absolute',
  top: '73vh',
});

const Title = styled.div({
  position: 'absolute',
  top: '20vh',
  backgroundImage: `url(${'/assets/images/title.png'})`,
  backgroundRepeat: 'no-repeat',
  height: '15.8rem',
  width: '19.5rem',
});

export default function MainPage() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/select');
  };

  return (
    <Container>
      <Title />
      <ButtonBox>
        <Button type="button" onClick={handleClick}>
          시작 하기
        </Button>
      </ButtonBox>
    </Container>
  );
}
