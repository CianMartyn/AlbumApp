import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/content';
import Footer from './components/footer';
import Header from './components/header';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Create from './components/create';
import Publish from './components/publish';
import Edit from './components/edit';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Music</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create">Rate</Nav.Link>
            <Nav.Link href="/publish">Saved</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Content></Content>}></Route>
        <Route path='/publish' element={<Publish></Publish>}></Route>
        <Route path='/create' element={<Create></Create>}></Route>
        <Route path='/edit/:id' element={<Edit></Edit>}></Route>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
