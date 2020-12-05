import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import SentenceSpeakContainer from './SentenceSpeakContainer';

export default function SentenceSpeakPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'getNextQuestion' });
  }, []);

  return (
    <SentenceSpeakContainer />
  );
}
