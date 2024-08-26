import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Albums from "./albums";

function Publish() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const storedAlbums = JSON.parse(localStorage.getItem("ratedAlbums")) || [];
        setAlbums(storedAlbums);
    }, []);

    return (
        <div className="Publish">
            <Container>
                <h2>Discover Published Albums</h2>
                <Row>
                    <Albums myAlbums={albums} setMyAlbums={setAlbums} />
                </Row>
            </Container>
        </div>
    );
}

export default Publish;
