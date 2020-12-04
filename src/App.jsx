import React from 'react';

import {
  Switch,
  Route,
} from 'react-router-dom';

import styled from '@emotion/styled';

import SelectPage from './SelectPage';
import MakeSentencePage from './SentenceSpeakPage';
import AnswersPage from './SentenceAnswersPage';
import YesNoPage from './YesNoPage';

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
        <Route exact path="/" component={SelectPage} />
        <Route path="/sentence" component={MakeSentencePage} />
        <Route path="/answers" component={AnswersPage} />
        <Route path="/yesno" component={YesNoPage} />
      </Switch>
    </Container>
  );
}
