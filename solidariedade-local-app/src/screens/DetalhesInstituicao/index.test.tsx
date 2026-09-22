import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { render } from "@testing-library/react-native";

import { buscarInstituicao } from "@/data/api/instituicoes";
import { InstituicoesStackParams } from "@/navigation/Stack";
import { DetalhesInstituicaoScreen } from ".";

const idInstituicao = "1";
const instituicao = {
    id: "1",
    nome: "Aldeias Infantis S.O.S.",
    biografia: "A Aldeias Infantis SOS é a maior organização do mundo dedicada a apoiar crianças e adolescentes sem cuidados parentais ou em risco de perdê-los.",
    areasAtuacao: ["Crianças", "Assistência Social"],
    enderecoSite: "https://www.aldeiasinfantis.org.br",
    localizacao: "Alvorada",
    imagemPrincipal: "https://www.aldeiasinfantis.org.br/getmedia/5cda5c60-6f7a-4e10-9ddf-4554ebf2b27e/Logo-Aldeias_branco-c.jpg?width=183&height=69&ext=.jpg",
    imagemCapa: "https://www.aldeiasinfantis.org.br/getmedia/f9f970c6-920a-41c7-9fbb-ab49d098c4f4/clickimage_aldeias.png?width=685&height=317"
};
const mockRoute = {
    key: "DetalhesInstituicao",
    name: "DetalhesInstituicao" as const,
    params: {
        idInstituicao
    }
};
const mockNavigation = {} as NativeStackNavigationProp<InstituicoesStackParams>;
jest.mock("@/data/api/instituicoes", () => ({
    buscarInstituicao: jest.fn()
}));

describe("Suite de testes de unidade para validar a tela 'DetalhesInstituicaoScreen'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.mocked(buscarInstituicao).mockReturnValue(instituicao);
    });

    it("Deve renderizar os componentes de UI corretamente", async () => {
        const { getByText } = await render(
            <DetalhesInstituicaoScreen
                navigation={mockNavigation}
                route={mockRoute}
            />
        );

        expect(getByText(instituicao.nome)).toBeTruthy();
        instituicao.areasAtuacao.forEach((area) => {
            expect(getByText(area)).toBeTruthy();
        });
        expect(getByText("Sobre")).toBeTruthy();
        expect(getByText(instituicao.biografia)).toBeTruthy();
    });
});
