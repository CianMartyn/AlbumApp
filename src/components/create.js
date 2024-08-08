import { useState } from "react";
import axios from "axios";
import Rating from "react-rating-stars-component";

function Create() {
    // useState hooks to manage the state of album details
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');
    const [link, setLink] = useState('');
    const [rating, setRating] = useState(0); // Add state for rating

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Logging the form data to the console
        console.log(
            "Title: " + title +
            " Cover: " + cover +
            " Artist: " + artist +
            " Genre: " + genre +
            " Link: " + link +
            " Rating: " + rating
        );

        // Constructing an album object from the state
        const album = {
            title: title,
            cover: cover,
            artist: artist,
            genre: genre,
            link: link,
            rating: rating
        };

        // Making a POST request to the server to add the album
        axios.post('http://localhost:4000/api/album', album)
            .then((response) => {
                console.log(response.data);
                // Reset the form fields
                setTitle('');
                setCover('');
                setArtist('');
                setGenre('');
                setLink('');
                setRating(0); // Reset rating
            })
            .catch((error) => {
                console.error("There was an error creating the album!", error);
            });
    }

    // Render the form
    return (
        <div>
            {/* Header for the form */}
            <header className="header">
                <h2>Post Album Recommendations</h2>
            </header>

            {/* Form for adding album details */}
            <form onSubmit={handleSubmit}>
                {/* Input field for album title */}
                <div className="form-group">
                    <label>Add Album Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>

                {/* Input field for album cover URL */}
                <div className="form-group">
                    <label>Add Album Cover: </label>
                    <input type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => { setCover(e.target.value) }}
                    />
                </div>

                {/* Input field for artist name */}
                <div className="form-group">
                    <label>Add Artist: </label>
                    <input type="text"
                        className="form-control"
                        value={artist}
                        onChange={(e) => { setArtist(e.target.value) }}
                    />
                </div>

                {/* Input field for genre */}
                <div className="form-group">
                    <label>Add Genre: </label>
                    <input type="text"
                        className="form-control"
                        value={genre}
                        onChange={(e) => { setGenre(e.target.value) }}
                    />
                </div>

                {/* Input field for link to album */}
                <div className="form-group">
                    <label>Add Link: </label>
                    <input type="text"
                        className="form-control"
                        value={link}
                        onChange={(e) => { setLink(e.target.value) }}
                    />
                </div>

                <div className="form-group">
                    <label>Rating: </label>
                    <Rating
                        count={5}
                        value={rating}
                        onChange={handleRatingChange}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>

                {/* Submit button for the form */}
                <div>
                    <input type="submit" value="Add Album" />
                </div>
            </form>
        </div>
    );
}

export default Create;
