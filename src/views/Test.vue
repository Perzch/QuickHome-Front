<script lang="ts" setup>
import {decrypt,encrypt} from "@/utils/encryption";
const str = '123456'
console.log(encrypt(str))
console.log(decrypt(encrypt(str)))
</script>
<template>
  <div>

  </div>
</template>
<style lang='scss' scoped>
</style>