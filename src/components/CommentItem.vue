<script lang="ts" setup>
import type Comment from '@/interfaces/Comment'
import type { PropType } from 'vue'

defineProps({
    comment: {
        type: Object as PropType<Comment>,
        required: true
    }
})
</script>

<template>
    <li :key="comment.document_id" class="p-6 bg-gray-50 border border-gray-200">
        <!-- Comment Author -->
        <div class="mb-5">
            <div class="font-bold">{{ comment.name }}</div>
            <time>{{ comment.date_posted }}</time>
        </div>

        <p>
            {{ comment.content }}
        </p>
    </li>
</template>
