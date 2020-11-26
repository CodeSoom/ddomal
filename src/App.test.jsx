import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import App from './App';

jest.mock('react-redux');
jest.mock('./services/speechRecognitionService.js');

describe('App', () => {
  const prompt = '사과';
  const mainPageButton = '시작하기';
  const makeSentencePageParagraph = '제시어를 보고 문장을 만들어 보세요!';
  const answersPage = '결과 확인';

  const dispatch = jest.fn();

  const renderApp = ({ path }) => render((
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  ));

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      prompt,
      spokenSentence: '',
      answers: [],
    }));
  });

  it('shows main page on route /', () => {
    const { queryByText } = renderApp({ path: '/' });

    expect(queryByText(mainPageButton)).not.toBeNull();
  });

  it('shows make sentence page on route /sentence', () => {
    const { container } = renderApp({ path: '/sentence' });

    expect(container).toHaveTextContent(makeSentencePageParagraph);
  });

  it('shows results page on route /results', () => {
    const { container } = renderApp({ path: '/answers' });

    expect(container).toHaveTextContent(answersPage);
  });
});
