<script lang="ts" setup>
import State from '@/enums/State'
import type { PropType } from 'vue'

const props = defineProps({
    message: String,
    state: Number as PropType<State>
})
</script>

<template>
    <div
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
