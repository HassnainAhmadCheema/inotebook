const express = require('express');
const router = express.Router();
const Note = require("../models/Note");
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1:Fetching all notes endpoint
router.get('/getallnotes', fetchuser, async (req, res) => {
  try {
    console.log('User ID:', req.user.id);
    const user = await User.findById(req.user.id);

    const notes = await Note.find({ user: req.user.id });
   
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// ROUTE 2: Create New notes endpoint
router.post("/createnotes", fetchuser, [
  body("title", "Title must be at least 5 characters long").isLength({ min: 5 }),
  body("description", "Description must be at least 5 characters long").isLength({ min: 5 })
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({ title, description, tag, user: req.user.id });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// ROUTE 3: Update notes endpoint
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Check if the user is the owner of the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

 // ROUTE 3: Delete notes endpoint
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Check if the user is the owner of the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
