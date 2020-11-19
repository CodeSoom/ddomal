import React from 'react';

export default function SpeakSentenceForm({ sentence = '문장을 입력해주세요', speaking, onClick }) {
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
