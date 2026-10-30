import { Doacao, NovaDoacao } from "@/data/models/doacao.model";

const registrarDoacao = async (doacao: NovaDoacao): Promise<Doacao> => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/doacoes`, {
        method: "POST",
        body: JSON.stringify(doacao),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    if(!response.ok){
        const mensagem = `(${response.status}) ${await response.text()}`;
        console.log(`[REGISTRAR_DOACAO] Nao foi possivel registrar uma nova doacao no backend: ${mensagem}`);

        throw new Error("Não foi possível registrar uma nova doação.");
    }

    return await response.json() as Doacao;
};

export {
    registrarDoacao
};
