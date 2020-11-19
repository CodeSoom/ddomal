import React from 'react';

export default function SpeakSentenceForm({ spokenSentence, speaking, onClick }) {
  const sentence = spokenSentence ?? '문장을 입력해주세요';

  return (
    <div>
      <p>
        {speaking ? '...' : sentence}
      </p>
      <button type="button" onClick={onClick}>
        Mic
      </button>
    </div>
  );
}
