<template>
    <div>
        <h1 class="title is-3">График изменения Вашего веса</h1>

        <rangePicker />
        <Chart class="chart" />
    </div>
</template>

<script>
    import Chart from "./Charts/Chart.vue";
    import rangePicker from "./RangePicker.vue";
    export default {
        components: {
            Chart,
            rangePicker,
        },
    };
</script>

<style lang="scss">
    #line-chart {
        height: 50vh !important;
        width: 100% !important;
    }
</style>
