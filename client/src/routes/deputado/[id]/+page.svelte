<script>
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";

    export let data;

    let deputado = data.deputado[0];

    let ctx;
    let chartBar;

    function makeDatasets() {
        let datasets = [];

        data.despesas.forEach((despesa) => {
            let dataset = {
                label: despesa.tipo_despesa,
                data: despesa.valoresMensais
            }

            datasets.push(dataset);
        });

        return datasets;
    }

    onMount(async (promise) => {
        ctx = chartBar.getContext("2d");

        let chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [
                    "Jan", "Fev", "Mar",
                    "Abr", "Mai", "Jun",
                    "Jul", "Ago", "Set",
                    "Out", "Nov", "Dez"
                ],
                datasets: makeDatasets()
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Despesas por mês e tipo (2022)",
                        font: {
                            size: 20
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
            }
        });
    });
</script>

<div class="flex flex-col gap-6">
    <div class="flex">
        <img
            src={deputado.url_foto}
            alt={deputado.nome}
            class="rounded-l-lg shadow w-32"
        />

        <div class="flex-1 bg-stone-50 rounded-r-lg shadow px-4 py-2">
            <div class="flex flex-col gap-2">
                <div class="text-3xl font-bold">{deputado.nome}</div>

                <div class="text-amber-400 font-bold text-2xl">
                    R$ {Intl.NumberFormat("pt-BR").format(deputado.total_despesas)}
                </div>

                <div class="flex flex-col text-zinc-600">
                    <div class="">
                        Email:
                        <a
                            href="mailto:{deputado.email}"
                            class="text-blue-400 underline hover:text-blue-500"
                        >
                            {deputado.email}
                        </a>
                    </div>

                    <div>
                        Unidade Federal: {deputado.sigla_uf}
                    </div>

                    <div>
                        Partido: {deputado.sigla_partido}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col gap-12 bg-zinc-50 px-6 py-4 rounded-lg shadow">
        <canvas bind:this={chartBar} class=""></canvas>
    </div>
</div>