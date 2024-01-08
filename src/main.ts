import '@/assets/style/index.scss'
// import '@/assets/style/iconfont/iconfont.js'
import '//at.alicdn.com/t/c/font_4139643_4ffwne2lqgd.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import debounce from '@/utils/directives/debounce'
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
app.directive('debounce', debounce)
app.use(createPinia())
app.use(MotionPlugin)
app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
