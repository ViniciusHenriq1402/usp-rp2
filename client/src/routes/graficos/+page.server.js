import axios from "$lib/config/axios.js";
import db from "$lib/server/db.js";
import { sqlFilteredDeputados } from "$lib/server/sql";

export async function load({ url }) {

    const tiposDespesa = await axios.get("referencias/deputados/tipoDespesa");
    const deputados = await db.all(sqlFilteredDeputados(url.searchParams));
    const despesaPorUF = filter(deputados);
    const graficoDespesa = getFiltros(url.searchParams); 
    return {
        isEmpty: (despesaPorUF.size == 0)?true: false,        
        despesaPorUF,
        tiposDespesa: tiposDespesa.data.dados,
        graficoDespesa
    };
}

function filter(deputados){
    let mapDespesa = new Map();
    for(let i = 0; i < deputados.length; i++){

        let uf = deputados[i].sigla_uf;
        let despesa = deputados[i].total_despesas;
        
        if(mapDespesa.has(uf)){
            
            mapDespesa.set(uf, mapDespesa.get(uf) + despesa) 

        } else {
            mapDespesa.set(uf, despesa)
        }

        
    }

    return mapDespesa
}

function getFiltros(urlParams) {
    let filtros = "";

    urlParams.forEach((value, param) => {
        if (value) {
            filtros = value;
        }
    });
    return filtros;
}

