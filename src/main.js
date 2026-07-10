import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueGtag from 'vue-gtag'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueGtag, {
  config: { id: 'GTM-M5ZRQ4QQ' }
}, router)

app.mount('#app')