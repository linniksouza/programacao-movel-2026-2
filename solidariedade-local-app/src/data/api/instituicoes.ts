import { Instituicao } from "@/data/models/instituicao.model";

// const instituicoes: Instituicao[] = [
//     {
//         cnpj: "1",
//         nome: "Aldeias Infantis S.O.S.",
//         biografia: "A Aldeias Infantis SOS é a maior organização do mundo dedicada a apoiar crianças e adolescentes sem cuidados parentais ou em risco de perdê-los.",
//         areas_atuacao: ["Crianças", "Assistência Social"],
//         endereco_site: "https://www.aldeiasinfantis.org.br",
//         localizacao: "Alvorada",
//         imagem_principal: "https://www.aldeiasinfantis.org.br/getmedia/5cda5c60-6f7a-4e10-9ddf-4554ebf2b27e/Logo-Aldeias_branco-c.jpg?width=183&height=69&ext=.jpg",
//         imagem_capa: "https://www.aldeiasinfantis.org.br/getmedia/f9f970c6-920a-41c7-9fbb-ab49d098c4f4/clickimage_aldeias.png?width=685&height=317"
//     },
//     {
//         cnpj: "2",
//         nome: "Nacer",
//         biografia: "Uma associação dedicada à assistência de crianças e adolescentes, juntamente com suas mães, que se encontram em regime de abrigo ou do programa de acolhimento familiar. Além disso, também temos um compromisso firme com o serviço de  abordagem social para indivíduos em situação de rua e famílias em situação de vulnerabilidade. Através de nossos esforços, buscamos proporcionar um ambiente seguro e acolhedor, promovendo o bem-estar e a inclusão social para todos os que atendemos.",
//         areas_atuacao: ["Crianças", "Assistência Social", "Acolhimento"],
//         endereco_site: "https://nacer.org.br",
//         localizacao: "Parque Dez",
//         imagem_principal: "https://nacer.org.br/wp-content/uploads/2024/05/cropped-Nova-Marca-01.png",
//         imagem_capa: "https://nacer.org.br/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-12-at-20.15.51-2.jpeg"
//     }
// ];

const buscarInstituicoes = async (): Promise<Instituicao[]> => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/instituicoes`);

    if(!response.ok){
        const mensagem = `(${response.status}) ${await response.text()}`;
        console.log(`[BUSCAR_INSTITUICOES] Nao foi possivel consultar dados das instituicoes sociais: ${mensagem}.`);

        throw new Error(`Não foi possível consultar dados das instituições sociais.`);
    }

    return await response.json() as Instituicao[];
};

export { buscarInstituicoes };
