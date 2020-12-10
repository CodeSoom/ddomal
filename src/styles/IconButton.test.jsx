import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { MdMic } from 'react-icons/md';

import IconButton from './IconButton';

const handleClick = jest.fn();

test('IconButton', () => {
  const { getByTitle } = render(
    <IconButton
      onClick={handleClick}
      Icon={MdMic}
      iconTitle="mic"
    />,
  );

  fireEvent.click(getByTitle('mic'));

  expect(handleClick).toBeCalled();
});
