import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Cadastro from "./Cadastro";
import api from "../../services/api";
import jest from "jest";

jest.mock("../../services/api");

describe("Cadastro component", () => {
  beforeEach(() => {
    api.post.mockClear();
    api.delete.mockClear();
    api.get.mockClear();
  });

  test("valida nome inválido", async () => {
    render(<Cadastro />);

    const nameInput = screen.getByPlaceholderText("Nome");
    const ageInput = screen.getByPlaceholderText("Idade");
    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByText("Cadastrar");

    fireEvent.change(nameInput, { target: { value: "A" } });
    fireEvent.change(ageInput, { target: { value: "20" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText(
          "Nome inválido. Deve conter pelo menos 2 caracteres alfabéticos."
        )
      ).toBeInTheDocument()
    );
  });

  test("valida idade abaixo de 18", async () => {
    render(<Cadastro />);

    const nameInput = screen.getByPlaceholderText("Nome");
    const ageInput = screen.getByPlaceholderText("Idade");
    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByText("Cadastrar");

    // Preencher o formulário com dados inválidos
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(ageInput, { target: { value: "17" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    fireEvent.click(submitButton);

    // Verificar se a mensagem de erro foi exibida
    await waitFor(() =>
      expect(
        screen.getByText("Idade inválida. Deve ser 18 ou mais.")
      ).toBeInTheDocument()
    );
  });

  test("valida email inválido", async () => {
    render(<Cadastro />);

    const nameInput = screen.getByPlaceholderText("Nome");
    const ageInput = screen.getByPlaceholderText("Idade");
    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByText("Cadastrar");

    // Preencher o formulário com dados inválidos
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(ageInput, { target: { value: "20" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    fireEvent.click(submitButton);

    // Verificar se a mensagem de erro foi exibida
    await waitFor(() =>
      expect(screen.getByText("Email inválido.")).toBeInTheDocument()
    );
  });

  test("cadastrar usuário com dados válidos", async () => {
    api.post.mockResolvedValue({
      data: { id: 1, name: "John Doe", age: 20, email: "john@example.com" },
    });
    api.get.mockResolvedValue({
      data: [{ id: 1, name: "John Doe", age: 20, email: "john@example.com" }],
    });

    render(<Cadastro />);

    const nameInput = screen.getByPlaceholderText("Nome");
    const ageInput = screen.getByPlaceholderText("Idade");
    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByText("Cadastrar");

    // Preencher o formulário com dados válidos
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(ageInput, { target: { value: "20" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    fireEvent.click(submitButton);

    // Esperar que o usuário seja adicionado com sucesso
    await waitFor(() => expect(api.post).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByText("Nome: John Doe")).toBeInTheDocument()
    );
  });
});
