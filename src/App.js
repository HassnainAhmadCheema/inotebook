// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homes from "./context/notes/Homes";
import About from "./components/About";
import { NoteState } from "./context/notes/NoteState";


function App() {
  return (
    <NoteState>
    
      <Router>
        <Navbar />
   
        <div className="container">
        <Routes>
          <Route path="/" element={<Homes />} />
          <Route path="/about" element={<About />} />
        </Routes>
        </div>
      </Router>
  
    </NoteState>
  );
}

export default App;
