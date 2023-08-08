import './assets/base.css'
import './assets/main.css'

import { createApp, type App as AppVue } from 'vue'
import { createPinia } from 'pinia'

import VeeValidate from './includes/validation'
import { auth } from './includes/firebase'
import Icon from './directives/icon'
import i18n from './includes/i18n'
import { registerSW } from 'virtual:pwa-register'

import App from './App.vue'
import router from './router'

registerSW({ inmedita: true })

let app: AppVue

auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)

        app.use(createPinia())
        app.use(router)
        app.use(VeeValidate)
        app.use(i18n)

        app.directive('icon', Icon)

        app.mount('#app')
    }
})
