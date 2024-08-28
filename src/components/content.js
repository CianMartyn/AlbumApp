import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import vinylImage from './assets/vinyl.jpg';

function Content() {
    return (
        <div className="content">
            {/* Hero Section */}
            <section className="hero-section" style={heroSectionStyle}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h1 style={heroTitleStyle}>Discover and Share Your Favorite Albums</h1>
                            <p style={heroSubtitleStyle}>
                                Explore top-rated albums, share your own music taste, and connect with fellow music lovers.
                            </p>
                            <Button variant="primary" href="/publish" size="lg" style={heroButtonStyle}>
                                Start Exploring
                            </Button>
                        </Col>
                        <Col md={6}>
                            <img
                                src={vinylImage} 
                                alt="Music"
                                style={heroImageStyle}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="featured-albums-section" style={featuredSectionStyle}>
                <Container>
                    <Row>
                        <Col md={4}>
                            <Card style={albumCardStyle}>
                                <Card.Body>
                                    <Card.Title>Keep track of your favourite albums</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card style={albumCardStyle}>
                                <Card.Body>
                                    <Card.Title>Rate each album on a 5-star scale</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card style={albumCardStyle}>
                                <Card.Body>
                                    <Card.Title>Write and share reviews</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section" style={ctaSectionStyle}>
                <Container className="text-center">
                    <h2 style={ctaTitleStyle}>Ready to Share Your Own Collection?</h2>
                    <Button variant="success" href="/create" size="lg" style={ctaButtonStyle}>
                        Share Your Album
                    </Button>
                </Container>
            </section>
        </div>
    );
}

// Styles
const heroSectionStyle = {
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '100px 0',
    textAlign: 'left',
};

const heroTitleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
};

const heroSubtitleStyle = {
    fontSize: '1.25rem',
    marginBottom: '30px',
};

const heroButtonStyle = {
    padding: '10px 20px',
    fontSize: '1.2rem',
};

const heroImageStyle = {
    width: '100%',
    borderRadius: '10px',
};

const featuredSectionStyle = {
    backgroundColor: '#f8f9fa',
    padding: '50px 0',
    textAlign: 'center',
};

const sectionTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '40px',
};

const albumCardStyle = {
    marginBottom: '30px',
};

const ctaSectionStyle = {
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '50px 0',
    textAlign: 'center',
};

const ctaTitleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
};

const ctaButtonStyle = {
    padding: '10px 20px',
    fontSize: '1.2rem',
};

export default Content;
