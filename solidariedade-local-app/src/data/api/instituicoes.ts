import { Instituicao } from "@/data/models/instituicao.model";

const instituicoes: Instituicao[] = [
    {
        id: "1",
        nome: "Aldeias Infantis S.O.S.",
        biografia: "A Aldeias Infantis SOS é a maior organização do mundo dedicada a apoiar crianças e adolescentes sem cuidados parentais ou em risco de perdê-los.",
        areasAtuacao: ["Crianças", "Assistência Social"],
        enderecoSite: "https://www.aldeiasinfantis.org.br",
        localizacao: "Alvorada",
        imagemPrincipal: "https://www.aldeiasinfantis.org.br/getmedia/5cda5c60-6f7a-4e10-9ddf-4554ebf2b27e/Logo-Aldeias_branco-c.jpg?width=183&height=69&ext=.jpg",
        imagemCapa: "https://www.aldeiasinfantis.org.br/getmedia/f9f970c6-920a-41c7-9fbb-ab49d098c4f4/clickimage_aldeias.png?width=685&height=317"
    },
    {
        id: "2",
        nome: "Nacer",
        biografia: "Uma associação dedicada à assistência de crianças e adolescentes, juntamente com suas mães, que se encontram em regime de abrigo ou do programa de acolhimento familiar. Além disso, também temos um compromisso firme com o serviço de  abordagem social para indivíduos em situação de rua e famílias em situação de vulnerabilidade. Através de nossos esforços, buscamos proporcionar um ambiente seguro e acolhedor, promovendo o bem-estar e a inclusão social para todos os que atendemos.",
        areasAtuacao: ["Crianças", "Assistência Social", "Acolhimento"],
        enderecoSite: "https://nacer.org.br",
        localizacao: "Parque Dez",
        imagemPrincipal: "https://nacer.org.br/wp-content/uploads/2024/05/cropped-Nova-Marca-01.png",
        imagemCapa: "https://nacer.org.br/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-12-at-20.15.51-2.jpeg"
    }
];

const buscarInstituicoes = (): Instituicao[] => {
    return instituicoes;
};

const buscarInstituicao = (id: string): Instituicao | undefined => {
    return instituicoes.find((i) => i.id === id);
};

export { buscarInstituicoes, buscarInstituicao };
