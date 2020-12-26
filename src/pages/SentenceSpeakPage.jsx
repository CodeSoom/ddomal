import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import SentenceSpeakContainer from '../containers/SentenceSpeakContainer';

export default function SentenceSpeakPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'speakSentence/getNextQuestion' });
  }, []);

  return (
    <SentenceSpeakContainer />
  );
}
