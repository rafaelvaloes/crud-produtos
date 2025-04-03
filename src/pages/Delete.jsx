import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Delete() {
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete("http://34.71.240.100/api/product/delete", {
        data: { id },
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then(() => {
        setShowModal(false);
        navigate("/");
      })
      .catch(() => {
        alert("Erro ao excluir o produto.");
        setLoading(false);
      });
  };

  return (
    <Modal show={showModal} onHide={() => navigate("/")} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>Tem certeza de que deseja excluir este produto?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Excluindo..." : "Excluir"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Delete;
