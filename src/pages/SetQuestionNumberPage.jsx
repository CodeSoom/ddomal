import React from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import SetQuestionNumberContainer from '../containers/SetQuestionNumberContainer';

export default function SetQuestionNumberPage() {
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const param = query.get('game');

  const gameToPath = {
    speak_sentence: '/sentence',
    yesno: '/yesno',
  };

  const handleClickStart = () => {
    history.push(gameToPath[param]);
  };

  return (
    <>
      <h1>
        몇 문제를 풀어볼까요?
      </h1>
      <SetQuestionNumberContainer />
      <button type="button" onClick={handleClickStart}>
        시작하기
      </button>
    </>
  );
}
