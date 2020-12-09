import React from 'react';

import _ from 'lodash';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';

import { initializeState, playYesNoQuestion } from '../redux/slice';

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
      <div>
        <p>문제 | 내가 고른답 | 정답</p>
      </div>
      {answers.map(({ question, answer, userAnswer }) => (
        <div key={`${question}`}>
          <p>
            {`${question} | ${answer} | ${userAnswer}`}
            <button type="button" onClick={() => handleClickReplay(question)}>
              다시듣기
            </button>
          </p>
        </div>
      ))}
      <button type="button" onClick={handleClickGoHome}>
        처음으로
      </button>
    </div>
  );
}
