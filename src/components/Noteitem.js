// NoteItem.js
import React,{useContext,useState} from 'react';
import { NoteContext } from '../context/notes/NoteState';

export const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} =context;

  const { note } = props;

  return (
    <div className='my-3'>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-end">
            <i className="fa-sharp fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
