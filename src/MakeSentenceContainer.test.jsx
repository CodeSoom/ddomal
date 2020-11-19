import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import MakeSentenceContainer from './MakeSentenceContainer';

jest.mock('react-redux');
jest.mock('./services/speechRecognition.js');

describe('MakeSentenceContainer', () => {
  const prompt = '사과';
  const micButton = 'Mic';
  const spokenSentence = '사과가 맛있네요';
  const changePromptButton = 'change';

  const dispatch = jest.fn();

  const renderMakeSentenceContainer = () => render(
    <MakeSentenceContainer />,
  );

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      prompt,
      spokenSentence,
    }));
  });

  it('renders prompt', () => {
    const { queryByText } = renderMakeSentenceContainer();

    expect(queryByText(prompt)).not.toBeNull();
  });

  it('renders change prompt button', () => {
    const { getByText } = renderMakeSentenceContainer();

    fireEvent.click(getByText(changePromptButton));

    expect(dispatch).toBeCalled();
  });

  it('renders spoken sentence', () => {
    const { container } = renderMakeSentenceContainer();

    expect(container).toHaveTextContent(spokenSentence);
  });

  it('renders speak sentence button', () => {
    const { getByText } = renderMakeSentenceContainer();

    fireEvent.click(getByText(micButton));

    expect(dispatch).toBeCalled();
  });
});
