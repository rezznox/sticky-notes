import { dissoc, eqProps, find, path } from "ramda";
import { calculateNewPosition } from "../../../utils";

export const initialState = {
  operationIndex: 0,
  timeouts: {},
  notes: [],
  fetchingNotes: false,
  deletingNote: false,
  creatingNote: false,
  updatingNote: false
}

export const DNDProcedures = {
  canvas: (noteObj, thunkAPI) => {
    const notes = path(['notesReducer', 'notes'], thunkAPI.getState()),
      found = find(eqProps('id', noteObj), notes),
      { diff, srcCliOff, canvasDim } = path(['info'], noteObj),
      newNote = dissoc('info', noteObj);
    if (found.position === '') {
      newNote.x = found.x + diff.x;
      newNote.y = found.y + diff.y;
    } else {
      newNote.x = srcCliOff.x - canvasDim.x;
      newNote.y = srcCliOff.y - canvasDim.y;
    }
    newNote.position = '';
    newNote.x = +newNote.x.toFixed();
    newNote.y = +newNote.y.toFixed();
    return newNote;
  },
  stack: (noteObj, thunkAPI) => {
    const first = path(['notesReducer', 'notes'], thunkAPI.getState())[0],
      newNote = dissoc('info', noteObj);
    if (first.position === '') {
      newNote.position = 'aaaa';
    } else {
      newNote.position = calculateNewPosition(first.position);
    }
    newNote.x = 0;
    newNote.y = 0;
    return newNote;
  },
};