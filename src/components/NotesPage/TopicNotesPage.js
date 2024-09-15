import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrLinkPrevious } from "react-icons/gr";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function TopicNotesPageNote() {
  const { topicId } = useParams(); // Get subjectId from the URL
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function
  // Fetch notes for the Topic using the actual subjectId
  useEffect(() => {
    axios.get(`http://localhost:5000/api/topics/${topicId}/notes`)
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, [topicId]); // Add subjectId as a dependency to refetch when it changes

  return (
    <div className='container'>
      <GrLinkPrevious onClick={() => navigate(-1)}
        style={{ cursor: 'pointer', fontSize: '24px' }} />
      <h1>Notes for Topic</h1>
      {notes.length > 0 ? (
        notes.map(note => (
          <div key={note._id}> {/* Assign unique key */}
            <a href={`notes/${note._id}`}>{note.title} | {note.updatedAt}</a>
          </div>
        ))
      ) : (
        <p>No notes available.</p> // Handle the case when there are no notes
      )}
    </div>
  );
}

export default TopicNotesPageNote;
