import React from 'react';
import { GrAdd } from "react-icons/gr";
import { GrSchedules } from "react-icons/gr";
import { GrCalendar } from "react-icons/gr";
import { GrList } from "react-icons/gr";

function Hello(){
  const a = "Hello World!"
  
  return a
}

function Home() {
  return (
    <div>
      <h1 className='title-page'>Welcome!</h1>
      <div className="container">
        <div className="row justify-content-center mb-5 mt-0">
          <div className="alert alert-secondary alert-dismissible fade show col-3 text-center" role="alert">
            <strong>{Hello()}</strong> You should check in on some of those fields below.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
      </div>
      <div className="container icons-home">
        <div className="row">
          <div className="col">
            <GrAdd fontSize={"100px"} />
            <p>Add Notes</p>
          </div>
          <div className="col">
            <GrSchedules fontSize={"100px"} />
            <p>Check Schedule</p>
          </div>
          <div className="col">
            <GrCalendar fontSize={"100px"} />
            <p>Events</p>
          </div>
          <div className="col">
            <GrList fontSize={"100px"} />
            <p>To-Do List</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
