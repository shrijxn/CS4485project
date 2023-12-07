// StudentDashboard.js

import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/system";
import "bootstrap/dist/css/bootstrap.min.css";
import MyFavoritesImage from "../logo/favorite.png";
import MyScheduleImage from "../logo/calendar.png";
import { useUser } from "../UserContext";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#c7b94c",
    },
    secondary: {
      main: "#afc782",
    },
  },
});

function StudentDashboard() {
  const { user } = useUser(); // Retrieve user data
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '450px', marginLeft: '20px' }}>
                <h2 className="header-animated-text">Student Dashboard</h2>
                <div style={{ textAlign: 'right' }}>
                    <p>Welcome, {user?.email}</p> {/* Display the user's email */}
                </div>
            </div>
      <p className="header2-animated-text">Select your option below:</p>
      <Link
        to="/StudentMyFavorites"
        style={{ textDecoration: "none", marginRight: "32px" }}
      >
        <Button
          startIcon={
            <img
              src={MyFavoritesImage}
              alt="My Favorites"
              style={{ width: "80px", height: "80px" }}
            />
          }
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            mr: 2,
            "&:hover": {
              backgroundColor: defaultTheme.palette.secondary.main,
              borderColor: defaultTheme.palette.secondary.main,
            },
          }}
        >
          My Favorites
        </Button>
      </Link>
      <Link
        to="/StudentMySchedule"
        style={{ textDecoration: "none", marginRight: "600px" }}
      >
        <Button
          endIcon={
            <img
              src={MyScheduleImage}
              alt="My Schedule"
              style={{ width: "80px", height: "80px" }}
            />
          }
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              backgroundColor: defaultTheme.palette.secondary.main,
              borderColor: defaultTheme.palette.secondary.main,
            },
          }}
        >
          My Schedule
        </Button>
      </Link>
    </div>
  );
}

export default StudentDashboard;
