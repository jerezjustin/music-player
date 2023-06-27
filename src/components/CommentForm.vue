<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import AppAlert from './AppAlert.vue'
import { useUserStore } from '@/stores/user'
import { auth, commentsCollection } from '@/includes/firebase'
import State from '@/enums/State'
import type Comment from '@/interfaces/Comment'

const userStore = useUserStore()

const submitting: Ref<boolean> = ref(false)
const alertComponent = ref()

const schema: Object = {
    comment: 'required|min:3|max:500'
}

const props = defineProps({
    songDocumentId: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['updateSongComments'])

const addComment = async (values: { comment: string }, { resetForm }) => {
    submitting.value = true

    alertComponent.value.setVisibility(true)
    alertComponent.value.setMessage('Please wait, your comment is being submitted.')
    alertComponent.value.setState(State.info)

    let comment: Comment = {
        content: values.comment,
        date_posted: new Date().toString(),
        name: auth.currentUser?.displayName as string,
        song_id: props.songDocumentId,
        user_id: auth.currentUser?.uid as string
    }

    await commentsCollection.add(comment)

    alertComponent.value.setMessage('Your comment was submitted successfully!')
    alertComponent.value.setState(State.sucess)
    submitting.value = false

    resetForm()

    emit('updateSongComments')
}
</script>

<template>
    <VeeForm :validation-schema="schema" @submit="addComment" v-if="userStore.userLoggedIn">
        <AppAlert ref="alertComponent" />

        <VeeField
            name="comment"
            type="text"
            as="textarea"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
        ></VeeField>

        <ErrorMessage class="text-red-500" name="comment" />

        <button
            :disabled="submitting"
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600 block"
        >
            Submit
        </button>
    </VeeForm>
</template>
