import { DateTime } from "luxon";

import { conexao } from "@/data/drizzle/conexao";
import { doacoes, itensDoacoes } from "@/data/drizzle/schema";
import { Doacao } from "@/data/models/doacao.model";
import { DoacoesRepository } from "@/data/repositories/doacoes";

class DrizzleDoacoesRepository implements DoacoesRepository {

    private static _instancia?: DoacoesRepository;

    public async salvarDoacao(doacao: Doacao): Promise<boolean> {
        const [doacaoEntity] = await conexao.insert(doacoes).values({
            tipoDoacao: doacao.tipoDoacao,
            observacoes: doacao.observacoes,
            idInstituicao: doacao.idInstituicao,
            nomeInstituicao: doacao.nomeInstituicao,
            idDoador: parseInt(doacao.idDoador),
            nomeDoador: doacao.nomeDoador,
            emailDoador: doacao.emailDoador,
            dataHoraDoacao: doacao.dataHoraDoacao.toISO()
        }).returning();

        await conexao.insert(itensDoacoes).values([
            ...doacao.itensDoacao.map((item) => ({
                nome: item.nome,
                unidadeMedida: item.unidadeMedida,
                quantidade: item.quantidade,
                idDoacao: doacaoEntity.id
            }))
        ]);

        return true;
    }

    public async buscarDoacoes(): Promise<Doacao[]> {
        const entities = await conexao.query.doacoes.findMany({
            with: {
                itensDoacao: true
            }
        });

        return entities.map((doacao) => ({
            id: doacao.id.toString(),
            tipoDoacao: doacao.tipoDoacao,
            observacoes: doacao.observacoes!,
            idInstituicao: doacao.idInstituicao,
            nomeInstituicao: doacao.nomeDoador,
            idDoador: doacao.idDoador.toString(),
            nomeDoador: doacao.nomeDoador,
            emailDoador: doacao.emailDoador,
            dataHoraDoacao: DateTime.fromISO(doacao.dataHoraDoacao!),
            itensDoacao: [...doacao.itensDoacao.map((item) => ({
                id: item.id.toString(),
                nome: item.nome,
                unidadeMedida: item.unidadeMedida,
                quantidade: item.quantidade
            }))]
        }));
    }

    public static singleton(): DoacoesRepository {
        if(!DrizzleDoacoesRepository._instancia)
            DrizzleDoacoesRepository._instancia = new DrizzleDoacoesRepository();

        return DrizzleDoacoesRepository._instancia;
    }
}

export { DrizzleDoacoesRepository };

