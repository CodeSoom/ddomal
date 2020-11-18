import React from 'react';

import { render } from '@testing-library/react';

import MakeSentenceContainer from './MakeSentenceContainer';

describe('MakeSentenceContainer', () => {
  const prompt = '사과';
  const micButton = 'Mic';
  const spokenSentence = '사과가 맛있네요';

  const renderMakeSentenceContainer = () => render(
    <MakeSentenceContainer />,
  );

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
