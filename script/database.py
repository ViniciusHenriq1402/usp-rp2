import sqlite3

class Container:
    """Armazena informações do deputado e suas despesas

    O container é posteriormente utilizado pelo Database para inserir os dados    
    no banco de dados. Essa é uma classe puramente auxiliar
    """
    def __init__(self, deputado):
        self.deputado = deputado
        self.despesas = []

    def add_despesas(self, despesas):
        self.despesas.extend(despesas)

    def convert(self):
        """
        Converte os dados do container para tuplas que podem ser inseridas no
        banco de dados
        """
        self.convert_despesas()
        self.convert_deputado()

    def convert_deputado(self):
        self.deputado = (
            self.deputado["id"],
            self.deputado["nome"],
            self.deputado["email"],
            self.deputado["siglaPartido"],
            self.deputado["siglaUf"],
            self.deputado["urlFoto"],
        )

    def convert_despesas(self):
        for i in range(len(self.despesas)):
            self.despesas[i] = (
                self.deputado["id"],
                self.despesas[i]["ano"],
                self.despesas[i]["mes"],
                self.despesas[i]["tipoDespesa"],
                self.despesas[i]["valorLiquido"],
            )

class Database:
    """Gerenciador do banco de dados SQLite

    A classe armazena containers em um buffer até um limite máximo, e
    eventualmente faz o flush para o banco de dados
    """

    def __init__(self, dbPath):
        self.path = dbPath
        self.conn = sqlite3.connect(dbPath)
        self.cur = self.conn.cursor()
        self.buffer = []
        self.bufferLimit = 50 
        self.numWrites = 0 # Utilizado unicamente para análise de desempenho
    
    def add_container(self, container):
        """A adição que estourar o buffer forçará o flush"""
        self.buffer.append(container)

        if len(self.buffer) >= self.bufferLimit:
            self.flush()

    def flush(self):
        """Salva o conteúdo do buffer no banco de dados e limpa o buffer"""
        for container in self.buffer:
            container.convert()
            self.insert_deputado(container.deputado)
            self.insert_despesas(container.despesas)

        self.buffer = []

    def insert_deputado(self, deputado):
        self.cur.execute("""
            INSERT INTO deputados (id, nome, email, sigla_partido, sigla_uf, url_foto)
            VALUES (?, ?, ?, ?, ?, ?)
        """, deputado)

        self.conn.commit()

        self.numWrites += 1

    def insert_despesas(self, despesas):
        self.cur.executemany("""
            INSERT INTO despesas (id_deputado, ano, mes, tipo_despesa, valor_liquido)
            VALUES (?, ?, ?, ?, ?)
        """, despesas)

        self.conn.commit()

        self.numWrites += 1 

    def clean(self):
        """Deleta o arquivo SQLite

        A criação de um novo arquivo não é necessária, pois o SQLite
        automaticamente cria um novo arquivo caso ele não exista
        """
        with open(self.path, "w") as _:
            pass
    
    def run_schema(self, path):
        with open(path, "r") as schema:
            self.cur.executescript(schema.read())

    def close(self):
        # Note que caso o buffer não esteja vazio, seus dados serão perdidos
        self.conn.close() 

    def selectGastos(self, uf):
        cursor = self.cur.execute("SELECT sum(despesas.valor_liquido) FROM despesas INNER JOIN deputados ON despesas.id_deputado = deputados.id WHERE deputados.sigla_uf =?", (uf,))
        return cursor.fetchone()[0]

    def insert_zscore(self, uf, zscore):
        self.cur.execute("INSERT INTO UF (sigla_uf, z_score) VALUES (?, ?)", (uf, zscore))
        self.conn.commit()
        self.numWrites += 1 