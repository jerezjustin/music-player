<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import { usePlayerStore } from '@/stores/player'

import { commentsCollection, songsCollection } from '@/includes/firebase'

import type { Song } from '@/interfaces/Song'
import type Comment from '@/interfaces/Comment'

import CommentForm from '@/components/CommentForm.vue'
import CommentsList from '@/components/CommentsList.vue'

const route = useRoute()
const router = useRouter()

const playerStore = usePlayerStore()

const songDocumentId: string = route.params.id as string

const sort = ref('1')
const song: Ref<Song> = ref() as Ref<Song>
const comments: Ref<Comment[]> = ref([])

const sortedComments = computed(() => {
    return comments.value.slice().sort((a, b) => {
        if (sort.value == '1') {
            return new Date(b.date_posted) - new Date(a.date_posted)
        }

        return new Date(a.date_posted) - new Date(b.date_posted)
    })
})

const songIsPlaying = computed(() => {
    if (!playerStore.playing) {
        return false
    }

    return playerStore.current_song?.documentID === songDocumentId
})

watch(sort, (value) => {
    if (value === route.query.sort) {
        return
    }

    router.push({ query: { sort: value } })
})

onMounted(async () => {
    const snapshot = await songsCollection.doc(songDocumentId).get()

    if (!snapshot.exists) {
        router.push({ name: 'home' })
    }

    const sortValue = route.query.sort

    sort.value = sortValue == '2' || sortValue == '2' ? sortValue : '1'

    song.value = {
        ...(snapshot.data() as Song),
        documentID: songDocumentId
    }

    await getComments()
})

const updateSongComments = async (): Promise<void> => {
    song.value.comment_count += 1

    await songsCollection.doc(songDocumentId).update({
        comment_count: song.value.comment_count
    })

    await getComments()
}

const getComments = async (): Promise<void> => {
    const snapshots = await commentsCollection.where('song_id', '==', songDocumentId).get()

    comments.value = []

    snapshots.forEach((document) => {
        comments.value.push({
            document_id: document.id,
            ...(document.data() as Comment)
        })
    })
}
</script>

<template>
    <main>
        <!-- Music Header -->
        <section class="w-full mb-8 py-14 text-center text-white relative">
            <div
                class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
                style="background-image: url(/assets/img/song-header.png)"
            ></div>
            <div class="container mx-auto flex items-center">
                <!-- Play/Pause Button -->
                <button
                    @click.prevent="playerStore.play(song)"
                    type="button"
                    class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
                >
                    <i
                        class="fas"
                        :class="{ 'fa-play': !songIsPlaying, 'fa-pause': songIsPlaying }"
                    ></i>
                </button>
                <div class="z-50 text-left ml-8">
                    <!-- Song Info -->
                    <div class="text-3xl font-bold">{{ song?.modified_name }}</div>
                    <div>{{ song?.genre }}</div>
                </div>
            </div>
        </section>

        <!-- Form -->
        <section class="container mx-auto mt-6">
            <div class="bg-white rounded border border-gray-200 relative flex flex-col">
                <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                    <!-- Comment Count -->
                    <span class="card-title">{{
                        $tc('song.comment_count', song?.comment_count, {
                            count: song?.comment_count
                        })
                    }}</span>
                    <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
                </div>
                <div class="p-6">
                    <CommentForm
                        @updateSongComments="updateSongComments"
                        :songDocumentId="songDocumentId"
                    />

                    <!-- Sort Comments -->
                    <select
                        v-model="sort"
                        class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                    >
                        <option value="1">{{ $t('song.latest') }}</option>
                        <option value="2">{{ $t('song.oldest') }}</option>
                    </select>
                </div>
            </div>
        </section>

        <!-- Comments -->
        <CommentsList :comments="sortedComments" id="comments" />
    </main>
</template>
