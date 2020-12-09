import React from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';
import { initializeState } from '../redux/slice';

export default function YesNoAnswersContainer() {
  const answers = useSelector(get('answers'));

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickGoHome = () => {
    dispatch(initializeState());
    history.push('/');
  };

  return (
    <div>
      <div>
        <p>문제 | 내가 고른답 | 정답</p>
      </div>
      {answers.map(({ question, answer, userAnswer }) => (
        <div key={`${question}`}>
          <p>{`${question} | ${answer} | ${userAnswer}`}</p>
        </div>
      ))}
      <button type="button" onClick={handleClickGoHome}>
        처음으로
      </button>
    </div>
  );
}
