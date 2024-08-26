import React from "react";
import { Row } from "react-bootstrap";
import AlbumItem from "./albumItem";

function Albums({ myAlbums, setMyAlbums }) {

    const handleDelete = (id) => {
        const updatedAlbums = myAlbums.filter(album => album.id !== id);
        setMyAlbums(updatedAlbums);
        localStorage.setItem("ratedAlbums", JSON.stringify(updatedAlbums));
    };

    const handleEdit = (id, newRating) => {
        const updatedAlbums = myAlbums.map(album => 
            album.id === id ? { ...album, rating: newRating } : album
        );
        setMyAlbums(updatedAlbums);
        localStorage.setItem("ratedAlbums", JSON.stringify(updatedAlbums));
    };

    return (
        <Row>
            {myAlbums.map(album => (
                <AlbumItem
                    key={album.id}
                    album={album}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            ))}
        </Row>
    );
}

export default Albums;
