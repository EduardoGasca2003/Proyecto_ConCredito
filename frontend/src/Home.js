import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './componentes/Navbar';
import TareaItem from './componentes/TareaItem';

function Home() {
  const navigate = useNavigate();
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      // 🔹 Primero validamos el token
      axios
        .get("http://localhost:8080/auth/validate-token", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          // 🔹 Si el token es válido, obtenemos las tareas
          axios
            .get("http://localhost:8080/tasks", {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => setTareas(res.data))
            .catch(err => console.log("Error al obtener tareas:", err));
        })
        .catch(err => {
          console.log("Token inválido:", err);
          localStorage.removeItem("token");
          navigate("/");
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
              <TareaItem key={tarea.id} tarea={tarea} setTareas={setTareas}/>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Home;
