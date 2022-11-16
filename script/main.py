import requests
import json
from datetime import datetime
from tqdm import tqdm

baseURL = "https://dadosabertos.camara.leg.br/api/v2"

dbPath = "../src/lib/data/deputados.json"

currentYear = datetime.now().year

def getDeputies():
    return requests.get(baseURL + "/deputados").json()["dados"]

def calculateExpenses(deputy):
    expenses = requests.get(f"{baseURL}/deputados/{str(deputy['id'])}/despesas?ano={currentYear}").json()

    total = 0

    for expense in expenses["dados"]:
        total += expense["valorLiquido"]

    return float("{0:.2f}".format(total))

def main():
    deputies = getDeputies()

    for deputy in tqdm(deputies):
        deputy["despesas"] = calculateExpenses(deputy)
    
    deputies = sorted(deputies, key=lambda deputy: deputy["despesas"], reverse=True)

    with open(dbPath, "w") as file:
        file.write(json.dumps(deputies, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()