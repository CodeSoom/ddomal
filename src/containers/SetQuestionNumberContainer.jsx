import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import QuestionCounter from '../components/QuestionCounter';

import { setNumberOfQuestions } from '../redux/slices/applicationSlice';

import { get } from '../utils/utils';

export default function SentenceAnswersContainer() {
  const { numberOfQuestions } = useSelector(get('application'));

  const dispatch = useDispatch();

  const handleClickIncrease = () => {
    dispatch(setNumberOfQuestions(numberOfQuestions + 1));
  };

  const handleClickDecrease = () => {
    dispatch(setNumberOfQuestions(numberOfQuestions - 1));
  };

  return (
    <QuestionCounter
      numberOfQuestions={numberOfQuestions}
      onClickIncrease={handleClickIncrease}
      onClickDecrease={handleClickDecrease}
    />
  );
}
