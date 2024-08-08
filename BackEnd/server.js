const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Creating an Express application
const app = express();
const port = 4000;

// Enabling CORS for all requests
app.use(cors());

// Additional CORS configuration to handle HTTP methods and headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Configuring body-parser middleware for handling JSON and URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.lf4uq0d.mongodb.net/?retryWrites=true&w=majority');
}

// Define a Mongoose schema for albums
const albumSchema = new mongoose.Schema({
  title: String,
  cover: String,
  artist: String,
  genre: String,
  link: String,
  rating: Number,
});

// Create a Mongoose model based on the album schema
const albumModel = mongoose.model('Album', albumSchema);

// Route for deleting an album by ID
app.delete('/api/album/:id', async (req, res) => {
  console.log("Delete: " + req.params.id);
  let album = await albumModel.findByIdAndDelete(req.params.id);
  res.send(album);
});

// Route for updating an album by ID
app.put('/api/album/:id', async (req, res) => {
  console.log("Update: " + req.params.id);
  let album = await albumModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(album);
});

// Route for creating a new album
app.post('/api/album', (req, res) => {
  console.log(req.body);
  albumModel.create(req.body)
    .then(() => { res.send("Album Created") })
    .catch(() => { res.send("Album NOT Created") });
});

// Route for serving the homepage
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route for fetching all albums
app.get('/api/albums', async (req, res) => {
  let albums = await albumModel.find({});
  res.json(albums);
});

// Route for fetching a single album by its identifier
app.get('/api/album/:identifier', async (req, res) => {
  console.log(req.params.identifier);
  let album = await albumModel.findById(req.params.identifier);
  res.send(album);
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
