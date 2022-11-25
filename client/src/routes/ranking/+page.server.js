import db from "$lib/server/db.js";
import { sqlFilteredDeputados } from "$lib/server/sql";

export async function load({ url }) {
    const deputados = await db.all(sqlFilteredDeputados(url.searchParams));

    console.log(url.searchParams);
        
    return {
        deputados,
        filtros: getFiltros(url.searchParams)
    };
}

function getFiltros(urlParams) {
    let filtros = [];

    urlParams.forEach((value, param) => {
        if (value) {
            filtros.push(value);
        }
    });

    return filtros;
}