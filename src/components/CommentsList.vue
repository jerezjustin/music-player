<script lang="ts" setup>
import CommentItem from './CommentItem.vue'

import type Comment from '@/interfaces/Comment'
import { type PropType } from 'vue'

defineProps({
    comments: {
        type: Object as PropType<Comment[]>,
        required: true
    }
})
</script>

<template>
    <ul class="container mx-auto">
        <CommentItem v-for="comment in comments" :comment="comment" :key="comment.document_id" />
    </ul>
</template>
