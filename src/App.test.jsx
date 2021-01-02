import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import App from './App';

jest.mock('react-redux');
jest.mock('./services/speechRecognitionService.js');
jest.mock('./services/instances/audioContext.instance.js');
jest.mock('./hooks/volumeCanvas.js');

global.HTMLMediaElement.prototype.pause = jest.fn();
global.HTMLCanvasElement.prototype.getContext = jest.fn();

describe('App', () => {
  const prompt = '사과';
  const mainPageButton = '시작 하기';
  const answersPage = '오늘';
  const yesnoPage = '잘 듣고 정답을 골라보세요';
  const selectPageTitle = '무엇을 연습해 볼까요';
  const ynAnswersPage = '정답 확인';
  const setQuestionNumberPage = '몇 문제를 풀어볼까요?';

  const dispatch = jest.fn();

  const renderApp = ({ path }) => render((
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  ));

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      application: {
        answers: [],
      },
      speakSentence: {
        prompt,
        spokenSentence: null,
      },
      yesno: {},
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

    expect(container).toHaveTextContent(yesnoPage);
  });

  it('shows yes no question answers page on route /ynanswers', () => {
    const { container } = renderApp({ path: '/ynanswers' });

    expect(container).toHaveTextContent(ynAnswersPage);
  });

  it('shows set question number page on route /setnumber', () => {
    const { container } = renderApp({ path: '/setnumber' });

    expect(container).toHaveTextContent(setQuestionNumberPage);
  });

  it('shows the not found page on invalid route', () => {
    const { container } = renderApp({ path: '/404' });

    expect(container).toHaveTextContent('페이지를 찾을수 없어요~');
  });
});
