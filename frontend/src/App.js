import React from 'react';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Tareas from "./componentes/Tareas";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tareas" element={<Tareas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
