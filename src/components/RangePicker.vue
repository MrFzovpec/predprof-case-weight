<template>
    <div class="block">
        <span class="demonstration">Период измерений</span>
        <br />
        <el-date-picker
            v-model="value"
            type="daterange"
            align="сenter"
            start-placeholder="Начало"
            end-placeholder="Конец"
            :default-value="new Date()"
            :picker-options="pickerOptions"
        >
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        name: "rangePicker",
        mounted() {
            global.preparedVals = this.preparedVals;
            global.updateStoreFilter = this.updateStoreFilter;
            setInterval(() => {
                this.notes = this.$store.getters.getAllNotes;
                global.notes = this.notes;

                if (this.notes.length > 0 && this.value.length == 0) {
                    this.value = [
                        new Date(this.preparedVals(this.notes[0].dateCreated)),
                        new Date(
                            this.preparedVals(
                                this.notes[this.notes.length - 1].dateCreated
                            )
                        ),
                    ];
                    global.value = this.value;
                }
                if (global.value != this.value) {
                    console.log(this.value);
                    this.updateStoreFilter(this.value[0], this.value[1]);
                }
            }, 800);
        },
        data() {
            return {
                notes: [],
                pickerOptions: {
                    shortcuts: [
                        {
                            text: "Всё время",
                            onClick(picker) {
                                global.updateStoreFilter(null, null);
                                picker.$emit("pick", [null, new Date()]);
                            },
                        },
                        {
                            text: "Неделя",
                            onClick(picker) {
                                const start = new Date();
                                const end = new Date();
                                start.setDate(start.getDate() - 7);
                                global.updateStoreFilter(start, end);
                                picker.$emit("pick", [start, end]);
                            },
                        },
                        {
                            text: "Две недели",
                            onClick(picker) {
                                const start = new Date();
                                const end = new Date();
                                start.setDate(start.getDate() - 14);
                                global.updateStoreFilter(start, end);
                                picker.$emit("pick", [start, end]);
                            },
                        },
                        {
                            text: "Месяц",
                            onClick(picker) {
                                const start = new Date();
                                const end = new Date();
                                start.setMonth(start.getMonth() - 1);
                                global.updateStoreFilter(start, end);
                                picker.$emit("pick", [start, end]);
                            },
                        },
                        {
                            text: "Год",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setYear(start.getFullYear() - 1);
                                global.updateStoreFilter(start, end);
                                picker.$emit("pick", [start, end]);
                            },
                        },
                        {
                            text: "Полгода",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setMonth(start.getMonth() - 6);
                                global.updateStoreFilter(start, end);
                                picker.$emit("pick", [start, end]);
                            },
                        },
                    ],
                },
                value: [],
            };
        },
        methods: {
            preparedVals(val) {
                let list = val.split(".");

                return `${list[2]}-${list[1]}-${list[0]}`;
            },
            updateStoreFilter(start, end) {
                console.log(start, end);
                this.$store.commit("updateFilter", { start: start, end: end });
            },
        },
    };
</script>

<style lang="scss">
    .el-date-table td span {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
    @media screen and (max-width: 680px) {
        .el-date-range-picker__content.is-left {
            display: none;
        }

        .el-date-range-picker .el-picker-panel__content {
            display: none;
        }
        .el-picker-panel [slot="sidebar"],
        .el-picker-panel__sidebar {
            height: 300px;
            width: 100%;
        }
    }
    @media screen and (max-width: 700px) {
        .modal.addition {
            width: 100vw !important;
            height: 100vh !important;
        }
    }
    @media screen and (max-width: 500px) {
        .profile_block {
            font-size: 0.8rem;
        }
        .title.is-3 {
            font-size: 1.3rem;
        }
        span.addition-open {
            font-size: 0.7rem;
        }
        span.demonstration {
            font-size: 0.7rem;
        }
        footer.footer {
            font-size: 0.9rem;
        }
        .title.is-1 {
            font-size: 1.5rem;
        }
        label.label {
            font-size: 0.8rem;
        }
        span.change {
            font-size: 0.8rem;
        }
        input[type="email"],
        input[type="password"] {
            font-size: 0.8rem;
        }
    }
</style>
