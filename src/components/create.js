import { useState, useEffect } from "react";
import { FormControl, Container, InputGroup, Button, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

const CLIENT_ID = "9d32098f8274490494aa45ad596cb87f";
const CLIENT_SECRET = "49e9a0ef1a3540c1adf44db96fa64d3e";

function Create() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);

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
        console.log("Searching for " + searchInput);

        const searchParameters = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        };

        // Fetching the album ID based on the search input
        const albumData = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=album`, searchParameters)
            .then(response => response.json())
            .then(data => data.albums.items[0]);

        if (!albumData) {
            console.error("No album found for the search input.");
            return;
        }

        const albumId = albumData.id;
        console.log("Album ID: " + albumId);

        // Fetch album details using the album ID
        const albumDetails = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, searchParameters)
            .then(response => response.json());

        console.log("Album Details: ", albumDetails);

        // Update the state with the fetched album data
        setAlbums([albumDetails]);
    }

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
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Create;
