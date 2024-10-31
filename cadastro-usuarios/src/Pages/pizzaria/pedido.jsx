import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Pedido() {
  const location = useLocation();
  const { pedido } = location.state;

  const [status, setStatus] = useState("Não processado");

  const mudarStatusPedido = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  return (
    <div className="p-8 bg-zinc-300 flex flex-row justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl mb-4">
          Detalhes do Pedido -{" "}
          <span className="text-xl text-gray-600">{status}</span>
        </h1>
        <h2 className="text-xl ">Pedido: {pedido.id}</h2>
        <p className="mb-4">
          Comentários: <br /> {pedido.comentarios}
        </p>
        <div>
          <h3 className="text-lg">Itens do Pedido:</h3>
          <ul className="list-disc list-inside">
            {pedido.itens.map((item, index) => (
              <li key={index}>
                {item.quantidade}x {item.nome} - R$ {item.preco.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-start flex-col">
          <h1 className="text-lg">Forma de pagamento:</h1>
          <span>{pedido.formaPagamento}</span>
        </div>
        <div className="flex justify-start flex-col">
          <h1 className="text-lg">Endereço:</h1>
          <span>{pedido.endereco}</span>
        </div>
        <div className="text-2xl mt-4 font-bold">Total: R$ {pedido.total}</div>
      </div>
      <div className=" flex flex-col gap-2">
        <h1 className="text-3xl mb-4">Controle de Status do Pedido</h1>

        <button
          className="bg-red-500 p-4 px-12 rounded-md text-white"
          value="Preparando"
          onClick={mudarStatusPedido}
        >
          Preparando
        </button>
        <button
          className="bg-red-500 p-4 px-12 rounded-md text-white"
          value="Enviado"
          onClick={mudarStatusPedido}
        >
          Pedido à Caminho
        </button>
        <button
          className="bg-red-500 p-4 px-12 rounded-md text-white"
          value="Concluido"
          onClick={mudarStatusPedido}
        >
          Concluir Pedido
        </button>
      </div>
    </div>
  );
}

export default Pedido;
