import React from 'react';

import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import SentenceAnswer from '../SentenceAnswer';

import {
  Container,
  AnswerBox,
} from './styled';

export default function SentenceAnswers({ answers }) {
  return (
    <Container>
      <Carousel showStatus={false} showThumbs={false} thumbWidth={0}>
        {answers.map((answer) => (
          <AnswerBox key={answer.prompt}>
            <SentenceAnswer answer={answer} />
          </AnswerBox>
        ))}
      </Carousel>
    </Container>
  );
}
