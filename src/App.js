import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import your other components
import Home from './components/Home';
import AddNote from './components/AddNote';
import List from './components/List';
import './components/css/home.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
