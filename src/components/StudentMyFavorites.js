// StudentMyFavorits.js

import React, { useState, useEffect } from 'react';

function StudentMyFavorites() {
  // Sample database of tutors
  const tutorsDB = [
    { id: 1, name: 'Tutor 1' },
    { id: 2, name: 'Tutor 2' },
    { id: 3, name: 'Tutor 3' },
    { id: 4, name: 'Tutor 4' },
    { id: 5, name: 'Tutor 5' },
    { id: 6, name: 'Tutor 6' },
    { id: 7, name: 'Tutor 7' },
    { id: 8, name: 'Tutor 8' },
    { id: 9, name: 'Tutor 9' },
    { id: 10, name: 'Tutor 10' },
  ];

  // States
  const [favorites, setFavorites] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showTutors, setShowTutors] = useState(false);

  // add tutor to favorites list
  const handleAddToFavorites = (tutor) => {
    if (!favorites.some(fav => fav.id === tutor.id)) {
      setFavorites([...favorites, tutor]);
    }
    setShowTutors(false);
  };

  // remove tutor from favorites list
  const handleRemoveFromFavorites = () => {
    if (selectedTutor) {
      setFavorites(favorites.filter(tutor => tutor.id !== selectedTutor.id));
      setSelectedTutor(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedTutor && !event.target.closest('.favorites-list') && !event.target.closest('.buttons')) {
        setSelectedTutor(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedTutor]);
  
  return (
    <div>
      <h1>My Favorite Tutors</h1>

      <ul className="favorites-list" style={{backgroundColor: 'white'}}>
        {favorites.map(tutor => (
          <li key={tutor.id} onClick={() => setSelectedTutor(tutor)} style={selectedTutor && selectedTutor.id === tutor.id ? { background: 'lightgray', color: 'black' } : {color: 'black'}}>
            {tutor.name}
          </li>
        ))}
      </ul>

      <div className="buttons">
        <button onClick={() => setShowTutors(true)}>Add</button>
        <button onClick={handleRemoveFromFavorites} disabled={!selectedTutor}>Remove</button>
      </div>

      {showTutors && (
        <div style={{border: '1px solid black', width: '200px', position: 'absolute', backgroundColor: 'white', zIndex: 1000}}>
          <ul style={{fontSize: 'smaller', listStyle: 'none', padding: 0, margin: 0}}>
            {tutorsDB.map(tutor => (
              <li key={tutor.id} 
                  onClick={() => handleAddToFavorites(tutor)} 
                  style={{padding: '5px', cursor: 'pointer', color: 'black'}}
                  onMouseEnter={e => e.target.style.backgroundColor = 'lightgray'}
                  onMouseLeave={e => e.target.style.backgroundColor = 'white'}>
                {tutor.name}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowTutors(false)} style={{display: 'block', margin: '0 auto'}}>Close</button>
        </div>
      )}
    </div>
  );
}

export default StudentMyFavorites;
