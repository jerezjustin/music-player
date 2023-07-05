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

    <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
            <component :is="Component"></component>
        </Transition>
    </RouterView>

    <!-- Player -->
    <AppPlayer />

    <!-- Auth Modal -->
    <AppAuth />
</template>

<style>
.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all 0.5s linear;
}

.fade-leave-to {
    transition: all 0s lienar;
    opacity: 0;
}
</style>
