<script lang="ts" setup>
import { usePlayerStore } from '@/stores/player'
import helper from '@/includes/helper'

const playerStore = usePlayerStore()
</script>

<template>
    <div v-if="playerStore.current_song" class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
        <!-- Track Info -->
        <div class="text-center">
            <span class="song-title font-bold">{{ playerStore.current_song?.modified_name }}</span>
            by
            <span class="song-artist">{{ playerStore.current_song?.displayName }}</span>
        </div>
        <div class="flex flex-nowrap gap-4 items-center">
            <!-- Play/Pause Button -->
            <button @click.prevent="playerStore.toggleAudio()" type="button">
                <i
                    :class="{
                        'fa-play': !playerStore.playing,
                        'fa-pause': playerStore.playing
                    }"
                    class="fa text-gray-500 text-xl"
                ></i>
            </button>
            <!-- Current Position -->
            <div class="player-currenttime">{{ playerStore.seek }}</div>
            <!-- Scrub Container  -->
            <div
                @click.prevent="playerStore.updateSeek"
                class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
            >
                <!-- Player Ball -->
                <span
                    class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
                    :style="{ left: playerStore.progress }"
                >
                    <i class="fas fa-circle"></i>
                </span>
                <!-- Player Progress Bar-->
                <span
                    class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
                    :style="{ width: playerStore.progress }"
                ></span>
            </div>
            <!-- Duration -->
            <div class="player-duration">{{ playerStore.duration }}</div>
        </div>
    </div>
</template>
