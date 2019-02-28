import Vue from 'vue'
import Router from 'vue-router'


const Index = () => import(/* webpackChunkName: "index" */ './views/Index.vue');



Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: '/index',
            name: 'index',
            component: Index,
        },
    ]
})
