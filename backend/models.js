//backend/models.js

const mongoose = require('mongoose');

// Define the Note schema
const noteSchema = new mongoose.Schema({
    topic: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true }],
    title: String,
    content: String,
}, { timestamps: true }); // This will add createdAt and updatedAt fields automatically

// Define the Topic schema
const topicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note', default: null }],  // Referencing the Note model
});


// Create the models
const Note = mongoose.model('Note', noteSchema);
const Topic = mongoose.model('Topic', topicSchema);


module.exports = { Note, Topic};
