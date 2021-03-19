import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        notes: [],
        filter: { start: null, end: null },
        modalOpened: false
    },
    mutations: {
        updateNotes(state, notes) {
            if (this.notes != notes) {
                state.notes = notes

            }
        },
        updateFilter(state, filter) {
            state.filter.start = filter.start
            state.filter.end = filter.end
            console.log(filter)
        },
        openModalBg(state) {
            state.modalOpened = true
        },
        closeModalBg(state) {
            state.modalOpened = false
        }
    },
    actions: {},
    modules: {},
    getters: {
        getNoteByDate: state => (date) => {
            let daily = []
            console.log(state.notes)
            if (state.notes.length > 0) {
                daily = state.notes.filter(note => note.dateCreated == date)
            }
            return daily
        },
        getAllNotes: state => {
            if (!state.filter.start && !state.filter.end) {
                return state.notes
            } else {
                let filteredNotes = []
                state.notes.forEach(note => {
                    let list = note.dateCreated.split('.')
                    let preparedDate = `${list[2]}-${list[1]}-${list[0]}`

                    console.log((new Date(state.filter.end) >= new Date(preparedDate)))
                    if ((new Date(state.filter.start) <= new Date(preparedDate)) && (new Date(state.filter.end).setDate(new Date(state.filter.end).getDate() + 1) > new Date(preparedDate))) {
                        filteredNotes.push(note)
                    }

                })
                return filteredNotes
            }


        }

    }
})