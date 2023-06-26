<script lang='ts' setup>
import {onMounted, ref} from "vue";

const headerTracker = ref(<HTMLElement>{})
const header = ref(<HTMLElement>{})
onMounted(() => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            header.value.classList.toggle("shadow-sm", !entry.isIntersecting)
            header.value.classList.toggle("bg-white", !entry.isIntersecting)
        })
    })
    observer.observe(headerTracker.value)
})
</script>
<template>
    <div>
        <div class="header-tracker" ref="headerTracker"></div>
        <header class="header" ref="header">
            <div class="h-full">
                <RouterLink to="/" class="header-logo"><img src="../assets/melly.svg" alt="QuickHome"/></RouterLink>
            </div>
            <ul class="router-list">
                <li><el-link :underline="false">客房和套房</el-link></li>
                <li><el-link :underline="false">预订</el-link></li>
                <li><el-link :underline="false">入住</el-link></li>
            </ul>
            <div class="flex gap-2 items-center">
                <RouterLink to="/auth">
                    <el-button type="primary" text class="login-button">登录<el-icon><Right /></el-icon></el-button>
                </RouterLink>
            </div>
        </header>
    </div>
</template>
<style lang='scss' scoped>
    header.header {
        @apply flex justify-between items-center h-16 px-20 shadow-sm w-full z-40 fixed;
        ul.router-list {
            @apply flex gap-10 items-center;
        }
        //登录按钮悬浮动画
         :deep(.login-button) {
             &:hover span .el-icon{
                 @apply translate-x-2;
             }
         }
        .header-logo {
            @apply h-full block;
            img {
                @apply h-full;
            }
        }
    }
</style>