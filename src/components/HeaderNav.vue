<script lang='ts' setup>

</script>
<template>
    <div class="wrap" v-prlx.background="{ speed: 0.07 }">
        <header class="header">
            <div class="h-full">
                <RouterLink to="/" class="header-logo"><img src="../assets/melly.svg" alt="QuickHome"/></RouterLink>
            </div>
            <ul class="router-list">
                <li><el-link :underline="false">客房和套房</el-link></li>
            </ul>
            <div class="flex gap-2 items-center">
                <RouterLink to="/auth">
                    <el-button type="primary" class="login-button">登录<el-icon><Right /></el-icon></el-button>
                </RouterLink>
            </div>
        </header>
    </div>
</template>
<style lang='scss' scoped>
div.wrap {
    @apply bg-fixed h-screen;
    header.header {
        @apply flex justify-between items-center h-16 px-20;
        ul.router-list {
            @apply flex gap-10 items-center;
        }
        //登录按钮悬浮动画
        // :deep(.login-button) {
        //     &:hover {
        //         span {
        //             @apply gap-2;
        //         }
        //     }
        // }
        .header-logo {
            @apply mix-blend-color-burn h-full block;
            img {
                @apply h-full;
            }
        }
    }
}
</style>