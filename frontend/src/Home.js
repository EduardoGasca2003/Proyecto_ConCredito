import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
    }
  
    return (
      <div>
        <h1>Bienvenido a tu lista de tareas</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    );
  }

export default Home;