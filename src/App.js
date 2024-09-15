// college-notebook/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import your other components
import Home from './components/Home';
import IndexPageNote from './components/NotesPage/IndexPageNote';
import TopicNotesPage from './components/NotesPage/TopicNotesPage'; // Create this component to display notes
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
        <Route path="/topics/:topicId/notes" element={<TopicNotesPage />} />
        <Route path="/topics/:topicId/notes/:noteId" element={<IndexPageNote />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/event" element={<Event />} />
        <Route path="/todo-list" element={<ToDoList />} />
      </Routes>
    </Router>
  );
}

export default App;
