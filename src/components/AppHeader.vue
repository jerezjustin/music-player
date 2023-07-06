<script lang="ts" setup>
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const modalStore = useModalStore()
const userStore = useUserStore()

const toggleAuthModal = () => {
    modalStore.toggleAuthModal()
}

const logout = () => {
    userStore.logout()

    if (router.currentRoute.value.meta.requiresAuth) {
        router.push({ name: 'home' })
    }
}
</script>

<template>
    <header id="header" class="bg-gray-700">
        <nav class="container mx-auto flex justify-start items-center py-5 px-4">
            <!-- App Name -->
            <RouterLink
                :to="{ name: 'home' }"
                exact-active-class="no-active"
                class="text-white font-bold uppercase text-2xl mr-auto"
            >
                {{ $t('header.music') }}
            </RouterLink>

            <div class="flex flex-grow items-center">
                <!-- Primary Navigation -->
                <ul class="flex flex-row mt-1">
                    <!-- Navigation Links -->
                    <li v-if="!userStore.userLoggedIn">
                        <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
                            {{ $t('header.login-register') }}
                        </a>
                    </li>
                    <template v-else>
                        <li>
                            <RouterLink :to="{ name: 'manage' }" class="px-2 text-white" href="#">
                                {{ $t('header.manage') }}
                            </RouterLink>
                        </li>
                        <li>
                            <a class="px-2 text-white" href="#" @click.prevent="logout">{{
                                $t('header.logout')
                            }}</a>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>
    </header>
</template>
