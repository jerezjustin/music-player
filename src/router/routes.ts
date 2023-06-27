import type { RouteRecordRaw } from 'vue-router'

export const routes: readonly RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/manage',
        name: 'manage',
        component: () => import('@/views/ManageView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'song',
        path: '/song/:id',
        component: () => import('@/views/SongView.vue')
    },
    {
        path: '/:catchAll(.*)*',
        redirect: { name: 'home' }
    }
]
