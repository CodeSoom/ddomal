import { createSlice } from '@reduxjs/toolkit';

const { reducer } = createSlice({
  name: 'application',
  initialState: {
    spokenSentence: '',
  },
});

export default reducer;
