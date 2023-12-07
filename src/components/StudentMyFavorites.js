// StudentMyFavorits.js

import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/system";
import AddImage from "../logo/add.png";
import RemoveImage from "../logo/remove.png";
import { useUser } from '../UserContext';

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
    const { user } = useUser(); // Retrieve user data
    const [tutors, setTutors] = useState([]);
    const [favorites, setFavorites] = useState([]);
  // States
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  // Refs for the lists
  const tutorsListRef = useRef(null);
  const favoritesListRef = useRef(null);

  // Fetch tutors and favorites on component mount
  useEffect(() => {
    fetchTutors();
    fetchFavorites();
  }, []);

 const refreshLists = () => {
     fetchTutors();
     fetchFavorites();
 };


    const fetchTutors = () => {

        // Check if user email is available
        if (user && user.email) {
            fetch("http://localhost:5000/api/nonfavlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: user.email }),
            })
                .then(response => response.json())
                .then(data => setTutors(data))
                .catch(error => console.error("Error fetching non-favorite tutors:", error));
        } else {
            console.error("User email is not available for fetching tutors");
        }
    };

    const fetchFavorites = () => {

        // Check if user email is available
        if (user && user.email) {
            fetch("http://localhost:5000/api/favlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: user.email }),
            })
                .then(response => response.json())
                .then(data => setFavorites(data))
                .catch(error => console.error("Error fetching favorite tutors:", error));
        } else {
            console.error("User email is not available for fetching favorites");
        }
    };


    const handleAddToFavorites = () => {

        if (selectedTutor && !favorites.some((fav) => fav.id === selectedTutor.id) && user && user.email) {
            const payload = {
                s_email: user.email,
                t_email: selectedTutor.email // Assuming 'email' is the property for the tutor's email
            };

            fetch("http://localhost:5000/api/addfavtutor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then(response => response.text())
                .then(data => {
                    if (data === "SUCCESS") {
                        setFavorites([...favorites, selectedTutor]);
                    } else {
                        alert("Failed to add favorite tutor");
                    }
                })
                .catch(error => console.error("Error adding favorite tutor:", error));

            setSelectedTutor(null);
        }
        refreshLists();
    };

    const handleRemoveFromFavorites = () => {

        if (selectedFavorite && user && user.email) {
            const payload = {
                s_email: user.email,
                t_email: selectedFavorite.email
            };

            fetch("http://localhost:5000/api/remfavtutor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then(response => response.text())
                .then(data => {
                    if (data === "SUCCESS") {
                        setFavorites(favorites.filter((tutor) => tutor.id !== selectedFavorite.id));
                    } else {
                        alert("Failed to remove favorite tutor");
                    }
                })
                .catch(error => console.error("Error removing favorite tutor:", error));

            setSelectedFavorite(null);
        }
        refreshLists();
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
    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
        <div ref={tutorsListRef} style={{ marginRight: "20px" }}>
            <Button
                startIcon={<img src={AddImage} alt="Add" style={{ width: "30px", height: "25px" }} />}
                variant="outlined"
                onClick={handleAddToFavorites}
                disabled={!selectedTutor}
                sx={buttonStyle(selectedTutor)}
            >
                Add
            </Button>
            <h2 className="animated-text">Tutors List</h2>
            <ul ref={tutorsListRef} style={{ border: "1px solid white", listStyle: "none", padding: "10px" }}>
                {tutors.map((tutor) => (
                    <li
                        key={tutor.email} // Use email as the unique key
                        onClick={() => setSelectedTutor(tutor)}
                        style={{
                            cursor: "pointer",
                            backgroundColor: selectedTutor && selectedTutor.email === tutor.email ? "#afc782" : "transparent",
                        }}
                    >
                        {tutor.firstName} {tutor.lastName} {/* Display first and last name */}
                    </li>
                ))}
            </ul>
        </div>

        <div ref={favoritesListRef} style={{ marginRight: "600px" }}>
            <Button
                endIcon={<img src={RemoveImage} alt="Remove" style={{ width: "20px", height: "20px" }} />}
                variant="outlined"
                onClick={handleRemoveFromFavorites}
                disabled={!selectedFavorite}
                sx={buttonStyle(selectedFavorite)}
            >
                Remove
            </Button>
            <h2 className="animated-text">My Favorite Tutors</h2>
            <ul ref={favoritesListRef} style={{ border: "1px solid white", listStyle: "none", padding: "10px" }}>
                {favorites.map((tutor) => (
                    <li
                        key={tutor.email} // Use email as the unique key
                        onClick={() => setSelectedFavorite(tutor)}
                        style={{
                            cursor: "pointer",
                            backgroundColor: selectedFavorite && selectedFavorite.email === tutor.email ? "#afc782" : "transparent",
                        }}
                    >
                        {tutor.firstName} {tutor.lastName} {/* Display first and last name */}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
};

export default StudentMyFavorites;