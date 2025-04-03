import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FormField from "../components/FormField";
import Message from "../components/Message";

function Edit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(1);
  const [stockQuantity, setStockQuantity] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!authToken) {
        setMessage("Erro de autenticação. Faça login novamente.");
        return;
      }

      try {
        const response = await axios.get(
          `http://34.71.240.100/api/product/read?id=${id}`,
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
        "http://34.71.240.100/api/product/update",
        {
          id,
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
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage("Erro ao atualizar o produto.");
      }
    } catch (error) {
      setMessage("Erro ao atualizar o produto.");
    }
  };

  return (
    <div className="container mt-4">
      <Navbar />
      <h1 className="mb-4">Editar Produto</h1>
      {message && <Message text={message} />}
      <form onSubmit={handleSubmit} className="border p-4 rounded">
        <FormField
          label="Nome do Produto"
          id="name"
          value={name}
          onChange={setName}
        />
        <FormField
          label="Descrição"
          id="description"
          value={description}
          onChange={setDescription}
        />
        <FormField
          label="Preço"
          id="price"
          value={price}
          onChange={setPrice}
          type="number"
        />
        <FormField
          label="Status"
          id="status"
          value={status}
          onChange={(value) => setStatus(Number(value))}
          type="select"
          options={[
            { value: 1, label: "Em Estoque" },
            { value: 2, label: "Em Reposição" },
            { value: 3, label: "Em Falta" },
          ]}
        />
        <FormField
          label="Quantidade em Estoque"
          id="stockQuantity"
          value={stockQuantity}
          onChange={setStockQuantity}
          type="number"
        />
        <button type="submit" className="btn btn-success">
          Atualizar Produto
        </button>
      </form>
    </div>
  );
}

export default Edit;
