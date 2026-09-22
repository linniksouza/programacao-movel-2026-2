import { useNavigation } from "@react-navigation/native";
import { fireEvent, render } from "@testing-library/react-native";

import { ListaInstituicoes } from ".";

const instituicoes = [
    {
        id: "1",
        nome: "Aldeias Infantis S.O.S.",
        biografia: "A Aldeias Infantis SOS é a maior organização do mundo dedicada a apoiar crianças e adolescentes sem cuidados parentais ou em risco de perdê-los.",
        areasAtuacao: ["Crianças", "Assistência Social"],
        enderecoSite: "https://www.aldeiasinfantis.org.br",
        localizacao: "Alvorada",
        imagemPrincipal: "https://www.aldeiasinfantis.org.br/getmedia/5cda5c60-6f7a-4e10-9ddf-4554ebf2b27e/Logo-Aldeias_branco-c.jpg?width=183&height=69&ext=.jpg",
        imagemCapa: "https://www.aldeiasinfantis.org.br/getmedia/f9f970c6-920a-41c7-9fbb-ab49d098c4f4/clickimage_aldeias.png?width=685&height=317"
    }
];
jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn()
}));
const mockNavigate = jest.fn();

describe("Suite de testes de unidade para validar o componente de UI 'ListaInstituicoes'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.mocked(useNavigation).mockReturnValue({ navigate: mockNavigate });
    });

    it("Deve renderizar corretamente todos os cards de instituicoes quando forem passadas...", async () => {
        const { getAllByTestId } = await render(<ListaInstituicoes instituicoes={instituicoes} />);

        expect(getAllByTestId("container-card-instituicao")).toHaveLength(instituicoes.length);
    });

    it("Deve navegar para a tela de detalhes da instituicao ao selecionar uma instituicao", async () => {
        const instituicao = instituicoes[0];

        const { getByTestId } = await render(<ListaInstituicoes instituicoes={instituicoes} />);
        fireEvent.press(getByTestId("btn-detalhes-instituicao"));

        expect(mockNavigate).toHaveBeenCalledWith("DetalhesInstituicao", { idInstituicao: instituicao.id });
    });
});
