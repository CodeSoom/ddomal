import React from 'react';

import Message from '../styles/Message';

function YesNoGuideMessage({ isIdle }) {
  return (
    <Message>
      {isIdle
        ? '버튼을 누르면 문제가 나와요'
        : '잘 듣고 정답을 골라보세요'}
    </Message>
  );
}

export default React.memo(YesNoGuideMessage);
