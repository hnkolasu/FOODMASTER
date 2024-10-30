import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cardapio from "./cliente/cardapio";
import Cadastro from "./cliente/cadastro";
import Home from "./pizzaria/Home";
import Checkout from "./cliente/checkout";
import Status from "./cliente/status";
import Pedido from "./pizzaria/pedido";
import Pedidos from "./pizzaria/pedidos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template Component={<Home />} />} />
        <Route
          path="/cadastro"
          element={<Template Component={<Cadastro />} />}
        />
        <Route
          path="/cardapio"
          element={<Template Component={<Cardapio />} />}
        />
        <Route
          path="/checkout"
          element={<Template Component={<Checkout />} />}
        />
        <Route path="/status" element={<Template Component={<Status />} />} />
        <Route path="/*" element={<Template Component={<Home />} />} />
        <Route path="/pedidos" element={<Template Component={<Pedidos />} />} />
        <Route path="/pedido" element={<Template Component={<Pedido />} />} />
      </Routes>
    </Router>
  );
}

const Template = ({ Component }) => {
  return (
    <>
      <header className="py-4 bg-red-800 text-white text-center">
        <h1 className="text-4xl">FoodMaster</h1>
      </header>
      {Component}
    </>
  );
};

export default App;
