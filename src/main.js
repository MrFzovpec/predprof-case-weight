import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Authentication from '@/views/Authentication'
const cookies = require('vue-cookies')

Vue.config.productionTip = false
Vue.use(cookies)
Authentication.checkAuthentication()
console.log(Vue.$cookies)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')