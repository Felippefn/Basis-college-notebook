import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrLinkPrevious } from "react-icons/gr";
import { GrAdd } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

function ManageNotes() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function
  // Fetch subjects from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/topics')
      .then(res => setTopics(res.data))
      .catch(err => console.error(err));
  }, []);

  return (

    <div className='container'>
      <GrLinkPrevious onClick={() => navigate(-1)}
        style={{ cursor: 'pointer', fontSize: '24px' , margin:'0px',}} />
      <h1>Your Topics</h1>
      {topics.map(topic => (
        <div key={topic._id}>
          <h2><GrAdd fontSize={"25px"} /> {topic.name}</h2>
          <a href={`/topics/${topic._id}/notes`}>View Notes</a>
        </div>
      ))}
    </div>
  );
}


export default ManageNotes;
