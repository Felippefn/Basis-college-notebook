import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SubjectNotesPageNote() {
  const { subjectId } = useParams(); // Get subjectId from the URL
  const [notes, setNotes] = useState([]);

  // Fetch notes for the subject using the actual subjectId
  useEffect(() => {
    axios.get(`http://localhost:5000/api/subjects/${subjectId}/notes`)
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, [subjectId]); // Add subjectId as a dependency to refetch when it changes

  return (
    <div className='container'>
      <h1>Notes for Subject</h1>
      {notes.length > 0 ? (
        notes.map(note => (
          <div  key={note._id}> {/* Assign unique key */}
            <a href={`notes/${note._id}`}>{note.title} | {note.updatedAt}</a>
          </div>
        ))
      ) : (
        <p>No notes available.</p> // Handle the case when there are no notes
      )}
    </div>
  );
}

export default SubjectNotesPageNote;
