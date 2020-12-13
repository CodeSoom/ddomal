import React from 'react';

import {
  Switch,
  Route,
} from 'react-router-dom';

import './styles/global.css';

import styled from '@emotion/styled';

import MainPage from './pages/MainPage/index';
import SelectPage from './pages/SelectPage/index';
import SentenceSpeakPage from './pages/SentenceSpeakPage';
import SentenceAnswersPage from './pages/SentenceAnswersPage';
import YesNoPage from './pages/YesNoPage';
import YesNoAnswersPage from './pages/YesNoAnswersPage';
import SetQuestionNumberPage from './pages/SetQuestionNumberPage';

import { primaryColor, tertiaryColor } from './styles/colors';
import { normalFont } from './styles/fonts';

const Container = styled.div({
  width: '100%',
  height: '100vh',
  backgroundImage: `linear-gradient(130deg, ${primaryColor}, ${tertiaryColor})`,
  fontFamily: normalFont,
  zIndex: '0',
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
        <Route path="/ynanswers" component={YesNoAnswersPage} />
        <Route path="/setnumber" component={SetQuestionNumberPage} />
      </Switch>
    </Container>
  );
}
