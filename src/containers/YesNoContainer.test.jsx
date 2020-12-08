import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import given from 'given2';

import { useDispatch, useSelector } from 'react-redux';

import {
  getNextYesNoQuestion, idlePlaying, playYesNoQuestion, saveAnswer, stopYesNoQuestion,
} from '../redux/slice';

import YesNoContainer from './YesNoContainer';

import SoundState from '../enums/SoundState';

import { useAudio } from '../hooks/audio';

jest.mock('../hooks/audio.js');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('YesNoContainer', () => {
  const yesButton = '네';
  const noButton = '아니오';
  const playButton = '재생';
  const currentQuestion = { question: '쥐는 코끼리보다 무겁나요?', answer: 'N' };
  const MAX_ANSWERS = 3;

  const dispatch = jest.fn();
  const playYes = jest.fn();
  const playWrong = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      soundState: (given.soundState || SoundState.END),
      yesNoQuestion: currentQuestion,
      answers: (given.answers || []),
    }));

    useAudio.mockImplementation((path) => (
      path.includes('Correct')
        ? ['', playYes]
        : ['', playWrong]
    ));
  });

  context('on idle state', () => {
    given('soundState', () => SoundState.IDLE);

    it('does not render Yes button', () => {
      const { queryByText } = render(<YesNoContainer />);

      expect(queryByText(yesButton)).toBeNull();
    });

    it('does not render No button', () => {
      const { queryByText } = render(<YesNoContainer />);

      expect(queryByText(noButton)).toBeNull();
    });
  });

  context('on not idle state', () => {
    given('soundState', () => SoundState.END);

    it('rings correct sound when user click right button', () => {
      const { getByText } = render(<YesNoContainer />);

      fireEvent.click(getByText(noButton));

      expect(playYes).toBeCalled();
    });

    it('rings incorrect sound when user click wrong button', () => {
      const { getByText } = render(<YesNoContainer />);

      fireEvent.click(getByText(yesButton));

      expect(playWrong).toBeCalled();
    });

    it('get next question when user click yes or no button', () => {
      const { getByText } = render(<YesNoContainer />);

      [yesButton, noButton].forEach(async (button) => {
        dispatch.mockClear();

        await fireEvent.click(getByText(button));

        expect(dispatch).toBeCalledWith(stopYesNoQuestion());
        expect(dispatch).toBeCalledWith(getNextYesNoQuestion());
        expect(dispatch).toBeCalledWith(idlePlaying());
      });
    });

    it('save answer when user click button', async () => {
      const { getByText } = render(<YesNoContainer />);

      await fireEvent.click(getByText(yesButton));

      expect(dispatch).toBeCalledWith(saveAnswer({
        ...currentQuestion,
        userAnswer: 'Y',
      }));
    });
  });

  context('When question is being played', () => {
    given('soundState', () => SoundState.PLAYING);

    it('renders playing sign', () => {
      const { container } = render(<YesNoContainer />);

      expect(container).toHaveTextContent('재생중입니다');
    });

    it('cannot click play button', () => {
      const { getByText } = render(<YesNoContainer />);

      fireEvent.click(getByText(playButton));

      expect(dispatch).not.toBeCalled();
    });
  });

  context('When question is not being played', () => {
    given('soundState', () => SoundState.END);

    it('renders not playing sign', () => {
      const { container } = render(<YesNoContainer />);

      expect(container).toHaveTextContent('재생중이 아닙니다');
    });

    it('can click play button', () => {
      const { getByText } = render(<YesNoContainer />);

      fireEvent.click(getByText(playButton));

      expect(dispatch).toBeCalled();
    });

    it('plays current question', () => {
      const { getByText } = render(<YesNoContainer />);

      fireEvent.click(getByText(playButton));

      expect(dispatch).toBeCalledWith(playYesNoQuestion(currentQuestion.question));
    });
  });

  context('when answers number is max', () => {
    given('answers', () => new Array(MAX_ANSWERS - 1));

    it('go to answers page', async () => {
      const { getByText } = render(<YesNoContainer />);

      await fireEvent.click(getByText(noButton));

      expect(mockPush).toBeCalledWith('/ynanswers');
    });
  });

  context('when answers number is not max', () => {
    given('answers', () => new Array(MAX_ANSWERS - 2));

    it('does not go to answers page', async () => {
      const { getByText } = render(<YesNoContainer />);

      await fireEvent.click(getByText(noButton));

      expect(mockPush).not.toBeCalled();
    });
  });
});
