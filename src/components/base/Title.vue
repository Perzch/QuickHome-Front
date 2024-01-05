<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
const p = ref(<HTMLElement>{})
let observer:IntersectionObserver
onMounted(() => {
    observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            p.value.classList.toggle("after:w-0", !entry.isIntersecting)
            p.value.classList.toggle("after:w-full", entry.isIntersecting)
        })
    })
    observer.observe(p.value)
})
onBeforeUnmount(() => {
    observer.unobserve(p.value)
})
</script>

<template>
    <p ref="p"><slot /></p>
</template>

<style lang="scss" scoped>
p{
  @apply relative bg-transparent drop-shadow-2xl text-2xl mb-4 w-fit;
  @apply after:h-2 after:absolute after:left-0 after:bottom-1 after:-z-1 after:backdrop-blur-md after:transition-all after:delay-300;
}
</style>
