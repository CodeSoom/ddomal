import styled from '@emotion/styled';

export const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
});

export const ButtonBox = styled.div({
  position: 'absolute',
  top: '73vh',
});

export const Title = styled.div({
  position: 'absolute',
  top: '20vh',
  backgroundImage: `url(${'/assets/images/title.png'})`,
  backgroundRepeat: 'no-repeat',
  height: '15.8rem',
  width: '19.5rem',
});
