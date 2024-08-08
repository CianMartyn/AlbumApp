import { useEffect, useState } from "react";
import axios from "axios";
import Albums from "./albums";


function Publish() {
    // useState hook to manage the state of album data
    const [data, setData] = useState([]);

    // useEffect hook to fetch album data when the component mounts
    useEffect(() => {
        // Making a GET request to fetch all albums from the server
        axios.get('http://localhost:4000/api/albums')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); 

    // Function to reload album data
    const Reload = (e) => {
        // Making a GET request again to fetch the latest albums data
        axios.get('http://localhost:4000/api/albums')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Rendering the component
    return (
        <div>
            {/* Header for the page */}
            <header className="header">
                <h2>Explore New Albums</h2>
            </header>

            {/* Albums component to display a list of albums */}
            {/* 'myAlbums' prop is passed with the album data */}
            {/* 'ReloadData' prop is passed with the Reload function */}
            <Albums myAlbums={data} ReloadData={Reload}></Albums>
        </div>
    );
}

export default Publish;
