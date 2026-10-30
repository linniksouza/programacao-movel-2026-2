import { Usuario } from "@/data/models/usuario.model";
import { render } from "@/utils/test-utils";
import { CabecalhoPerfil } from ".";

const usuario: Usuario = {
    cpf: "1",
    nome: "Linnik Souza",
    email: "linniksouza.prof@gmail.com",
    urlImagem: "https://avatars.githubusercontent.com/u/263082479"
};

describe("Suite de testes de unidade para validar o componente de UI 'CabecalhoPerfil'", () => {
    it("Deve renderizar o nome e o e-mail do usuario repassado", async () => {
        const {
            getByText
        } = await render(<CabecalhoPerfil usuario={usuario} />);

        expect(getByText(usuario.nome)).toBeTruthy();
        expect(getByText(usuario.email)).toBeTruthy();
    });
});
