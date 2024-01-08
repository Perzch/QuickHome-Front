<script setup lang="ts">
import type {HomeDevice} from "@/types";

defineProps<{
  device: HomeDevice
}>()
</script>

<template>
  <el-popover
      placement="bottom-start"
      trigger="hover"
      width="fit-content"
      v-bind="$attrs"
      class="popover__device"
  >
    <template #reference>
      <el-button>{{device.deviceName}}</el-button>
    </template>
    <template #default>
      <p class="popover__device__name">{{device.deviceName}}</p>
      <p class="popover__device__price">价格:￥{{device.price.toFixed(2)}}</p>
      <p class="popover__device__brand">品牌:{{device.brand}}</p>
    </template>
  </el-popover>
</template>

<style scoped lang="scss">
.popover__device {
  &__name {
    @apply text-lg text-primary;
  }
  &__price {
    @apply text-sm text-gray-500;
  }
  &__brand {
    @apply text-sm text-gray-500;
  }
}
</style>
