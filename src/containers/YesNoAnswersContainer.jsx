import React from 'react';

import _ from 'lodash';

import styled from '@emotion/styled';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils/utils';

import { initializeState, playYesNoQuestion } from '../redux/slice';

import YesNoAnswer from '../components/YesNoAnswer';

import Button from '../styles/CommonButtonActive';

const AnswersBox = styled.div({
  marginTop: '4.375vh',
});

const AnswerBox = styled.div({
  marginTop: '3vh',
});

const ButtonBox = styled.div({
  marginTop: '6.1vh',
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export default function YesNoAnswersContainer() {
  const answers = useSelector(get('answers'));

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickGoHome = () => {
    dispatch(initializeState());
    history.push('/');
  };

  const handleClickReplay = (question) => {
    const debouncedDispatch = _.debounce(dispatch, 600, {
      trailing: true,
    });

    debouncedDispatch(playYesNoQuestion(question));
  };

  return (
    <Container>
      <AnswersBox>
        {answers.map(({ question, answer, userAnswer }) => (
          <AnswerBox key={`${question}`}>
            <YesNoAnswer
              question={question}
              answer={answer}
              userAnswer={userAnswer}
              onClick={handleClickReplay}
            />
          </AnswerBox>
        ))}
      </AnswersBox>
      <ButtonBox>
        <Button type="button" onClick={handleClickGoHome}>
          처음으로
        </Button>
      </ButtonBox>
    </Container>
  );
}
