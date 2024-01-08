import React,{useContext,useEffect} from 'react';
import { NoteContext } from '../context/notes/NoteState';
import { Noteitem } from './Noteitem';
import AddNote from './addNote';
import getNotes from "./addNote"


export const Notes = () => {
  const context = useContext(NoteContext);
  const { notes ,addNote,getNotes} = context;

  useEffect(() => {
  getNotes();
  }, [])
  
  return (
<>
<AddNote/>
    <div className='container'>
      <div className='row my-3'>
        {notes.map((note) => (
          <div key={note._id} className='col-md-3'>
            <Noteitem note={note} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};
