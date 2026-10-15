import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

import { executarMigracoes } from "./_migracoes";
import * as schema from "./schema";

const expoDb = SQLite.openDatabaseSync(
    "solidariedade_local_app.db",
    { enableChangeListener: true }
);

export const inicializarDbSQLite = async () => {
    try{
        await executarMigracoes(expoDb);
        console.log("Banco de dados SQLite inicializado.");
    }catch(e){
        console.error("Erro ao inicializar banco de dados SQLite", e);
        throw e;
    }
};

export const conexao = drizzle(expoDb, { schema });
