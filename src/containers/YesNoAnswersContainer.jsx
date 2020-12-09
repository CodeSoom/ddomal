import React from 'react';

import { useSelector } from 'react-redux';

import { get } from '../utils';

export default function YesNoAnswersContainer() {
  const answers = useSelector(get('answers'));

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
    </div>
  );
}
