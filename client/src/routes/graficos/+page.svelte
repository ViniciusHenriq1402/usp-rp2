<script>

    import Chart from "chart.js/auto"
    import { onMount } from "svelte";
    export let data;

    let tipo_despesa = data.graficoDespesa;
    
    let isEmpty = data.isEmpty;
    let ctx;
    let chartBar;

    function makeDatasets() {
        let uf = [];
        let despesas = [];
        data.despesaPorUF.forEach((value, key) => {
            uf.push(key)
            despesas.push(value);
        });

        return {uf, despesas};
    }

    onMount(async (promise) => {
        if(!isEmpty){
        ctx = chartBar.getContext("2d");
       
        let data =  makeDatasets();
        let chart = new Chart(ctx, {
            type: "bar",
            label: `Relação unidades federais e ${data.graficoDespesa}`,
            data: {
                labels: data.uf,
                datasets: [{
                    label: 'Total despesa (R$)',
                    data: data.despesas,
            }]},
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: `DESPESAS POR UNIDADES FEDERAIS E ${tipo_despesa? tipo_despesa : "TODOS OS TIPOS DE DESPESAS"}`,
                        font: {
                            size: 18
                        },
                        padding: {
                            bottom: 30 
                        },
                        align: "start",
                    },
                    legend: {
                        position: "bottom",
                        align: "start",
                    }
                }
            }, 

        });
    } else return;
    });

</script>


<div class="flex flex-col gap-6 bg-zinc-50 px-6 py-4 rounded-lg shadow">

    <form method="get" >
    <h1 class="text-2xl font-bold">Gráficos</h1>

    <p>
        Gráfico de barras mostrando a soma das despesas de um determinado tipo de despesa de todas as unidades federais.
    </p>

    <label>
    <span>Tipo de despesa ({data.tiposDespesa.length})</span>
    <select name="tipo_despesa" bind:value={tipo_despesa}>
        <option value="">TODOS OS TIPOS DE DESPESAS</option>
        {#each data.tiposDespesa as tipo}
        <option value={tipo["nome"]}>{tipo["nome"]}</option>
        {/each}
    </select>
    </label>

    <button type="submit" class="submit-btn">Buscar</button>
    </form>
    
    <div class="flex flex-col gap-12 bg-zinc-50 px-6 py-4 rounded-lg shadow">
   {#if !isEmpty}
        <canvas bind:this={chartBar} class=""></canvas>
        {:else}
        
        <h3 class="text-2xl font-bold">Não houve despesas para este tipo nos últimos 6 meses</h3>
        {/if}
    </div>
        
</div>


<style>
    form {
        @apply flex flex-col gap-4 w-2/3 bg-zinc-50 shadow rounded-lg p-6;
    }

    label {
        @apply flex flex-col gap-2;
    }

    select {
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