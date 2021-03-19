import Axios from 'axios'
import router from '@/router'
const WeightAPI = `http://${window.location.hostname}:3000`

export default {
    user: { authenticated: false },
    authenticate(context, credentials, redirect) {
        Axios.post(`${WeightAPI}/login`, credentials).then(({ data }) => {
            context.$cookies.set('token', data.token)
            context.validSignUp = true
            this.user.authenticated = true
            this.user.email = data.userData.email
            this.user._id = data.userData._id
            console.log(this.user)

            if (redirect) router.push(redirect)
        }).catch(({ response: { data } }) => {
            context.snackbar = true
            context.message = data.message
            context.type = data.type
        })

    },
    signup(context, credentials, redirect) {
        Axios.post(`${WeightAPI}/signup`, credentials)
            .then(({ data: { token } }) => {
                context.$cookies.set('token', token)
                context.validSignUp = true
                this.user.authenticated = true
                this.authenticate(context, credentials, '/')
                if (redirect) router.push(redirect)
            }).catch(({ response: { data } }) => {
                context.snackbar = true
                context.message = data.message
                context.type = data.type
            })
    },
    logout(context, redirect) {
        const token = document.cookie
        Axios.post(`${WeightAPI}/logout`, token)
            .then(() => {
                context.$cookies.remove('token')
                context.validSignUp = true
                this.user = { authenticated: false }

                if (redirect) router.push(redirect)
            }).catch(({ response: { data } }) => {
                context.snackbar = true
                context.message = data.message
                context.type = data.type
            })
    },
    checkAuthentication(context) {
        const token = context.$cookies.get('token')

        if (token) this.user.authenticated = true

        else this.user.authenticated = false

        Axios.post(`${WeightAPI}/api/get/user`, { token: token }).then(({ data }) => {

            this.user.authenticated = true
            this.user.email = data.userData.email
            this.user._id = data.userData._id
            console.log(this.user)
        }).catch(({ response: { data } }) => {
            this.user = {}
            this.user.authenticated = false
            console.log(data)
            router.push('/auth')
        })
    },


    getAuthenticationHeader(context) {
        return `${context.$cookie.get('token')}`
    }
}