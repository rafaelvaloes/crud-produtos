import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="col-12 d-flex justify-content-center mb-4">
      <div
        className="card shadow-lg rounded-4 p-3"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        {product.image && (
          <img
            src={product.image}
            className="card-img-top rounded-3"
            alt={product.name}
            style={{ height: "250px", objectFit: "cover" }}
          />
        )}
        <div className="card-body text-center">
          <h5 className="card-title fw-bold text-dark">{product.name}</h5>
          <p className="card-text text-muted">{product.description}</p>
          <p className="card-text fs-4 text-primary">
            R${" "}
            {Number(product.price).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="card-text text-secondary fw-semibold">
            Estoque: {product.stock_quantity} unidades
          </p>
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-outline-primary w-50 me-2 rounded-pill"
              onClick={() => navigate(`/edit/${product.id}`)}
            >
              Editar
            </button>
            <button
              className="btn btn-outline-danger w-50 rounded-pill"
              onClick={() => navigate(`/delete/${product.id}`)}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
