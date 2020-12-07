import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { playYesNoQuestion } from '../redux/slice';

import { get } from '../utils';

export default function YesNoPage() {
  const isPlaying = useSelector(get('isPlaying'));

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(playYesNoQuestion('안녕하세요'));
  };

  return (
    <>
      <button type="button">
        네
      </button>
      &nbsp;
      &nbsp;
      &nbsp;
      <button type="button">
        아니오
      </button>
      <button type="button" onClick={handleClick} disabled={isPlaying}>
        재생
      </button>
      <div>
        {isPlaying
          ? <p>재생중입니다</p>
          : <p>재생중이 아닙니다</p>}
      </div>
    </>
  );
}
