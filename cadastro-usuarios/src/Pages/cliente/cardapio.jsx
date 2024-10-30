import { useNavigate } from "react-router-dom";
import Carrinho from "../icons/Cart";
import Direita from "../icons/direita";
import { useState } from "react";

const produtos = [
  {
    nome: "Calabresa",
    preco: 69.99,
    imgUrl:
      "https://cdn.discordapp.com/attachments/652023931556986890/1300985992626311310/image.png?ex=6722d51f&is=6721839f&hm=81ea53326d8912ee7a3a21fac938f9f1bd8a21476639abf73d35823fd2493fe3&",
  },
  {
    nome: "marguerita",
    preco: 69.99,
    imgUrl:
      "https://cdn.discordapp.com/attachments/652023931556986890/1300985992886485054/image.png?ex=6722d51f&is=6721839f&hm=0413638169f6b5d985bc58dae5eb0317981de8215e512d7e34155f8a057751ed&",
  },
  {
    nome: "frango com catupiry",
    preco: 69.99,
    imgUrl:
      "https://cdn.discordapp.com/attachments/652023931556986890/1300985993175760969/image.png?ex=6722d51f&is=6721839f&hm=85edde7f7284c32e7ae0e24a9cfc307f73ca151594ef6c89b619e7df0bb6919d&",
  },
  {
    nome: "pureza 2L",
    preco: 7.0,
    imgUrl: "../../../public/pureza.png",
  },
];

function Cardapio() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const total = items.reduce((acc, item) => acc + item?.preco, 0).toFixed(2);

  const handleRedirect = () => {
    navigate("/checkout", { state: { items, total } });
  };

  return (
    // <div className="bg-zinc-300 flex flex-col justify-between h-screen">
    //   <div className="px-10 p-4 flex flex-col gap-4 overflow-auto items-center">
    //     {produtos.map((item, index) => (
    //       <div
    //         key={index}
    //         className="bg-zinc-200 shadow-md  rounded-lg p-4 flex flex-row gap-4 w-full max-w-md"
    //       >
    //         <div className="border border-zinc-400 overflow-hidden rounded-lg">
    //           <img className="w-48" src={item.imgUrl} alt={item.nome} />
    //         </div>
    //         <div className="flex w-full flex-row justify-between items-center">
    //           <div className="flex flex-col text-2xl">
    //             <h2>{item.nome}</h2>
    //             <span className="text-xl">R$ {item.preco.toFixed(2)}</span>
    //           </div>
    //           <button
    //             className="bg-zinc-300 hover:bg-zinc-400 text-zinc-800 rounded-2xl p-4"
    //             onClick={() => {
    //               setItems([...items, item]);
    //             }}
    //           >
    //             <Carrinho />
    //           </button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   <div className="sticky bottom-0 border border-zinc-400 bg-zinc-300 flex items-center justify-between p-4">
    //     <span className="text-2xl">
    //       total: R$
    //       {total}
    //     </span>

    //     <button
    //       disabled={items.length === 0}
    //       onClick={handleRedirect}
    //       className="border border-zinc-400 disabled:bg-zinc-300 hover:bg-zinc-400 rounded-lg p-4 flex flex-row items-center"
    //     >
    //       Finalize seu pedido
    //       <div className="ml-4">
    //         <Direita />
    //       </div>
    //     </button>
    //   </div>
    // </div>

    <div className="pt-12">
      <div className="p-8 max-w-lg mx-auto bg-zinc-300 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">Faça seu pedido</h1>

        <div className="flex flex-col gap-4 items-center">
          {produtos.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-200 shadow-md  rounded-lg p-4 flex flex-row gap-4 w-full max-w-md"
            >
              <div className="border border-zinc-400 overflow-hidden rounded-lg">
                <img className="w-48" src={item.imgUrl} alt={item.nome} />
              </div>
              <div className="flex w-full flex-row justify-between items-center">
                <div className="flex flex-col text-2xl">
                  <h2>{item.nome}</h2>
                  <span className="text-xl">R$ {item.preco.toFixed(2)}</span>
                </div>
                <button
                  className="bg-zinc-300 hover:bg-zinc-400 text-zinc-800 rounded-2xl p-4"
                  onClick={() => {
                    setItems([...items, item]);
                  }}
                >
                  <Carrinho />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-between items-center ">
          <span className="text-xl">
            Total: R$
            {total}
          </span>

          <button
            disabled={items.length === 0}
            onClick={handleRedirect}
            className="border border-zinc-400 disabled:bg-zinc-600 hover:bg-zinc-400 rounded-lg p-4 flex flex-row items-center"
          >
            Finalize seu pedido
            <div className="ml-4">
              <Direita />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cardapio;
