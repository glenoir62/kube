<script setup lang="ts">
import TheHeader from '@/components/Header.vue';
import { useRouter } from 'vue-router';
import { useUser } from './shared/stores';

const userStore = useUser();
const router = useRouter();

async function logout() {
    await userStore.logout();
    router.push('/connexion');
}

</script> 

<template>
    <div class="d-flex flex-column app-container">
        <TheHeader :isAuthenticated="userStore.isAuthenticated" @logout="logout" />
        <router-view class="flex-fill"></router-view>
    </div>
</template>


<style lang="scss" >
@import "./assets/base.scss";

.app-container {
    min-height: 100vh;
}
</style>