import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function AlbumItem({ album, onDelete }) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/edit/${album.id}`);
    };

    return (
        <Card key={album.id} className="mb-3">
            <Card.Img
                src={album.images[0]?.url}
                alt={album.name}
                style={{
                    width: '300px',
                    height: '300px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
            />
            <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>
                    {album.artists.map(artist => artist.name).join(", ")}
                </Card.Text>
                <ReactStars
                    count={5}
                    value={album.rating}  // Display current rating
                    size={24}
                    activeColor="#ffd700"
                    edit={false}  // Stars are not editable in display mode
                />
                <Card.Text>{album.review || "No review added"}</Card.Text>
                <Button variant="warning" onClick={handleEditClick}>
                    Edit Rating & Review
                </Button>
                <Button variant="danger" onClick={() => onDelete(album.id)}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
}

export default AlbumItem;
