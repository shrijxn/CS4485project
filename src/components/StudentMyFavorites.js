// StudentMyFavorits.js

import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/system";
import AddImage from "../logo/add.png";
import RemoveImage from "../logo/remove.png";

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


function StudentMyFavorites() {
  // Sample database of tutors
  const tutorsDB = [
    { id: 1, name: "Tutor 1" },
    { id: 2, name: "Tutor 2" },
    { id: 3, name: "Tutor 3" },
    { id: 4, name: "Tutor 4" },
    { id: 5, name: "Tutor 5" },
    { id: 6, name: "Tutor 6" },
    { id: 7, name: "Tutor 7" },
    { id: 8, name: "Tutor 8" },
    { id: 9, name: "Tutor 9" },
    { id: 10, name: "Tutor 10" },
  ];

  // States
  const [favorites, setFavorites] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  // Refs for the lists
  const tutorsListRef = useRef(null);
  const favoritesListRef = useRef(null);

  // Add tutor to favorites list
  const handleAddToFavorites = () => {
    if (
      selectedTutor &&
      !favorites.some((fav) => fav.id === selectedTutor.id)
    ) {
      setFavorites([...favorites, selectedTutor]);
      setSelectedTutor(null);
    }
  };

  // Remove tutor from favorites list
  const handleRemoveFromFavorites = () => {
    if (selectedFavorite) {
      setFavorites(
        favorites.filter((tutor) => tutor.id !== selectedFavorite.id)
      );
      setSelectedFavorite(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tutorsListRef.current &&
        !tutorsListRef.current.contains(event.target) &&
        favoritesListRef.current &&
        !favoritesListRef.current.contains(event.target)
      ) {
        setSelectedTutor(null);
        setSelectedFavorite(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buttonStyle = (isActive) => ({
    color: isActive ? "white" : "gray",
    borderColor: isActive ? "white" : "gray",
    mb: 1,
    "&:hover": isActive && {
      backgroundColor: defaultTheme.palette.secondary.main,
      borderColor: defaultTheme.palette.secondary.main,
    },
    "&.Mui-disabled": {
      color: "gray",
      borderColor: "gray",
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <div ref={tutorsListRef} style={{ marginRight: "20px" }}>
        <Button
          startIcon={
            <img
              src={AddImage}
              alt="Add"
              style={{ width: "30px", height: "25px" }}
            />
          }
          variant="outlined"
          onClick={handleAddToFavorites}
          disabled={!selectedTutor}
          sx={buttonStyle(selectedTutor)}
        >
          Add
        </Button>
        <h2 className="animated-text">Tutors List</h2>
        <ul
          ref={tutorsListRef}
          style={{
            border: "1px solid white",
            listStyle: "none",
            padding: "10px",
          }}
        >
          {tutorsDB.map((tutor) => (
            <li
              key={tutor.id}
              onClick={() => setSelectedTutor(tutor)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedTutor && selectedTutor.id === tutor.id
                    ? "#afc782"
                    : "transparent",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor =
                  defaultTheme.palette.secondary.main)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor =
                  selectedTutor && selectedTutor.id === tutor.id
                    ? "#afc782"
                    : "transparent")
              }
            >
              {tutor.name}
            </li>
          ))}
        </ul>
      </div>

      <div ref={favoritesListRef} style={{ marginRight: "600px" }}>
        <Button
          endIcon={
            <img
              src={RemoveImage}
              alt="Remove"
              style={{ width: "20px", height: "20px" }}
            />
          }
          variant="outlined"
          onClick={handleRemoveFromFavorites}
          disabled={!selectedFavorite}
          sx={buttonStyle(selectedFavorite)}
        >
          Remove
        </Button>
        <h2 className="animated-text">My Favorite Tutors</h2>
        <ul
          ref={favoritesListRef}
          style={{
            border: "1px solid white",
            listStyle: "none",
            padding: "10px",
          }}
        >
          {favorites.map((tutor) => (
            <li
              key={tutor.id}
              onClick={() => setSelectedFavorite(tutor)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedFavorite && selectedFavorite.id === tutor.id
                    ? "#afc782"
                    : "transparent",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor =
                  defaultTheme.palette.secondary.main)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor =
                  selectedFavorite && selectedFavorite.id === tutor.id
                    ? "#afc782"
                    : "transparent")
              }
            >
              {tutor.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentMyFavorites;
