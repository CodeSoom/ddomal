import React from 'react';

// import { useDispatch } from 'react-redux';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import CustomCarousel from '../../customs/CustomCarousel';

// import { endGame } from '../../redux/slices/applicationSlice';

import SentenceAnswer from '../SentenceAnswer';

import {
  Container,
  AnswerBox,
} from './styled';

export default function SentenceAnswers({ answers, onClickReplay }) {
  // const dispatch = useDispatch();

  const handleLastSlide = () => {
    // TODO: fixthis
    // dispatch(endGame());
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
            <SentenceAnswer answer={answer} onClickReplay={onClickReplay} />
          </AnswerBox>
        ))}
      </CustomCarousel>
    </Container>
  );
}
