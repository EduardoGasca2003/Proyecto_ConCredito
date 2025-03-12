import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './componentes/Navbar';
import TareaItem from './componentes/TareaItem';

function Home() {
  const navigate = useNavigate();
  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Aprender React", completada: false },
    { id: 2, titulo: "Hacer ejercicio", completada: true },
    { id: 3, titulo: "Leer un libro", completada: false }
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
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

  // Filtrar solo las tareas pendientes
  const tareasPendientes = tareas.filter(tarea => !tarea.completada);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center">Tareas Pendientes</h2>
        {tareasPendientes.length === 0 ? (
          <p className="text-center">No hay tareas pendientes.</p>
        ) : (
          <ul className="list-group">
            {tareasPendientes.map((tarea) => (
              <TareaItem key={tarea.id} tarea={tarea} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Home;
