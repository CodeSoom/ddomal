import React from 'react';

import _ from 'lodash';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';

import { initializeState, playYesNoQuestion } from '../redux/slice';
import YesNoAnswer from '../components/YesNoAnswer';

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
    <div>
      {answers.map(({ question, answer, userAnswer }) => (
        <div key={`${question}`}>
          <YesNoAnswer
            question={question}
            answer={answer}
            userAnswer={userAnswer}
            onClick={handleClickReplay}
          />
        </div>
      ))}
      <button type="button" onClick={handleClickGoHome}>
        처음으로
      </button>
    </div>
  );
}
