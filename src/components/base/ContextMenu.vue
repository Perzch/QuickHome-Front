<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "vue";

defineProps({
    contextMenu: {
        type: Array
    }
})
const menu = ref<HTMLElement>()
const slot = ref<HTMLElement>()
const showMenu = e => {
    e.preventDefault()
    // 阻止冒泡
    e.stopPropagation()
    const menus = document.querySelectorAll('.context-menu')
    menus.forEach(m => {
        m.classList.add('hidden')
    })
    menu.value?.classList.replace('h-0','h-auto')
    menu.value?.classList.replace('hidden','inline-flex')
    menu.value!.style.left = e.pageX + 'px'
    menu.value!.style.top = e.pageY + 'px'
}
const hideMenu = () => {
    menu.value?.classList.replace('h-auto','h-0')
    menu.value?.classList.replace('inline-flex','hidden')
}
onMounted(() => {
    slot.value!.addEventListener('contextmenu', showMenu)
    window.addEventListener('click', hideMenu, true)
})
onUnmounted(() => {
    slot.value!.removeEventListener('contextmenu', showMenu)
    window.removeEventListener('click', hideMenu, true)
})
</script>

<template>
  <div>
      <div ref="slot">
          <slot name="target"></slot>
      </div>
      <teleport to="body">
          <div class="context-menu hidden h-0 transition" ref="menu">
              <div v-for="item in contextMenu" :key="item.label" @click="item.action">{{item.label}}</div>
          </div>
      </teleport>
  </div>
</template>

<style scoped lang="scss">
  .context-menu{
    @apply flex-col cursor-pointer fixed shadow;
    & > :nth-child(n) {
      @apply px-4 py-2 bg-white;
      @apply  hover:bg-gray-100;
    }
  }
</style>