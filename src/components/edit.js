import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

function Edit() {
    const { id } = useParams();  // Get the album ID from the URL
    const [album, setAlbum] = useState(null);
    const [newRating, setNewRating] = useState(0);
    const [newReview, setNewReview] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedAlbums = JSON.parse(localStorage.getItem("ratedAlbums")) || [];
        const albumToEdit = storedAlbums.find(a => a.id === id);
        if (albumToEdit) {
            setAlbum(albumToEdit);
            setNewRating(albumToEdit.rating || 0);
            setNewReview(albumToEdit.review || "");
        }
    }, [id]);

    const handleSave = () => {
        if (album) {
            const updatedAlbum = { ...album, rating: newRating, review: newReview };
            const storedAlbums = JSON.parse(localStorage.getItem("ratedAlbums")) || [];
            const updatedAlbums = storedAlbums.map(a => a.id === id ? updatedAlbum : a);
            localStorage.setItem("ratedAlbums", JSON.stringify(updatedAlbums));
            navigate('/publish');  // Redirect back to the Publish page
        }
    };

    if (!album) return <p>Loading...</p>;

    return (
        <Container>
            <h2>Edit Album</h2>
            <Card className="mb-3">
                <Card.Img 
                    variant="top" 
                    src={album.images[0]?.url} 
                    alt={album.name} 
                    style={{ width: '300px', height: '300px', objectFit: 'cover', margin: '0 auto' }} 
                />
                <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <Card.Text>
                        {album.artists.map(artist => artist.name).join(", ")}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Form>
                <Form.Group controlId="albumRating">
                    <Form.Label>Rating</Form.Label>
                    <ReactStars
                        count={5}
                        value={newRating}
                        onChange={setNewRating}
                        size={24}
                        activeColor="#ffd700"
                    />
                </Form.Group>
                <Form.Group controlId="albumReview">
                    <Form.Label>Review</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review here"
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
}

export default Edit;
