import React from 'react';
import { useDispatch } from 'react-redux';

export default function YesNoPage() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: 'getNextYesNoQuestion',
    });
  };

  return (
    <div>
      <h1>Yes No</h1>
      <button type="button">
        네
      </button>
      &nbsp;
      &nbsp;
      &nbsp;
      <button type="button">
        아니오
      </button>
      <button type="button" onClick={handleClick}>
        재생
      </button>
    </div>
  );
}
