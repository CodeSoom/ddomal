import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { useAudio } from '../hooks/audio';

import SoundState from '../enums/SoundState';

import {
  getNextYesNoQuestion,
  idlePlaying,
  playYesNoQuestion,
  saveAnswer,
} from '../redux/slice';

import { get } from '../utils';

const MAX_ANSWERS = 3;

export default function YesNoContainer() {
  const answersNumber = useSelector(get('answers')).length;
  const { question, answer } = useSelector(get('yesNoQuestion')) || {};
  const soundState = useSelector(get('soundState'));

  const isPlaying = soundState === SoundState.PLAYING;
  const isIdle = soundState === SoundState.IDLE;

  const dispatch = useDispatch();
  const history = useHistory();

  const [, playCorrect] = useAudio('../../assets/sounds/CorrectAnswer.mp3');
  const [, playWrong] = useAudio('../../assets/sounds/IncorrectAnswer.mp3');

  const handleClickPlayQuestion = () => {
    dispatch(playYesNoQuestion(question));
  };

  const playSound = (userAnswer) => {
    const play = (userAnswer === answer) ? playCorrect : playWrong;
    play();
  };

  const dispatchActions = (userAnswer) => {
    const actions = [
      getNextYesNoQuestion(),
      idlePlaying(),
      saveAnswer({
        question,
        answer,
        userAnswer,
      }),
    ];

    actions.forEach((action) => dispatch(action));
  };

  const handleClickYesNo = async (userAnswer) => {
    await playSound(userAnswer);
    dispatchActions(userAnswer);

    if (answersNumber === MAX_ANSWERS - 1) {
      history.push('/ynanswers');
    }
  };

  return (
    <>
      {isIdle
        ? <h1>버튼을 클릭해주세요</h1>
        : (
          <>
            <button type="button" onClick={() => handleClickYesNo('Y')}>
              네
            </button>
            &nbsp;
            &nbsp;
            &nbsp;
            <button type="button" onClick={() => handleClickYesNo('N')}>
              아니오
            </button>
          </>
        )}
      <button type="button" onClick={handleClickPlayQuestion} disabled={isPlaying}>
        재생
      </button>
      <div>
        {isPlaying
          ? <p>재생중입니다</p>
          : <p>재생중이 아닙니다</p>}
      </div>
    </>
  );
}
