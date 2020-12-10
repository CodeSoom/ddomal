import React from 'react';

export default function YesNoSubmitButtons({ onClick, isIdle }) {
  return (
    <>
      <button type="button" disabled={isIdle} onClick={() => onClick('Y')}>
        맞아요
      </button>
      <button type="button" disabled={isIdle} onClick={() => onClick('N')}>
        아니에요
      </button>
    </>
  );
}
