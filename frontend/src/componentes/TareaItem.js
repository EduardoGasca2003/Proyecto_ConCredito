import React, { useState } from "react";
import { Dropdown, Modal, Button } from "react-bootstrap";
import axios from "axios";

const TareaItem = ({ tarea, setTareas }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalAction, setModalAction] = useState(""); 
  const [editedTitle, setEditedTitle] = useState(tarea.titulo);
  const [editedDescription, setEditedDescription] = useState(tarea.descripcion);

  const handleShowConfirm = (action) => {
    setModalAction(action);
    setShowConfirmModal(true);
  };

  const handleDeleteTask = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:8080/tasks/${tarea.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTareas((prevTareas) => prevTareas.filter((t) => t.id !== tarea.id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }

    setShowConfirmModal(false);
  };

  const handleCompleteTask = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.patch(
        `http://localhost:8080/tasks/${tarea.id}`,
        { completada: !tarea.completada },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTareas((prevTareas) =>
        prevTareas.map((t) =>
          t.id === tarea.id ? { ...t, completada: !t.completada } : t
        )
      );
    } catch (error) {
      console.error("Error al completar la tarea:", error);
    }

    setShowConfirmModal(false);
  };

  const handleShowEdit = () => setShowEditModal(true);

  const handleSaveEdit = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.patch(
        `http://localhost:8080/tasks/${tarea.id}`,
        { titulo: editedTitle, descripcion: editedDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTareas((prevTareas) =>
        prevTareas.map((t) =>
          t.id === tarea.id
            ? { ...t, titulo: editedTitle, descripcion: editedDescription }
            : t
        )
      );

      setShowEditModal(false);
    } catch (error) {
      console.error("Error al editar la tarea:", error);
    }
  };

  return (
    <>

      <li className="list-group-item d-flex justify-content-between align-items-center">

        <div className="flex-grow-1" >
          <strong>{tarea.titulo}</strong>
          {tarea.descripcion && <p className="text-muted m-0">{tarea.descripcion}</p>}
        </div>

        <Dropdown>
          <Dropdown.Toggle variant="btn btn-outline-success" size="sm">Opciones</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className="text-success" onClick={() => handleShowConfirm("completar")}>
              ✅ {tarea.completada ? "Desmarcar" : "Marcar"} como completada
            </Dropdown.Item>
            <Dropdown.Item onClick={handleShowEdit}>✏️ Editar tarea</Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={() => handleShowConfirm("eliminar")}>
              🗑️ Eliminar tarea
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">Manipular Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === "completar"
            ? `¿Estás seguro de que deseas ${tarea.completada ? "desmarcar" : "marcar"} "${tarea.titulo}" como completada?`
            : `⚠️ ¡Atención! ¿Estás seguro de que deseas eliminar "${tarea.titulo}"? Esta acción no se puede deshacer.`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
          {modalAction === "completar" ? (
            <Button variant="btn btn-outline-success" onClick={handleCompleteTask}>
              {tarea.completada ? "Desmarcar" : "Completar"}
            </Button>
          ) : (
            <Button variant="btn btn-outline-danger" onClick={handleDeleteTask}>Eliminar</Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center" >Editar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-2"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Título de la tarea"
          />
          <textarea
            className="form-control"
            rows="3"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Descripción (opcional)"
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondarybtn btn-outline-danger" onClick={() => setShowEditModal(false)}>Cancelar</Button>
          <Button variant="btn btn-outline-success" onClick={handleSaveEdit}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TareaItem;
