import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [authToken, setAuthToken] = useState(null);

  // Função para fazer login e obter o token de autenticação
  const login = async () => {
    try {
      const response = await axios.post("http://34.71.240.100/api/auth/login", {
        email: "rafael.colnago@live.com",
        password: "9KJ778qs",
      });

      const token = response.data.access_token;
      setAuthToken(token);
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Erro de autenticação:", error);
    }
  };

  // Recuperando o token de localStorage ou fazendo o login
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setAuthToken(storedToken);
    } else {
      login();
    }
  }, []);

  // Carregando os produtos após o login (requisição POST para a API)
  useEffect(() => {
    if (authToken) {
      axios
        .post(
          "http://34.71.240.100/api/product/list",
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Resposta da API:", response.data);
          if (response.data.success && response.data.data) {
            setProducts(response.data.data);
          } else {
            setProducts([]);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar produtos:", error);
          setProducts([]);
        });
    }
  }, [authToken]);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <Link to="/create">Adicionar Produto</Link>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - R${product.price.toFixed(2)}{" "}
              <br />
              <em>Status: </em>
              {product.status === 1
                ? "Em Estoque"
                : product.status === 2
                ? "Em Reposição"
                : "Em Falta"}{" "}
              <br />
              <Link to={`/edit/${product.id}`}>Editar</Link> |
              <Link to={`/delete/${product.id}`}>Excluir</Link>
            </li>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </ul>
    </div>
  );
}

export default Home;
