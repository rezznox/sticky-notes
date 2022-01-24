import { isEmpty, prop } from 'ramda';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

const Note = ({ info, updateText, switchEditMode, relative, remove, className }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Note',
    item: { id: info.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), []),
    noteRef = useRef(null),
    handleClickOutside = useCallback(({ target }) => {
      if (noteRef.current && !noteRef.current.contains(target)) {
        switchEditMode(false, info);
      }
    }, [noteRef, switchEditMode, info]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (isEmpty(info)) return;

  return (
    <>
      <div ref={drag}
        className={className}
        style={{
          position: relative ? 'relative' : 'absolute',
          opacity: isDragging ? 0.5 : 1,
          left: prop('x', info),
          top: prop('y', info)
        }}>
        <div onClick={() => remove(info)} className='close'>-</div>
        <div className='date'>
          {format(new Date(prop('created_at', info)), 'dd/MM/yyyy HH:mm')}
        </div>
        <div className="note" ref={noteRef} onClick={() => switchEditMode(true, info)}>
          {info.editing && <textarea autoFocus value={prop('text', info)} onChange={updateText} className="drag"></textarea>}
          {!info.editing && <ReactMarkdown children={prop('text', info)}></ReactMarkdown>}
        </div>
      </div>
    </>
  );
}

export default Note;