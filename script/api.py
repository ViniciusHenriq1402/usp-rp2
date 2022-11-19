import requests
from datetime import datetime

class Response:
    """Contém o JSON de resposta da requisição"""
    def __init__(self, content):
        self.content = content

    def dados(self):
        return self.content["dados"]

    def links(self):
        return self.content["links"]

    def get_next(self):
        """
        Retorna a URL absoluta da próxima página, ou falso caso não haja próxima
        página
        """
        for link in self.links():
            if link["rel"] == "next":
                return link["href"]
        return False
    
class RequestManager:
    """
    Gerencia todas as requisições HTTP para o servidor da Câmara dos Deputados
    """
    def __init__(self, baseUrl):
        self.baseUrl = baseUrl
        self.numRequests = 0 # Utilizado unicamente para análise de desempenho

    def get(self, path):
        self.numRequests += 1
        r = requests.get(self.baseUrl + path)
        return Response(r.json())
    
    def get_absolute(self, url):
        """Faz uma requisição para uma URL absoluta, ignorando o baseUrl"""
        self.numRequests += 1
        r = requests.get(url)
        return Response(r.json())

    def get_deputados(self):
        return self.get("/deputados")

    def get_despesas(self, deputado):
        curYear = datetime.now().year
        return self.get(f'/deputados/{deputado["id"]}/despesas?ano={curYear}&itens=100')
