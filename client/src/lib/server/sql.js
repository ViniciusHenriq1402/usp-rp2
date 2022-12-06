/**
 * Retorna todos os deputados, com a colocação (1, 2, 3, ..., 513) e o total de
 * despesas de cada um
 */
export let sqlAllDeputados = `
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
`;

/**
 * Retorna os mesmos resultados de allDeputados, porém filtrados pelos parâmetros 
 * da URL
 * 
 * Os seguintes parâmetros são válidos:
 * 
 * - tipo_despesa
 * - sigla_partido
 * - sigla_uf
 */
export function sqlFilteredDeputados(urlParams) {
    let whereStmt = new WhereStatement();

    urlParams.forEach((value, param) => {
        if (value) {
            whereStmt.addCondition(param, "=", value);
        }
    });

    return `
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
        ${whereStmt.buildResult()}
        GROUP BY deputados.id
        ORDER BY total_despesas DESC
    `;
}

class WhereStatement {
    constructor() {
        this.build = "";
        this.isInitialized = false;
    }

    addCondition(column, operator, value) {
        const condition = `${column} ${operator} "${value}"`;

        if (this.isInitialized) {
            this.build += ` AND ${condition}`;
        } else {
            this.build += `WHERE ${condition}`;
            this.isInitialized = true;
        }
    }

    buildResult() {
        return this.build;
    }
}

export function sqlDeputado(id) {
    return `
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
        WHERE deputados.id = ${id}
    `;
}

export function sqlDespesas(id) {
    return `
        SELECT
            tipo_despesa,
            group_concat(mes, '$') AS meses,
            group_concat(despesa, '$') AS valores 
        FROM (
            SELECT mes, tipo_despesa, SUM(valor_liquido) AS despesa
            FROM despesas
            WHERE id_deputado = ${id}
            GROUP BY tipo_despesa, mes
            ORDER BY mes ASC
        )
        GROUP BY tipo_despesa;
    `;
}

export function sqlZScore() {
    return `
        SELECT 
            *
        FROM UF
        `
    ;
}