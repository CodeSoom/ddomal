import React from 'react';

import { useSelector } from 'react-redux';

import MakeSentencePage from './MakeSentencePage';

export default function App() {
  const { testSentence } = useSelector((state) => ({
    testSentence: state.testSentence,
  }));

  return (
    <>
      <p>{testSentence}</p>
      <MakeSentencePage />
    </>
  );
}
