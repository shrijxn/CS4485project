import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function LandingPage() {
    const { type } = useParams(); // will be either 'student' or 'tutor'

    return (
        <div>
            <h2>Welcome to the {type.charAt(0).toUpperCase() + type.slice(1)} Section</h2>
            <p>Select your option below:</p>
            <Link to={`/${type}Signup`} style={{ textDecoration: 'none', marginRight: '16px' }}>
                <Button variant="contained" color="primary">
                    New {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
            </Link>
            <Link to={`/${type}Login`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary">
                    Returning {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
            </Link>
        </div>
    );
}

export default LandingPage;
