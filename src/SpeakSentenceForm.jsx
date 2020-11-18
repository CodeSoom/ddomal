import React from 'react';

export default function SpeakSentenceForm({ sentence }) {
  return (
    <div>
      <p>
        {sentence}
      </p>
      <button type="button">
        Mic
      </button>
    </div>
  );
}
