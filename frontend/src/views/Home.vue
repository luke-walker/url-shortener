<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"

const authState = reactive({
    loggedIn: false
});
const createLinkForm = reactive({
    name: "",
    redirect: "",
    minutes: 0
});

const createLinkError = ref("");

onMounted(async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/auth`, {
            credentials: "include"
        });
        authState.loggedIn = res.ok;
    } catch (err) {
        authState.loggedIn = false;
    }
});

function onLoginClick() {
    window.location.href = `${import.meta.env.VITE_AUTH_URL}/auth/login/${import.meta.env.VITE_AUTH_TOKEN}`;
}

async function onLogoutClick() {
    const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });
    if (res.ok) {
        authState.loggedIn = false;
    }
}

async function onCreateLinkSubmit() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/link`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...createLinkForm
        })
    });
    createLinkError.value = (res.ok ? "Created link" : "Failed to create link");
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
            <p id="create-link-error">{{ createLinkError }}</p>
        </div>
        <div v-else id="home-logged-out">
            <button v-on:click="onLoginClick">Login via Central Auth</button>
        </div>
    </div>
</template>
