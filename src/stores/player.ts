import type { Song } from '@/interfaces/Song'
import { defineStore } from 'pinia'
import { Howl } from 'howler'
import helper from '@/includes/helper'

export const usePlayerStore = defineStore('player', {
    state: () => ({
        current_song: undefined as Song | undefined,
        sound: undefined as Howl | undefined,
        seek: '00:00',
        duration: '00:00',
        progress: '0%'
    }),

    getters: {
        playing: (state): boolean => {
            if (state.sound) {
                return state.sound.playing()
            }

            return false
        }
    },

    actions: {
        async play(song: Song) {
            if (this.sound instanceof Howl) {
                this.sound.unload()
            }

            this.current_song = song

            this.sound = new Howl({
                src: [this.current_song.url],
                html5: true
            })

            this.sound.play()

            this.sound.on('play', () => {
                requestAnimationFrame(this.trackProgress)
            })
        },

        trackProgress() {
            this.seek = helper.formatTime(this.sound.seek())
            this.duration = helper.formatTime(this.sound.duration())
            this.progress = `${(this.sound.seek() / this.sound.duration()) * 100}%`

            if (this.sound.playing()) {
                requestAnimationFrame(this.trackProgress)
            }
        },

        async toggleAudio() {
            if (!this.sound) {
                return
            }

            this.sound.playing() ? this.sound.pause() : this.sound.play()
        },

        async updateSeek(event: MouseEvent) {
            if (!this.sound.playing) {
                return
            }

            const el = event.currentTarget as HTMLElement
            const { x, width } = el.getBoundingClientRect()
            const clickX = event.clientX - x
            const percentage = clickX / width
            const seconds = this.sound.duration() * percentage

            this.sound.seek(seconds)

            this.sound.once('seek', this.trackProgress)
        }
    }
})
