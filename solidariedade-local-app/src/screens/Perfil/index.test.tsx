import { buscarUsuario } from "@/data/api/usuarios";
import { perfilRepositoryFactory } from "@/data/asyncstorage";
import { Usuario } from "@/data/models/usuario.model";
import { PerfilRepository } from "@/data/repositories/perfil";
import { fireEvent, render } from "@/utils/test-utils";
import { PerfilScreen } from ".";

const usuario: Usuario = {
    id: "1",
    nome: "Linnik Souza",
    email: "linniksouza.prof@gmail.com",
    urlImagem: "https://avatars.githubusercontent.com/u/263082479"
};
jest.mock("@/data/api/usuarios", () => ({
    buscarUsuario: jest.fn()
}));
jest.mock("@/data/asyncstorage", () => ({
    perfilRepositoryFactory: jest.fn()
}));

describe("Suite de testes de unidade para validar a tela 'PerfilScreen'", () => {
    let perfilRepositoryMock: jest.Mocked<PerfilRepository>;

    beforeEach(() => {
        jest.clearAllMocks();

        perfilRepositoryMock = {
            buscarPreferencias: jest.fn().mockResolvedValue({}),
            salvarPreferencias: jest.fn()
        };

        jest.mocked(perfilRepositoryFactory).mockReturnValue(perfilRepositoryMock);
        jest.mocked(buscarUsuario).mockReturnValue(usuario);
    });

    it("Deve mudar o estado de modo escuro para ativado quando tocar no item de modo escuro desativado", async () => {
        perfilRepositoryMock.buscarPreferencias.mockResolvedValueOnce({
            modoEscuro: false,
            notificacoes: false
        });

        const {
            getAllByTestId
        } = await render(<PerfilScreen />);

        const itensAtivacao = getAllByTestId("switch-ativar-desativar");
        const switchModoEscuro = itensAtivacao[0];
        await fireEvent(
            switchModoEscuro,
            "valueChange",
            true
        );

        expect(perfilRepositoryMock.buscarPreferencias).toHaveBeenCalledTimes(1);
        expect(perfilRepositoryMock.salvarPreferencias).toHaveBeenCalledWith({
            modoEscuro: true,
            notificacoes: false
        });
    });

    it("Deve mudar o estado de notificacoes para ativado quando tocar no item de notificacoes desativadas", async () => {
        perfilRepositoryMock.buscarPreferencias.mockResolvedValueOnce({
            modoEscuro: false,
            notificacoes: false
        });

        const {
            getAllByTestId
        } = await render(<PerfilScreen />);

        const itensAtivacao = getAllByTestId("switch-ativar-desativar");
        const switchNotificacoes = itensAtivacao[1];
        await fireEvent(
            switchNotificacoes,
            "valueChange",
            true
        );

        expect(perfilRepositoryMock.buscarPreferencias).toHaveBeenCalledTimes(1);
        expect(perfilRepositoryMock.salvarPreferencias).toHaveBeenCalledWith({
            modoEscuro: false,
            notificacoes: true
        });
    });
});
