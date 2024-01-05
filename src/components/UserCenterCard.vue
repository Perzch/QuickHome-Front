<script setup lang="ts">
import {useRouter} from "vue-router";
import {type DefineComponent, onMounted, ref, watch} from "vue";

const props = defineProps<{
  title: string
  placeholder: string
  link: string,
  path: string,
  icon: unknown
}>()
const card = ref()
const router = useRouter()
const to = () => {
  router.push(`/userSettings/${props.path}`)
}
</script>

<template>
  <div class="card" ref="card" @click="to">
    <div class="left">
            <span class="main-icon">
              <el-icon>
                <component :is="icon"/>
              </el-icon>
            </span>
    </div>
    <div class="right">
      <p class="title">{{title}}</p>
      <p class="placeholder">{{placeholder}}</p>
      <p class="card-link">{{link}}</p>
      <span class="detail-icon">
              <el-icon>
                <Right />
              </el-icon>
            </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  @apply overflow-hidden relative flex gap-2 cursor-pointer p-4 rounded-md border;
  .right {
    @apply flex flex-col gap-2 flex-1;
    .card-link {
      @apply text-success text-sm;
    }
  }
  .placeholder {
    @apply text-gray-500;
  }
  .title {
    @apply font-bold text-xl;
  }
  .main-icon {
    @apply w-fit flex items-center justify-center p-4 bg-info rounded-full;
  }
  .detail-icon {
    @apply self-end w-fit flex items-center p-1 bg-info rounded-md overflow-hidden;
  }
  &:hover {
    @apply border-gray-300 shadow-inner;
    .placeholder {
      @apply text-black;
    }
    .card-link {
      @apply underline;
    }
    .main-icon {
      @apply bg-success shadow-inner text-white;
    }
    .detail-icon {
      @apply bg-success shadow-inner text-white
    }
    .detail-icon i {
      animation: -right-leave-left-enter 0.5s ease;
    }
  }

}
</style>
