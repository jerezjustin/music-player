<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { auth, storage, songsCollection } from '@/includes/firebase'

import State from '@/enums/State'
import type { UploadingFile } from '@/interfaces/UploadingFile'
import type { Song } from '@/interfaces/Song'

export type FileEventTarget = DragEvent & { target: { files: FileList } }

const isDragover: Ref<boolean> = ref(false)
const uploads: Ref<UploadingFile[]> = ref([])

const upload = ($event: FileEventTarget) => {
    isDragover.value = false

    let files: File[] = []

    if ($event.dataTransfer) {
        files = [...$event.dataTransfer.files]
    } else if ($event.target) {
        files = [...$event.target.files]
    }

    files.forEach((file: File) => {
        if (file.type !== 'audio/mpeg') {
            return
        }

        const storageRef = storage.ref()
        const songsRef = storageRef.child(`songs/${file.name}`)
        const task = songsRef.put(file)

        const uploadIndex =
            uploads.value.push({
                task,
                name: file.name,
                state: State.info,
                icon: 'fas fa-spinner fa-spin',
                current_progress: 0
            }) - 1

        task.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                uploads.value[uploadIndex].current_progress = progress
            },
            // Handle errors
            (error) => {
                uploads.value[uploadIndex].state = State.error
                uploads.value[uploadIndex].icon = 'fas fa-times'
            },
            // Handle successful uploads
            async () => {
                let song: Song = {
                    uid: auth.currentUser?.uid ?? '',
                    displayName: auth.currentUser?.displayName ?? '',
                    original_name: task.snapshot.ref.name,
                    modified_name: task.snapshot.ref.name,
                    genre: '',
                    comment_count: 0,
                    url: ''
                }

                song.url = await task.snapshot.ref.getDownloadURL()
                await songsCollection.add(song)

                uploads.value[uploadIndex].state = State.sucess
                uploads.value[uploadIndex].icon = 'fas fa-check'
            }
        )
    })
}
</script>

<template>
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">Upload</span>
            <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
            <!-- Upload Dropbox -->
            <div
                class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
                :class="{ 'bg-green-400 border-green-400 border-solid': isDragover }"
                @drag.prevent.stop=""
                @dragstart.prevent.stop=""
                @dragend.prevent.stop="isDragover = false"
                @dragover.prevent.stop="isDragover = true"
                @dragenter.prevent.stop="isDragover = true"
                @dragleave.prevent.stop="isDragover = false"
                @drop.prevent.stop="upload($event)"
            >
                <h5>Drop your files here</h5>
            </div>

            <input type="file" multiple @change="upload($event)" />

            <hr class="my-6" />

            <!-- Progess Bars -->
            <div class="mb-4" v-for="upload in uploads" :key="upload.name">
                <!-- File Name -->
                <div
                    class="font-bold text-sm"
                    :class="{
                        'text-green-400': upload.state === State.sucess,
                        'text-blue-400': upload.state === State.info,
                        'text-red-400': upload.state === State.error
                    }"
                >
                    <i :class="upload.icon"></i>
                    {{ upload.name }}
                </div>
                <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                    <!-- Inner Progress Bar -->
                    <div
                        class="transition-all progress-bar bg-blue-400"
                        :class="{
                            'bg-green-400': upload.state === State.sucess,
                            'bg-blue-400': upload.state === State.info,
                            'bg-red-400': upload.state === State.error
                        }"
                        :style="{ width: upload.current_progress + '%' }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>
