import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/main.less'

import App from './App.vue'
import router from './router'
import { setupPinia } from './plugins/pinia'
import { setupI18n } from './plugins/i18n'
import { setupNprogress } from './plugins/nprogress'

const app = createApp(App)
const head = createHead()

setupPinia(app)
setupI18n(app)
app.use(router)
app.use(head)
setupNprogress(router)

app.mount('#app')
