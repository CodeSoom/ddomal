import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import MakeSentenceContainer from './MakeSentenceContainer';

jest.mock('react-redux');

describe('MakeSentenceContainer', () => {
  const prompt = '사과';
  const micButton = 'Mic';
  const spokenSentence = '사과가 맛있네요';

  const renderMakeSentenceContainer = () => render(
    <MakeSentenceContainer />,
  );

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      spokenSentence,
    }));
  });

  it('renders prompt', () => {
    const { queryByText } = renderMakeSentenceContainer();

    expect(queryByText(prompt)).not.toBeNull();
  });

  it('renders speak sentence button', () => {
    const { queryByText } = renderMakeSentenceContainer();

    expect(queryByText(micButton)).not.toBeNull();
  });

  it('renders spoken sentence', () => {
    const { container } = renderMakeSentenceContainer();

    expect(container).toHaveTextContent(spokenSentence);
  });
});
