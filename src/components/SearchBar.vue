<script lang="ts" setup>
import dayjs from "dayjs";
import {useSearchStore} from "@/stores/search";
const { searchInfo,toSearch } = useSearchStore()

/**
 * @function disabledCheckoutDate
 * @description This function checks if the checkout date is valid.
 * @param {string} time - The checkout date.
 * @returns {boolean} Returns true if the checkout date is invalid, false otherwise.
 */
const disabledCheckoutDate = (time:string): boolean => {
  const day = dayjs(time)
  // 三个条件: 1. 退房日期小于入住日期 2. 退房日期大于入住日期+180天 3. 退房日期小于当前日期
  const arr = [day.isBefore(dayjs(searchInfo.beginDate),'day'),day.isAfter(dayjs(searchInfo.beginDate).add(180,'day')),day.isBefore(dayjs().subtract(1,'day'),'day')]
  return arr.some(item => item)
}

/**
 * @function disabledCheckinDate
 * @description This function checks if the checkin date is valid.
 * @param {string} time - The checkin date.
 * @returns {boolean} Returns true if the checkin date is invalid, false otherwise.
 */
const disabledCheckinDate = (time:string): boolean => {
  const day = dayjs(time)
  // 三个条件: 1. 入住日期小于当前日期-1天 2. 入住日期大于退房日期
  const arr = [day.isBefore(dayjs().subtract(1,'day'),'day'),searchInfo.endDate && day.isAfter(dayjs(searchInfo.endDate))]
  return arr.some(item => item)
}

/**
 * @function validateCheckinDate
 * @description This function validates the checkin date.
 */
const validateCheckinDate = () => {
  if(searchInfo?.beginDate && searchInfo?.endDate) {
    if(dayjs(searchInfo?.endDate).isBefore(dayjs(searchInfo?.beginDate))) {
      ElMessage.warning("入住日期必须大于等于当前日期");
      searchInfo.beginDate = ''
    }
  }
}

/**
 * @function validateCheckoutDate
 * @description This function validates the checkout date.
 */
const validateCheckoutDate = () => {
  if(searchInfo?.beginDate && searchInfo?.endDate) {
    if(dayjs(searchInfo?.endDate).isBefore(dayjs(searchInfo?.beginDate))) {
      ElMessage.warning('退房日期必须大于等于当前日期');
      searchInfo.endDate = ''
    }
  }
}
</script>
<template>
    <el-form class="form-box" label-width="auto" label-position="top" size="large">
      <el-row >
        <el-col :span="22">
          <el-form-item class="destination" label="目的地" label-width="100%">
              <el-input v-model="searchInfo.address" placeholder="目的地" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <button class="font-semibold p-2 hover:bg-primary hover:text-white rounded-md flex items-center gap-1 w-fit" @click.prevent="toSearch">
              <span>搜索</span>
              <svg class="icon">
                <use xlink:href="#iconfsearch"></use>
              </svg>
            </button>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="search-condition">
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
            <el-input-number v-model="searchInfo.roomCount" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item>
            <template #label>人数</template>
            <el-input-number v-model="searchInfo.personCount" :min="1"></el-input-number>
        </el-form-item>
      </div>
    </el-form>
</template>
<style lang="scss" scoped>
.form-box {
  @apply p-4 bg-gray-100 shadow-lg rounded-md;
  // 响应式调整
  @apply sm:gap-4 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4;
  .search-condition {
    @apply flex-1 items-center justify-center flex flex-wrap gap-4;
  }
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
    &.destination {
      @apply w-full items-stretch;
    }
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
