-- CreateTable
CREATE TABLE "instituicoes" (
    "cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "biografia" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "areas_atuacao" JSONB NOT NULL,
    "endereco_site" TEXT NOT NULL,
    "imagem_principal" TEXT NOT NULL,
    "imagem_capa" TEXT,

    CONSTRAINT "instituicoes_pkey" PRIMARY KEY ("cnpj")
);

-- CreateTable
CREATE TABLE "demandas_doacoes" (
    "id" TEXT NOT NULL,
    "necessidades_doacao" TEXT NOT NULL,
    "status_demanda" TEXT NOT NULL,
    "data_postagem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cnpj_instituicao" TEXT NOT NULL,

    CONSTRAINT "demandas_doacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_demandas_doacoes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "quantidade_maxima" INTEGER,
    "id_demanda" TEXT NOT NULL,

    CONSTRAINT "itens_demandas_doacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doadores" (
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "url_imagem" TEXT,
    "origem_conta" TEXT NOT NULL,

    CONSTRAINT "doadores_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "doacoes_feitas" (
    "id" TEXT NOT NULL,
    "observacoes" TEXT,
    "data_hora_doacao" TIMESTAMP(3) NOT NULL,
    "status_doacao" TEXT NOT NULL,
    "id_demanda" TEXT NOT NULL,
    "cpf_doador" TEXT NOT NULL,

    CONSTRAINT "doacoes_feitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_doacoes_feitas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "id_doacao" TEXT NOT NULL,

    CONSTRAINT "itens_doacoes_feitas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "instituicoes_endereco_site_key" ON "instituicoes"("endereco_site");

-- CreateIndex
CREATE UNIQUE INDEX "doadores_email_key" ON "doadores"("email");

-- AddForeignKey
ALTER TABLE "demandas_doacoes" ADD CONSTRAINT "demandas_doacoes_cnpj_instituicao_fkey" FOREIGN KEY ("cnpj_instituicao") REFERENCES "instituicoes"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_demandas_doacoes" ADD CONSTRAINT "itens_demandas_doacoes_id_demanda_fkey" FOREIGN KEY ("id_demanda") REFERENCES "demandas_doacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacoes_feitas" ADD CONSTRAINT "doacoes_feitas_id_demanda_fkey" FOREIGN KEY ("id_demanda") REFERENCES "demandas_doacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacoes_feitas" ADD CONSTRAINT "doacoes_feitas_cpf_doador_fkey" FOREIGN KEY ("cpf_doador") REFERENCES "doadores"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_doacoes_feitas" ADD CONSTRAINT "itens_doacoes_feitas_id_doacao_fkey" FOREIGN KEY ("id_doacao") REFERENCES "doacoes_feitas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
