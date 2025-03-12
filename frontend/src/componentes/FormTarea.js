import React, { useState } from "react";
import axios from "axios";


const FormTarea = ({setTareas}) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Nueva tarea:", titulo);

    if (!titulo.trim()) return;

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:8080/tasks",
        { titulo, descripcion },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Tarea creada:", res.data);
      setTareas(prevTareas => [...prevTareas, res.data]); // 🔹 Agrega la nueva tarea a la lista
      setTitulo("");
      setDescripcion("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex mt-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Agregar nueva tarea..."
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Descripción de la tarea (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      ></textarea>
      <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  );
};

export default FormTarea;
