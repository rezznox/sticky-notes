import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { equals, findIndex, omit } from 'ramda';
import { getNotes, deleteNote as delNote, postNote, putNote } from '../../services/notes';
import { DNDProcedures, initialState } from './index';

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchNotes = createAsyncThunk(
  'note/fetchNotes',
  async () => {
    const { data } = await getNotes({});
    return data;
  }
);

export const deleteNote = createAsyncThunk(
  'note/deleteNote',
  async ({ id }, thunkAPI) => {
    await delNote({ id });
    thunkAPI.dispatch(fetchNotes());
    return;
  }
);

export const createNote = createAsyncThunk(
  'note/createNote',
  async (_, thunkAPI) => {
    await postNote({});
    thunkAPI.dispatch(fetchNotes());
    return;
  }
);

export const updateNote = createAsyncThunk(
  'note/updateNote',
  async (note, thunkAPI) => {
    const newNote = omit(['editing', 'nofetch'], note.info ? DNDProcedures[note.info.position](note, thunkAPI): note);
    await putNote(newNote);
    !note.nofetch && thunkAPI.dispatch(fetchNotes());
    return;
  }
);

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    update: (state, action) => {
      const { payload } = action,
        { notes } = state;
      if (payload.operation) {
        let found = findIndex((x) => equals(payload.item.id, x.id), notes);
        const note = state.notes[found];
        state.notes[found] = { ...note, x: note.x + payload.item.x, y: note.y + payload.item.y };
      } else {
        let found = findIndex((x) => equals(payload.id, x.id), notes);
        state.notes[found] = { ...state.notes[found], ...payload };
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setNewTimeout: (state, {payload: { id, timeout }}) => {
      state.timeouts[id] = timeout;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.fetchingNotes = true;
        state.pendingOperation = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.fetchingNotes = false;
        state.notes = action.payload;
        state.pendingOperation = false;
      })
      .addCase(deleteNote.pending, (state) => {
        state.deletingNote = true;
        state.pendingOperation = true;
      })
      .addCase(deleteNote.fulfilled, (state) => {
        state.deletingNote = false;
        state.pendingOperation = false;
      })
      .addCase(createNote.pending, (state) => {
        state.creatingNote = true;
        state.pendingOperation = true;
      })
      .addCase(createNote.fulfilled, (state) => {
        state.creatingNote = false;
        state.pendingOperation = false;
      })
      .addCase(updateNote.pending, (state) => {
        state.updatingNote = true;
        state.pendingOperation = true;
      })
      .addCase(updateNote.fulfilled, (state) => {
        state.updatingNote = false;
        state.pendingOperation = false;
      });
  }
});

export const { update, setNewTimeout } = noteSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/* export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
}; */

export default noteSlice.reducer;