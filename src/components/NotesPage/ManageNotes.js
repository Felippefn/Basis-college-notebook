import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrAdd } from "react-icons/gr";


function ManageNotes() {
  const [subjects, setSubjects] = useState([]);

  // Fetch subjects from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/subjects')
      .then(res => setSubjects(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className='container'>
      <h1>Your Subjects</h1>
      {subjects.map(subject => (
        <div key={subject._id}>
          <h2><GrAdd fontSize={"25px"} /> {subject.name}</h2>
          <a href={`/subjects/${subject._id}/notes`}>View Notes</a>
        </div>
      ))}
    </div>
  );
}


export default ManageNotes;
