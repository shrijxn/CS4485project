// StudentDashboard.js

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
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
        <div>
            <h3>Student Dashboard</h3>
            <Link to="/StudentMyFavorites" style={{ textDecoration: 'none', marginRight: '16px' }}>
                <Button
                    style={{ backgroundColor: 'yellow', color: 'black' }}
                >
                    My Favorites
                </Button>
            </Link>
            <Link to="/StudentMySchedule" style={{ textDecoration: 'none' }}>
                <Button
                    style={{ backgroundColor: 'pink', color: 'black' }}
                >
                    My Schedule
                </Button>
            </Link>
        </div>
    );

}




export default StudentDashboard;

