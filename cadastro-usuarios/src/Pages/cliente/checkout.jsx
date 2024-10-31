import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [comments, setComments] = useState("");

  const { items, total } = location.state || {};

  const handleRedirect = () => {
    navigate("/status", { state: { address, comments, items, total } });
  };

  async function createPedido(e) {
    if (!address) {
      alert("Por favor, insira um endereço.");
      return;
    }

    const itensNovos = items.map((item) => {
      return {
        nome: item.nome,
        quantidade: 1,
        preco: item.preco,
      };
    });

    const novoPedido = {
      nomeItem: "Nicolas",
      endereco: address,
      comentarios: comments,
      formaPagamento: "Cartão",
      itens: itensNovos,
      total: parseFloat(total),
    };

    console.log(novoPedido);
    await api.post("/pedido", {
      ...novoPedido,
    });

    handleRedirect(e);
  }

  return (
    <div className="pt-12">
      <div className="p-8 max-w-md mx-auto bg-zinc-300">
        <h1 className="text-2xl font-bold mb-4">Finalizar Pedido</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Endereço:
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Digite seu endereço"
            className="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Comentários:
          </label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Instruções especiais ou preferências"
            className="border border-gray-300 rounded-md w-full p-2"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Resumo:</p>

          <ul>
            {items?.map((item) => {
              return (
                <div className="flex flex-row justify-between">
                  {item.nome}
                  <div> R${item?.preco.toFixed(2)}</div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Total: R$ {total}</p>
        </div>
        <button
          onClick={createPedido}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}

export default Checkout;
