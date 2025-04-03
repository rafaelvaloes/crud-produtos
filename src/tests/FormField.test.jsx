import { render, screen, fireEvent } from "@testing-library/react";
import FormField from "../components/FormField";

test("renderiza corretamente um campo de entrada", () => {
  render(<FormField label="Nome" id="name" value="" onChange={() => {}} />);

  expect(screen.getByLabelText("Nome:")).toBeInTheDocument();
});

test("atualiza o valor quando digitado", () => {
  const handleChange = jest.fn();
  render(<FormField label="Nome" id="name" value="" onChange={handleChange} />);

  const input = screen.getByLabelText("Nome:");
  fireEvent.change(input, { target: { value: "Novo Produto" } });

  expect(handleChange).toHaveBeenCalledTimes(1);
});
