import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getNextYesNoQuestion } from '../redux/slices/yesNoSlice';

import YesNoContainer from '../containers/YesNoContainer';

export default function YesNoPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNextYesNoQuestion());
  });

  return (
    <YesNoContainer />
  );
}
