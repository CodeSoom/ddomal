import React from 'react';

import {
  Switch,
  Route,
} from 'react-router-dom';

import styled from '@emotion/styled';

import MainPage from './MainPage';
import MakeSentencePage from './SentenceSpeakPage';
import AnswersPage from './SentenceAnswersPage';
import YesnoPage from './YesnoPage';

import { flexBoxCenter } from './styles/common';

const Container = styled.div({
  ...flexBoxCenter,
  height: '100vh',
  transform: 'translateY(-5%)',
});

export default function App() {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/sentence" component={MakeSentencePage} />
        <Route path="/answers" component={AnswersPage} />
        <Route path="/yesno" component={YesnoPage} />
      </Switch>
    </Container>
  );
}
