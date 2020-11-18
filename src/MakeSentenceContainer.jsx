import React from 'react';

import { useSelector } from 'react-redux';

import SpeakSentenceForm from './SpeakSentenceForm';

export default function MakeSentenceContainer() {
  const { spokenSentence } = useSelector((state) => ({
    spokenSentence: state.spokenSentence,
  }));

  return (
    <div>
      <p>
        사과
      </p>
      <SpeakSentenceForm sentence={spokenSentence} />
    </div>
  );
}
