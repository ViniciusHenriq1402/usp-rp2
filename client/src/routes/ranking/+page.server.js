import db from "$lib/config/db.js";

export async function load({ params }) {
    const deputados = await db.all(`
        SELECT
            nome,
            email,
            sigla_uf,
            sigla_partido,
            url_foto,
            SUM(valor_liquido) AS total_despesas
        FROM deputados
        INNER JOIN despesas
        ON deputados.id = despesas.id_deputado
        GROUP BY deputados.id
        ORDER BY total_despesas DESC
    `);

    return { deputados };
}