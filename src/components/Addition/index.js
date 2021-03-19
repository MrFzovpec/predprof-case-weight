import Axios from 'axios'
import router from '@/router'
import store from '@/store'

const WeightAPI = `http://${window.location.hostname}:3000`

export default {
    user: { authenticated: false },
    getNotes(context) {


        const token = context.$cookies.get('token')

        if (token) this.user.authenticated = true

        else this.user.authenticated = false

        Axios.get(`${WeightAPI}/api/get/notes`, {
            withCredentials: true,

        }).then(({ data }) => {

            store.commit(
                "updateNotes", data.notes)

        }).catch(({ response: { data } }) => {

            this.user = {}
            this.user.authenticated = false
            console.log(data)
            router.push('/auth')

        })
    },
    updateDatabaseNote(context, note) {
        const token = context.$cookies.get('token')

        if (token) this.user.authenticated = true

        else this.user.authenticated = false
        Axios.defaults.withCredentials = true
        Axios.post(`${WeightAPI}/api/post/notes`, { note: note }).then(({ data }) => {
            console.log(data)

        }).catch(({ response: { data } }) => {
            context.snackbar = true
            context.message = data.message
            context.type = data.type
        })


    }
}