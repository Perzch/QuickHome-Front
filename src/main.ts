import './assets/style/index.scss'
import './utils/scroll-timeline.js'
import 'https://at.alicdn.com/t/c/font_4139643_3poesq0yetf.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//@ts-ignore
import { MotionPlugin } from '@vueuse/motion'

// @ts-ignore
import App from "@/App.vue";

import router from './router'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// @ts-ignore
app.component('baseTitle', () => import('@/components/base/Title.vue'))
app.use(createPinia())
app.use(MotionPlugin)
app.use(router)

app.mount('#app')
