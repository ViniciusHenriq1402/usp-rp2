<script>
    import InfiniteLoading from "svelte-infinite-loading";
    import DeputadoCard from "$lib/components/DeputadoCard.svelte";

    export let data;

    let threshold = 10;

    let curDeputados = data.deputados.slice(0, threshold);

    function loadMore({ detail: { loaded, complete } }) {
        threshold += 10;
        curDeputados = data.deputados.slice(0, threshold);

        if (curDeputados.length >= data.deputados.length) {
            complete();
        } else {
            loaded();
        }
    }
</script>

<div class="flex flex-col gap-4">
    <div class="text-xl font-bold border-b pb-2">
        Ranking de despesas no ano de 2022
    </div>

    <div class="flex flex-col gap-4 max-h-[30rem] overflow-y-auto">
        {#each curDeputados as deputado }
            <DeputadoCard {...deputado} />
        {/each}

        <InfiniteLoading 
            spinner="spiral"
            on:infinite={loadMore}
        >
            <div slot="noMore" class="text-center text-gray-500">
                Não há mais deputados
            </div>
        </InfiniteLoading>
    </div>
</div>
