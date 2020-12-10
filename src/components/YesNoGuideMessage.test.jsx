import React from 'react';

import { render } from '@testing-library/react';

import YesNoGuideMessage from './YesNoGuideMessage';

describe('YesNoGuideMessage', () => {
  const idleMessage = '버튼을 누르면 문제가 나와요';
  const playingMessage = '잘 듣고 정답을 골라보세요';

  const renderYesNoGuideMessage = ({ isIdle }) => render(
    <YesNoGuideMessage
      isIdle={isIdle}
    />,
  );

  it('renders idle message on idle state', () => {
    const { container } = renderYesNoGuideMessage({ isIdle: true });

    expect(container).toHaveTextContent(idleMessage);
  });

  it('renders playing message on not idle state', () => {
    const { container } = renderYesNoGuideMessage({ isIdle: false });

    expect(container).toHaveTextContent(playingMessage);
  });
});
