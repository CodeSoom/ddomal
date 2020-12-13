import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import given from 'given2';

import SetQuestionNumberPage from './SetQuestionNumberPage';

const mockLocation = {};
const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation() {
    return mockLocation;
  },
  useHistory() {
    return {
      push: mockPush,
    };
  },
}));

// TODO: Location mocking 을 이용한 테스트
describe('SetQuestionNumberPage', () => {
  const startButton = '시작하기';

  beforeEach(() => {
    mockLocation.search = given.query;
  });

  context('speak sentence game', () => {
    given('query', () => '?game=speak_sentence');

    it('links to speak sentence page', () => {
      const { getByText } = render(<SetQuestionNumberPage />);

      fireEvent.click(getByText(startButton));

      expect(mockPush).toBeCalled();
    });
  });

  context('speak sentence game', () => {
    given('query', () => '?game=yesno');

    it('links to speak sentence page', () => {
      const { getByText } = render(<SetQuestionNumberPage />);

      fireEvent.click(getByText(startButton));

      expect(mockPush).toBeCalled();
    });
  });
});
