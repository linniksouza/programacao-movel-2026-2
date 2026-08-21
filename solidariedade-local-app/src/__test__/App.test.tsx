import { render } from "@testing-library/react-native";

import App from "../App";

describe("Validando o componente React 'App'", () => {
    it("Validando mensagem de boas vindas", async () => {
        const { findByText } = await render(<App />);
        const temMgsBoasVindas = await findByText(/Seja bem vindo ao Solidariedade Local/i);

        expect(temMgsBoasVindas).toBeTruthy();
    });
});
