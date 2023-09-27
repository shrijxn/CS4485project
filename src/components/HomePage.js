import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="text-center mt-5">
      <h1 style={{ fontSize: '50pt' }}>Your App Name</h1>
      <Row className="mt-3">
        <Col>
        <Button variant="outline-light">Light</Button>{' '}
        </Col>
        <Col>
          <Button variant="primary" className="rounded-pill px-4 py-2">
            Button 2
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
