<script lang="ts" setup>
import type { ErrorMessage } from 'vee-validate'
import { ref, type Ref } from 'vue'

import AppAlert from './AppAlert.vue'
import State from '@/enums/State'
import { auth, usersCollection } from '@/includes/firebase'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const submitting: Ref<boolean> = ref(false)

const alertComponent = ref()

const schema: Object = {
    name: 'required|min:3|max:100|alpha_spaces',
    email: 'required|min:3|max:100|email',
    age: 'required|min_value:18|max_value:100',
    password: 'required|min:8|max:32',
    confirm_password: 'password_mismatch:@password',
    country: 'required|country_excluded:Antartic',
    tos: 'tos'
}

const register = async (values: any) => {
    submitting.value = true
    alertComponent.value.setVisibility(true)
    alertComponent.value.setMessage('Please wait, your account is being created.')
    alertComponent.value.setState(State.info)

    try {
        await user.register(values)
    } catch (error) {
        alertComponent.value.setMessage('An unexpected error ocurred. Please, try again later.')
        alertComponent.value.setState(State.error)
    }

    alertComponent.value.setMessage('Your account has been created')
    alertComponent.value.setState(State.sucess)

    window.location.reload()
}
</script>

<template>
    <AppAlert ref="alertComponent" />

    <VeeForm :validation-schema="schema" @submit="register">
        <!-- Name -->
        <div class="mb-3">
            <label class="inline-block mb-2">Name</label>
            <VeeField
                name="name"
                type="text"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name"
            />
            <ErrorMessage class="text-red-500" name="name" />
        </div>

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

        <!-- Age -->
        <div class="mb-3">
            <label class="inline-block mb-2">Age</label>
            <VeeField
                name="age"
                type="number"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            />
            <ErrorMessage class="text-red-500" name="age" />
        </div>

        <!-- Password -->
        <div class="mb-3">
            <label class="inline-block mb-2">Password</label>
            <VeeField name="password" :bails="false" v-slot="{ field, errors }">
                <input
                    v-bind="field"
                    type="password"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="password"
                />
                <ul>
                    <li v-for="error in errors" :key="error" class="text-red-500">
                        {{ error }}
                    </li>
                </ul>
            </VeeField>
        </div>

        <!-- Confirm Password -->
        <div class="mb-3">
            <label class="inline-block mb-2">Confirm Password</label>
            <VeeField
                name="confirm_password"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password"
            />
            <ErrorMessage class="text-red-500" name="confirm_password" />
        </div>

        <!-- Country -->
        <div class="mb-3">
            <label class="inline-block mb-2">Country</label>
            <VeeField
                name="country"
                as="select"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            >
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Antartic">Antarctic</option>
            </VeeField>
            <ErrorMessage class="text-red-500" name="country" />
        </div>

        <!-- TOS -->
        <div class="mb-3 pl-6">
            <VeeField
                name="tos"
                value="1"
                type="checkbox"
                class="w-4 h-4 float-left -ml-6 mt-1 rounded"
            />
            <label class="inline-block">Accept terms of service</label>
            <ErrorMessage class="block text-red-500 ml-4" name="tos" />
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
