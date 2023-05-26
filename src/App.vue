<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from '@/components/AppAuth.vue'
</script>

<template>
    <!-- Header -->
    <AppHeader />

    <RouterView />

    <!-- Auth Modal -->
    <AppAuth />
</template>
