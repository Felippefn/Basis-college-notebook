//backend/routes/noterouter.js

const express = require('express');
const { Note, Subject } = require('../models.js'); // Adjust path to models file
const router = express.Router();

// Create a new subject
router.post('/add/subjects', (req, res) => {
  const { name } = req.body;  // Extract 'name' from the request body

  // Create new subject object with 'name' field
  const newSubject = new Subject({ name });

  newSubject.save()
    .then(subject => res.status(201).json(subject))
    .catch(err => {
      console.error('MongoDB Save Error:', err);  // Log the exact MongoDB error
      res.status(400).json({ error: 'Unable to create subject' });
    });
});


// Add a note to a subject
router.post('/add/subjects/:subjectId/notes', async (req, res) => {
  const { title, content } = req.body;

  try {
    // Check if the subject exists
    const subject = await Subject.findById(req.params.subjectId);
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    // Create and save the note
    const note = new Note({ title, content, subject: req.params.subjectId });
    const savedNote = await note.save();

    // Update the subject's notes
    subject.notes.push(savedNote._id);
    await subject.save();

    res.status(201).json(savedNote);
  } catch (error) {
    console.error('Error adding note to subject:', error);
    res.status(400).json({ error: 'Error adding note to subject' });
  }
});

router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find(); // Use Mongoose model to query
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching subjects' });
  }
});

// Get all notes for a specific subject
router.get('/subjects/:subjectId/notes', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.subjectId).populate('notes'); // Populate notes
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json(subject.notes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notes' });
  }
});

// Get a specific note for a specific subject
router.get('/subjects/:subjectId/notes/:noteId', async (req, res) => {
  try {
    // Find the subject by its ID and populate the 'notes' field
    const subject = await Subject.findById(req.params.subjectId).populate('notes'); 
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    // Find the specific note in the populated notes array
    const note = subject.notes.find(note => note._id.toString() === req.params.noteId);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching note' });
  }
});




module.exports = router;
