import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <li key={product.id}>
      <strong>{product.name}</strong> - R${product.price.toFixed(2)}
      <br />
      <em>Status: </em>
      {product.status === 1
        ? "Em Estoque"
        : product.status === 2
        ? "Em Reposição"
        : "Em Falta"}
      <br />
      <Link to={`/edit/${product.id}`}>Editar</Link> |
      <Link to={`/delete/${product.id}`}>Excluir</Link>
    </li>
  );
}

export default ProductItem;
