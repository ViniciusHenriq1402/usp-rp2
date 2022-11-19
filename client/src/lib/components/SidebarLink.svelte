<script>
    import { page } from "$app/stores";

    export let name;
    export let icon;
    export let href;
</script>

<a {href} class="sidebar-link" class:active={$page.url.pathname === href}>
    <i class="fa-solid fa-{icon}"></i>
    {name}
</a >

<style>
    .sidebar-link {
        @apply 
            flex
            items-center
            gap-2
            px-4
            py-2
            border-x-4
            rounded
            transition
            bg-zinc-700
            border-amber-400
            text-zinc-100;
    }

    .sidebar-link:hover {
        @apply
            bg-zinc-100
            border-blue-400
            text-zinc-800;
    }

    .active {
        @apply
            bg-amber-400
            text-zinc-800;
    }

    .active:hover {
        @apply
            bg-amber-400
            border-amber-400;
    }
</style>