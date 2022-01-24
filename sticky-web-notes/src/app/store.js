import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './redux/notes/noteSlice';
import pagesReducer from './redux/pages/pagesSlice';

export const store = configureStore({
  reducer: {
    notesReducer,
    pagesReducer
  },
});
