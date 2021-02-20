<template>
    <div>
        <h1 class="title is-3">График изменения Вашего веса</h1>
        <Chart></Chart>
    </div>
</template>

<script>
    import Chart from "@/components/Chart.vue";
    export default {
        name: "Bar",
        components: {
            Chart,
        },
    };
</script>
