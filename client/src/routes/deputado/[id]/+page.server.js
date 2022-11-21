import db from "$lib/config/db.js";

export async function load({ params }) {
    const deputado = await db.all(`
       SELECT 
            deputados.id,
            nome,
            email,
            sigla_uf,
            sigla_partido,
            url_foto,
            SUM(valor_liquido) AS total_despesas
        FROM deputados
        INNER JOIN despesas
        ON deputados.id = despesas.id_deputado
        WHERE deputados.id = ${params.id}
    `);
    
    /**
     * Note que group_concat retorna uma string com os valores separados por
     * cifrão ($). Para que possamos usar esses valores, precisamos
     * transformá-los em um array.
     * 
     * Exemplo de despesa:
     * 
     * {
     *     mes: 1,
     *     tipos_despesa: "PASSAGEM AÉREA,TELEFONIA",
     *     valores: "1000,2000"
     * }
     */
    const despesas = await db.all(`
        SELECT
            tipo_despesa,
            group_concat(mes, '$') AS meses,
            group_concat(despesa, '$') AS valores 
        FROM (
            SELECT mes, tipo_despesa, SUM(valor_liquido) AS despesa
            FROM despesas
            WHERE id_deputado = ${params.id}
            GROUP BY tipo_despesa, mes
            ORDER BY mes ASC
        )
        GROUP BY tipo_despesa;
    `);

    formatDespesas(despesas);

    return { deputado, despesas };
}

/**
 * Transforma as despesas resultantes da consulta ao banco de dados para o
 * seguinte formato:
 * 
 * {
 *    tipo_despesa: "PASSAGEM AÉREA",
 *    valoresMensais: [100,200,300,400,500,600,700,800,900,1000,1100,1200] 
 * }
 */
function formatDespesas(despesas) {
    despesas.forEach((despesa) => {
        despesa.meses = despesa.meses.split("$");
        despesa.valores = despesa.valores.split("$");

        despesa.valoresMensais = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = 0; i < despesa.meses.length; i++) {
            despesa.valoresMensais[despesa.meses[i] - 1] = despesa.valores[i];
        }

        delete despesa.meses;
        delete despesa.valores;

        return despesa;
    });
}