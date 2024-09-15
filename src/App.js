import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import your other components
import Home from './components/Home';
import SubjectNotesPage from './components/NotesPage/SubjectNotesPage'; // Create this component to display notes
import Schedule from './components/Schedule'
import Event from './components/Event'
import ToDoList from './components/ToDoList'
import './components/css/home.css'
import ManageNotes from './components/NotesPage/ManageNotes';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-notes" element={<ManageNotes />} />
        <Route path="/subjects/:subjectId/notes" element={<SubjectNotesPage />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/event" element={<Event />} />
        <Route path="/todo-list" element={<ToDoList />} />
      </Routes>
    </Router>
  );
}

export default App;
