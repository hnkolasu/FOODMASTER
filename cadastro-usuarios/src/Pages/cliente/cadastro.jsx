import { useEffect, useState, useRef } from "react";
import Trash from "/assets/trash.svg";
import api from "../../services/api";

function Cadastro() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getusers() {
    const res = await api.get("/users");
    setUsers(res.data);
  }

  function validateForm() {
    const name = inputName.current.value.trim();
    const age = parseInt(inputAge.current.value, 10);
    const email = inputEmail.current.value.trim();

    // Verificar nome
    if (!/^[a-zA-Z\s]{2,}$/.test(name)) {
      setError(
        "Nome inválido. Deve conter pelo menos 2 caracteres alfabéticos."
      );
      return false;
    }

    // Verificar idade
    if (isNaN(age) || age < 18) {
      setError("Idade inválida. Deve ser 18 ou mais.");
      return false;
    }

    // Verificar email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email inválido.");
      return false;
    }

    setError(""); // Limpar mensagem de erro
    return true;
  }

  async function createUsers(e) {
    e.preventDefault(); // Evita reload da página

    if (!validateForm()) {
      return;
    }

    await api.post("/users", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    inputName.current.value = "";
    inputAge.current.value = "";
    inputEmail.current.value = "";
    getusers();
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);
    getusers();
  }

  useEffect(() => {
    getusers();
  }, []);

  return (
    <div className="bg-zinc-300 p-8">
      <form className="flex flex-col gap-2 m-8" onSubmit={createUsers}>
        <h1 className="text-2xl font-bold mb-4">Faça seu login</h1>

        {error && <p className="text-red-500 font-bold">{error}</p>}

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nome:
          </label>
          <input
            ref={inputName}
            placeholder="Nome"
            name="nome"
            type="text"
            className="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Idade:
          </label>
          <input
            ref={inputAge}
            placeholder="Idade"
            name="idade"
            type="number"
            className="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            ref={inputEmail}
            placeholder="Email"
            name="email"
            type="email"
            className="border border-gray-300 rounded-md w-full p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-zinc-400 mt-4 hover:bg-zinc-500 text-black font-bold py-2 px-4 rounded w-full"
        >
          Cadastrar
        </button>
      </form>
      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="border border-zinc-400 rounded-lg p-4 flex flex-row justify-between"
          >
            <div>
              <p>
                Nome: <span>{user.name}</span>
              </p>
              <p>
                Idade: <span>{user.age}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
            </div>
            <div>
              <button
                onClick={() => deleteUsers(user.id)}
                className="bg-zinc-400 hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded w-full"
              >
                <img src={Trash} alt="Trash icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cadastro;
