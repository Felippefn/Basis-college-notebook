import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrLinkPrevious } from "react-icons/gr";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


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

  // Function to format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const DeleteTopicAndRefresh = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/topics/${topicId}/notes/del`);

      if (response.status === 204) {
        navigate('/manage-notes'); // Navigate to manage-notes instead of going back
        window.location.reload(); // Refresh the page after navigating back
      }
    } catch (err) {
      console.error("Error deleting topic:", err);
    }
  };

  return (
    <div className='container'>
      < GrLinkPrevious onClick={() => navigate(-1)
      } className="back-button" />
      <h1 style={{ margin: "20px" }}>
        {topic}
        <Button onClick={() => {
          if (window.confirm('Delete this item?')) {
            DeleteTopicAndRefresh();
          } else {
            console.log('Cancellation confirmed');
          }
        }} className='btn-danger'>
          <FaRegTrashAlt style={{ fontSize: "25px" }} />
        </Button>
      </h1>

      {
        notes.length > 0 ? (
          notes.map(note => (
            <div style={{
              background: "white",
              fontSize: "20px",
              display: "flex",
              alignItems: "center", // Vertically align content
              justifyContent: "flex-start", // Align content to the start
              borderRadius: "15px",
              width: "80%", // Adjust width of the div
              padding: "10px 15px", // Add padding for spacing
              margin: "10px auto", // Center the div and add margin
              overflow: "visible",
            }} key={note._id}>
              <a style={{
                textDecoration: "none",
                color: "black",
                fontSize: "20px",
                display: "flex",
                alignItems: "center" // Vertically center text and icon
              }} href={`notes/${note._id}`}>
                <FaPencilAlt
                  style={{
                    color: "black",
                    marginRight: "10px",
                    marginTop: "0" // Remove top margin to center vertically
                  }}
                />
                {note.title} |
                <p style={{
                  textDecoration: "none",
                  color: "#2191FB",
                  marginLeft: "10px",
                  cursor: "none",
                  textShadow: "2px 3px 5px rgba(0,0,0,0.5)",
                  marginTop: "0", // Remove top margin to center vertically
                  marginBottom: "0" // Remove bottom margin for better centering
                }}>
                  Last updated: {formatDate(note.updatedAt)}
                </p>
              </a>
            </div>
          ))
        ) : (
          <p>No notes available.</p> // Handle the case when there are no notes
        )
      }
    </div >
  );
}

export default TopicNotesPageNote;
