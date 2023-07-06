<script lang="ts" setup>
import type { ErrorMessage } from 'vee-validate'
import { ref, type Component, type Ref } from 'vue'
import AppAlert from './AppAlert.vue'
import State from '@/enums/State'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const submitting: Ref<boolean> = ref(false)

const alertComponent = ref()

const schema: Object = {
    email: 'required|email',
    password: 'required|min:8|max:32'
}

const login = async (values: any) => {
    submitting.value = true
    alertComponent.value.setVisibility(true)
    alertComponent.value.setMessage('Please wait, your being logged in.')
    alertComponent.value.setState(State.info)

    try {
        await userStore.login(values.email, values.password)
    } catch (error) {
        alertComponent.value.setMessage('The email or password is incorrect.')
        alertComponent.value.setState(State.error)
        return
    }

    alertComponent.value.setMessage('Your are now logged in.')
    alertComponent.value.setState(State.sucess)

    window.location.reload()
}
</script>

<template>
    <AppAlert ref="alertComponent" />

    <VeeForm :validation-schema="schema" @submit="login">
        <!-- Email -->
        <div class="mb-3">
            <label class="inline-block mb-2">{{ $t('login.email') }}</label>
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
            <label class="inline-block mb-2">{{ $t('login.password') }}</label>
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
            {{ $t('login.login') }}
        </button>
    </VeeForm>
</template>
