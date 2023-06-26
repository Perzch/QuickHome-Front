<script lang="ts" setup>
defineProps({
    load: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <transition>
        <div class="warp" v-if="load">
            <svg xmlns="http://www.w3.org/2000/svg" width="338.2316160400901" height="229.27500000000003" viewBox="0 0 270 183.02325112228002" class="css-1j8o68f">
                <g id="SvgjsG2522" transform="matrix(1.3523513241016758,0,0,1.3523513241016758,31.64562766014084,91.07335787826774)" fill="#fff">
                    <path d="M35.996 40 l-5.8398 0 l-1.8555 -21.27 l-7.1484 21.27 l-3.7891 0 l-7.1484 -21.27 l-1.875 21.27 l-5.8594 0 l2.3633 -28.223 l8.3594 0 l6.0156 17.715 l6.0938 -17.715 l8.3594 0 z M64.268046875 16.934 l-10.469 0 l0 6.4063 l9.2773 0 l0 5.0977 l-9.2773 0 l0 6.3867 l10.469 0 l0 5.1758 l-16.367 0 l0 -28.223 l16.367 0 l0 5.1563 z M92.441875 16.934 l-10.469 0 l0 6.4063 l9.2773 0 l0 5.0977 l-9.2773 0 l0 6.3867 l10.469 0 l0 5.1758 l-16.367 0 l0 -28.223 l16.367 0 l0 5.1563 z M110.107403125 34.8242 l8.8477 0 l0 5.1758 l-14.707 0 l0 -28.223 l5.8594 0 l0 23.047 z M150.370875 11.777000000000001 l-9.2773 14.707 l0 13.516 l-5.8789 0 l0 -13.379 l-9.3359 -14.844 l6.4844 0 l5.7617 9.6094 l5.7813 -9.6094 l6.4648 0 z"></path>
                </g>
            </svg>
        </div>
    </transition>
</template>

<style scoped lang="scss">
  .warp {
      @apply flex justify-center items-center w-full h-full fixed top-0 left-0 bg-black bg-opacity-60 z-40;
      svg {
          @apply relative animate-pulse;
      }
  }
</style>