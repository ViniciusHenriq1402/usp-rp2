<script>
    import "../app.css";

    import SidebarLink from "$lib/components/SidebarLink.svelte";

    let sidebar = {
        title: "Câmara dos Gastos",
        links: [
            { name: "Início", icon: "home", href: "/" },
            { name: "Ranking", icon: "ranking-star", href: "/ranking" },
            { name: "Gráficos", icon: "chart-line", href: "/graficos" },
            { name: "Busca avançada", icon: "search", href: "/busca" },
        ],
    };
</script>

<div class="flex">
    <div class="sidebar">
        <div class="flex justify-center">
            <img 
                src="/camara-logo.jpg"
                class="w-32 rounded"
                alt="Gastos na Cãmarada dos Deputados"/>
        </div>

        <div class="sidebar-title">{ sidebar.title }</div>
        <div class="sidebar-links">
            {#each sidebar.links as link}
                <SidebarLink {...link} />
            {/each}
        </div>
    </div>

    <div class="flex-1 px-12 py-6 bg-zinc-100 text-zinc-700 h-screen overflow-y-auto">
        <slot />
    </div>
</div>

<style>
    .sidebar {
        @apply
            flex
            flex-col
            top-0
            gap-4
            sticky
            h-screen
            p-6
            bg-zinc-900;
    }

    .sidebar-title {
        @apply
            pb-4
            text-center
            text-zinc-50
            font-bold
            text-lg
            border-b
            border-zinc-600;
    }

    .sidebar-links {
        @apply flex flex-col gap-4;
    }
</style>