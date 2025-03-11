import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './componentes/Navbar';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/');
    } else {
      axios.get('http://localhost:8080/home', {
        headers: { Authorization: token }
      })
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err);
        navigate('/');
      });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Bienvenido a tu lista de tareas</h1>
    </div>
  );
}

export default Home;
