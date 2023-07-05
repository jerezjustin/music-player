import './assets/base.css'
import './assets/main.css'

import { createApp, type App as AppVue } from 'vue'
import { createPinia } from 'pinia'

import VeeValidate from './includes/validation'
import { auth } from './includes/firebase'
import Icon from './directives/icon'

import App from './App.vue'
import router from './router'

let app: AppVue

auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)

        app.use(createPinia())
        app.use(router)
        app.use(VeeValidate)

        app.directive('icon', Icon)

        app.mount('#app')
    }
})
