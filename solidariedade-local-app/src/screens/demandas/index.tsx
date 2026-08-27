import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

const DemandasScreen = () => {

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.cabecalho}>
                <View>
                    <Text style={styles.saudacaoUsuario}>
                        Olá, Linnik!
                    </Text>
                    <Text style={styles.orientacoes}>
                        Veja as necessidades de hoje
                    </Text>
                </View>

                <View>
                    <Button title="Notificações" />
                </View>
            </View>

            {/* Filtros de busca */}
            <View>
                <TextInput placeholder="Buscar demandas...." />
                <Button title="Filtros" />
            </View>

            {/* Lista de demandas */}
            <View>
                <Text>Demandas</Text>

                <View>
                    {/* <Image
                        style={styles.imagemInstituicao}
                        source={require("../../../assets/lar-esperanca.jpg")}
                    /> */}

                    <Text>Lar Esperança</Text>
                    <Text>Alimentos não perecíveis</Text>
                    <Text>Arroz, feijão, óleo e açúcar</Text>
                    <Text>Compensa</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: "center"
    },
    cabecalho: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#5B2DB8",
        color: "#fffff"
    },
    saudacaoUsuario: {
        color: "#ffffff",
        fontSize: 20
    },
    orientacoes: {
        color: "#ffffff"
    },
    filtroBuscas: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    imagemInstituicao: {
        width: 120,
        height: 100
    }
});

export { DemandasScreen };
