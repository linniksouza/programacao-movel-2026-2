import { DateTime } from "luxon";

import { doacoesRepositoryFactory } from "@/data/drizzle";
import { Doacao } from "@/data/models/doacao.model";
import { Instituicao } from "@/data/models/instituicao.model";
import { Usuario } from "@/data/models/usuario.model";
import { DoacoesRepository } from "@/data/repositories/doacoes";
import { act, fireEvent, render, waitFor } from "@/utils/test-utils";
import { HistoricoDoacoesScreen } from ".";

const usuario: Usuario = {
    id: "1",
    nome: "Linnik Souza",
    email: "linniksouza.prof@gmail.com",
    urlImagem: "https://avatars.githubusercontent.com/u/263082479"
};
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
const doacoes: Doacao[] = [
    {
        id: "1",
        tipoDoacao: "Alimentos não perecíveis",
        observacoes: "Coletar na recepção do prédio",
        idInstituicao: instituicao.id,
        nomeInstituicao: instituicao.nome,
        idDoador: usuario.id,
        nomeDoador: usuario.nome,
        emailDoador: usuario.email,
        dataHoraDoacao: DateTime.now().minus({ hours: 8 }),
        itensDoacao: [
            {
                id: "1",
                nome: "Arroz",
                unidadeMedida: "Kg",
                quantidade: 2
            },
            {
                id: "2",
                nome: "Feijão",
                unidadeMedida: "Kg",
                quantidade: 2
            }
        ]
    },
    {
        id: "2",
        tipoDoacao: "Produtos de higiene pessoal",
        idInstituicao: instituicao.id,
        nomeInstituicao: instituicao.nome,
        idDoador: usuario.id,
        nomeDoador: usuario.nome,
        emailDoador: usuario.email,
        dataHoraDoacao: DateTime.now().minus({ hours: 4 }),
        itensDoacao: [
            {
                id: "3",
                nome: "Creme dental",
                unidadeMedida: "Unidade",
                quantidade: 5
            },
            {
                id: "4",
                nome: "Sabonete",
                unidadeMedida: "Unidade",
                quantidade: 20
            },
            {
                id: "5",
                nome: "Escova de dente",
                unidadeMedida: "Unidade",
                quantidade: 10
            }
        ]
    }
];
jest.mock("@/data/drizzle", () => ({
    doacoesRepositoryFactory: jest.fn()
}));

describe("Suite de testes de unidade para validar a tela 'HistoricoDoacoesScreen'", () => {
    let doacoesRepositoryMock: jest.Mocked<DoacoesRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();

        doacoesRepositoryMock = {
            buscarDoacoes: jest.fn().mockResolvedValue([]),
            salvarDoacao: jest.fn().mockResolvedValue(true)
        };

        jest.mocked(doacoesRepositoryFactory).mockReturnValue(doacoesRepositoryMock);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("Deve renderizar mensagem de sem doacoes feitas quando o repositorio retornar um array vazio", async () => {
        doacoesRepositoryMock.buscarDoacoes.mockResolvedValueOnce([]);

        const {
            getByText
        } = await render(<HistoricoDoacoesScreen />);

        expect(doacoesRepositoryMock.buscarDoacoes).toHaveBeenCalledTimes(1);
        expect(doacoesRepositoryMock.salvarDoacao).not.toHaveBeenCalled();
        expect(getByText("Você ainda não fez nenhuma doação!")).toBeTruthy();
    });

    it("Deve renderizar uma doacao feita quando o repositorio retornar uma doacao registrada", async () => {
        doacoesRepositoryMock.buscarDoacoes.mockResolvedValueOnce(doacoes.slice(0, 1));

        const {
            getByText
        } = await render(<HistoricoDoacoesScreen />);

        expect(doacoesRepositoryMock.buscarDoacoes).toHaveBeenCalledTimes(1);
        expect(doacoesRepositoryMock.salvarDoacao).not.toHaveBeenCalled();
        doacoes.slice(0, 1).forEach((doacao) => {
            const itens = doacao.itensDoacao.length;
            const unidades = doacao.itensDoacao.reduce((acc, item) => acc + item.quantidade, 0);
            const itensUnidades = `${itens} itens - ${unidades} unidades`;

            expect(getByText(instituicao.nome)).toBeTruthy();
            expect(getByText(doacao.tipoDoacao)).toBeTruthy();
            expect(getByText(itensUnidades)).toBeTruthy();
        });
    });

    it("Deve renderizar duas doacoes feitas quando renderizar uma doacao e em seguida atualizar a visualizacao do componente de lista", async () => {
        doacoesRepositoryMock.buscarDoacoes.mockResolvedValueOnce(doacoes.slice(0, 1));

        const {
            getAllByText,
            getByTestId,
            getByText
        } = await render(<HistoricoDoacoesScreen />);

        for(const doacao of doacoes.slice(0, 1)){
            const itens = doacao.itensDoacao.length;
            const unidades = doacao.itensDoacao.reduce((acc, item) => acc + item.quantidade, 0);
            const itensUnidades = `${itens} itens - ${unidades} unidades`;

            expect(getByText(instituicao.nome)).toBeTruthy();
            expect(getByText(doacao.tipoDoacao)).toBeTruthy();
            expect(getByText(itensUnidades)).toBeTruthy();
        }

        doacoesRepositoryMock.buscarDoacoes.mockResolvedValueOnce([...doacoes]);
        const listaDoacoesFeitas = getByTestId("lista-doacoes-feitas");
        await fireEvent(listaDoacoesFeitas, "refresh");
        await act(() => {
            jest.advanceTimersByTime(3000);
        });

        await waitFor(() => {
            expect(doacoesRepositoryMock.buscarDoacoes).toHaveBeenCalledTimes(2);
            expect(doacoesRepositoryMock.salvarDoacao).not.toHaveBeenCalled();
        });

        for(const doacao of doacoes){
            const itens = doacao.itensDoacao.length;
            const unidades = doacao.itensDoacao.reduce((acc, item) => acc + item.quantidade, 0);
            const itensUnidades = `${itens} itens - ${unidades} unidades`;

            expect(getByText(doacao.tipoDoacao)).toBeTruthy();
            expect(getByText(itensUnidades)).toBeTruthy();
        }
        expect(getAllByText(instituicao.nome)).toBeTruthy();
    });
});
