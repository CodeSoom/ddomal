import React from 'react';

export default function YesNoGuideMessage({ isIdle }) {
  return (
    <h1>
      {isIdle
        ? '버튼을 누르면 문제가 나와요'
        : '잘 듣고 정답을 골라보세요'}
    </h1>
  );
}
