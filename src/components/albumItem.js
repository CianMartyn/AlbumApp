import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";

function AlbumItem({ album, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newRating, setNewRating] = useState(album.rating);
    const navigate = useNavigate();

    const handleSave = () => {
        onEdit(album.id, newRating);
        setIsEditing(false);
    };

    const handleEditPage = () => {
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

                {isEditing ? (
                    <>
                        <ReactStars
                            count={5}
                            value={newRating}
                            onChange={setNewRating}
                            size={24}
                            activeColor="#ffd700"
                            edit={true}
                        />
                        <Button variant="success" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <ReactStars
                            count={5}
                            value={album.rating}
                            size={24}
                            activeColor="#ffd700"
                            edit={false}
                        />
                        <Button variant="danger" onClick={() => onDelete(album.id)}>
                            Delete
                        </Button>
                        <Button variant="info" onClick={handleEditPage}>
                            Edit Rating
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default AlbumItem;
