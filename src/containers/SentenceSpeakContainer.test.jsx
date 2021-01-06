import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import given from 'given2';

import { useAudio } from '../hooks/audio';

import SentenceSpeakContainer from './SentenceSpeakContainer';

import MicState from '../enums/MicState';
import { recognizeSpeech, saveAnswer } from '../redux/slices/speakSentenceSlice';

jest.mock('react-redux');
jest.mock('../services/speechRecognitionService.js');
jest.mock('../hooks/audio.js');
jest.mock('../services/instances/audioContext.instance.js');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('SentenceSpeakContainer', () => {
  const prompt = '사과';
  const micButton = 'mic';
  const spokenSentence = '사과가 맛있네요';
  const nextButton = '다음 문제';
  const exitButton = '종료';
  const numberOfQuestions = 5;

  const dispatch = jest.fn();

  const renderSentenceSpeakContainer = () => render(
    <SentenceSpeakContainer />,
  );

  beforeEach(() => {
    dispatch.mockClear();

    useAudio.mockImplementation(() => jest.fn());

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      application: {
        numberOfQuestions,
        answers: given.answers || [],
      },
      speakSentence: {
        micState: MicState.OFF,
        prompt,
        spokenSentence,
      },
    }));
  });

  it('renders prompt', () => {
    const { queryAllByText } = renderSentenceSpeakContainer();

    expect(queryAllByText(prompt)).not.toEqual([]);
  });

  it('renders spoken sentence', () => {
    const { container } = renderSentenceSpeakContainer();

    expect(container).toHaveTextContent(spokenSentence);
  });

  it('renders speak sentence button', () => {
    const { getByTitle } = renderSentenceSpeakContainer();

    fireEvent.click(getByTitle(micButton));

    expect(dispatch).toBeCalledWith(recognizeSpeech());
  });

  context('when answering is not complete', () => {
    given('answers', () => new Array(numberOfQuestions - 2));

    it('renders next button', () => {
      const { getByText } = renderSentenceSpeakContainer();

      fireEvent.click(getByText(nextButton));

      expect(dispatch).toBeCalledWith(saveAnswer({ prompt, spokenSentence }));
    });
  });

  context('when answering is complete', () => {
    given('answers', () => new Array(numberOfQuestions - 1));

    it('renders exit button', () => {
      const { getByText } = renderSentenceSpeakContainer();

      fireEvent.click(getByText(exitButton));

      expect(dispatch).toBeCalledWith(saveAnswer({ prompt, spokenSentence }));

      expect(mockPush).toBeCalledWith('/answers');
    });
  });

  it('renders progress bar', () => {
    const questionNumber = 3;

    given('answers', () => new Array(questionNumber));

    const { container } = renderSentenceSpeakContainer();

    expect(container).toHaveTextContent(questionNumber);
  });
});
