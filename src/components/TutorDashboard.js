import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom'; 

function TutorDashboard() {
  return( 
    <>
      <h2>Tutor Dashboard</h2>
      <div>Total Hours: </div>
      <Link to="/TutorCalendar">
        <Icon.CalendarWeek size={200} style={{marginTop: '30px', color: 'white'}} />
      </Link>
    </>
  );
}

export default TutorDashboard;
