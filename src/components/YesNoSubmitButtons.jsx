import styled from '@emotion/styled';
import React from 'react';

import ActiveButton from '../styles/CommonButtonActive';
import InactiveButton from '../styles/CommonButtonInactive';

const Container = styled.div({
  display: 'grid',
  gridGap: '3.13vh',
});

export default function YesNoSubmitButtons({ onClick, isIdle }) {
  const Button = isIdle ? InactiveButton : ActiveButton;

  return (
    <Container>
      <Button type="button" disabled={isIdle} onClick={() => onClick('Y')}>
        맞아요
      </Button>
      <Button type="button" disabled={isIdle} onClick={() => onClick('N')}>
        아니에요
      </Button>
    </Container>
  );
}
