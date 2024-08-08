import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Edit component definition
export default function Edit() {
    // Retrieving the 'id' parameter from the URL
    let { id } = useParams();

    // useState hooks to manage the state of the album's properties
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');
    const [link, setLink] = useState('');

    // Hook to programmatically navigate to different routes
    const navigate = useNavigate();

    // useEffect hook to fetch the album data when the component mounts
    useEffect(() => {
        // Axios GET request to fetch album data based on the 'id'
        axios.get('http://localhost:4000/api/album/' + id)
            .then((response) => {
                // Setting the state with the fetched album data
                setTitle(response.data.title);
                setCover(response.data.cover);
                setArtist(response.data.artist);
                setGenre(response.data.genre);
                setLink(response.data.link);
            })
            .catch((error) => {
                // Handling errors in the GET request
                console.log(error);
            });
    }, [id]);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // Constructing the updated album object
        const album = {
            title: title,
            cover: cover,
            artist: artist,
            genre: genre,
            link: link,
        }

        // Axios PUT request to update the album
        axios.put('http://localhost:4000/api/album/' + id, album)
            .then((res) => {
                // Navigating to the '/publish' route on successful update
                navigate('/publish');
            })
            .catch((error) => {
                // Handling errors in the PUT request
                console.log(error);
            });
    }

    // Rendering the form with the current album data and a submit button
    return (
        <div>
            <h2>Edit Album!</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Edit Album Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>

                <div>
                    <input type="submit" value="Edit Album" />
                </div>
            </form>
        </div>
    );
}
