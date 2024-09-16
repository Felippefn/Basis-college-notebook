import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrLinkPrevious } from "react-icons/gr";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function TopicNotesPageNote() {
  const { topicId } = useParams(); // Get subjectId from the URL
  const [notes, setNotes] = useState([]);
  const [topic, setTopic] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function
  // Fetch notes for the Topic using the actual subjectId
  useEffect(() => {
    axios.get(`http://localhost:5000/api/topics/${topicId}/notes`)
      .then(res => setNotes(res.data.notes))
      .catch(err => console.error(err));
  }, [topicId]); // Add subjectId as a dependency to refetch when it changes

  useEffect(() => {
    axios.get(`http://localhost:5000/api/topics/${topicId}/notes/`)
      .then(res => {
        setTopic(res.data.name)
      })
      .catch(err => console.error(err));
  }, [topicId]);

  return (
    <div className='container'>
       <GrLinkPrevious onClick={() => navigate(-1)}
           className="back-button"/>
      <h1>{topic}</h1>
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
