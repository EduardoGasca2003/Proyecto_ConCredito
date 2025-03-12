import React, { useState } from "react";
import { Dropdown, Modal, Button } from "react-bootstrap";

const TareaItem = ({ tarea }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalAction, setModalAction] = useState(""); // 'completar' o 'cancelar'
  const [editedTitle, setEditedTitle] = useState(tarea.titulo);
  const [editedDescription, setEditedDescription] = useState(tarea.descripcion);

  // Función para abrir el modal de confirmación
  const handleShowConfirm = (action) => {
    setModalAction(action);
    setShowConfirmModal(true);
  };

  // Función para confirmar completar/cancelar tarea
  const handleConfirmAction = () => {
    if (modalAction === "completar") {
      console.log(`Tarea completada: ${tarea.titulo}`);
    } else if (modalAction === "cancelar") {
      console.log(`Tarea cancelada: ${tarea.titulo}`);
    }
    setShowConfirmModal(false);
  };

  // Función para abrir el modal de edición
  const handleShowEdit = () => setShowEditModal(true);

  // Función para guardar cambios de edición
  const handleSaveEdit = () => {
    console.log("Tarea editada:", { titulo: editedTitle, descripcion: editedDescription });
    setShowEditModal(false);
  };

  return (
    <>
      {/* Componente de Tarea */}
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {/* Casilla de verificación */}
        <input
          type="checkbox"
          className="me-2"
          checked={tarea.completada}
          onChange={() => handleShowConfirm("completar")}
        />

        {/* Contenido de la tarea */}
        <div className="flex-grow-1">
          <strong>{tarea.titulo}</strong>
          {tarea.descripcion && <p className="text-muted m-0">{tarea.descripcion}</p>}
        </div>

        {/* Dropdown con opciones */}
        <Dropdown>
          <Dropdown.Toggle variant="secondary" size="sm">⚙️</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleShowEdit}>✏️ Editar tarea</Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={() => handleShowConfirm("cancelar")}>❌ Cancelar tarea</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>

      {/* Modal de Confirmación (Completar/Cancelar) */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar acción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === "completar"
            ? `¿Estás seguro de que deseas marcar "${tarea.titulo}" como completada?`
            : `¿Estás seguro de que deseas cancelar "${tarea.titulo}"? Esta acción no se puede deshacer.`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
          <Button variant={modalAction === "completar" ? "success" : "danger"} onClick={handleConfirmAction}>
            {modalAction === "completar" ? "Completar" : "Cancelar"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Edición de Tarea */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tarea</Modal.Title>
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
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TareaItem;
