import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import pinia from './stores/index'
import Vant from 'vant'
import 'vant/lib/index.css'

import 'normalize.css'
import '@/assets/css/index.css'

createApp(App).use(router).use(pinia).use(Vant).mount('#app')
