import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { getNextQuestion } from './redux/slice';

import SentenceSpeakContainer from './SentenceSpeakContainer';

const Paragraph = styled.p({
  fontSize: '.8rem',
  marginBottom: '1rem',
  textAlign: 'center',
});

export default function SentenceSpeakPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNextQuestion());
  }, []);

  return (
    <div>
      <Paragraph>
        제시어를 보고 문장을 만들어 보세요!
      </Paragraph>
      <SentenceSpeakContainer />
    </div>
  );
}
