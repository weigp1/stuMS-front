import { createRouter, createWebHistory } from "vue-router";

let routes = [
    {
        path: '/',
        redirect: '/login',
        children: [
            {path: "/login", component: () => import("../views/Login/Login.vue"),},
            {path: "/home", component: () => import("../views/Home/Home.vue"),},
            {path: "/info", component: () => import("../views/Info/Info.vue"),},
            {path: "/plan", component: () => import("../views/Plan/Plan.vue"),},
            {path: "/detail", component: () => import("../views/Detail/Detail.vue"),},
            {path: "/audit", component: () => import("../views/Audit/Audit.vue"),},
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router, routes }


