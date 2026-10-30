import { ObjectMapper } from "@/aplicacao/abstracoes/base.mapper";
import { Doacao } from "@/dominio/doacao/agregados/doacao.aggregate";
import { DoacaoFeitaModel } from "@/frameworks/comum/prismaclient/models";

class PrismaDoacaoMapper extends ObjectMapper<Doacao, DoacaoFeitaModel> {

    public async mapear(entity: Doacao): Promise<DoacaoFeitaModel> {
        return {
            id: entity.id.valor,
            statusDoacao: entity.statusDoacao,
            dataHoraDoacao: entity.dataHoraDoacao.toJSDate(),
            observacoes: entity.observacoes!,
            cpfDoador: entity.doador.cpf.valor,
            idDemanda: entity.demanda.id.valor
        };
    }
}

export { PrismaDoacaoMapper };
