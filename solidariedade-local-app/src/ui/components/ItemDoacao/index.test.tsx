import { ItemDoacaoDemanda } from "@/data/models/demanda.model";
import { fireEvent, render } from "@/utils/test-utils";
import { ItemDoacao } from ".";

const item: ItemDoacaoDemanda = {
    id: "1",
    nome: "Arroz",
    unidade_medida: "Kg",
};
const itemUnidade = `${item.nome} (${item.unidade_medida})`;
const setQuantidade = jest.fn();

describe("Suite de testes de unidade para validar o componente de UI 'ItemDoacao'", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve adicionar 2 unidades ao tocar no botao de adicionar duas vezes com uma quantidade inicial zerada", async () => {
        const itemDoacao: ItemDoacaoDemanda = {
            ...item
        };

        const {
            getByTestId,
            getByText,
            rerender
        } = await render(
            <ItemDoacao
                item={itemDoacao}
                quantidade={0}
                setQuantidade={setQuantidade}
            />
        );
        const btnAumentar = getByTestId("btn-aumentar-qtd");

        await fireEvent.press(btnAumentar);
        expect(setQuantidade).toHaveBeenNthCalledWith(1, 1);

        await rerender(
            <ItemDoacao
                item={itemDoacao}
                quantidade={1}
                setQuantidade={setQuantidade}
            />
        );

        await fireEvent.press(btnAumentar);
        expect(setQuantidade).toHaveBeenNthCalledWith(2, 2);

        expect(getByText(itemUnidade)).toBeTruthy();
        expect(setQuantidade).toHaveBeenCalledTimes(2);
    });

    it("Deve adicionar duas unidades ao tocar no botao de adicionar duas vezes e remover uma unidade ao tocar no botao de diminuir uma vez com uma quantidade zerada", async () => {
        const itemDoacao: ItemDoacaoDemanda = {
            ...item
        };

        const {
            getByTestId,
            getByText,
            rerender
        } = await render(
            <ItemDoacao
                item={itemDoacao}
                quantidade={0}
                setQuantidade={setQuantidade}
            />
        );
        const btnAumentar = getByTestId("btn-aumentar-qtd");
        const btnDiminuir = getByTestId("btn-diminuir-qtd");

        await fireEvent.press(btnAumentar);
        expect(setQuantidade).toHaveBeenNthCalledWith(1, 1);

        await rerender(
            <ItemDoacao
                item={itemDoacao}
                quantidade={1}
                setQuantidade={setQuantidade}
            />
        );

        await fireEvent.press(btnAumentar);
        expect(setQuantidade).toHaveBeenNthCalledWith(2, 2);

        await rerender(
            <ItemDoacao
                item={itemDoacao}
                quantidade={2}
                setQuantidade={setQuantidade}
            />
        );

        await fireEvent.press(btnDiminuir);
        expect(setQuantidade).toHaveBeenNthCalledWith(3, 1);

        expect(getByText(itemUnidade)).toBeTruthy();
        expect(setQuantidade).toHaveBeenCalledTimes(3);
    });

    it("Deve diminuir ate o piso zerado ao tocar no botao de diminuir tres vezes com uma quantidade igual a dois", async () => {
        const itemDoacao: ItemDoacaoDemanda = {
            ...item
        };

        const {
            getByTestId,
            getByText,
            rerender
        } = await render(
            <ItemDoacao
                item={itemDoacao}
                quantidade={2}
                setQuantidade={setQuantidade}
            />
        );
        const btnDiminuir = getByTestId("btn-diminuir-qtd");

        await fireEvent.press(btnDiminuir);
        expect(setQuantidade).toHaveBeenNthCalledWith(1, 1);

        await rerender(
            <ItemDoacao
                item={itemDoacao}
                quantidade={1}
                setQuantidade={setQuantidade}
            />
        );

        await fireEvent.press(btnDiminuir);
        expect(setQuantidade).toHaveBeenNthCalledWith(2, 0);

        await rerender(
            <ItemDoacao
                item={itemDoacao}
                quantidade={0}
                setQuantidade={setQuantidade}
            />
        );

        await fireEvent.press(btnDiminuir);

        expect(getByText(itemUnidade)).toBeTruthy();
        expect(setQuantidade).toHaveBeenCalledTimes(2);
    });

    it("Deve aumentar ate o teto maximo de itens ao tocar no botao de aumentar tres vezes com uma quantidade igual a duas unidades menor que a quantidade maxima de itens", async () => {
        const itemDoacao: ItemDoacaoDemanda = {
            ...item,
            quantidade_maxima: 5
        };

        const {
            getByTestId,
            getByText,
            rerender
        } = await render(
            <ItemDoacao
                item={itemDoacao}
                quantidade={3}
                setQuantidade={setQuantidade}
            />
        );
        const btnAumentar = getByTestId("btn-aumentar-qtd");

        await fireEvent.press(btnAumentar);
        expect(setQuantidade).toHaveBeenNthCalledWith(1, 4);

        await rerender(
            <ItemDoacao
                item={itemDoacao}
                quantidade={4}
                setQuantidade={setQuantidade}
            />
        );

        await fireEvent.press(btnAumentar);
        expect(setQuantidade).toHaveBeenNthCalledWith(2, 5);

        await rerender(
            <ItemDoacao
                item={itemDoacao}
                quantidade={5}
                setQuantidade={setQuantidade}
            />
        );

        await fireEvent.press(btnAumentar);

        expect(getByText(itemUnidade)).toBeTruthy();
        expect(setQuantidade).toHaveBeenCalledTimes(2);
    });
});
