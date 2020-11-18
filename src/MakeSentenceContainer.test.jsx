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

  const dispatch = jest.fn();

  const renderMakeSentenceContainer = () => render(
    <MakeSentenceContainer />,
  );

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      spokenSentence,
    }));
  });

  it('renders prompt', () => {
    const { queryByText } = renderMakeSentenceContainer();

    expect(queryByText(prompt)).not.toBeNull();
  });

  it('renders speak sentence button', () => {
    const { getByText } = renderMakeSentenceContainer();

    fireEvent.click(getByText(micButton));

    expect(dispatch).toBeCalled();
  });

  it('renders spoken sentence', () => {
    const { container } = renderMakeSentenceContainer();

    expect(container).toHaveTextContent(spokenSentence);
  });
});
