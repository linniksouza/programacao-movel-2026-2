import { render } from "@testing-library/react-native";

import { Logout } from ".";

describe("Suite de testes de unidade para validar o componente de UI 'Logout'", () => {
    it("Deve renderizar o indicativo de acao para sair da conta do usuario", async () => {
        const { getByText } = await render(<Logout />);

        expect(getByText("Sair da conta")).toBeTruthy();
    });
});
