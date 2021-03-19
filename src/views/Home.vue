<template>
    <div class="home container">
        <div class="columns">
            <span @click="openModal()" class="addition-open"
                >Изменить показания
                <img
                    src="https://img.icons8.com/material-sharp/16/000000/edit--v1.png"
            /></span>
        </div>

        <div class="columns">
            <Bar class="column is-12"></Bar>
        </div>

        <div v-if="this.$store.state.modalOpened" class="modal addition">
            <Addition> </Addition>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Bar from "@/components/Bar.vue";
    import AdditionMethods from "@/components/Addition/index.js";
    import Addition from "@/components/Addition/Addition.vue";
    export default {
        name: "Home",
        async mounted() {
            AdditionMethods.getNotes(this);
        },
        components: {
            Bar,
            Addition,
        },
        methods: {
            openModal() {
                this.$store.commit("openModalBg");
            },
        },
    };
</script>
<style lang="scss">
    .block {
        padding: 0 7%;
    }
    .el-date-editor--daterange.el-input__inner {
        width: 100% !important;
    }
    .modal.addition {
        background: white;
        height: 50%;
        width: 60%;
        border-radius: 10px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    span.addition-open {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        img {
            margin-left: 10px;
        }

        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }
</style>
