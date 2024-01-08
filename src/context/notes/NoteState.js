// NoteState.js
import React, { createContext, useState } from "react";
const NoteContext = createContext();


const host = "http://localhost:5000"
const NoteState = (props) => {
  
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

 // Add Getnote function
 const getNotes = async () => {
  //api call
  const response = await fetch(`${host}/api/notes/getallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5MTg5ZmM0MTg5Y2Q4MzQ3NDJjOTQ5In0sImlhdCI6MTcwNDEzOTEwNn0.m7qYjxsCt9-ertZ_nPB1mtyvvoC422lGp4ROjf4smxQ"
    },
    // assuming you want to send the data as JSON in the request body

  });
  
  const json = await response.json()
console.log(json);
setNotes(json)

 }




  // Add note function
  const addNote =async (title, description, tag) => {
//api call
const response = await fetch(`${host}/api/notes/createnotes`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5MTg5ZmM0MTg5Y2Q4MzQ3NDJjOTQ5In0sImlhdCI6MTcwNDEzOTEwNn0.m7qYjxsCt9-ertZ_nPB1mtyvvoC422lGp4ROjf4smxQ"
  },
  // assuming you want to send the data as JSON in the request body
  body: JSON.stringify({title,description,tag})
});




    //logic to add a note
    const note = {
      _id: "some-unique-id", // You may generate a unique ID here
      user: "659189fc4189cd834742c949",
      description: description, // Corrected: Use the provided description argument
      title: title, // Corrected: Use the provided title argument
      tag: tag,
      date: "2024-01-06T00:37:39.916Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  const deleteNote =(id)=>{
    //api call

    //logic to delete the note
  const newNote =notes.filter((note)=>{
return note._id !== id;
  })
  setNotes(newNote);

  }


  const editNote = async (id,description,title,tag)=>{
    //api call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5MTg5ZmM0MTg5Y2Q4MzQ3NDJjOTQ5In0sImlhdCI6MTcwNDEzOTEwNn0.m7qYjxsCt9-ertZ_nPB1mtyvvoC422lGp4ROjf4smxQ"
        },
        // assuming you want to send the data as JSON in the request body
        body: JSON.stringify({title,description,tag})
      });
    
     const json= response.json();
    
    

    //logic to edit the note
 for (let index = 0; index < notes.length; index++) {
   const element = notes[index];
  if(element._id=id){
   element.description =description
    element.title =title
    element.tag =tag
  }
 }

  }

  return (
    <NoteContext.Provider value={{ notes, addNote,deleteNote,editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export { NoteState, NoteContext };
