<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import { songsCollection, auth } from '@/includes/firebase'

import type { DocumentData } from '@firebase/firestore-types'
import type { Song } from '@/interfaces/Song'

import AppFileUploader from '@/components/AppFileUploader.vue'
import CompositionItem from '@/components/CompositionItem.vue'
import { onBeforeRouteLeave } from 'vue-router'

const songs: Ref<Song[]> = ref([])
let unsavedFlag: Ref<boolean> = ref(false)

onMounted(async () => {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser?.uid).get()

    snapshot.forEach((document: DocumentData) => {
        const song: Song = { ...document.data(), documentID: document.id }

        addSong(song)
    })
})

onBeforeRouteLeave((to, from, next) => {
    if (!unsavedFlag.value) {
        next()
    } else {
        const willLeave = confirm(
            'Are you sure? All the progress uploading and editing songs will be lost.'
        )

        next(willLeave)
    }
})

const addSong = (song: Song) => {
    songs.value.push(song)
}

const updateSong = (index: number, values: Object) => {
    songs.value[index] = {
        ...songs.value[index],
        ...values
    }
}

const updateUnsavedFlag = (value: boolean) => {
    unsavedFlag.value = value
}

const removeSong = (index: number) => {
    songs.value.splice(index, 1)
}
</script>

<template>
    <section class="container mx-auto mt-6">
        <div class="md:grid md:grid-cols-3 md:gap-4">
            <div class="col-span-1">
                <AppFileUploader :addSong="addSong" :updateUnsavedFlag="updateUnsavedFlag" />
            </div>
            <div class="col-span-2">
                <div class="bg-white rounded border border-gray-200 relative flex flex-col">
                    <div
                        v-icon.right.green.xxl="'compact-disc'"
                        class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
                    >
                        <span class="card-title">My Songs</span>
                    </div>
                    <div class="p-6">
                        <!-- Composition Items -->
                        <CompositionItem
                            v-for="(song, index) in songs"
                            :song="song"
                            :index="index"
                            :updateSong="updateSong"
                            :updateUnsavedFlag="updateUnsavedFlag"
                            :removeSong="removeSong"
                            :key="song.documentID"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
