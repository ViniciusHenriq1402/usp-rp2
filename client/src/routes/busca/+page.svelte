<script>
    export let data;
</script>

<form method="get" action="/ranking">
    <h1 class="text-2xl font-bold">Busca avançada</h1>

    <p>
        Filtre os deputados da página de Ranking por unidade federal e partido, 
        e procure pelos deputados que mais gastaram com determinado tipo de despesa
    </p>

    <label>
        <span>Unidade Federal ({data.unidadesFederais.length})</span>
        <select name="sigla_uf">
            <option value="">Não filtrar</option>
            {#each data.unidadesFederais as uf}
                <option value={uf["sigla"]}>{uf["sigla"]}</option>
            {/each}
        </select>
    </label>

    <label>
        <span>Tipo de despesa ({data.tiposDespesa.length})</span>
        <select name="tipo_despesa">
            <option value="">Não filtrar</option>
            {#each data.tiposDespesa as tipo}
                <option value={tipo["nome"]}>{tipo["nome"]}</option>
            {/each}
        </select>
    </label>

    <label>
        <span>Partido ({data.partidos.length})</span>
        <select name="sigla_partido">
            <option value="">Não filtrar</option>
            {#each data.partidos as partido}
                <option value={partido["sigla"]}>{partido["sigla"]}</option>
            {/each}
        </select>
    </label>

    <button type="submit" class="submit-btn">Buscar</button>
</form>

<style>
    form {
        @apply flex flex-col gap-4 w-2/3 bg-zinc-50 shadow rounded-lg p-6;
    }

    label {
        @apply flex flex-col gap-2;
    }

    input, select {
        @apply border border-gray-300 rounded-md p-2;
    }

    .submit-btn {
        @apply
            bg-zinc-800
            text-zinc-50
            rounded
            p-2
            transition;
    }

    .submit-btn:hover {
        @apply
            bg-zinc-700
            text-zinc-50;
    }
</style>