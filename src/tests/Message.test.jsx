import { render, screen } from "@testing-library/react";
import Message from "../components/Message";

test("exibe a mensagem corretamente", async () => {
  render(<Message message="Produto adicionado com sucesso!" />);
  expect(
    await screen.findByText("Produto adicionado com sucesso!")
  ).toBeInTheDocument();
});
