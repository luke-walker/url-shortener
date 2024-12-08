<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"

import { getLinks, createLink, deleteLink } from "../services/api-service.ts"
import { authorizeUser, authLogout } from "../services/auth-service.ts"

const authState = reactive({
    loggedIn: false
});

const createLinkForm = reactive({
    name: "",
    redirect: "",
    minutes: 0
});
const createLinkText = ref("");
const createdLinks = ref([]);

onMounted(async () => {
    authState.loggedIn = await authorizeUser();
    
    if (authState.loggedIn) {
        createdLinks.value = await getLinks();
    }
});

function onLoginClick() {
    window.location.href = `${import.meta.env.VITE_AUTH_URL}/auth/login/${import.meta.env.VITE_AUTH_TOKEN}`;
}

async function onLogoutClick() {
    const ok = await authLogout();
    if (ok) {
        authState.loggedIn = false;
    }
}

async function onCreateLinkSubmit() {
    const ok = await createLink(createLinkForm.name, createLinkForm.redirect, createLinkForm.minutes);
    if (ok) {
        createLinkText.value = "Created link";
        createdLinks.value = await getLinks();
    } else {
        createLinkText.value = "Failed to create link";
    }
}

async function onDeleteLinkClick(name) {
    const ok = await deleteLink(name);
    if (ok) {
        createdLinks.value = await getLinks();
    }
}
</script>

<template>
    <div id="home">
        <div v-if="authState.loggedIn" id="home-logged-in">
            <button v-on:click="onLogoutClick">Logout</button>
            <form id="create-link-form" v-on:submit.prevent="onCreateLinkSubmit">
                <input v-model="createLinkForm.name" type="text" name="name" placeholder="Link Name" />
                <input v-model="createLinkForm.redirect" type="text" name="redirect" placeholder="Redirect URL" />
                <input v-model="createLinkForm.minutes" type="number" name="minutes" />
                <input type="submit" value="Create Link" />
            </form>
            <p id="create-link-text">{{ createLinkText }}</p>
            <br />
            <h3>Created Links</h3>
            <ul id="link-list">
                <li class="link-list-item" v-for="link in createdLinks">
                    {{ link.name }} [{{ link.redirect_url }}]
                    <br />
                    <a v-on:click="onDeleteLinkClick(link.name)" href="#">Delete</a>
                    <br /><br />
                </li>
            </ul>
        </div>
        <div v-else id="home-logged-out">
            <button v-on:click="onLoginClick">Login via Central Auth</button>
        </div>
    </div>
</template>

<style>
.link-list-item {
    list-style-type: none;
}
</style>
