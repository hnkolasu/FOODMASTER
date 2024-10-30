import React from "react";
import { useNavigate } from "react-router-dom";

const pedidos = [
  {
    id: 1,
    nomeItem: "Calabresa",
    comentarios: "Amo esta pizza!",
    itens: [
      { nome: "Calabresa", quantidade: 1, preco: 69.99 },
      { nome: "Coca-Cola", quantidade: 2, preco: 7.0 },
    ],
  },
  {
    id: 2,
    nomeItem: "Marguerita",
    comentarios: "Menos queijo, por favor.",
    itens: [{ nome: "Marguerita", quantidade: 1, preco: 69.99 }],
  },
];

function Pedidos() {
  const navigate = useNavigate();

  const handleVerDetalhes = (pedido) => {
    navigate("/pedido", { state: { pedido } });
  };

  return (
    <div className="p-8 bg-zinc-400">
      <h1 className="text-3xl mb-4">Listagem de Pedidos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="border border-gray-300 bg-zinc-300  p-4 rounded-md shadow-md"
          >
            <h2 className="text-xl">{pedido.nomeItem}</h2>
            <p>{pedido.comentarios}</p>
            <button
              onClick={() => handleVerDetalhes(pedido)}
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pedidos;
