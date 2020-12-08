import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SoundState from '../enums/SoundState';

import { playYesNoQuestion } from '../redux/slice';

import { get } from '../utils';

export default function YesNoPage() {
  const soundState = useSelector(get('soundState'));

  const isPlaying = soundState === SoundState.PLAYING;
  const isIdle = soundState === SoundState.IDLE;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(playYesNoQuestion('쥐가 코끼리보다 무겁나요?'));
  };

  return (
    <>
      {isIdle
        ? <h1>버튼을 클릭해주세요</h1>
        : (
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
          </>
        )}
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
