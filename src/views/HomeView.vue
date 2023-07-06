<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, type Ref } from 'vue'
import { songsCollection } from '@/includes/firebase'
import type { Song } from '@/interfaces/Song'
import SongItem from '@/components/SongItem.vue'

const songs: Ref<Song[]> = ref([])
const pendingRequest: Ref<boolean> = ref(false)
const maxSongsPerPage = 10

const songsCount = computed(() => {
    return songs.value.length
})

onMounted(async () => {
    getSongs()

    window.addEventListener('scroll', handleScroll)
})

onBeforeMount(() => {
    window.removeEventListener('scroll', handleScroll)
})

const getSongs = async () => {
    if (pendingRequest.value) {
        return
    }

    pendingRequest.value = true

    let snapshots

    if (songs.value.length) {
        const lastDocument = await songsCollection
            .doc(songs.value[songs.value.length - 1].documentID)
            .get()

        snapshots = await songsCollection
            .orderBy('modified_name')
            .startAfter(lastDocument)
            .limit(maxSongsPerPage)
            .get()
    } else {
        snapshots = await songsCollection.orderBy('modified_name').limit(maxSongsPerPage).get()
    }

    snapshots.forEach((document: { id: string; data: Function }) => {
        songs.value.push({
            documentID: document.id,
            ...document.data()
        })
    })

    pendingRequest.value = false
}

const handleScroll = async () => {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window
    const windowBottom = Math.round(scrollTop) + innerHeight === offsetHeight

    if (windowBottom) {
        await getSongs()
    }
}
</script>

<template>
    <main>
        <!-- Introduction -->
        <section class="mb-8 py-20 text-white text-center relative">
            <div
                class="absolute inset-0 w-full h-full bg-contain introduction-bg"
                style="background-image: url(assets/img/header.png)"
            ></div>
            <div class="container mx-auto">
                <div class="text-white main-header-content">
                    <h1 class="font-bold text-5xl mb-5">{{ $t('home.title') }}</h1>
                    <p class="w-full md:w-8/12 mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor
                        mollis, congue augue non, venenatis elit. Nunc justo eros, suscipit ac
                        aliquet imperdiet, venenatis et sapien. Duis sed magna pulvinar, fringilla
                        lorem eget, ullamcorper urna.
                    </p>
                </div>
            </div>

            <img
                class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
                src="/assets/img/introduction-music.png"
            />
        </section>

        <!-- Main Content -->
        <section class="container mx-auto">
            <div class="bg-white rounded border border-gray-200 relative flex flex-col">
                <div
                    v-icon.right.green="'headphones-alt'"
                    class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
                >
                    <span class="card-title">
                        {{ $tc('home.songs_count', songsCount, { count: songsCount }) }}
                    </span>
                </div>
                <!-- Playlist -->
                <ol id="playlist">
                    <SongItem v-for="song in songs" :song="song" :key="song.documentID" />
                </ol>
                <!-- .. end Playlist -->
            </div>
        </section>
    </main>
</template>
