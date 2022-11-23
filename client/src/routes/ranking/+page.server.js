import db from "$lib/config/db.js";

export async function load({ params }) {
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
        GROUP BY deputados.id
        ORDER BY total_despesas DESC
    `);

    console.log(deputados);

    return { deputados };
}