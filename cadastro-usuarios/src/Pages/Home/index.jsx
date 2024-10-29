import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "/assets/trash.svg";
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getusers(){
    const res = await api.get('/users')
    setUsers(res.data)
    
  }

  async function createUsers(){
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    
   getusers() 
  }

  async function deleteUsers(id){
    await api.delete(`/users/${id}`)

    getusers()
    
  }

  useEffect(() =>{
    console.log(users)
  },[users])

  useEffect(() =>{
    getusers()
  },[])

  return (
    <div className="container">
      <form>
        <h1>FOOD MASTER</h1>
        <h2> Faça seu login</h2>
        <input placeholder="Nome" name="nome" type="text" ref={inputName}/>
        <input placeholder="Idade" name="idade" type="number" ref={inputAge}/>
        <input placeholder="Email" name="email" type="email" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome:  <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={()=>deleteUsers(user.id)}>
            <img src={Trash} alt="Trash icon" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
