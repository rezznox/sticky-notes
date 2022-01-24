import { createSlice } from '@reduxjs/toolkit';
/* import { fetch } from './notes.service'; */
import initialState from './index';

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCanvasDim: (state, action) => {
      const { payload } = action;
      state.dashboard.canvasDim = payload;
    }
  }
});

export const { setCanvasDim } = pagesSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/* export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
}; */

export default pagesSlice.reducer;
