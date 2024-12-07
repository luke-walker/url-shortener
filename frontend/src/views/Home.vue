<script setup lang="ts">
    import { onMounted, reactive } from "vue"

    const authState = reactive({
        loggedIn: false
    });

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
        authState.loggedIn = !res.ok;
    }
</script>

<template>
    <div id="home">
        <div v-if="authState.loggedIn">
            <button v-on:click="onLogoutClick">Logout</button>
        </div>
        <div v-else>
            <button v-on:click="onLoginClick">Login via Central Auth</button>
        </div>
    </div>
</template>
