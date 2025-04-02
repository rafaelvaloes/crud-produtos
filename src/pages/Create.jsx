import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(1);
  const [stockQuantity, setStockQuantity] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!name || !description || !price || stockQuantity === "") {
      setMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (!authToken) {
      setMessage("Erro de autenticação. Faça login novamente.");
      return;
    }

    try {
      const response = await axios.post(
        "http://34.71.240.100/api/product/create",
        {
          name,
          description,
          price: parseFloat(price),
          status,
          stock_quantity: Number(stockQuantity),
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta da API:", response.data);

      if (response.data.success) {
        setMessage("Produto adicionado com sucesso!");
        setTimeout(() => {
          navigate("/"); // Redireciona para a página Home
        }, 2000);
      } else {
        setMessage("Erro ao adicionar o produto.");
      }
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      setMessage("Erro ao adicionar o produto.");
    }
  };

  return (
    <div>
      <h1>Adicionar Produto</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome do Produto:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0.01"
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            required
          >
            <option value="1">Em Estoque</option>
            <option value="2">Em Reposição</option>
            <option value="3">Em Falta</option>
          </select>
        </div>

        <div>
          <label htmlFor="stockQuantity">Quantidade em Estoque:</label>
          <input
            type="number"
            id="stockQuantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            required
            min="0"
          />
        </div>

        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
}

export default Create;
