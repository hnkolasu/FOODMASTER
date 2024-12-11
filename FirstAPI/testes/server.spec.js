import request from "supertest";
import { app } from "../server";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  const originalModule = jest.requireActual("@prisma/client");

  return {
    ...originalModule,
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        create: jest.fn(),
        findMany: jest.fn(() => {}),
        findUniqueOrThrow: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      pedido: {
        create: jest.fn(),
        findMany: jest.fn(() => {}),
      },
    })),
  };
});

const prisma = new PrismaClient();

describe("Testes de integração para API de Users e Pedidos", () => {
  it("deve criar um usuário", async () => {
    const userData = {
      email: "usuario@exemplo.com",
      name: "Nome do Usuário",
      age: 25,
    };

    prisma.user.create.mockResolvedValue(userData);

    const response = await request(app).post("/users").send(userData);

    console.log(response.body);

    expect(response.status).toBe(200);
  });

  it("deve listar todos os usuários", async () => {
    const users = [
      { id: 1, email: "usuario1@exemplo.com", name: "Usuário 1", age: 25 },
      { id: 2, email: "usuario2@exemplo.com", name: "Usuário 2", age: 30 },
    ];

    prisma.user.findMany.mockResolvedValue(users);

    const response = await request(app).get("/users");

    console.log(response.body);

    expect(response.status).toBe(200);
  });

  it("deve criar um pedido", async () => {
    const orderData = {
      nomeItem: "Pizza",
      endereco: "Rua das Flores, 123",
      comentarios: "Sem cebola",
      formaPagamento: "Cartão",
      total: 50.0,
      itens: [
        {
          nome: "Pizza de Calabresa",
          quantidade: 1,
          preco: 30.0,
        },
      ],
    };

    const mockOrderResponse = { ...orderData, id: "1" };

    prisma.pedido.create.mockResolvedValue(mockOrderResponse);

    const response = await request(app).post("/pedido").send(orderData);

    console.log(response.body);

    expect(response.status).toBe(201);
  });

  it("deve listar todos os pedidos", async () => {
    const orders = [
      {
        id: "1",
        nomeItem: "Pizza",
        total: 50.0,
        itens: [
          {
            nome: "Pizza de Calabresa",
            quantidade: 1,
            preco: 30.0,
          },
        ],
      },
    ];

    prisma.pedido.findMany.mockResolvedValue(orders);

    const response = await request(app).get("/pedidos").send(orders);

    console.log("alskdmsakl", response.body);

    expect(response.status).toBe(200);
  });
});
