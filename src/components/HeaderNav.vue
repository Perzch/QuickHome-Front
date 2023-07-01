<script lang='ts' setup>
import {onBeforeUnmount, onMounted, ref} from "vue";

const headerTracker = ref(<HTMLElement>{})
const header = ref(<HTMLElement>{})
const drawer = ref(false)
let observer:IntersectionObserver;
onMounted(() => {
    observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            header.value.classList.toggle("shadow-sm", !entry.isIntersecting)
            header.value.classList.toggle("bg-white", !entry.isIntersecting)
        })
    })
    observer.observe(headerTracker.value)
})
onBeforeUnmount(() => {
    observer.unobserve(headerTracker.value)
})
const showDraw = () => {
    drawer.value = !drawer.value
}
</script>
<template>
    <div>
        <div class="header-tracker" ref="headerTracker"></div>
        <header class="header" ref="header">
            <div class="h-full">
                <RouterLink to="/" class="header-logo"><img src="../assets/logo/text.png" alt="QuickHome"/></RouterLink>
            </div>
            <ul class="router-list">
                <li><router-link to="/">客房和套房</router-link></li>
                <li><router-link to="/">预订</router-link></li>
                <li><router-link to="/">入住</router-link></li>
            </ul>
            <div class="flex gap-2 items-center">
                <router-link to="/" class="font-semibold p-1.5 hover:bg-primary hover:text-white rounded-md">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconfsearch"></use>
                    </svg>
                </router-link>
                <RouterLink to="/auth/1" class="hidden md:block">
                    <el-button type="primary" size="large" class="login-button">登录<el-icon><Right /></el-icon></el-button>
                </RouterLink>
                <p class="hover:bg-primary hover:text-white p-2 rounded-md text-xl md:hidden" @click="showDraw">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconfmenu"></use>
                    </svg>
                </p>
            </div>
        </header>
        <el-drawer
            v-model="drawer"
            title="I am the title"
            direction="ttb"
            size="100%"
        >
            <template #header>
                <div class="h-16 flex items-center justify-between">
                    <router-link to="/" class="-m-1.5 p-1.5 h-full">
                        <img class="h-full w-auto" src="../assets/logo.svg" alt="QuickHome">
                    </router-link>
                </div>
            </template>
            <div class="drawer-main">
                <div class="drawer-router-list">
                    <router-link to="/" href="#" class="router-item">客房与套房</router-link>
                    <router-link to="/" href="#" class="router-item">预约</router-link>
                    <router-link to="/" href="#" class="router-item">入住</router-link>
                </div>
                <div class="py-6">
                    <RouterLink to="/auth/1">
                        <el-button type="primary" size="large" class="login-button">登录<el-icon><Right /></el-icon></el-button>
                    </RouterLink>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<style lang='scss' scoped>
    header.header {
        @apply flex justify-between items-center h-16 px-20 shadow-sm w-full z-40 fixed;
        ul.router-list {
            @apply flex gap-10 items-center;
            @apply hidden md:flex;
            li {
                @apply text-gray-500 text-base;
                a {
                    @apply p-2 rounded-sm;
                    @apply hover:text-primary hover:bg-white hover:shadow-inner;
                }
            }
        }
        .header-logo {
            @apply h-full flex items-center;
            img {
                @apply h-2/3 object-contain;
            }
        }
    }
    .drawer-main {
        @apply flow-root -mb-6 divide-y divide-gray-500/10;
        .drawer-router-list {
            @apply space-y-2 py-6;
            .router-item {
                @apply -mx-3 block rounded-lg px-3 py-2 text-xl font-semibold leading-7 text-gray-900 hover:bg-gray-50;
            }
        }
    }
    //登录按钮悬浮动画
    :deep(.login-button) {
        span {
            @apply items-center;
        }
        &:hover span .el-icon{
            @apply translate-x-2;
        }
    }
    :deep(.el-drawer__close-btn) {
        @apply p-2 hover:bg-primary hover:text-white rounded-md;
        i {
            @apply text-inherit;
        }
    }
</style>