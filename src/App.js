// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import logo from "./logo/SLAAKS_LOGO.png";
import TutorImage from "./logo/Tutor.png";
import StudentImage from "./logo/Student.png";
import githubLogo from "./logo/github.png";
import LandingPage from "./components/LandingPage.js";
import TutorLogin from "./components/TutorLogin.js";
import StudentLogin from "./components/StudentLogin.js";
import TutorSignup from "./components/TutorSignup.js";
import StudentSignup from "./components/StudentSignup.js";
import StudentDashboard from "./components/StudentDashboard.js";
import StudentSelect from "./components/StudentSelect.js";
import StudentAppointment from "./components/StudentAppointment.js";
import StudentMyFavorites from "./components/StudentMyFavorites.js";
import StudentMySchedule from "./components/StudentMySchedule.js";
import TutorDashboard from "./components/TutorDashboard.js";
import TutorCalendar from "./components/TutorCalendar.js";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/system";
import { UserProvider } from './UserContext.js';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { data } from "./components/Data.js";

// Define the theme
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#c7b94c", // Main shade of blue color
    },
    secondary: {
      main: "#afc782", // Main shade of pink color
    },
  },
});

function App() {
    return (
      <UserProvider>
        <Router>
          <div className="App">
            <div
              style={{
                position: "fixed", // Changed from absolute to fixed
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundImage: `url(${require("./logo/bg.jpg")})`,
                backgroundSize: "cover",
                width: "100%",
                height: "100%",
                zIndex: -1, // Added a negative z-index
              }}
            />
            <header className="App-header">
              <img src={logo} alt="SLAAKS Logo" className="App-logo" />

              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/landing/:type" element={<LandingPage />} />
                <Route path="/StudentSignup" element={<StudentSignup />} />
                <Route path="/TutorSignup" element={<TutorSignup />} />
                <Route path="/StudentLogin" element={<StudentLogin />} />
                <Route path="/TutorLogin" element={<TutorLogin />} />
                <Route path="/StudentDashboard" element={<StudentDashboard />} />
                <Route path="/StudentSelect" element={<StudentSelect />} />
                <Route
                  path="/StudentAppointment"
                  element={<StudentAppointment />}
                />
                <Route
                  path="/StudentMyFavorites"
                  element={<StudentMyFavorites />}
                />
                <Route path="/StudentMySchedule" element={<StudentMySchedule />} />
                <Route path="/TutorDashboard" element={<TutorDashboard />} />
                <Route path="/TutorCalendar" element={<TutorCalendar />} />
              </Routes>
              {/* Footer */}
              <footer
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  position: "absolute",
                  bottom: "0",
                  width: "calc(100% - 20px)",
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                <div style={{ fontSize: "12px", color: "white" }}>
                  Copyright C UTDallas CS 4485 Project
                </div>
                <div style={{ textAlign: "right", fontSize: "12px" }}>
                  <a
                    href="https://github.com/shrijxn/CS4485project/tree/master"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={githubLogo}
                      alt="GitHub"
                      style={{ width: "120px", height: "40px" }}
                    />
                  </a>
                </div>
              </footer>
            </header>
          </div>
        </Router>
    </UserProvider>
  );
}

function MainPage() {
  return (
    <div style={{ textAlign: "center" }}>
      {" "}
      <div className="header2-animated-text">Select your option below</div>
      <Link
        to="/landing/Tutor"
        style={{ textDecoration: "none", marginRight: "32px" }}
      >
        <Button
          startIcon={
            <img
              src={TutorImage}
              alt="Tutor"
              style={{ width: "100px", height: "100px" }}
            />
          }
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            mr: 5,
            "&:hover": {
              backgroundColor: defaultTheme.palette.primary.main,
              borderColor: defaultTheme.palette.primary.main,
            },
          }}
        >
          Tutor
        </Button>
      </Link>
      <Link to="/landing/Student" style={{ textDecoration: "none" }}>
        <Button
          endIcon={
            <img
              src={StudentImage}
              alt="Student"
              style={{ width: "100px", height: "100px" }}
            />
          }
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            mr: 65,
            "&:hover": {
              backgroundColor: defaultTheme.palette.secondary.main,
              borderColor: defaultTheme.palette.secondary.main,
            },
          }}
        >
          Student
        </Button>
      </Link>
    </div>
  );
}

export default App;
