import React from 'react';

import { render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import SentenceSpeakPage from './SentenceSpeakPage';

jest.mock('react-redux');
jest.mock('../services/speechRecognitionService.js');

describe('SentenceSpeakPage', () => {
  const prompt = '사과';

  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      prompt,
      spokenSentence: '',
      answers: [],
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
