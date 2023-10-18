// StudentDashboard.js

import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import {data} from './Data.js'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function StudentDashboard() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Student Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">My favorites</Nav.Link>
            <Nav.Link href="#features">My Schedule</Nav.Link>
        
          </Nav>
        </Container>
      </Navbar> 
    </>
  );
}



export default StudentDashboard;

