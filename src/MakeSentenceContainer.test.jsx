import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import given from 'given2';

import MakeSentenceContainer from './MakeSentenceContainer';

jest.mock('react-redux');
jest.mock('./services/speechRecognition.js');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('MakeSentenceContainer', () => {
  const prompt = '사과';
  const micButton = 'mic';
  const spokenSentence = '사과가 맛있네요';
  const nextButton = '다음 문제';
  const exitButton = '종료';
  const MAX_ANSWERS = 5;

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
      answers: given.answers || [],
    }));
  });

  it('renders prompt', () => {
    const { queryByText } = renderMakeSentenceContainer();

    expect(queryByText(prompt)).not.toBeNull();
  });

  it('renders spoken sentence', () => {
    const { container } = renderMakeSentenceContainer();

    expect(container).toHaveTextContent(spokenSentence);
  });

  it('renders speak sentence button', () => {
    const { getByTitle } = renderMakeSentenceContainer();

    fireEvent.click(getByTitle(micButton));

    expect(dispatch).toBeCalled();
  });

  context('when answering is not complete', () => {
    given('answers', () => new Array(MAX_ANSWERS - 2));

    it('renders next button', () => {
      const { getByText } = renderMakeSentenceContainer();

      fireEvent.click(getByText(nextButton));

      expect(dispatch).toBeCalledWith({
        type: 'application/saveAnswer',
        payload: { prompt, spokenSentence },
      });
    });
  });

  context('when answering is complete', () => {
    given('answers', () => new Array(MAX_ANSWERS - 1));

    it('renders exit button', () => {
      const { getByText } = renderMakeSentenceContainer();

      fireEvent.click(getByText(exitButton));

      expect(mockPush).toBeCalledWith('/answers');
    });
  });
});
