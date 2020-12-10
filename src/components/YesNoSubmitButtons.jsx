import React from 'react';

export default function YesNoSubmitButtons({ onClick }) {
  return (
    <>
      <button type="button" onClick={onClick}>
        맞아요
      </button>
      <button type="button" onClick={onClick}>
        아니에요
      </button>
    </>
  );
}
