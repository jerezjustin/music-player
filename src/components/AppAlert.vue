<script lang="ts" setup>
import State from '@/enums/State'
import { ref, type Ref } from 'vue'

const visible: Ref<boolean> = ref(false)
const message: Ref<string> = ref('')
const state: Ref<State> = ref(State.info)

const setVisibility = (value: boolean) => {
    visible.value = value
}

const setMessage = (value: string) => {
    message.value = value
}

const setState = (value: State) => {
    state.value = value
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

        <button @click.prevent="visible = false" class="float-right">
            <i class="fa fa-times"></i>
        </button>
    </div>
</template>
