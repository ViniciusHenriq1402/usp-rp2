import db from "$lib/server/db.js";
import { sqlDeputado, sqlDespesas } from "$lib/server/sql.js";

export async function load({ params }) {
    const deputado = await db.all(sqlDeputado(params.id));
    
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
    const despesas = await db.all(sqlDespesas(params.id));

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