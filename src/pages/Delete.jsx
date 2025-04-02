import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Delete() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Pegando o id do produto na URL
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const deleteProduct = async () => {
      if (!authToken) {
        setMessage("Erro de autenticação. Faça login novamente.");
        return;
      }

      try {
        const response = await axios.delete(
          "http://34.71.240.100/api/product/delete", // Endpoint de exclusão
          {
            data: { id }, // Passando o ID no corpo da requisição
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Resposta da API:", response.data);

        if (response.data.success) {
          setMessage("Produto excluído com sucesso!");
          setTimeout(() => navigate("/"), 2000); // Redirecionando após 2 segundos
        } else {
          setMessage("Não foi possível excluir o produto.");
        }
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        setMessage(""); // Removido a mensagem de erro
      }
    };

    deleteProduct();
  }, [id, authToken, navigate]);

  return (
    <div>
      <h1>Excluir Produto</h1>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Delete;
