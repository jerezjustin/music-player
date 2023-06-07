import { auth, usersCollection } from '@/includes/firebase'
import type { User } from '@/interfaces/User'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        userLoggedIn: false
    }),

    actions: {
        async register(values: User) {
            const credentials = await auth.createUserWithEmailAndPassword(
                values.email,
                values.password!
            )

            await usersCollection.doc(credentials.user?.uid).set({
                name: values.name,
                email: values.email,
                age: values.age,
                country: values.country
            })

            await credentials.user?.updateProfile({
                displayName: values.name
            })

            this.userLoggedIn = true
        },

        async login(email: string, password: string) {
            await auth.signInWithEmailAndPassword(email, password)

            this.userLoggedIn = true
        },

        async logout() {
            await auth.signOut()

            this.userLoggedIn = false
        }
    }
})
