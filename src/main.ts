import '@/assets/style/index.scss'
import '@/assets/style/iconfont/iconfont.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//@ts-ignore
import { MotionPlugin } from '@vueuse/motion'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

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
app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
