import React from 'react';

import { useDispatch } from 'react-redux';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import CustomCarousel from '../../customs/CustomCarousel';

import { endGame } from '../../redux/slice';

import SentenceAnswer from '../SentenceAnswer';

import {
  Container,
  AnswerBox,
} from './styled';

export default function SentenceAnswers({ answers }) {
  const dispatch = useDispatch();

  const handleLastSlide = () => {
    dispatch(endGame());
  };

  return (
    <Container>
      <CustomCarousel
        showStatus={false}
        showThumbs={false}
        onLast={handleLastSlide}
      >
        {answers.map((answer) => (
          <AnswerBox key={answer.prompt}>
            <SentenceAnswer answer={answer} />
          </AnswerBox>
        ))}
      </CustomCarousel>
    </Container>
  );
}
