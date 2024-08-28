import React, { useState, useEffect } from "react";
import { FormControl, Container, InputGroup, Button, Row, Card, Form } from "react-bootstrap"; 
import ReactStars from "react-rating-stars-component";

const CLIENT_ID = "9d32098f8274490494aa45ad596cb87f";
const CLIENT_SECRET = "49e9a0ef1a3540c1adf44db96fa64d3e";

function Create() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    useEffect(() => {
        const authParameters = {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        };

        fetch("https://accounts.spotify.com/api/token", authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token));
    }, []);

    // Search
    async function search() {
        const searchParameters = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        };

        const albumData = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=album`, searchParameters)
            .then(response => response.json())
            .then(data => data.albums.items[0]);

        if (albumData) {
            setAlbums([albumData]);
        } else {
            console.error("No album found for the search input.");
        }
    }

    const handleSave = () => {
        if (albums.length > 0) {
            const newAlbum = {
                id: albums[0].id,
                name: albums[0].name,
                artists: albums[0].artists.map(artist => artist.name),
                images: albums[0].images,
                rating: rating,
                review: review
            };

            const storedAlbums = JSON.parse(localStorage.getItem("ratedAlbums")) || [];
            storedAlbums.push(newAlbum);
            localStorage.setItem("ratedAlbums", JSON.stringify(storedAlbums));
            alert("Album added successfully!");
        }
    };

    return (
        <div className="Create">
            <Container>
                <InputGroup className="mb-3" size="lg">
                    <FormControl
                        placeholder="Search For Album"
                        type="input"
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                search();
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                    <Button onClick={search}>
                        Search
                    </Button>
                </InputGroup>
            </Container>
            <Container>
                <Row>
                    {albums.map((album, i) => (
                        <Card key={album.id} className="mb-3">
                            <Card.Img src={album.images[0]?.url} alt={album.name} style={{ width: '300px', height: '300px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                            <Card.Body>
                                <Card.Title>{album.name}</Card.Title>
                                <Card.Text>
                                    {album.artists.map(artist => artist.name).join(", ")}
                                </Card.Text>
                                <ReactStars
                                    count={5}
                                    value={rating}
                                    onChange={setRating}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                                <Form.Group controlId="reviewTextarea">
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={3} 
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        placeholder="Write your review here"
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleSave}>
                                    Save Album
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Create;