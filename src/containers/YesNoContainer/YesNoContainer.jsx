import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { useAudio } from '../../hooks/audio';

import SoundState from '../../enums/SoundState';

import {
  getNextYesNoQuestion,
  idlePlaying,
  playYesNoQuestion,
  saveAnswer,
  stopYesNoQuestion,
} from '../../redux/slice';

import { get } from '../../utils/utils';

import ProgressBar from '../../components/ProgressBar';
import YesNoGuideMessage from '../../components/YesNoGuideMessage';
import YesNoPlayButton from '../../components/YesNoPlayButton';
import YesNoSubmitButtons from '../../components/YesNoSubmitButtons';

import {
  Container,
  BarBox,
  MessageBox,
  PlayButtonBox,
  SubmitButtonBox,
} from './styled';

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

  const handleClickPlay = () => {
    dispatch(playYesNoQuestion(question));
  };

  const playSound = (userAnswer) => {
    const play = (userAnswer === answer) ? playCorrect : playWrong;
    play();
  };

  // TODO: 액션 조율은 Epic 에서 해야할 일
  const dispatchActions = (userAnswer) => {
    const actions = [
      stopYesNoQuestion(),
      idlePlaying(),
      saveAnswer({
        question,
        answer,
        userAnswer,
      }),
      getNextYesNoQuestion(),
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
    <Container>
      <BarBox>
        <ProgressBar currentNumber={answersNumber} maxNumber={MAX_ANSWERS} />
      </BarBox>
      <MessageBox>
        <YesNoGuideMessage isIdle={isIdle} />
      </MessageBox>
      <PlayButtonBox>
        <YesNoPlayButton onClick={handleClickPlay} isPlaying={isPlaying} />
      </PlayButtonBox>
      <SubmitButtonBox>
        <YesNoSubmitButtons onClick={handleClickYesNo} isIdle={isIdle} />
      </SubmitButtonBox>
    </Container>
  );
}
