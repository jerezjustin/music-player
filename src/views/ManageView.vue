<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import { songsCollection, auth } from '@/includes/firebase'

import type { DocumentData } from '@firebase/firestore-types'
import type { Song } from '@/interfaces/Song'

import AppFileUploader from '@/components/AppFileUploader.vue'
import CompositionItem from '@/components/CompositionItem.vue'

const songs: Ref<Song[]> = ref([])

onMounted(async () => {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser?.uid).get()

    snapshot.forEach((document: DocumentData) => {
        const song: Song = { ...document.data(), documentID: document.id }

        songs.value.push(song)
    })
})

const updateSong = (index: number, values: Object) => {
    songs.value[index] = {
        ...songs.value[index],
        ...values
    }
}

const removeSong = (index: number) => {
    songs.value.splice(index, 1)
}
</script>

<template>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
        <div class="md:grid md:grid-cols-3 md:gap-4">
            <div class="col-span-1">
                <AppFileUploader />
            </div>
            <div class="col-span-2">
                <div class="bg-white rounded border border-gray-200 relative flex flex-col">
                    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                        <span class="card-title">My Songs</span>
                        <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
                    </div>
                    <div class="p-6">
                        <!-- Composition Items -->
                        <CompositionItem
                            v-for="(song, index) in songs"
                            :song="song"
                            :index="index"
                            :updateSong="updateSong"
                            :removeSong="removeSong"
                            :key="song.documentID"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
