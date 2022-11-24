import axios from "$lib/config/axios.js";

export async function load({ params }) {
    const unidadesFederais = await axios.get("referencias/deputados/siglaUF");

    const tiposDespesa = await axios.get("referencias/deputados/tipoDespesa");

    const partidos = await axios.get("partidos", { params: { itens: 100 } });

    return {
        unidadesFederais: unidadesFederais.data.dados,
        tiposDespesa: tiposDespesa.data.dados,
        partidos: partidos.data.dados,
    };
}
