import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Authentication from '@/views/Authentication'
import elementLocale from 'element-ui/lib/locale/lang/ru-RU';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Notifications from 'vue-notification'
const cookies = require('vue-cookies')

Vue.config.productionTip = false
Vue.use(cookies)
Vue.use(Notifications)
Vue.use(ElementUI, { locale: elementLocale });

Authentication.checkAuthentication(Vue)
console.log(Vue.$cookies)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')