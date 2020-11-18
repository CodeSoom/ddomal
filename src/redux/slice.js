import { createSlice } from '@reduxjs/toolkit';

const { reducer } = createSlice({
  name: 'application',
  initialState: {
    testSentence: '상태 테스트',
  },
});

export default reducer;
