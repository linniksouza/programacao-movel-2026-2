abstract class ObjectMapper<K, V> {

    public async mapearLista(listaOrigem: Array<K>): Promise<V[]> {
        return await Promise.all(listaOrigem.map(origem => this.mapear(origem)));
    }

    public abstract mapear(origem: K): Promise<V>;

}

export { ObjectMapper };
