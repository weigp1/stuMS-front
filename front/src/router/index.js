import { createRouter, createWebHistory } from "vue-router";
import { setupRouterGuard } from './guard'
import { AuthStore } from '../stores/auth'
import { UserStore } from '../stores/user'

const routes = [
    { path: '/', redirect: '/login' },
    { name: 'Login', path: '/login', component: () => import("../views/Login/Login.vue")},
    { name: 'ForgotPassword', path: '/forgot-password', component: () => import("../views/Login/ForgotPassword.vue") },
    { name: 'Home', path: '/home', component: () => import("../views/Home/Home.vue") },
    { name: 'Info', path: '/info', component: () => import("../views/Info/Info.vue") },
    { name: 'Plan', path: '/plan', component: () => import("../views/Plan/Plan.vue") },
    { name: 'Detail', path: '/detail', component: () => import("../views/Detail/Detail.vue") },
    { name: 'Audit', path: '/audit', component: () => import("../views/Audit/Audit.vue") },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

async function setupRouter() {
    const authStore = AuthStore()
    if (!authStore.token) 
    {
        authStore.toLogin()
    }

    try {
        const userStore = UserStore()
        if (!userStore.currentUser) {
        await userStore.login()
        }
        setupRouterGuard(router)
    }
    catch (err) {
        console.error('Error: ', err)
    }
}

export { router, routes, setupRouter };
