import React from 'react';

import { render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import SentenceSpeakPage from './SentenceSpeakPage';

jest.mock('react-redux');
jest.mock('../services/speechRecognitionService.js');
jest.mock('../services/instances/audioContext.instance.js');
jest.mock('../hooks/volumeCanvas.js');

global.HTMLMediaElement.prototype.pause = jest.fn();
global.HTMLCanvasElement.prototype.getContext = jest.fn();

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mockUseRef = jest.fn().mockReturnValue({ current: {} });
  return {
    ...originReact,
    useRef: mockUseRef,
  };
});

describe('SentenceSpeakPage', () => {
  const prompt = '사과';

  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      application: {
        answers: [],
      },
      speakSentence: {
        prompt,
        spokenSentence: '',
      },
    }));
  });

  it('get first prompt on mount', () => {
    render(<SentenceSpeakPage />);

    expect(dispatch).toBeCalled();
  });

  it('renders prompt', () => {
    const { queryByText } = render(<SentenceSpeakPage />);

    expect(queryByText(prompt)).not.toBeNull();
  });
});
