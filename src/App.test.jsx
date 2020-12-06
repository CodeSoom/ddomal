import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import App from './App';

jest.mock('react-redux');
jest.mock('./services/speechRecognitionService.js');

describe('App', () => {
  const prompt = '사과';
  const mainPageButton = '시작 하기';
  const answersPage = '오늘';
  const yesnoPageTitle = 'Yes No';
  const selectPageTitle = '무엇을 연습해 볼까요';

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
      spokenSentence: null,
      answers: [],
    }));
  });

  it('shows main page on route /', () => {
    const { queryByText } = renderApp({ path: '/' });

    expect(queryByText(mainPageButton)).not.toBeNull();
  });

  it('shows select page on route /select', () => {
    const { container } = renderApp({ path: '/select' });

    expect(container).toHaveTextContent(selectPageTitle);
  });

  it('shows make sentence page on route /sentence', () => {
    const { container } = renderApp({ path: '/sentence' });

    expect(container).toHaveTextContent(prompt);
  });

  it('shows results page on route /results', () => {
    const { container } = renderApp({ path: '/answers' });

    expect(container).toHaveTextContent(answersPage);
  });

  it('shows YesNo page on route /yesno', () => {
    const { container } = renderApp({ path: '/yesno' });

    expect(container).toHaveTextContent(yesnoPageTitle);
  });
});
