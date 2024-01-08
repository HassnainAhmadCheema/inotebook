import React,{useContext,useState } from 'react';
import { NoteContext } from '../context/notes/NoteState';


const AddNote = () => {

    const context = useContext(NoteContext);
    const {addNote} =context;

    
  const [note, setNote] = useState({title:"",description:"",tag:"default"});
  

    const clickHandled=(e)=>{
        e.preventDefault();
addNote(note.title,note.description,note.tag);
    }

    const onchange=(e)=>{
setNote({...note ,[e.target.name] : e.target.value});
    }
    return (
        <div>
            <div>
                <div className="container my-3">
                    <h2>Write A Note:</h2>
                    <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' onChange={onchange}/>
  </div>
 
  <button type="submit" className="btn btn-primary" onClick={clickHandled}>Submit</button>
</form>

                    <h2 className='my-3'>Your Notes:</h2>

                </div>
                {/* Your home page content */}
            </div></div>
    )
}

export default AddNote

