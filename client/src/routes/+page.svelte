<script>
    import deputados from "$lib/data/deputados.json";

    const currentYear = 2022;

    export let data;

    console.log(data);
</script>

<div class="flex flex-col gap-12">
    <h1 class="text-4xl pb-4 border-b">Despesas no ano de {currentYear}</h1>
    {#each deputados as deputado, lugar}
        <div class="flex gap-6">
            <img src={deputado.urlFoto} alt={deputado.nome} class="w-28 shadow-lg" />

            <div class="flex flex-col gap-2">
                <h1 class="text-2xl">
                    <span class="text-gray-500">#{lugar + 1}</span>
                    {deputado.nome}
                    <span class="text-gray-400 text-sm">({deputado.siglaPartido})</span>
                </h1>

                <div class="text-lg text-orange-500">R$ {deputado.despesas}</div>

                <div>
                    Unidade Federal: 
                    <span class="text-gray-400">{deputado.siglaUf}</span>
                </div>

                <div>
                    Email:
                    <span class="text-gray-400">{deputado.email}</span>
                </div>
            </div>
        </div>
    {/each}
</div>