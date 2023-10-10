// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import './App.css';
import LandingPage from './components/LandingPage.js';
import TutorLogin from './components/TutorLogin.js';
import StudentLogin from './components/StudentLogin.js';
import TutorSignup from './components/TutorSignup.js';
import StudentSignup from './components/StudentSignup.js';
import StudentDashboard from './components/StudentDashboard.js';
import TutorDashboard from './components/TutorDashboard.js';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


// Define the theme
const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Main shade of blue color
        },
        secondary: {
            main: '#e91e63', // Main shade of pink color
        },
    },
});

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h2>UTD Online Tutoring Platform</h2>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/landing/:type" element={<LandingPage />} />
                        <Route path="/StudentSignup" element={<StudentSignup />} />
                        <Route path="/TutorSignup" element={<TutorSignup />} />
                        <Route path="/StudentLogin" element={<StudentLogin />} />
                        <Route path="/TutorLogin" element={<TutorLogin />} />
                        <Route path="/StudentDashboard" element={<StudentDashboard />} />
                        <Route path="/TutorDashboard" element={<TutorDashboard />} />
                    </Routes>
                    {/* Footer */}
                    <footer style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px',
                        position: 'absolute',
                        bottom: '0',
                        width: 'calc(100% - 20px)',
                        backgroundColor: 'transparent',
                        color: 'white',
                    }}>
                        <div style={{ fontSize: '12px' }}>
                            Copyright C UTDallas CS 4485 Project
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '12px' }}>
                            <a href="https://github.com/shrijxn/CS4485project/tree/master"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none', color: 'white' }}>
                                Github
                            </a>
                        </div>
                    </footer>
                </header>
            </div>
        </Router>
    );
}




function MainPage() {
    return (
        <div>
            <Link to="/landing/Tutor" style={{ textDecoration: 'none', marginRight: '16px' }}>
                <Button
                    startIcon={<ArrowBackIosIcon />}
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                >
                    Tutor
                </Button>
            </Link>
            <Link to="/landing/Student" style={{ textDecoration: 'none' }}>
                <Button
                    endIcon={<ArrowForwardIosIcon />}
                    variant="contained"
                    color="secondary"
                >
                    Student
                </Button>
            </Link>
        </div>
    );
}


export default App;
