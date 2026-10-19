import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert } from "react-native";

import { buscarDemanda } from "@/data/api/demandas";
import { buscarUsuario } from "@/data/api/usuarios";
import { doacoesRepositoryFactory } from "@/data/drizzle";
import { Demanda } from "@/data/models/demanda.model";
import { Usuario } from "@/data/models/usuario.model";
import { DoacoesRepository } from "@/data/repositories/doacoes";
import { DemandasStackParams } from "@/navigation/Stack";
import { act, fireEvent, render, waitFor } from "@/utils/test-utils";
import { RegistroDoacaoScreen } from ".";

const usuario: Usuario = {
    id: "1",
    nome: "Linnik Souza",
    email: "linniksouza.prof@gmail.com",
    urlImagem: "https://avatars.githubusercontent.com/u/263082479"
};
const demanda: Demanda = {
    id: "1",
    necessidadesInstituicao: "Alimentos não perecíveis",
    instituicao: {
        id: "1",
        nome: "Lar Esperança",
        localizacao: "Compensa",
        imagemPrincipal: "https://plus.unsplash.com/premium_vector-1724665300883-3af06a418d3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
    },
    itensDoacao: [
        { nome: "Arroz", unidadeMedida: "Kg" },
        { nome: "Feijão", unidadeMedida: "Kg" },
        { nome: "Óleo", unidadeMedida: "Garrafa" },
        { nome: "Açúcar", unidadeMedida: "Kg" }
    ]
};
const mockRoute = {
    key: "RegistrarDoacao",
    name: "RegistrarDoacao" as const,
    params: {
        idDemanda: demanda.id
    }
};
const mockNavigation = {} as NativeStackNavigationProp<DemandasStackParams>;
const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
    const original = jest.requireActual("@react-navigation/native");

    return {
        ...original,
        useNavigation: () => ({
            navigate: mockNavigate,
        })
    };
});
jest.mock("@/data/api/demandas", () => ({
    buscarDemanda: jest.fn()
}));
jest.mock("@/data/api/usuarios", () => ({
    buscarUsuario: jest.fn()
}));
jest.mock("@/data/drizzle", () => ({
    doacoesRepositoryFactory: jest.fn()
}));

describe("Suite de testes de unidade para validar a tela 'RegistroDoacaoScreen", () => {
    let doacoesRepositoryMock: jest.Mocked<DoacoesRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();

        doacoesRepositoryMock = {
            buscarDoacoes: jest.fn().mockResolvedValue([]),
            salvarDoacao: jest.fn().mockResolvedValue(true)
        };

        jest.mocked(buscarDemanda).mockReturnValue(demanda);
        jest.mocked(buscarUsuario).mockReturnValue(usuario);
        jest.mocked(doacoesRepositoryFactory).mockReturnValue(doacoesRepositoryMock)

        jest.spyOn(Alert, "alert");
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("Deve renderizar as informacoes da instituicao e os itens de doacao recebidos da demanda", async () => {
        const {
            getByText
        } = await render(
            <RegistroDoacaoScreen
                navigation={mockNavigation}
                route={mockRoute}
            />
        );

        expect(getByText(demanda.instituicao.nome)).toBeTruthy();
        expect(getByText(demanda.instituicao.localizacao)).toBeTruthy();
        for(const item of demanda.itensDoacao){
            expect(getByText(`${item.nome} (${item.unidadeMedida})`)).toBeTruthy();
        }
    });

    it("Nao deve disparar o registro da doacao se tentar confirmar doacao contendo todos os itens com quantidades zeradas", async () => {
        const {
            getByTestId
        } = await render(
            <RegistroDoacaoScreen
                navigation={mockNavigation}
                route={mockRoute}
            />
        );
        const btnConfirmarDoacao = getByTestId("btn-confirmar-doacao");

        await fireEvent.press(btnConfirmarDoacao);

        expect(Alert.alert)
            .toHaveBeenCalledWith(
                "Confirmar Doação",
                "Deseja confirmar esta doação?",
                expect.any(Array)
            );

        const btnAlerts = (Alert.alert as jest.Mock).mock.calls[0][2];
        const btnRegistrarDoacao = btnAlerts.find((btn: any) => btn.text === "Confirmar");
        btnRegistrarDoacao.onPress();

        await act(async () => jest.advanceTimersByTime(3000));

        expect(doacoesRepositoryMock.salvarDoacao).not.toHaveBeenCalled();
    });

    it("Deve disparar o registro da doacao e navegar para a tela de demandas quando houver itens e confirmar o alerta", async () => {
        doacoesRepositoryMock.salvarDoacao.mockResolvedValueOnce(true);

        const {
            findByText,
            getAllByTestId,
            getByPlaceholderText,
            getByTestId
        } = await render(
            <RegistroDoacaoScreen
                navigation={mockNavigation}
                route={mockRoute}
            />
        );

        const botoesAumentar = getAllByTestId("btn-aumentar-qtd");
        await fireEvent.press(botoesAumentar[0]);
        
        const inputObservacoes = getByPlaceholderText("Ex.: Entregue na portaria");
        await fireEvent.changeText(inputObservacoes, "Coletar na recepção");
        
        const btnConfirmarDoacao = getByTestId("btn-confirmar-doacao");
        await fireEvent.press(btnConfirmarDoacao);

        const alertButtons = (Alert.alert as jest.Mock).mock.calls[0][2];
        const confirmButton = alertButtons.find((btn: any) => btn.text === "Confirmar");
        
        await act(async () => {
            confirmButton.onPress();
            jest.advanceTimersByTime(3000);
        });

        await waitFor(() => {
            expect(doacoesRepositoryMock.salvarDoacao).toHaveBeenCalledTimes(1);
            expect(doacoesRepositoryMock.salvarDoacao).toHaveBeenCalledWith(
                expect.objectContaining({
                    tipoDoacao: "Alimentos não perecíveis",
                    observacoes: "Coletar na recepção",
                    idInstituicao: "1",
                    nomeInstituicao: "Lar Esperança",
                    idDoador: "1",
                    nomeDoador: "Linnik Souza",
                    emailDoador: "linniksouza.prof@gmail.com",
                    itensDoacao: [
                        { nome: "Arroz", unidadeMedida: "Kg", quantidade: 1 }
                    ]
                })
            );
        });

        expect(await findByText("Doação registrada com sucesso!")).toBeTruthy();
        expect(mockNavigate).toHaveBeenCalledWith("Demandas");
    });

    it("Deve exibir mensagem de erro no snackbar se o repositorio retornar false ao registrar doacao", async () => {
        doacoesRepositoryMock.salvarDoacao.mockResolvedValueOnce(false);

        const {
            getAllByTestId,
            getByTestId,
            findByText
        } = await render(
            <RegistroDoacaoScreen
                route={mockRoute}
                navigation={mockNavigation}
            />
        );

        const botoesAumentar = getAllByTestId("btn-aumentar-qtd");
        await fireEvent.press(botoesAumentar[0]);

        const btnConfirmarDoacao = getByTestId("btn-confirmar-doacao");
        await fireEvent.press(btnConfirmarDoacao);
        
        const alertButtons = (Alert.alert as jest.Mock).mock.calls[0][2];
        const confirmButton = alertButtons.find((btn: any) => btn.text === "Confirmar");

        await act(async () => {
            confirmButton.onPress();
            jest.advanceTimersByTime(3000);
        });

        await waitFor(() => {
            expect(doacoesRepositoryMock.salvarDoacao).toHaveBeenCalledTimes(1);
            expect(doacoesRepositoryMock.salvarDoacao).toHaveBeenCalledWith(
                expect.objectContaining({
                    tipoDoacao: "Alimentos não perecíveis",
                    observacoes: "",
                    idInstituicao: "1",
                    nomeInstituicao: "Lar Esperança",
                    idDoador: "1",
                    nomeDoador: "Linnik Souza",
                    emailDoador: "linniksouza.prof@gmail.com",
                    itensDoacao: [
                        { nome: "Arroz", unidadeMedida: "Kg", quantidade: 1 }
                    ]
                })
            );
        });

        expect(await findByText("Falha no registro da doação. Tente novamente.")).toBeTruthy();
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
