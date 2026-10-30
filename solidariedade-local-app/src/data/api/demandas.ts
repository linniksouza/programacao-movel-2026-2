import { Demanda } from "@/data/models/demanda.model";

// const demandas: Demanda[] = [
//     {
//         id: "d1",
//         necessidadesInstituicao: "Alimentos não perecíveis e fraldas infantis",
//         itensDoacao: [
//             {
//                 nome: "Leite em pó integral",
//                 unidadeMedida: "Lata",
//             },
//             {
//                 nome: "Fralda descartável G",
//                 unidadeMedida: "Pacote",
//             },
//             {
//                 nome: "Arroz",
//                 unidadeMedida: "Kg",
//             }
//         ],
//         instituicao: {
//             cnpj: "1",
//             nome: "Aldeias Infantis S.O.S.",
//             localizacao: "Alvorada",
//             imagem_principal: "https://www.aldeiasinfantis.org.br/getmedia/5cda5c60-6f7a-4e10-9ddf-4554ebf2b27e/Logo-Aldeias_branco-c.jpg?width=183&height=69&ext=.jpg"
//         }
//     },
//     {
//         id: "d2",
//         necessidadesInstituicao: "Roupas infantis e material escolar",
//         itensDoacao: [
//             {
//                 nome: "Caderno 10 matérias",
//                 unidadeMedida: "Unidade",
//             },
//             {
//                 nome: "Roupas (3 a 10 anos)",
//                 unidadeMedida: "Peça",
//             },
//             {
//                 nome: "Mochila escolar",
//                 unidadeMedida: "Unidade",
//             }
//         ],
//         instituicao: {
//             cnpj: "1",
//             nome: "Aldeias Infantis S.O.S.",
//             localizacao: "Alvorada",
//             imagem_principal: "https://www.aldeiasinfantis.org.br/getmedia/5cda5c60-6f7a-4e10-9ddf-4554ebf2b27e/Logo-Aldeias_branco-c.jpg?width=183&height=69&ext=.jpg"
//         }
//     },
//     {
//         id: "d3",
//         necessidadesInstituicao: "Produtos de limpeza",
//         itensDoacao: [
//             {
//                 nome: "Sabão em pó",
//                 unidadeMedida: "Pacote",
//             },
//             {
//                 nome: "Desinfetante",
//                 unidadeMedida: "Frasco",
//             },
//             {
//                 nome: "Detergente neutro",
//                 unidadeMedida: "Frasco",
//             }
//         ],
//         instituicao: {
//             cnpj: "2",
//             nome: "Nacer",
//             localizacao: "Parque Dez",
//             imagem_principal: "https://nacer.org.br/wp-content/uploads/2024/05/cropped-Nova-Marca-01.png"
//         }
//     },
//     {
//         id: "d4",
//         necessidadesInstituicao: "Kits de higiene pessoal",
//         itensDoacao: [
//             {
//                 nome: "Sabonete",
//                 unidadeMedida: "Unidade",
//             },
//             {
//                 nome: "Creme dental",
//                 unidadeMedida: "Tubo 90g"
//             },
//             {
//                 nome: "Absorvente higiênico",
//                 unidadeMedida: "Pacote",
//             },
//             {
//                 nome: "Escova de dentes",
//                 unidadeMedida: "Unidade",
//             }
//         ],
//         instituicao: {
//             cnpj: "2",
//             nome: "Nacer",
//             localizacao: "Parque Dez",
//             imagem_principal: "https://nacer.org.br/wp-content/uploads/2024/05/cropped-Nova-Marca-01.png"
//         }
//     },
//     {
//         id: "d5",
//         necessidadesInstituicao: "Kits de higiene pessoal",
//         itensDoacao: [
//             {
//                 nome: "Sabonete",
//                 unidadeMedida: "Unidade",
//             },
//             {
//                 nome: "Creme dental",
//                 unidadeMedida: "Tubo 90g"
//             },
//             {
//                 nome: "Absorvente higiênico",
//                 unidadeMedida: "Pacote",
//             },
//             {
//                 nome: "Escova de dentes",
//                 unidadeMedida: "Unidade",
//             }
//         ],
//         instituicao: {
//             cnpj: "2",
//             nome: "Nacer",
//             localizacao: "Parque Dez",
//             imagem_principal: "https://nacer.org.br/wp-content/uploads/2024/05/cropped-Nova-Marca-01.png"
//         }
//     },
//     {
//         id: "d6",
//         necessidadesInstituicao: "Kits de higiene pessoal",
//         itensDoacao: [
//             {
//                 nome: "Sabonete",
//                 unidadeMedida: "Unidade",
//             },
//             {
//                 nome: "Creme dental",
//                 unidadeMedida: "Tubo 90g"
//             },
//             {
//                 nome: "Absorvente higiênico",
//                 unidadeMedida: "Pacote",
//             },
//             {
//                 nome: "Escova de dentes",
//                 unidadeMedida: "Unidade",
//             }
//         ],
//         instituicao: {
//             cnpj: "2",
//             nome: "Nacer",
//             localizacao: "Parque Dez",
//             imagem_principal: "https://nacer.org.br/wp-content/uploads/2024/05/cropped-Nova-Marca-01.png"
//         }
//     }
// ];

const buscarDemandas = async (): Promise<Demanda[]> => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/demandas`);

    if(!response.ok){
        const mensagem = `(${response.status}) ${await response.text()}`;
        console.log(`[BUSCAR_DEMANDAS] Nao foi possivel buscar as demandas de doacao: ${mensagem}`);

        throw new Error("Não foi possível buscar os dados de demandas de doação.");
    }

    return await response.json() as Demanda[];
};

export {
    buscarDemandas
};
