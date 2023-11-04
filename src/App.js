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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { data } from "./components/Data.js";

// Define the theme
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Main shade of blue color
    },
    secondary: {
      main: "#e91e63", // Main shade of pink color
    },
  },
});

function App() {
  return (
    <Router>
      <div className="App">
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundImage: `url(${require("./logo/bg.png")})`,
            backgroundSize: "cover",
            width: "500px",
            height: "500px",
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
            <div style={{ fontSize: "12px" }}>
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
  );
}

function MainPage() {
  return (
    <div style={{ textAlign: "center" }}>
      {" "}
      <div className="animated-text">Select your option below</div>
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
            color: defaultTheme.palette.primary.main,
            borderColor: defaultTheme.palette.primary.main,
            mr: 2,
            "&:hover": {
              backgroundColor: defaultTheme.palette.primary.main,
              color: "#fff",
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
            color: defaultTheme.palette.secondary.main,
            borderColor: defaultTheme.palette.secondary.main,
            "&:hover": {
              backgroundColor: defaultTheme.palette.secondary.main,
              color: "#fff",
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
