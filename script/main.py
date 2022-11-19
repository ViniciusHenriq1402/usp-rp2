import api 
import database
from tqdm import tqdm

def main():
    manager = api.RequestManager("https://dadosabertos.camara.leg.br/api/v2")

    db = database.Database("../database/db.sqlite3")

    db.clean()
    db.run_schema("../database/schema.sql")

    # Todos os 513 deputados da legislatura atual
    deputados = manager.get_deputados().dados()

    for deputado in tqdm(deputados):
        container = database.Container(deputado)

        response = manager.get_despesas(deputado)

        container.add_despesas(response.dados())

        while (next_url := response.get_next()) != False:
            response = manager.get_absolute(next_url)
            container.add_despesas(response.dados())

        db.add_container(container)

    db.flush() # Para o caso do buffer não estar vazio
    db.close()

    # Análise de desempenho
    print(f"Total de escritas no banco de dados: {db.numWrites}")
    print(f"Total de requisições: {manager.numRequests}")

if __name__ == '__main__':
    main()
