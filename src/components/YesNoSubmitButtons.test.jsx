import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import YesNoSubmitButtons from './YesNoSubmitButtons';

describe('YesNoSubmitButtons', () => {
  const yesButton = '맞아요';
  const noButton = '아니에요';

  const handleClick = jest.fn();

  const renderYesNoSubmitButtons = ({ isIdle }) => render(
    <YesNoSubmitButtons onClick={handleClick} isIdle={isIdle} />,
  );

  beforeEach(() => {
    handleClick.mockClear();
  });

  context('when sound has started', () => {
    const isIdle = false;

    it('user can click yes button', () => {
      const { getByText } = renderYesNoSubmitButtons({ isIdle });

      fireEvent.click(getByText(yesButton));

      expect(handleClick).toBeCalledWith('Y');
    });

    it('user can click no button', () => {
      const { getByText } = renderYesNoSubmitButtons({ isIdle });

      fireEvent.click(getByText(noButton));

      expect(handleClick).toBeCalledWith('N');
    });
  });

  context('when sound has not started', () => {
    const isIdle = true;

    it('user cannot click yes button', () => {
      const { getByText } = renderYesNoSubmitButtons({ isIdle });

      fireEvent.click(getByText(yesButton));

      expect(handleClick).not.toBeCalled();
    });

    it('user cannot click no button', () => {
      const { getByText } = renderYesNoSubmitButtons({ isIdle });

      fireEvent.click(getByText(noButton));

      expect(handleClick).not.toBeCalled();
    });
  });
});
