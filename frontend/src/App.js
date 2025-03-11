import React from 'react';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
