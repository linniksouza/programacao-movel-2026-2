import { DateTime } from "luxon";

import { Doacao } from "@/data/models/doacao.model";
import { Instituicao } from "@/data/models/instituicao.model";
import { Usuario } from "@/data/models/usuario.model";
import { fireEvent, render } from "@/utils/test-utils";
import { ListaDoacoesFeitas } from ".";

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
const onRefresh = jest.fn();

describe("Suite de testes de unidade para validar o componente de UI 'ListaDoacoesFeitas'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve renderizar mensagem de sem doacoes feitas ao receber um array de doacoes vazio", async () => {
        const {
            getByText
        } = await render(
            <ListaDoacoesFeitas
                doacoes={[]}
                refreshing={false}
                onRefresh={onRefresh}
            />
        );

        expect(onRefresh).not.toHaveBeenCalled();
        expect(getByText("Você ainda não fez nenhuma doação!")).toBeTruthy();
    });

    it("Deve renderizar todas as doacoes feitas ao receber um array de doacoes preenchido", async () => {
        const {
            getAllByTestId
        } = await render(
            <ListaDoacoesFeitas
                doacoes={doacoes}
                refreshing={false}
                onRefresh={onRefresh}
            />
        );

        expect(onRefresh).not.toHaveBeenCalled();
        expect(getAllByTestId("card-doacao-feita")).toHaveLength(doacoes.length);
    });

    it("Deve renderizar uma doacao feita ao receber um array com uma doacao e depois deve renderizar duas doacoes ao receber um array com duas doacoes", async () => {
        const {
            getAllByTestId,
            getByTestId,
            rerender
        } = await render(
            <ListaDoacoesFeitas
                doacoes={doacoes.slice(0, 1)}
                refreshing={false}
                onRefresh={onRefresh}
            />
        );

        expect(onRefresh).not.toHaveBeenCalled();
        expect(getAllByTestId("card-doacao-feita")).toHaveLength(1);

        const listaDoacoesFeitas = getByTestId("lista-doacoes-feitas");
        await fireEvent(listaDoacoesFeitas, "refresh");

        await rerender(
            <ListaDoacoesFeitas
                doacoes={doacoes}
                refreshing={false}
                onRefresh={onRefresh}
            />
        );

        expect(onRefresh).toHaveBeenCalledTimes(1);
        expect(getAllByTestId("card-doacao-feita")).toHaveLength(2);
    });
});
