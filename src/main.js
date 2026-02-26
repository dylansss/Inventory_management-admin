import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.scss'

import BaseButton from '@/components/button/baseButton.vue'
import Pagination from '@/components/Pagination/index.vue'
let app = createApp(App)
app
  .component("BaseButton", BaseButton)
  .component("Pagination", Pagination)
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .mount('#app')