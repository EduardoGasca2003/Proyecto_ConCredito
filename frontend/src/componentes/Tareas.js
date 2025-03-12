import React, { useState } from "react";
import Navbar from "./Navbar";
import FormTarea from "./FormTarea";
import TareaItem from "./TareaItem";

const Tareas = () => {
  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Aprender React", completada: false },
    { id: 2, titulo: "Hacer ejercicio", completada: true },
    { id: 3, titulo: "Leer un libro", completada: false }
  ]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center">Todas las Tareas</h2>
        <FormTarea />
        <h4 className="mt-4">Tareas Pendientes</h4>
        <ul className="list-group">
          {tareas
            .filter(tarea => !tarea.completada)
            .map(tarea => (
              <TareaItem key={tarea.id} tarea={tarea} />
            ))}
        </ul>

        <h4 className="mt-4">Tareas Completadas</h4>
        <ul className="list-group">
          {tareas
            .filter(tarea => tarea.completada)
            .map(tarea => (
              <TareaItem key={tarea.id} tarea={tarea} />
            ))}
        </ul>
      </div>
    </>
  );
};

export default Tareas;
