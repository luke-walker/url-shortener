import { createRouter, createWebHistory } from "vue-router"

import Home from "./views/Home.vue"
import Redirect from "./views/Redirect.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/redirect/:name/:redirect_url",
        name: "Redirect",
        component: Redirect
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
