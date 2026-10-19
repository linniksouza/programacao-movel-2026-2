import { useNavigation } from "@react-navigation/native";

import { buscarInstituicoes } from "@/data/api/instituicoes";
import { Instituicao } from "@/data/models/instituicao.model";
import { render } from "@/utils/test-utils";
import { InstituicoesScreen } from ".";

const instituicoes: Instituicao[] = [
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
jest.mock("@/data/api/instituicoes", () => ({
    buscarInstituicoes: jest.fn()
}));
const mockNavigate = jest.fn();

describe("Suite de testes de unidade para validar a tela 'InstituicoesScreen'", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.mocked(useNavigation).mockReturnValue({ navigate: mockNavigate });
        jest.mocked(buscarInstituicoes).mockReturnValue(instituicoes);
    });

    it("Deve renderizar os componentes de UI corretamente", async () => {
        const {
            getByPlaceholderText,
            getByText
        } = await render(<InstituicoesScreen />);

        expect(getByText("Instituições")).toBeTruthy();
        expect(getByPlaceholderText("Buscar instituições...")).toBeTruthy();
        for(const instituicao of instituicoes){
            expect(getByText(instituicao.nome)).toBeTruthy();
            expect(getByText(instituicao.localizacao)).toBeTruthy();
        }
    });
});
