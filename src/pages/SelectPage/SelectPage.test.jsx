import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import SelectPage from './SelectPage';

import { initializeState } from '../../redux/slice';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

jest.mock('react-redux');

describe('SelectPage', () => {
  const title = '무엇을 연습해 볼까요?';
  const speakSentenceButton = '문장 만들기';
  const yesnoButton = '듣고 이해하기';

  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatch.mockImplementation(() => dispatch);
  });

  it('renders title', () => {
    const { container } = render(<SelectPage />);

    expect(container).toHaveTextContent(title);
  });

  it('renders sentence speak page link button', () => {
    const { getByText } = render(<SelectPage />);

    fireEvent.click(getByText(speakSentenceButton));

    expect(mockPush).toBeCalledWith('/sentence');
    expect(dispatch).toBeCalledWith(initializeState());
  });

  it('renders yesno page link button', () => {
    const { getByText } = render(<SelectPage />);

    fireEvent.click(getByText(yesnoButton));

    expect(mockPush).toBeCalledWith('/yesno');
  });
});
