<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"

import { trustLink } from "../services/api-service.ts"

const { name, redirect_url } = useRoute().params;

const countdown = ref(5);
let intervalId = null;

onMounted(() => {
    intervalId = setInterval(() => {
        if (countdown.value === 0) {
            clearInterval(intervalId);
            intervalId = null;
            window.location.href = redirect_url;
        } else {
            countdown.value--;
        }
    }, 1000);
});

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});

async function onTrustLinkClick() {
    const ok = trustLink(name);
    if (ok) {
        window.location.href = redirect_url;
    }
}
</script>

<template>
    <div id="redirect">
        <div id="countdown">
            <h3>Redirecting to <a :href="redirect_url">{{ redirect_url }}</a> in... {{ countdown }}</h3>
        </div>
        <button v-on:click="onTrustLinkClick">Trust Link</button>
    </div>
</template>
