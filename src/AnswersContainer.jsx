import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { initialize } from './redux/slice';

import { get } from './utils';

export default function MakeSentenceContainer() {
  const answers = useSelector(get('answers'));

  const dispatch = useDispatch();

  const history = useHistory();

  const handleClick = () => {
    dispatch(initialize());
    history.push('/');
  };

  return (
    <>
      {answers.map(({ prompt, spokenSentence }) => (
        <div key={prompt}>
          <p>
            {prompt}
            :
            {spokenSentence}
          </p>
        </div>
      ))}
      <button type="button" onClick={handleClick}>
        처음으로
      </button>
    </>
  );
}
