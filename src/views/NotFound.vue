<template>
    <div class="wrap">
        <h2>404</h2>
        <h1>Page not found</h1>
        <p>Sorry,we couldn't find the page you're looking for.</p>
        <RouterLink to="/" class="button">←Back to home</RouterLink>
    </div>
</template>
<style lang='scss' scoped>
.wrap {
    block-size: 100dvh;
    inline-size: 100%;
    background: url('@/assets/notfound.webp') no-repeat center/cover;
    @apply text-white text-center gap-8 pt-12 px-4;
    @apply sm:pt-16 lg:pt-32 xl:pt-36;
    h2,h1,p {
        @apply py-4;
    }
    h2 {
        @apply font-bold;
    }
    h1 {
        @apply text-5xl font-bold tracking-tight;
        @apply sm:text-6xl lg:text-7xl;
    }
    p {
        @apply text-gray-200;
    }
    .button {
        @apply font-bold hover:underline;
    }
}
</style>
