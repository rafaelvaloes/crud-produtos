import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [authToken, setAuthToken] = useState(null);

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

  useEffect(() => {
    login(); // Sempre gera um novo token ao entrar na página
  }, []);

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
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Produtos</h1>
      <div className="text-center mb-3">
        <Link to="/create" className="btn btn-primary">
          Adicionar Produto
        </Link>
      </div>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
