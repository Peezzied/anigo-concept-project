import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './lib/leafletSetup'
import { createPinia } from 'pinia'


const app = createApp(App)

app
  .use(router)
  .use(createPinia())

app.mount('#app')
