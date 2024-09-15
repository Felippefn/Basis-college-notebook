//backend/models.js

const mongoose = require('mongoose');

// Define the Note schema
const noteSchema = new mongoose.Schema({
    subject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true}],
    title: String,
    content: String,
}, { timestamps: true }); // This will add createdAt and updatedAt fields automatically

// Define the Subject schema
const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note', default: null }],  // Referencing the Note model
});

// Create the models
const Note = mongoose.model('Note', noteSchema);
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = { Note, Subject };
