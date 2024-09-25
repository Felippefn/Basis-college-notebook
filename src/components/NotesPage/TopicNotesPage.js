import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrLinkPrevious } from "react-icons/gr";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { GrAdd } from "react-icons/gr";

function TopicNotesPageNote() {
  const { topicId } = useParams(); // Destructure topicId from the useParams object
  const [notes, setNotes] = useState([]);
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAddTopic, setShowAddTopic] = useState(false); // Track form visibility
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch notes for the Topic using the actual topicId
  useEffect(() => {
    axios.get(`http://localhost:5000/api/topics/${topicId}/notes/`)
      .then(res => {
        setTopic(res.data.name);
        setNotes(res.data.notes); // Set notes after fetching
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

  const handleAddTopic = () => {
    setShowAddTopic(true); // Show the form
  };

  const handleCancelAddTopic = () => {
    setShowAddTopic(false); // Hide the form
  };

  const handleConfirmAddTopic = () => {
    axios.post(`http://localhost:5000/api/add/topics/${topicId}/notes`, { title, content })
      .then(res => {
        setNotes(prevNotes => [...prevNotes, res.data]); // Update notes list
        setTitle(''); // Clear title
        setContent(''); // Clear content
        setShowAddTopic(false); // Hide the form after adding
      })
      .catch(err => console.error(err));
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
      < GrLinkPrevious onClick={() => navigate(-1)} className="back-button" />
      <h1 style={{ margin: "20px" }}>
        {topic}
        <Button onClick={() => {
          if (window.confirm('Delete this item?')) {
            DeleteTopicAndRefresh();
          }
        }} className='btn-danger'>
          <FaRegTrashAlt style={{ fontSize: "25px" }} />
        </Button>
        <Button onClick={handleAddTopic} className='btn-primary'><GrAdd fontSize={"25px"} /></Button>
      </h1>

      {/* Form to add a new note */}
      {showAddTopic && (
        <div style={{
          margin: "20px 0",
          padding: "20px",
          width: "400px",
          background: "transparent", // Light background for the form
          borderRadius: "10px", // Rounded corners for the form
        }}>
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%", // Full-width input
              padding: "10px", // Spacing inside the input
              marginBottom: "10px", // Space between the input and textarea
              borderRadius: "8px", // Rounded corners
              border: "1px solid #ced4da", // Light grey border
              fontSize: "16px" // Font size adjustment
            }}
          />
          <textarea
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%", // Full-width textarea
              padding: "10px", // Spacing inside the textarea
              marginBottom: "10px", // Space between textarea and buttons
              borderRadius: "8px", // Rounded corners
              border: "1px solid #ced4da", // Light grey border
              fontSize: "16px", // Font size adjustment
              resize: "vertical", // Allow vertical resizing only
              minHeight: "100px" // Set a minimum height
            }}
          />
          <div style={{
            display: "flex",
            justifyContent: "flex-end", // Align buttons to the right
            gap: "10px" // Space between buttons
          }}>
            <Button
              variant="primary"
              onClick={handleConfirmAddTopic}
              style={{ padding: "10px 15px", borderRadius: "8px" }} // Button style adjustment
            >
              Add Note
            </Button>
            <Button
              variant="secondary"
              onClick={handleCancelAddTopic}
              style={{ padding: "10px 15px", borderRadius: "8px" }} // Button style adjustment
            >
              Cancel
            </Button>
          </div>
        </div>
      )}


      {
        notes.length > 0 ? (
          notes.map(note => (
            <div style={{
              background: "#f8f9fa", // Lighter background for the card
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
              borderRadius: "12px",
              width: "80%",
              padding: "15px 20px", // Adjusted padding for spacing
              margin: "15px auto", // Centered and spaced out divs
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Space between title and date
              transition: "transform 0.2s ease-in-out", // Hover effect
              cursor: "pointer"
            }}
              key={note._id}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"} // Slightly enlarge on hover
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"} // Reset on hover leave
            >
              <a style={{
                textDecoration: "none",
                color: "#343a40", // Dark grey for text
                display: "flex",
                alignItems: "center",
                flexGrow: 1 // Ensure flex for proper alignment
              }}
                href={`notes/${note._id}`}>
                <FaPencilAlt
                  style={{
                    color: "#007bff", // Blue color for the icon
                    marginRight: "10px"
                  }}
                />
                <span style={{
                  fontWeight: "bold", // Bold title
                  fontSize: "18px", // Slightly smaller font size for a cleaner look
                }}>
                  {note.title}
                </span>
              </a>
              <p style={{
                color: "#6c757d", // Muted color for the date
                marginLeft: "20px",
                fontSize: "14px", // Smaller font for the date
                textAlign: "right", // Align to the right
                marginBottom: "0"
              }}>
                Last updated: {formatDate(note.updatedAt)}
              </p>
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
