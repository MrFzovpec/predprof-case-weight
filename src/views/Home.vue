<template>
    <div class="home container">
        <div class="columns">
            <Bar class="column is-8" />
            <Addition class="column is-4" />
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Bar from "@/components/Bar.vue";
    import Addition from "@/components/Addition.vue";
    export default {
        name: "Home",
        components: {
            Bar,
            Addition,
        },
    };
</script>
