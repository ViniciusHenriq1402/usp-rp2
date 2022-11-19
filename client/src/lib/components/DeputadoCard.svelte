<script>
    export let nome;
    export let email;
    export let sigla_uf;
    export let sigla_partido;
    export let url_foto;
    export let total_despesas;
</script>

<div class="flex rounded-l-2xl bg-zinc-50 border-r-8 border-amber-300">
    <img src={url_foto} alt={nome} class="w-20 rounded-l-2xl shadow" />

    <div class="flex flex-col px-6 py-2">
        <div class="flex gap-2 items-center">
            <div class="text-2xl font-bold">
                {nome}
            </div>
            <div class="text-xs text-zinc-500">
                ({sigla_partido})
            </div>
        </div>

        <div class="font-bold text-blue-300">
            R$ {Intl.NumberFormat("pt-BR").format(total_despesas)}
        </div>

        <div class="flex flex-col text-sm text-zinc-500">
            <div>Email: {email}</div>
            <div>UF: {sigla_uf}</div>
        </div>
    </div>
</div>