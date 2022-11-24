import db from "$lib/config/db.js";

export async function load({ url }) {
    const params = url.searchParams;

    const deputados = await db.all(`
        SELECT
            deputados.id,
            nome,
            email,
            sigla_uf,
            sigla_partido,
            url_foto,
            SUM(valor_liquido) AS total_despesas,
            ROW_NUMBER() OVER(ORDER BY SUM(valor_liquido) DESC) AS colocacao 
        FROM deputados
        INNER JOIN despesas
        ON deputados.id = despesas.id_deputado
        ${buildWhereStatements(params)}
        GROUP BY deputados.id
        ORDER BY total_despesas DESC
    `);

    return {
        deputados, 
        filtros: getFiltros(params)
    };
}

function getFiltros(params) {
    const tipos = [
        { nome: "Tipo", param: "tipoDespesa"},
        { nome: "UF", param: "unidadeFederal"},
        { nome: "Partido", param: "partido"}
    ];

    let filtros = [];

    for (const tipo of tipos) {
        const value = params.get(tipo.param);
        
        if (value) {
            filtros.push(value);
        }
    }

    return filtros;
}

function buildWhereStatements(params) {
    let query = {
        value: "",
        isInitialized: false
    };

    const fields = [
        { name: "tipo_despesa", value: params.get("tipoDespesa") },
        { name: "sigla_uf", value: params.get("unidadeFederal") },
        { name: "sigla_partido", value: params.get("partido") },
    ];

    for (const field of fields) {
        if (!field.value) {
            continue;
        }

        let prefix;

        if (query.isInitialized) {
            prefix = "AND";
        } else {
            prefix = "WHERE";
            query.isInitialized = true;
        }

        query.value += ` ${prefix} ${field.name} = "${field.value}"`;
    }

    return query.value;
}