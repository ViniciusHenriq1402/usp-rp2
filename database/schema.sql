CREATE TABLE deputados (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    sigla_partido TEXT NOT NULL,
    sigla_uf TEXT NOT NULL,
    url_foto TEXT NOT NULL
);

CREATE TABLE despesas (
    id INTEGER PRIMARY KEY,
    id_deputado INTEGER NOT NULL,
    ano INTEGER NOT NULL,
    mes INTEGER NOT NULL,
    tipo_despesa TEXT NOT NULL,
    valor_liquido REAL NOT NULL,
    FOREIGN KEY (id_deputado) REFERENCES deputados (id),
    UNIQUE (id, id_deputado)
);


CREATE TABLE UF (
    sigla_uf TEXT PRIMARY KEY,
    z_score REAL
);