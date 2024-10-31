/* 
    OBJETIVOS DA API DE USERS: 

    -Criar usuários
    -Listar todos os usuários
    -Editar um usuários
    -Deletar um usuários

    INFO BANCO: 
    USERNAME: arthurcmporto
    PASSWORD: K0r7DhoZAoHIAMPX
    Comandos: npx prisma studio ( ver o banco de dados )
    
*/

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000); // abrir servidor

/*
    Rotas:
    1) tipo de rota / método HTTP: GET(Listas "users"), POST(Criar user), PUT(Editar o user), DELETE(deletar user).
    2) Endereço
*/

app.post("/users", async (req, res) => {
  //crirar
  console.log(req.body);

  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.get("/users", async (req, res) => {
  //lista usuários

  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

app.put("/users/:id", async (req, res) => {
  //esditar

  await prisma.user.update({
    where: {
      id: req.params.id,
    },

    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "usuário deletado com sucesso!" });
});
app.post("/pedido", async (req, res) => {
  console.log("body", req.body);
  try {
    const {
      nomeItem,
      endereco,
      comentarios,
      formaPagamento,
      itens = [],
      total,
    } = req.body;

    const novoPedido = await prisma.pedido.create({
      data: {
        nomeItem,
        endereco,
        comentarios,
        formaPagamento,
        total,
        itens: {
          create: itens.map((item) => ({
            nome: item.nome,
            quantidade: item.quantidade,
            preco: item.preco,
          })),
        },
      },
      include: {
        itens: true,
      },
    });

    res.status(201).json(novoPedido);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
});

app.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        itens: true, // Inclui os itens para cada pedido
      },
    });

    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
});
