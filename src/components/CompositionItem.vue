<script lang="ts" setup>
import type { Song } from '@/interfaces/Song'
import { ErrorMessage } from 'vee-validate'
import { ref, type PropType, type Ref } from 'vue'
import AppAlert from './AppAlert.vue'
import State from '@/enums/State'
import { songsCollection, storage } from '@/includes/firebase'

const props = defineProps({
    song: {
        type: Object as PropType<Song>,
        required: true
    },
    updateSong: {
        type: Function,
        required: true
    },
    removeSong: {
        type: Function,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
})

const schema: Object = {
    modified_name: 'required|min:3|max:120',
    genre: 'required|min:3|max:50'
}

const alertComponent = ref()
const submitting: Ref<boolean> = ref(false)
const showForm: Ref<boolean> = ref(false)

const edit = async (values: any) => {
    submitting.value = true
    alertComponent.value.setVisibility(true)
    alertComponent.value.setMessage('Please wait! Updating song info.')
    alertComponent.value.setState(State.info)

    try {
        await songsCollection.doc(props.song.documentID).update({
            modified_name: values.modified_name,
            genre: values.genre
        })

        props.updateSong(props.index, values)
    } catch (error) {
        alertComponent.value.setMessage('There was an error. Please try again later.')
        alertComponent.value.setState(State.error)
    }

    submitting.value = false
    alertComponent.value.setMessage('The song was updated successfully.')
    alertComponent.value.setState(State.sucess)
}

const deleteSong = async () => {
    const storageRef = storage.ref()
    const songRef = storageRef.child(`songs/${props.song.original_name}`)

    await songRef.delete()
    await songsCollection.doc(props.song.documentID).delete()

    props.removeSong(props.index)
}
</script>

<template>
    <div class="border border-gray-200 p-3 mb-4 rounded">
        <div v-show="!showForm">
            <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
            <button
                @click.prevent="deleteSong"
                class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
            >
                <i class="fa fa-times"></i>
            </button>
            <button
                @click.prevent="showForm = !showForm"
                class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
            >
                <i class="fa fa-pencil-alt"></i>
            </button>
        </div>
        <div v-show="showForm">
            <AppAlert ref="alertComponent" />
            <VeeForm :validation-schema="schema" @submit="edit" :initial-values="song">
                <div class="mb-3">
                    <label class="inline-block mb-2">Song Title</label>
                    <VeeField
                        name="modified_name"
                        type="text"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Song Title"
                    />
                    <ErrorMessage class="text-red-500" name="modified_name" />
                </div>
                <div class="mb-3">
                    <label class="inline-block mb-2">Genre</label>
                    <VeeField
                        name="genre"
                        type="text"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Genre"
                    />
                    <ErrorMessage class="text-red-500" name="genre" />
                </div>
                <button
                    :disabled="submitting"
                    type="submit"
                    class="py-1.5 px-3 rounded text-white bg-green-600"
                >
                    Submit
                </button>
                <button
                    :disabled="submitting"
                    @click="showForm = false"
                    type="button"
                    class="py-1.5 px-3 rounded text-white bg-gray-600"
                >
                    Go Back
                </button>
            </VeeForm>
        </div>
    </div>
</template>
