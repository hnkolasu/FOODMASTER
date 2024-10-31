import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const pedidosMock = [
  {
    id: 1,
    nomeItem: "Pedido 1",
    endereco: "Rua Antonio alfredo da silva, 815",
    comentarios: "Sem cebola por favor",
    formaPagamento: "Cartão",
    itens: [
      { nome: "Calabresa", quantidade: 1, preco: 69.99 },
      { nome: "Pureza", quantidade: 1, preco: 7.0 },
    ],
    total: 76.99,
  },
  //   {
  //     id: 2,
  //     nomeItem: "Marguerita",
  //     endere: "Marguerita",
  //     comentarios: "Menos queijo, por favor.",
  //     itens: [{ nome: "Marguerita", quantidade: 1, preco: 69.99 }],
  //   },
];

function Pedidos() {
  const navigate = useNavigate();
  const handleVerDetalhes = (pedido) => {
    navigate("/pedido", { state: { pedido } });
  };

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getPedidos();
  }, []);

  async function getPedidos() {
    const res = await api.get("/pedidos");
    setPedidos(res.data);
  }

  return (
    <div className="p-8 bg-zinc-300">
      <h1 className="text-3xl mb-4">Listagem de Pedidos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="border border-gray-400 bg-zinc-300  p-4 rounded-md shadow-md flex flex-row justify-between"
          >
            <div>
              <h2 className="text-xl">{pedido.nomeItem}</h2>
              <p>{pedido.comentarios}</p>
              <button
                onClick={() => handleVerDetalhes(pedido)}
                className="mt-2 bg-blue-500 text-white p-2 rounded"
              >
                Ver Detalhes
              </button>
            </div>
            <div className="flex justify-start min-w-fit flex-col">
              <h1>Total:</h1>
              <span>R$ {pedido.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pedidos;
