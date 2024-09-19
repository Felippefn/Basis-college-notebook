import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrLinkPrevious } from "react-icons/gr";
import { GrAdd } from "react-icons/gr";
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
    // Logic for adding a topic can go here
    axios.post(`http://localhost:5000/api/add/topics`, {
      name: topicName 
    })
      .then(res => {
        setTopics([...topics, res.data]); // Update the list with the new topic
        setTopicName(''); // Clear the input field after adding
      })
      .catch(err => console.error(err)); 
    console.log("Added topic:", topicName);
    setShowAddTopic(false); // Hide the form after adding
  };

  return (

    <div className='container'>
      <GrLinkPrevious onClick={() => navigate(-1)}
        className="back-button" />
      <h1 style={{ padding: '30px' }}>Your Topics <Button onClick={handleAddTopic} variant="light">
        Add Topic
      </Button></h1>

      {topics.map(topic => (
        <div key={topic._id}>
          <h2><GrAdd fontSize={"25px"} /> {topic.name}</h2>
          <a href={`/topics/${topic._id}/notes`}>View Notes</a>
        </div>

      ))}
      {showAddTopic && (
        <div className="comment-insert-display-box">
          <div style={{ padding: 0, margin: 0 }} className="comment-insert-box">
            <textarea 
              style={{ zIndex: 1000, display: 'flex' }} 
              id="insertComment" 
              name="insertComment" 
              placeholder="Enter topic name"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
            ></textarea>
            <button onClick={handleConfirmAddTopic} 
              style={{ zIndex: 10001, position: 'relative', cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}>
              <i style={{ color: '#00AF54', fontSize: '26px', zIndex: 2 }} className="material-icons">check</i>
            </button>
            <button onClick={handleCancelAddTopic} 
              style={{ zIndex: 10001, position: 'relative', cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}>
              <i style={{ color: '#DB2B39', fontSize: '26px', zIndex: 2 }} className="material-icons">clear</i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default ManageNotes;
