import React from 'react';
import { useHistory } from 'react-router-dom';

export default function MainPage() {
  const history = useHistory();

  const handleClickStart = () => {
    history.push('/sentence');
  };

  return (
    <div>
      <h1>
        문장 만들기
      </h1>
      <button type="button" onClick={handleClickStart}>
        시작하기
      </button>
    </div>
  );
}
