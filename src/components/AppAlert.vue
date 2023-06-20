<script lang="ts" setup>
import State from '@/enums/State'
import { ref, type Ref } from 'vue'

const visible: Ref<boolean> = ref(false)
const message: Ref<string> = ref('')
const state: Ref<State> = ref(State.info)

const setVisibility = () => {
    visible.value = !visible.value
}

const setMessage = (messageValue: string) => {
    message.value = messageValue
}

const setState = (stateValue: State) => {
    state.value = stateValue
}

defineExpose({
    setVisibility,
    setMessage,
    setState
})
</script>

<template>
    <div
        v-if="visible"
        class="text-white text-center font-bold p-4 rounded mb-4"
        :class="{
            'bg-green-500': state === State.sucess,
            'bg-blue-500': state === State.info,
            'bg-yellow-500': state === State.info,
            'bg-red-500': state === State.error
        }"
    >
        {{ message }}
    </div>
</template>
