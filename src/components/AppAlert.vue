<script lang="ts" setup>
import AlertState from '@/enums/AlertState'
import type { PropType } from 'vue'

const props = defineProps({
    message: String,
    state: Number as PropType<AlertState>
})
</script>

<template>
    <div
        class="text-white text-center font-bold p-4 rounded mb-4"
        :class="{
            'bg-green-500': state === AlertState.sucess,
            'bg-blue-500': state === AlertState.info,
            'bg-yellow-500': state === AlertState.info,
            'bg-red-500': state === AlertState.error
        }"
    >
        {{ message }}
    </div>
</template>
