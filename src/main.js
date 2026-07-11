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
  config: { id: 'G-538GDEBMV5' }
}, router)

app.mount('#app')