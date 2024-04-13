import { createRouter, createWebHistory } from "vue-router";

let routes = [
    { path: "/", component: () => import("../views/Login.vue"), },
    { path: "/home", component: () => import("../views/Home.vue"), },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router, routes }


