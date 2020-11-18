import React from 'react';
import SpeakSentenceForm from './SpeakSentenceForm';

export default function MakeSentenceContainer() {
  // TODO: state 에서 문장 얻기
  const sentence = '사과가 맛있네요';

  return (
    <div>
      <p>
        사과
      </p>
      <SpeakSentenceForm sentence={sentence} />
    </div>
  );
}
