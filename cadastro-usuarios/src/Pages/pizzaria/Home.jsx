import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleRedirect = (e) => {
    navigate(e.target.value);
  };

  return (
    <div className="flex p-8 flex-row text-white ">
      <h1 className="text-3xl w-[50%]">Página Inicial</h1>
      <div className="flex flex-col gap-2 text-2xl">
        <button
          className="bg-red-500 p-4 px-12 rounded-md"
          value="cardapio"
          onClick={handleRedirect}
        >
          Cardapio
        </button>
        <button
          className="bg-red-500 p-4 px-12 rounded-md"
          value="cadastro"
          onClick={handleRedirect}
        >
          Cadastro
        </button>
      </div>
    </div>
  );
}

export default Home;
