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
            <strong>{Hello()}</strong> Welcome to the first version of Basis, enjoy!
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
      </div>
      <div className="container icons-home">
        <div className="row">
          <a href='/manage-notes' className="col tagHome">
            <GrAdd fontSize={"100px"} />
            <p>Manage Notes</p>
          </a>
          <a href='/schedule' className="col tagHome">
            <GrSchedules fontSize={"100px"} />
            <p>Check Schedule</p>
          </a>
          <a href='/todo-list' className="col tagHome">
            <GrList fontSize={"100px"} />
            <p>To-Do List</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
