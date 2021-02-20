import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authentication from '../views/Authentication/Auth.vue'
import * as Auth from '@/views/Authentication'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiredAuth: true
        }
    },
    {
        path: '/auth',
        name: 'Authentication',
        component: Authentication
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.requiredAuth) {
        if (Auth.default.user.authenticated) {

            next()
        } else {
            router.push('/auth')
        }
    } else {
        next()
    }
})

export default router