<script lang="ts" setup>
import { useGlobalizationStore } from '@/stores';
const { searchInfo,search,validateCheckinDate,validateCheckoutDate,disabledCheckinDate,disabledCheckoutDate } = useGlobalizationStore()
</script>
<template>
    <el-form class="form-box" label-width="auto" label-position="top" size="large">
        <el-form-item>
            <template #label>目的地</template>
            <el-input v-model="searchInfo.destination" placeholder="目的地" clearable />
        </el-form-item>
        <el-form-item>
            <template #label>入住日期</template>
            <el-date-picker
                    v-model="searchInfo.beginDate"
                    type="date"
                    placeholder="入住日期"
                    class="date-picker"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                    :disabled-date="disabledCheckinDate"
                    @change="validateCheckinDate"
            />
        </el-form-item>
        <el-form-item>
            <template #label>退房日期</template>
            <el-date-picker
                    v-model="searchInfo.endDate"
                    type="date"
                    placeholder="退房日期"
                    class="date-picker"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                    :disabled-date="disabledCheckoutDate"
                    @change="validateCheckoutDate"
            />
        </el-form-item>
        <el-form-item>
            <template #label>房间数量</template>
            <el-input-number v-model="searchInfo.roomCount" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item>
            <template #label>人数</template>
            <el-input-number v-model="searchInfo.personCount" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item>
            <button class="font-semibold p-2 hover:bg-primary hover:text-white rounded-md flex items-center gap-1" @click="search">
                <span>搜索</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconfsearch"></use>
                </svg>
            </button>
        </el-form-item>
    </el-form>
</template>
<style lang="scss" scoped>
.form-box {
  @apply p-4 flex-wrap inline-flex items-center justify-center gap-0 bg-gray-100 shadow-lg rounded-md;
  // 响应式调整
  @apply sm:gap-4 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4;
  .el-select {
    // 去除聚焦时的边框
    --el-select-input-focus-border-color: transparent;
    --el-border-color-hover: transparent;
  }
  :deep(.el-form-item) {
    @apply flex flex-col;
    // 响应式调整宽度
    @apply w-full sm:w-auto md:w-auto lg:w-auto xl:w-auto 2xl:w-auto;
    // 响应式调整
    @apply items-center sm:items-start md:items-start lg:items-start xl:items-start 2xl:items-start;
  }
}
.error-input {
    :deep(.el-input__wrapper) {
        border-color: #ee4266;
    }
}
.pass-input {
    :deep(.el-input__wrapper) {
        border-color: #0ead69;
    }
}
</style>