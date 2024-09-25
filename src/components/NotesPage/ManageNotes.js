import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrLinkPrevious } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ManageNotes() {
  const [topics, setTopics] = useState([]);
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [topicName, setTopicName] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch subjects from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/topics')
      .then(res => setTopics(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddTopic = () => {
    setShowAddTopic(true); // Show the form
  };

  const handleCancelAddTopic = () => {
    setShowAddTopic(false); // Hide the form
  };

  const handleConfirmAddTopic = () => {
    axios.post('http://localhost:5000/api/add/topics', { name: topicName })
      .then(res => {
        setTopics([...topics, res.data]); // Update the list with the new topic
        setTopicName(''); // Clear the input field after adding
      })
      .catch(err => console.error(err));
    setShowAddTopic(false); // Hide the form after adding
  };

  return (
    <div className='container'>
      {/* Back button */}
      <GrLinkPrevious onClick={() => navigate(-1)} className="back-button" />

      {/* Page heading with button */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '20px 0' }}>
        <h1 style={{ marginRight: '15px' }}>Your Topics</h1>
        <Button onClick={handleAddTopic} variant="light">Add Topic</Button>
      </div>

      {/* List of topics */}
      {topics.map(topic => (
        <div style={{ padding: 0, margin: "20px", display: 'flex' }} key={topic._id}>
        <h2 style={{ backgroundColor: 'white', color: 'black', padding: '5px 10px', borderRadius: '5px' }}>
          <a style={{ textDecoration: "none", color: "black" }} href={`/topics/${topic._id}/notes`}>
            <FaEye /> {topic.name} <span style={{ marginLeft: '10px' }}>{topic.notes.length}</span>
          </a>
        </h2>
      </div>
      ))}

      {/* Add topic modal */}
      {showAddTopic && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%', // Change to a percentage for better responsiveness
          maxWidth: '400px', // Set a maximum width
          backgroundColor: 'transparent',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 1000
        }}>
          <textarea
            style={{
              width: '100%',
              borderRadius: "15px",
              padding: "10px",
              margin: "10px 0",
              border: '1px solid #ccc',
              resize: 'none',
              height: '100px', // Set a fixed height for the textarea
            }}
            id="insertComment"
            name="insertComment"
            placeholder="Enter topic name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          ></textarea>

          {/* Action buttons for confirm and cancel */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
            <button onClick={handleConfirmAddTopic} style={{ backgroundColor: 'transparent', border: 'none' }}>
              <IoCheckmark style={{ color: '#00AF54', fontSize: "34px", cursor: 'pointer' }} />
            </button>
            <button onClick={handleCancelAddTopic} style={{ backgroundColor: 'transparent', border: 'none' }}>
              <IoClose style={{ color: '#DB2B39', fontSize: "34px", cursor: 'pointer' }} />
            </button>
          </div>
        </div>
      )}

      {/* Optional background overlay */}
      {showAddTopic && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
          zIndex: 999
        }} onClick={handleCancelAddTopic} />
      )}
    </div>
  );
}

export default ManageNotes;
