import { ItemDoacaoDemanda } from "@/data/models/demanda.model";
import { fireEvent, render, within } from "@/utils/test-utils";
import { ListaItensDoacao } from ".";

const itensDoacao: ItemDoacaoDemanda[] = [
    {
        id: "1",
        nome: "Arroz",
        unidade_medida: "Kg"
    },
    {
        id: "2",
        nome: "Feijão",
        unidade_medida: "Kg"
    },
];
const onChangeQuantidade = jest.fn();

describe("Suite de testes de unidade para validar o componente de UI 'ListaItensDoacao'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve renderizar corretamente dois itens de doacao quando for passado um array de dois itens", async () => {
        const {
            getAllByTestId
        } = await render(
            <ListaItensDoacao
                itensDoacao={itensDoacao}
                quantidades={{}}
                onChangeQuantidade={onChangeQuantidade}
            />
        );

        expect(getAllByTestId("container-item-doacao")).toHaveLength(itensDoacao.length);
    });

    it("Deve executar a acao de mudar quantidade para um item ao tocar no botao de aumentar uma unidade do item de doacao", async () => {
        const item = itensDoacao[0];
        const chave = `${item.nome}-${item.unidade_medida}`;

        const {
            getAllByTestId
        } = await render(
            <ListaItensDoacao
                itensDoacao={itensDoacao}
                quantidades={{}}
                onChangeQuantidade={onChangeQuantidade}
            />
        );
        
        const containersItensDoacao = getAllByTestId("container-item-doacao");
        const btnAumentar = within(containersItensDoacao[0]).getByTestId("btn-aumentar-qtd");
        await fireEvent.press(btnAumentar);

        expect(containersItensDoacao).toHaveLength(itensDoacao.length);
        expect(onChangeQuantidade).toHaveBeenCalledTimes(1);
        expect(onChangeQuantidade).toHaveBeenCalledWith(chave, 1);
    });
});
