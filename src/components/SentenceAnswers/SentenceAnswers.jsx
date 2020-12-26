import React from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import CustomCarousel from '../../customs/CustomCarousel';

import SentenceAnswer from '../SentenceAnswer';

import {
  Container,
  AnswerBox,
} from './styled';

export default function SentenceAnswers({ answers, onClickReplay, onClickLastSlide }) {
  return (
    <Container>
      <CustomCarousel
        showStatus={false}
        showThumbs={false}
        onLast={onClickLastSlide}
      >
        {answers.map((answer) => (
          <AnswerBox key={answer.prompt}>
            <SentenceAnswer answer={answer} onClickReplay={onClickReplay} />
          </AnswerBox>
        ))}
      </CustomCarousel>
    </Container>
  );
}
