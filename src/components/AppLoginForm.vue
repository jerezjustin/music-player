<script lang="ts" setup>
import type { ErrorMessage } from 'vee-validate'
import { ref, type Ref } from 'vue'
import AppAlert from './AppAlert.vue'
import AlerState from '@/enums/AlertState'

const submitting: Ref<boolean> = ref(false)
const message: Ref<string> = ref('')
const state: Ref<AlerState> = ref(AlerState.info)

const schema: Object = {
    email: 'required|email',
    password: 'required|min:8|max:32'
}

const login = (values: any) => {
    submitting.value = true
    message.value = 'Please wait, your being logged in.'
    state.value = AlerState.info

    setTimeout(() => {
        message.value = 'Your are now logged in.'
        state.value = AlerState.sucess
        console.log(values)
    }, 3000)
}
</script>

<template>
    <AppAlert v-if="submitting" :message="message" :state="state" />

    <VeeForm :validation-schema="schema" @submit="login">
        <!-- Email -->
        <div class="mb-3">
            <label class="inline-block mb-2">Email</label>
            <VeeField
                name="email"
                type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
            />
            <ErrorMessage class="text-red-500" name="email" />
        </div>

        <!-- Password -->
        <div class="mb-3">
            <label class="inline-block mb-2">Password</label>
            <VeeField
                name="password"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password"
            />
            <ErrorMessage class="text-red-500" name="password" />
        </div>

        <button
            type="submit"
            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            :disabled="submitting"
        >
            Submit
        </button>
    </VeeForm>
</template>
