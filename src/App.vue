<template>
  <Suspense>
    <el-config-provider :locale="zhCn" :size="'large'">
      <router-view />
    </el-config-provider>
  </Suspense>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
