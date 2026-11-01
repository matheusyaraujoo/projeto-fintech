-- Sequences para geracao de IDs
CREATE SEQUENCE SEQ_CONTA START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE SEQ_RECEITA START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE SEQ_DESPESA START WITH 1 INCREMENT BY 1;

-- Tabelas
CREATE TABLE T_CONTA (
    id           NUMBER(19)    DEFAULT SEQ_CONTA.NEXTVAL PRIMARY KEY,
    titular      VARCHAR2(100) NOT NULL,
    tipo_conta   VARCHAR2(30)  NOT NULL,
    saldo        NUMBER(15,2)  DEFAULT 0,
    agencia      VARCHAR2(10)  NOT NULL,
    numero_conta VARCHAR2(20)  NOT NULL
);

CREATE TABLE T_RECEITA (
    id            NUMBER(19)    DEFAULT SEQ_RECEITA.NEXTVAL PRIMARY KEY,
    conta_id      NUMBER(19)    NOT NULL,
    descricao     VARCHAR2(200) NOT NULL,
    valor         NUMBER(15,2)  NOT NULL,
    data_receita  DATE          NOT NULL,
    categoria     VARCHAR2(50),
    CONSTRAINT fk_receita_conta FOREIGN KEY (conta_id) REFERENCES T_CONTA(id)
);

CREATE TABLE T_DESPESA (
    id            NUMBER(19)    DEFAULT SEQ_DESPESA.NEXTVAL PRIMARY KEY,
    conta_id      NUMBER(19)    NOT NULL,
    descricao     VARCHAR2(200) NOT NULL,
    valor         NUMBER(15,2)  NOT NULL,
    data_despesa  DATE          NOT NULL,
    categoria     VARCHAR2(50),
    CONSTRAINT fk_despesa_conta FOREIGN KEY (conta_id) REFERENCES T_CONTA(id)
);
