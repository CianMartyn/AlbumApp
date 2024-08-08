import AlbumItem from "./albumItem";

// Albums functional component
function Albums(props){

    return props.myAlbums.map(
        (album)=>{
            return <AlbumItem myAlbum={album} key={album._id} Reload={()=>{props.ReloadData();}}></AlbumItem>
        }
    );

}

export default Albums;