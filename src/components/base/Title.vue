<template>
    <p><slot /></p>
</template>

<style lang="scss" scoped>
p{
  @apply relative bg-transparent drop-shadow-2xl text-2xl mb-4 w-fit;
  @apply after:w-full after:h-2 after:absolute after:left-0 after:bottom-1 after:-z-1 after:backdrop-blur-md;
}
</style>