import React from 'react';

import {
  Switch,
  Route,
} from 'react-router-dom';

import styled from '@emotion/styled';

import SentenceSpeakPage from './components/SentenceSpeakPage';
import SentenceAnswersPage from './components/SentenceAnswersPage';
import YesNoPage from './components/YesNoPage';
import SelectPage from './components/SelectPage/index';
import MainPage from './components/MainPage';

import { primaryColor, tertiaryColor } from './styles/colors';

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
        <Route path="/sentence" component={SentenceSpeakPage} />
        <Route path="/answers" component={SentenceAnswersPage} />
        <Route path="/yesno" component={YesNoPage} />
      </Switch>
    </Container>
  );
}
