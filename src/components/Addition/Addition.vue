<template>
    <div>
        <img
            @click="closeModal()"
            @keydown.esc="closeModal()"
            class="close_modal"
            src="https://img.icons8.com/windows/64/000000/macos-close.png"
        />
        <h1 class="title is-3">
            Показания на
            {{ new Date().toLocaleDateString("ru-RU") }}
        </h1>

        <div class="addition control">
            <input type="number" v-model="currentNote.value" class="input" />
            <button
                disabled
                v-if="currentNote.value === ''"
                class="button is-success"
            >
                Сохранить
            </button>
            <span @click="updateNoteInfo()" v-else class="button is-success"
                >Сохранить</span
            >
        </div>
    </div>
</template>

<script>
    import AdditionMethods from "./index.js";

    export default {
        name: "Addition",
        async mounted() {
            AdditionMethods.getNotes(this);
        },

        computed: {
            currentNote() {
                let noteList = this.$store.getters.getNoteByDate(
                    new Date().toLocaleDateString("ru-RU")
                );
                if (noteList.length > 0) {
                    console.log(noteList[0]);
                    return noteList[0];
                } else {
                    return this.newNote;
                }
            },
        },
        methods: {
            updateNoteInfo() {
                let note = this.currentNote;
                console.log(note);
                AdditionMethods.updateDatabaseNote(this, note);
                AdditionMethods.getNotes(this);
            },
            closeModal() {
                this.$store.commit("closeModalBg");
            },
        },
        data() {
            return {
                newNote: {
                    value: "",
                    dateCreated: new Date().toLocaleDateString("ru-RU"),
                },
            };
        },
    };
</script>

<style lang="scss">
    .addition {
        display: flex;
    }
    img.close_modal {
        cursor: pointer;
        top: 15px;
        position: absolute;
        right: 15px;
        width: 32px;
        height: 32px;
    }
</style>
