import React, { useState } from "react";

const FormTarea = () => {
  const [titulo, setTitulo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    console.log("Nueva tarea:", titulo);
    setTitulo(""); // Limpiar el input después de agregar la tarea
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex mt-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Agregar nueva tarea..."
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  );
};

export default FormTarea;
