import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { buscarInstituicao } from "@/data/api/instituicoes";
import { Instituicao } from "@/data/models/instituicao.model";
import { InstituicoesStackParams } from "@/navigation/Stack";
import { render } from "@/utils/test-utils";
import { DetalhesInstituicaoScreen } from ".";

const instituicao: Instituicao = {
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
        idInstituicao: instituicao.id
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
        const {
            getByText
        } = await render(
            <DetalhesInstituicaoScreen
                navigation={mockNavigation}
                route={mockRoute}
            />
        );

        expect(getByText(instituicao.nome)).toBeTruthy();
        for(const area of instituicao.areasAtuacao){
            expect(getByText(area)).toBeTruthy();
        }
        expect(getByText("Sobre")).toBeTruthy();
        expect(getByText(instituicao.biografia)).toBeTruthy();
    });
});
