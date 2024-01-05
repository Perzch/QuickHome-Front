<script lang="ts" setup>
import {createRouter, useRoute, useRouter} from "vue-router";
const router = useRouter()
const route = useRoute()
  console.log(history.length)
const clear = () => {
  // for (let i = 1; i < history.length - 1; i++) {
  //   console.log('back')
  //   router.back()
  // }
  // router.push('/')
  router.go(-1)
  router.replace('/')
}
</script>
<template>
  <div>
    <button @click="clear">点击</button>
  </div>
</template>
<style lang='scss' scoped>
</style>
