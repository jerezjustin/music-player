<script lang="ts" setup>
import type { Song } from '@/interfaces/Song'
import type { PropType } from 'vue'

defineProps({
    song: {
        type: Object as PropType<Song>,
        required: true
    }
})
</script>

<template>
    <li
        class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
    >
        <div>
            <RouterLink
                :to="{ name: 'song', params: { id: song.documentID } }"
                class="font-bold block text-gray-600"
            >
                {{ song.modified_name }}
            </RouterLink>
            <span class="text-gray-500 text-sm">{{ song.displayName }}</span>
        </div>

        <div class="text-gray-600 text-lg">
            <RouterLink
                :to="{ name: 'song', params: { id: song.documentID }, hash: '#comments' }"
                v-slot="{ navigate }"
                custom
            >
                <span @click="navigate" class="comments">
                    <i class="fa fa-comments text-gray-600"></i>
                    {{ song.comment_count }}
                </span>
            </RouterLink>
        </div>
    </li>
</template>
