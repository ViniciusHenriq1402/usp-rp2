<script>
    import InfiniteLoading from "svelte-infinite-loading";
    import DeputadoCard from "$lib/components/DeputadoCard.svelte";

    export let data;

    let threshold = 10;

    let curDeputados = data.deputados.slice(0, threshold);

    function loadMore({ detail: { loaded, complete } }) {
        if (deputadoSearch && deputadoSearch.length > 0) {
            complete();
            return;
        }

        threshold += 10;
        curDeputados = data.deputados.slice(0, threshold);

        if (curDeputados.length >= data.deputados.length) {
            complete();
        } else {
            loaded();
        }
    }

    let deputadoSearch;

    function searchDeputados() {
        curDeputados = data.deputados.filter((deputado) => {
            return deputado.nome.toLowerCase().includes(deputadoSearch.toLowerCase());
        });
    }
</script>

<div class="flex flex-col gap-4">
    <div class="text-xl font-bold border-b pb-2">
        Ranking de despesas no ano de 2022
    </div>

    {#if data.filtros.length > 0}
        <div class="flex gap-2 items-center">
            <span>Filtrado por:</span>

            {#each data.filtros as filtro}
                <span class="bg-gray-200 px-2 py-1 border border-zinc-400 rounded-full">
                    {filtro}
                </span>
            {/each}
        </div>
    {/if}

    <div class="flex items-strech">
        <div class="bg-amber-400 py-2 px-3 rounded-l-xl">
            <i class="fa-solid fa-search"></i>
        </div>
        <input
            bind:value={deputadoSearch}
            on:input={searchDeputados}
            type="text"
            class="w-full rounded-r-xl border shadow-sm p-2"
            placeholder="Procure pelo nome de um deputado..." />
    </div>

    <div class="flex flex-col gap-4" >
        {#if curDeputados.length === 0}
            <p>Nenhum deputado encontrado :(</p>
        {:else}
            {#each curDeputados as deputado}
                <DeputadoCard { ...deputado} />
            {/each}
        {/if}

        <InfiniteLoading 
            spinner="spiral"
            on:infinite={loadMore}
        >
            <div slot="noMore" class="text-center text-gray-500">
                Fim do ranking. Deputados que não tiveram despesas não aparecem 
            </div>

            <div slot="noResults" class="text-center text-gray-500"></div>
        </InfiniteLoading>
    </div>
</div>

