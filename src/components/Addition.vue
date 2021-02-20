<template>
    <div>
        <h1 class="title is-3">
            Показания на
            {{ currentDate }}
        </h1>
    </div>
</template>

<script>
    export default {
        name: "Addition",
        computed: {
            currentDate: () => {
                return new Date().toLocaleString().split(",")[0];
            },
        },
    };
</script>
