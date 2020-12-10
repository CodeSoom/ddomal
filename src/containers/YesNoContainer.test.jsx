import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

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
  const yesButton = '맞아요';
  const noButton = '아니에요';
  const playButton = 'play';
  const guideMessage = '잘 듣고 정답을 골라보세요';
  const currentQuestion = { question: '쥐는 코끼리보다 무겁나요?', answer: 'N' };
  const currentAnswersNumber = 1;
  const MAX_ANSWERS = 3;

  const dispatch = jest.fn();
  const playYes = jest.fn();
  const playWrong = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      soundState: SoundState.END,
      yesNoQuestion: currentQuestion,
      answers: (given.answers || []),
    }));

    useAudio.mockImplementation((path) => (
      path.includes('Correct')
        ? ['', playYes]
        : ['', playWrong]
    ));
  });

  context('with currently answered quetion', () => {
    given('answers', () => new Array(currentAnswersNumber));

    it('show progress bar', () => {
      const { container } = render(<YesNoContainer />);

      expect(container).toHaveTextContent(currentAnswersNumber);
      expect(container).toHaveTextContent(MAX_ANSWERS);
    });
  });

  it('renders guide message', () => {
    const { container } = render(<YesNoContainer />);

    expect(container).toHaveTextContent(guideMessage);
  });

  it('renders play button', () => {
    const { getByTitle } = render(<YesNoContainer />);

    fireEvent.click(getByTitle(playButton));

    expect(dispatch).toBeCalledWith(playYesNoQuestion(currentQuestion.question));
  });

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

      fireEvent.click(getByText(button));

      await waitFor(() => expect(dispatch).toBeCalledWith(stopYesNoQuestion()));
      await waitFor(() => expect(dispatch).toBeCalledWith(getNextYesNoQuestion()));
      await waitFor(() => expect(dispatch).toBeCalledWith(idlePlaying()));
    });
  });

  it('save answer when user click button', async () => {
    const { getByText } = render(<YesNoContainer />);

    fireEvent.click(getByText(yesButton));

    await waitFor(() => expect(dispatch).toBeCalledWith(saveAnswer({
      ...currentQuestion,
      userAnswer: 'Y',
    })));
  });

  context('when answers number is max', () => {
    given('answers', () => new Array(MAX_ANSWERS - 1));

    it('go to answers page', async () => {
      const { getByText } = render(<YesNoContainer />);

      fireEvent.click(getByText(noButton));

      await waitFor(() => expect(mockPush).toBeCalledWith('/ynanswers'));
    });
  });

  context('when answers number is not max', () => {
    given('answers', () => new Array(MAX_ANSWERS - 2));

    it('does not go to answers page', async () => {
      const { getByText } = render(<YesNoContainer />);

      fireEvent.click(getByText(noButton));

      await waitFor(() => expect(mockPush).not.toBeCalled());
    });
  });
});
