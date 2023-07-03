<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from '@/components/AppAuth.vue'
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'
import { auth } from './includes/firebase'
import AppPlayer from './components/AppPlayer.vue'

const userStore = useUserStore()

onMounted(() => {
    if (auth.currentUser) {
        userStore.userLoggedIn = true
    }
})
</script>

<template>
    <!-- Header -->
    <AppHeader />

    <RouterView />

    <!-- Player -->
    <AppPlayer />

    <!-- Auth Modal -->
    <AppAuth />
</template>
