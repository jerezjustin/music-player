import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        isOpen: false
    }),

    getters: {
        hiddenClass(state): string {
            return !state.isOpen ? 'hidden' : ''
        }
    },

    actions: {
        toggleAuthModal(): void {
            this.isOpen = !this.isOpen
        }
    }
})
