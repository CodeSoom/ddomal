import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { useAudio } from '../../hooks/audio';

import SoundState from '../../enums/SoundState';

import {
  getNextYesNoQuestion,
  idlePlaying,
  playYesNoQuestion,
  stopYesNoQuestion,
} from '../../redux/slices/yesNoSlice';

import {
  addAnswer,
} from '../../redux/slices/applicationSlice';

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

export default function YesNoContainer() {
  const { answers, numberOfQuestions } = useSelector(get('application'));
  const { yesNoQuestion, soundState } = useSelector(get('yesno'));

  const answersNumber = answers.length;
  const { question, answer } = yesNoQuestion || {};

  const isPlaying = soundState === SoundState.PLAYING;
  const isIdle = soundState === SoundState.IDLE;

  const dispatch = useDispatch();
  const history = useHistory();

  const playCorrect = useAudio('../../assets/sounds/CorrectAnswer.mp3');
  const playWrong = useAudio('../../assets/sounds/IncorrectAnswer.mp3');

  const handleClickPlay = () => {
    dispatch(playYesNoQuestion(question));
  };

  const playSound = (userAnswer) => {
    const play = (userAnswer === answer) ? playCorrect : playWrong;
    return play();
  };

  // TODO: 액션 조율은 Epic 에서 해야할 일
  const dispatchActions = (userAnswer) => {
    const actions = [
      stopYesNoQuestion(),
      idlePlaying(),
      addAnswer({
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

    if (answersNumber === numberOfQuestions - 1) {
      history.push('/ynanswers');
    }
  };

  return (
    <Container>
      <BarBox>
        <ProgressBar currentNumber={answersNumber} maxNumber={numberOfQuestions} />
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
