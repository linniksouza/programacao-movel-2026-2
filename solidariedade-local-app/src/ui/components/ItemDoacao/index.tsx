import { FC } from "react";
import { IconButton } from "react-native-paper";

import { ItemDoacaoDemanda } from "@/data/models/demanda.model";
import {
    ControlesQuantidadeItemDoacao,
    DadosItemDoacao,
    ItemDoacao as ItemDoacaoStyled,
    QuantidadeItemDoacao
} from "./index.styles";

type ItemDoacaoProps = {
    item: ItemDoacaoDemanda;
    quantidade: number;
    setQuantidade: (value: number) => void;
};

const ItemDoacao: FC<ItemDoacaoProps> = ({
    item,
    quantidade,
    setQuantidade
}) => {
    const onDiminuir = () => {
        if(quantidade > 0)
            setQuantidade(quantidade - 1);
    };
    const onAumentar = () => {
        if(item.quantidade_maxima){
            if(quantidade < item.quantidade_maxima)
                setQuantidade(quantidade + 1);
        }else{
            setQuantidade(quantidade + 1);
        }
    };

    return (
        <ItemDoacaoStyled testID="container-item-doacao">
            <DadosItemDoacao variant="bodyMedium">
                {item.nome} ({item.unidade_medida})
            </DadosItemDoacao>

            <ControlesQuantidadeItemDoacao>
                <IconButton
                    testID="btn-diminuir-qtd"
                    icon="minus"
                    mode="outlined"
                    onPress={onDiminuir}
                    disabled={quantidade === 0}
                />
                <QuantidadeItemDoacao variant="bodyMedium">
                    {quantidade}
                </QuantidadeItemDoacao>
                <IconButton
                    testID="btn-aumentar-qtd"
                    icon="plus"
                    mode="outlined"
                    onPress={onAumentar}
                />
            </ControlesQuantidadeItemDoacao>
        </ItemDoacaoStyled>
    );
};

export { ItemDoacao };
