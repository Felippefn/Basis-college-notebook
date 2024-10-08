//backend/routes/noterouter.js

const express = require('express');
const { Note, Topic } = require('../models.js'); // Adjust path to models file
const router = express.Router();

// ========================= GET ============================

router.get('/topics', async (req, res) => {
  try {
    const topics = await Topic.find(); // Use Mongoose model to query
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching topics' });
  }
});

// Get all notes for a specific topics
router.get('/topics/:topicId/notes', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId).populate('notes'); // Populate notes
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notes' });
  }
});

// Get a specific note for a specific topics
router.get('/topics/:topicId/notes/:noteId', async (req, res) => {
  try {
    // Find the topics by its ID and populate the 'notes' field
    const topic = await Topic.findById(req.params.topicId).populate('notes');
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    // Find the specific note in the populated notes array
    const note = topic.notes.find(note => note._id.toString() === req.params.noteId);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching note' });
  }
});


// ==================== POST ==========================

// Create a new topics
router.post('/add/topics', async (req, res) => {
  const { name } = req.body;  // Extract 'name' from the request body

  // Create new topics object with 'name' field
  const newTopic = new Topic({ name });

  try {
    // Check if the topic already exists
    const existingTopic = await Topic.findOne({ name });
    if (existingTopic) {
      return res.status(400).json({ error: 'Topic already exists' });
    }

    // Save the new topic if no duplicates are found
    const savedTopic = await newTopic.save();
    return res.status(201).json(savedTopic);

  } catch (error) {
    console.error('Error:', error);  // Log the error for debugging
    return res.status(500).json({ error: 'An error occurred while creating the topic' });
  }
});



// Add a note to a topics
router.post('/add/topics/:topicId/notes', async (req, res) => {
  const { title, content } = req.body;

  try {
    // Check if the topics exists
    const topic = await Topic.findById(req.params.topicId);
    if (!topic) {
      return res.status(404).json({ error: 'topic not found' });
    }

    // Create and save the note
    const note = new Note({ title, content, topic: req.params.topicId });
    const savedNote = await note.save();

    // Update the topics's notes
    topic.notes.push(savedNote._id);
    await topic.save();

    res.status(201).json(savedNote);
  } catch (error) {
    console.error('Error adding note to topic:', error);
    res.status(400).json({ error: 'Error adding note to topic' });
  }
});




// ================================ PUT =====================================

router.put('/topics/:topicId/notes/:noteId', async (req, res) => {
  const { title, content } = req.body;

  try {
    // Check if the topic exists
    const topic = await Topic.findById(req.params.topicId);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    // Find the note by its ID
    const note = await Note.findById(req.params.noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Update the note fields only if they are different
    note.title = title !== note.title ? title : note.title;
    note.content = content;

    // Save the updated note
    const savedNote = await note.save();

    res.status(200).json(savedNote); // Send back the updated note
  } catch (error) {
    console.error('Error editing note for topic:', error);
    res.status(500).json({ error: 'Error editing note for topic' });
  }
});

// ================================ DELETE =====================================

router.delete("/topics/:topicId/notes/del", async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.topicId);

    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).send({ message: "Error deleting topic", error });
  }
});


router.delete("/topics/:topicId/notes/:noteId", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    const note = await Note.findByIdAndDelete(req.params.noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).send({message: "Error deleting note", error})
  }
});

module.exports = router;
