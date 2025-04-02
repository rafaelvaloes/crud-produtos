import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(1); // Default: "Em Estoque"
  const [stockQuantity, setStockQuantity] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams(); // Obtendo o id do produto
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  // Buscar dados do produto ao carregar
  useEffect(() => {
    const fetchProduct = async () => {
      if (!authToken) {
        setMessage("Erro de autenticação. Faça login novamente.");
        return;
      }

      try {
        const response = await axios.get(
          `http://34.71.240.100/api/product/read?id=${id}`, // API para obter os dados do produto
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          const { name, description, price, status, stock_quantity } =
            response.data.data;
          setName(name);
          setDescription(description);
          setPrice(price);
          setStatus(status);
          setStockQuantity(stock_quantity);
        } else {
          setMessage("Produto não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do produto:", error);
        setMessage("Erro ao buscar dados do produto.");
      }
    };

    fetchProduct();
  }, [id, authToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || stockQuantity === "") {
      setMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (!authToken) {
      setMessage("Erro de autenticação. Faça login novamente.");
      return;
    }

    try {
      const response = await axios.put(
        "http://34.71.240.100/api/product/update", // API para atualizar o produto
        {
          id, // ID do produto
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

      if (response.data.success) {
        setMessage("Produto atualizado com sucesso!");
        setTimeout(() => navigate("/"), 2000); // Redirecionando após 2 segundos
      } else {
        setMessage("Erro ao atualizar o produto.");
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setMessage("Erro ao atualizar o produto.");
    }
  };

  return (
    <div>
      <h1>Editar Produto</h1>
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

        <button type="submit">Atualizar Produto</button>
      </form>
    </div>
  );
}

export default Edit;
