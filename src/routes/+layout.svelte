<script>
    import "../app.css";
</script>

<nav class="flex justify-between py-6 px-10 text-xl bg-gray-900 text-gray-50">
    <a class="hover:text-orange-500" href="/">Câmara dos Gastos</a>

    <div>
        <a href="sobre">
            Sobre
        </a>
    </div>
</nav>

<main class="px-20 py-10">
    <slot />
</main>

<style>
    div a {
        @apply px-8;
    }

    div a:hover {
        @apply underline text-orange-500;
    }

    div a:not(:last-child) {
        @apply border-r;
    }
</style>