import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import SpeechContainer from './SpeechContainer';
import { recognizeSpeech } from '../redux/slices/speakSentenceSlice';

describe('SpeechContainer', () => {
  const prompts = ['사과', '수박'];
  const speech = '사과가 맛있네요';

  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);

    useSelector.mockImplementation((selector) => selector({
      speech,
      prompts,
    }));
  });

  const renderSpeechContainer = () => render(
    <SpeechContainer />,
  );

  it('renders prompts', () => {
    const { container } = renderSpeechContainer();

    prompts.forEach((prompt) => {
      expect(container).toHaveTextContent(prompt);
    });
  });

  it('renders spoken sentence', () => {
    const { container } = renderSpeechContainer();

    expect(container).toHaveTextContent(speech);
  });

  it('renders speak sentence button', () => {
    const { getByTitle } = renderSpeechContainer();

    fireEvent.click(getByTitle('mic'));

    expect(dispatch).toBeCalledWith(recognizeSpeech());
  });
});
