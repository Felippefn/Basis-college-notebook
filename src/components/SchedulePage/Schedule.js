import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrLinkPrevious } from "react-icons/gr";
import { Button } from 'react-bootstrap';

function Schedule() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]); // Define state for schedules
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isBlue, setIsBlue] = useState(false); // Moved state here

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const getCurrentDay = (date) => {
    return daysOfWeek[date.getDay()];
  };

  useEffect(() => {
    fetch('http://localhost:5000/json/schedules')
      .then(response => response.json())
      .then(data => setSchedules(data))
      .catch(error => console.error('Error fetching schedules:', error));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const checkIfDaysMatches = () => {
    for (let i = 0; i < daysOfWeek.length; i++) { // Declare i with let
      if (getCurrentDay(currentDate) === daysOfWeek[i]) {
        document.getElementById(daysOfWeek[i]);

        return true; // Match found
      }
    }
    return false; // No match found
  };

  // Ensure handleColorChange is defined before it is called
  const handleColorChange = () => {
    const result = checkIfDaysMatches(); // Check condition
    setIsBlue(result); // Set the state based on the condition
  };

  return (
    <div>
      <div className='container'>
        <GrLinkPrevious onClick={() => navigate(-1)} className="back-button" />
        <h1>{formatDate(currentDate)}</h1>
        <div className={`row p-1 mt-5 schedule-row ${isBlue ? 'activate' : ''}`}> {/* Conditional blue class */}
          <div className='col'>
            <input id='text-val'/>
            <Button onClick={handleColorChange}>{getCurrentDay(currentDate)}</Button>
          </div>
          {daysOfWeek.map((days, index) => (
            <div className='col' id={days} key={index}><div className='schedule-row-dayWeek'>{days}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
