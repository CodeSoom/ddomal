import React from 'react';

import { useHistory } from 'react-router-dom';

import Button from '../../styles/CommonButtonActive';

import {
  Container,
  ButtonBox,
  Title,
} from './styled';

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
