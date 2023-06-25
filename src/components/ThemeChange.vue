<script lang='ts' setup>
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
const changeTheme = () => {
    toggleDark()
    console.log(isDark.value);
}
</script>
<template>
    <div>
        <el-button type="primary" @click="changeTheme">切换</el-button>
    </div>
</template>
<style lang='scss' scoped></style>