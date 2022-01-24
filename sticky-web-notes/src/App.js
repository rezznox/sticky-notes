import { curry, map } from 'ramda';
import React, { useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Note from './app/components/note/Note';
import {
  fetchNotes,
  update,
  deleteNote as delNote,
  createNote as postNote,
  updateNote,
  setNewTimeout
} from './app/redux/notes/noteSlice';
import { setCanvasDim } from './app/redux/pages/pagesSlice';

function App() {

  const dispatch = useDispatch(),
    { canvasDim } = useSelector(state => state.pagesReducer.dashboard),
    [, drop] = useDrop(() => ({
      accept: 'Note',
      canDrop: () => true,
      drop: (itemP, monitor) => {
        const srcCliOff = monitor.getSourceClientOffset(),
          iniSrcOff = monitor.getInitialSourceClientOffset(),
          diff = monitor.getDifferenceFromInitialOffset(),
          iniCli = monitor.getInitialClientOffset(),
          newItem = { ...itemP, info: { position: 'canvas', diff, iniSrcOff, srcCliOff, iniCli, canvasDim } };
        dispatch(updateNote(newItem));
        return newItem;
      }
    }), [canvasDim]),
    [, dropStack] = useDrop(() => ({
      accept: 'Note',
      canDrop: () => true,
      drop: (itemP, monitor) => {
        const newItem = { ...itemP, info: { position: 'stack' } };
        dispatch(updateNote(newItem));
        return newItem;
      }
    }), []),
    { notes, creatingNote, timeouts } = useSelector(state => state.notesReducer),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    updateNoteText = useCallback(curry((info, { target: { value: text } }) => {
      dispatch(update({ ...info, text }));
      timeouts['' + info.id] && clearTimeout(timeouts['' + info.id]);
      dispatch(setNewTimeout({
        timeout: setTimeout(() => {
          dispatch(updateNote({ ...info, nofetch: true, text }));
        }, 500),
        id: info.id
      }));
    }), [dispatch, timeouts]),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    switchEditMode = useCallback(curry((enable, info) => {
      dispatch(update({ ...info, editing: enable }));
    }), [dispatch]),
    deleteNote = useCallback((note) => {
      dispatch(delNote(note));
    }, [dispatch]),
    createNote = useCallback(() => {
      dispatch(postNote());
    }, [dispatch]);

  useEffect(() => {
    dispatch(fetchNotes());
    const { x, y } = document.getElementsByClassName('canvas')[0].getBoundingClientRect();
    dispatch(setCanvasDim({ x, y }));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard">
      <div ref={dropStack} className="notes-stack">
        {notes &&
          map((x) =>
          (x.position !== '' &&
            <Note
              key={x.id}
              info={x}
              relative={true}
              className={'on-stack'}
              switchEditMode={switchEditMode}
              remove={deleteNote}
              updateText={updateNoteText(x)}
            />), notes)
        }
      </div>
      <div ref={drop} className="canvas">
        {notes &&
          map((x) =>
          (x.position === '' &&
            <Note
              key={x.id}
              info={x}
              switchEditMode={switchEditMode}
              remove={deleteNote}
              updateText={updateNoteText(x)}
            />), notes)
        }
        <button disabled={creatingNote} onClick={createNote} className="addNoteButton">Add Note</button>
      </div>
    </div>
  );
}

export default App;
