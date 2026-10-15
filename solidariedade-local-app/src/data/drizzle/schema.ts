import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const doacoes = sqliteTable("doacoes", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    tipoDoacao: text("tipo_doacao").notNull(),
    observacoes: text("observacoes"),
    idInstituicao: text("id_instituicao").notNull(),
    nomeInstituicao: text("nome_instituicao").notNull(),
    idDoador: integer("id_doador").notNull(),
    nomeDoador: text("nome_doador").notNull(),
    emailDoador: text("email_doador").notNull(),
    dataHoraDoacao: text("data_hora_doacao").default("CURRENT_TIMESTAMP")
});

export const itensDoacoes = sqliteTable("itens_doacoes", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    nome: text("nome").notNull(),
    unidadeMedida: text("unidade_medida").notNull(),
    quantidade: integer("quantidade").notNull(),
    idDoacao: integer("id_doacao").notNull().references(() => doacoes.id, { onDelete: "cascade" })
});

export const doacoesRelations = relations(doacoes, ({ many }) => ({
    itensDoacao: many(itensDoacoes)
}));

export const itensDoacoesRelations = relations(itensDoacoes, ({ one }) => ({
    doacao: one(doacoes, {
        fields: [itensDoacoes.idDoacao],
        references: [doacoes.id]
    })
}));
