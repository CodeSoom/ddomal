import React from 'react';

import {
  Switch,
  Route,
} from 'react-router-dom';

import styled from '@emotion/styled';

import MakeSentencePage from './components/SentenceSpeakPage';
import AnswersPage from './components/SentenceAnswersPage';
import YesNoPage from './components/YesNoPage';
import SelectPage from './components/SelectPage';

import { primaryColor, tertiaryColor } from './styles/colors';
import MainPage from './components/MainPage';

const Container = styled.div({
  width: '100%',
  height: '100vh',
  backgroundImage: `linear-gradient(130deg, ${primaryColor}, ${tertiaryColor})`,
});

export default function App() {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/select" component={SelectPage} />
        <Route path="/sentence" component={MakeSentencePage} />
        <Route path="/answers" component={AnswersPage} />
        <Route path="/yesno" component={YesNoPage} />
      </Switch>
    </Container>
  );
}
