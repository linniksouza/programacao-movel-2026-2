import { SQLiteDatabase } from "expo-sqlite";

const MIGRATIONS_TABLE = "_migrations";

interface Migration {
    name: string;
    up: (db: SQLiteDatabase) => Promise<void>;
}

const migrations: Migration[] = [
    {
        name: "001_create_table_doacoes",
        up: async (db) => {
            await db.execAsync(`
            CREATE TABLE doacoes (
                id text PRIMARY KEY NOT NULL,
                tipo_doacao text NOT NULL,
                observacoes text,
                id_instituicao text NOT NULL,
                nome_instituicao text NOT NULL,
                cpf_doador integer NOT NULL,
                nome_doador text NOT NULL,
                email_doador text NOT NULL,
                data_hora_doacao text DEFAULT 'CURRENT_TIMESTAMP'
            );
        `);
        }
    },
    {
        name: "002_create_table_itens_doacoes",
        up: async (db) => {
            await db.execAsync(`
            CREATE TABLE itens_doacoes (
                id text PRIMARY KEY NOT NULL,
                nome text NOT NULL,
                unidade_medida text NOT NULL,
                quantidade integer NOT NULL,
                id_doacao text NOT NULL,
                FOREIGN KEY (id_doacao) REFERENCES doacoes(id) ON UPDATE no action ON DELETE cascade
            );
        `);
        }
    }
];

const executarMigracoes = async (db: SQLiteDatabase) => {
    try{
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
                id INTEGER PRIMARY KEY,
                name TEXT UNIQUE NOT NULL,
                executed_at INTEGER DEFAULT (cast((julianday('now') - 2440587.5) * 86400000 as integer))
            )
        `);
        for(const migration of migrations){
            const isApplied = await db.getFirstAsync(
                `SELECT * FROM ${MIGRATIONS_TABLE} WHERE name = ?`,
                [migration.name]
            );
            if(!isApplied){
                console.log(`Executando migração: ${migration.name}...`);
                await migration.up(db);
                await db.runAsync(
                    `INSERT INTO ${MIGRATIONS_TABLE} (name) VALUES (?)`,
                    [migration.name]
                );
                console.log(`Migracao concluida: ${migration.name}`);
            }
        }
    }catch(e){
        console.error("Erro ao executar migracoes SQLite:", e);
        throw e;
    }
};

export { executarMigracoes, Migration, migrations };
