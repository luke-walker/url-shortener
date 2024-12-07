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
        path: "/redirect/:url",
        name: "Redirect",
        component: Redirect
    }
];

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
