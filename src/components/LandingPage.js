// LandingPage.js

import React from "react";
import { useParams, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import NewUserImage from "../logo/NewUser.png";
import ReturningUserImage from "../logo/ReturningUser.png";
import { createTheme } from "@mui/system";

// Define the theme
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

function LandingPage() {
  const { type } = useParams(); // will be either 'student' or 'tutor'
  const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div style={{ textAlign: "center" }}>
      <h2 className="header-animated-text">
        Welcome to the {typeCapitalized} Section
      </h2>
      <p className="header2-animated-text">Select your option below:</p>
      <Link
        to={`/${type}Signup`}
        style={{ textDecoration: "none", marginRight: "32px" }}
      >
        <Button
          startIcon={
            <img
              src={NewUserImage}
              alt="New User"
              style={{ width: "100px", height: "100px" }}
            />
          }
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              backgroundColor: defaultTheme.palette.primary.main,
              borderColor: defaultTheme.palette.primary.main,
            },
          }}
        >
          New {typeCapitalized}
        </Button>
      </Link>
      <Link
        to={`/${type}Login`}
        style={{ textDecoration: "none", marginRight: "650px" }}
      >
        <Button
          endIcon={
            <img
              src={ReturningUserImage}
              alt="Returning User"
              style={{ width: "100px", height: "100px" }}
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
          Returning {typeCapitalized}
        </Button>
      </Link>
    </div>
  );
}

export default LandingPage;
