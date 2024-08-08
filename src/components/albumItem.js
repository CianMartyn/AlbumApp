import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";

const ratingChanged = (newRating) => {
    console.log(newRating);
  };

function AlbumItem(props) {
    // This component renders information about a single album
    // It uses Bootstrap components for styling and layout

    return (
        // The main container with flex display to center the content
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
                
            {/* Card component from React Bootstrap to display album details */}
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.myAlbum.cover} />

                <Card.Body>
                    <Card.Title>{props.myAlbum.title}</Card.Title>
                </Card.Body>

                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{props.myAlbum.artist}</ListGroup.Item>
                    <ListGroup.Item>{props.myAlbum.genre}</ListGroup.Item>
                </ListGroup>

                {/* Link to Spotify - opens in a new tab */}
                <Card.Body>
                    <Card.Link href={props.myAlbum.link} target="_blank">Spotify Link</Card.Link>
                </Card.Body>

                {/* Rating component */}
                <Card.Body>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                />,   
                </Card.Body>

                {/* Link to the edit page for the album */}
                <Link to={'/edit/' + props.myAlbum._id} className='btn btn-primary'>Edit</Link>

                {/* Button to delete the album */}
                <Button variant='danger' onClick={
                    (e) => {
                        e.preventDefault();

                        // Axios call to delete the album from the server
                        axios.delete('http://localhost:4000/api/album/' + props.myAlbum._id)
                            .then((res) => {
                                // Calling a parent component's method to refresh the album list
                                let reload = props.Reload();
                            })
                            .catch(); 
                    }
                }>Delete</Button>
            </Card>
        </div>
    );
}

export default AlbumItem;