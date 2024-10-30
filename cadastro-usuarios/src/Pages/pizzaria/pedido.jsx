import React from "react";
import { useLocation } from "react-router-dom";

function Pedido() {
  const location = useLocation();
  const { pedido } = location.state;

  return (
    <div className="p-8 bg-zinc-300">
      <h1 className="text-3xl mb-4">Detalhes do Pedido</h1>
      <h2 className="text-xl mb-2">Item: {pedido.nomeItem}</h2>
      <p className="mb-4">Comentários: {pedido.comentarios}</p>
      <h3 className="text-lg mb-2">Itens do Pedido:</h3>
      <ul className="list-disc list-inside">
        {pedido.itens.map((item, index) => (
          <li key={index}>
            {item.quantidade}x {item.nome} - R$ {item.preco.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pedido;
