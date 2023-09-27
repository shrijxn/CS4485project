// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import './App.css';
import TutorLogin from './components/TutorLogin.js';
import StudentLogin from './components/StudentLogin.js';
import StudentDashboard from './components/StudentDashboard.js';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2>UTD Online Tutoring Platform</h2>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Tutorlogin" element={<TutorLogin />} />
            <Route path="/Studentlogin" element={<StudentLogin />} />
            <Route path="/StudentDashboard" element={<StudentDashboard />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

function MainPage() {
  return (
    <div>
      <Link to="/Tutorlogin">
        <button>Tutor</button>
      </Link>
      <Link to="/Studentlogin">
        <button>Student</button>
      </Link>
    </div>
  );
}

export default App;