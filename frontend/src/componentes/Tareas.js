import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import FormTarea from "./FormTarea";
import TareaItem from "./TareaItem";
import axios from "axios";

const Tareas = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log("Tareas obtenidas:", res.data);
        setTareas(res.data);
      })
      .catch(err => console.log("Error al obtener tareas:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center">Todas las Tareas</h2>
        <FormTarea setTareas={setTareas}/>

        <h4 className="mt-4">Tareas Pendientes</h4>
        <ul className="list-group">

          {tareas.filter(tarea => !tarea.completada)
            .map(tarea => (
              <TareaItem key={tarea.id} tarea={tarea} setTareas={setTareas} />
          ))}

        </ul>

        <h4 className="mt-4">Tareas Completadas</h4>
        <ul className="list-group">
          {tareas
            .filter(tarea => tarea.completada)
            .map(tarea => (
              <TareaItem key={tarea.id} tarea={tarea} setTareas={setTareas}/>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Tareas;
