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
        path: '/:catchAll(.*)*',
        redirect: { name: 'home' }
    }
]
