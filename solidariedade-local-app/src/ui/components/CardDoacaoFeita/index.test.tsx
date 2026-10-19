import { DateTime } from "luxon";

import { buscarInstituicao } from "@/data/api/instituicoes";
import { Doacao } from "@/data/models/doacao.model";
import { Instituicao } from "@/data/models/instituicao.model";
import { render } from "@/utils/test-utils";
import { CardDoacaoFeita } from ".";

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
const doacao: Doacao = {
    id: "1",
    tipoDoacao: "Alimentos não perecíveis",
    observacoes: "Itens embalados corretamente",
    idInstituicao: instituicao.id,
    nomeInstituicao: instituicao.nome,
    idDoador: "1",
    nomeDoador: "Linnik Souza",
    emailDoador: "linniksouza.prof@gmail.com",
    dataHoraDoacao: DateTime.now(),
    itensDoacao: [
        {
            id: "1",
            nome: "Arroz",
            unidadeMedida: "Kg",
            quantidade: 10
        },
        {
            id: "2",
            nome: "Feijão",
            unidadeMedida: "Kg",
            quantidade: 10
        }
    ]
};
jest.mock("@/data/api/instituicoes", () => ({
    buscarInstituicao: jest.fn()
}));

describe("Suite de testes de unidade para validar o componente de UI 'CardDoacaoFeita'", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.mocked(buscarInstituicao).mockReturnValue(instituicao);
    });

    it("Deve renderizar as informacoes sobre a instituicao de destino e dos itens doados", async () => {
        const itens = 2;
        const unidades = 20;
        const dadosItensDoados = `${itens} itens - ${unidades} unidades`;
        const horaDoacao = doacao.dataHoraDoacao.toFormat("HH:mm");

        const {
            getByText
        } = await render(
            <CardDoacaoFeita doacao={doacao} />
        );

        expect(getByText(instituicao.nome)).toBeTruthy();
        expect(getByText(doacao.tipoDoacao)).toBeTruthy();
        expect(getByText(dadosItensDoados)).toBeTruthy();
        expect(getByText(horaDoacao)).toBeTruthy();
    });
});
