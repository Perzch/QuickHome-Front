<script lang="ts" setup>
import dayjs from "dayjs";
import {ref} from "vue";
import type {HomeSearchInfo} from "@/types";

const props = defineProps<{
  all?: boolean
  modelValue?: HomeSearchInfo
}>()
const emit = defineEmits(['update:modelValue','search'])

const form = ref<HomeSearchInfo>({
  ...props.modelValue
} as any)
const deviceList = ref([])
const homeTypeList = ref([])


const timeRange = ref([
    dayjs().format('YYYY-MM-DD'),
  dayjs().add(1,'day').format('YYYY-MM-DD')
])

const disabledDate = (time:string): boolean => {
  const day = dayjs(time)
  // 当天前一天的日期禁用
  return day.isBefore(dayjs().subtract(1,'day'),'day')
}

const handleSearch = () => {
  form.value.beginDate = timeRange.value[0]
  form.value.endDate = timeRange.value[1]
  if(form.value.personCount && form.value.roomCount) {
    form.value.maxPeople = Math.ceil(form.value.personCount / form.value.roomCount)
  }
  form.value.device = deviceList.value.join(',')
  form.value.homeType = homeTypeList.value.join(',')
  emit('update:modelValue',form.value)
  emit('search')
}
</script>
<template>
    <el-form class="form-box" :class="{ 'all':all }" label-width="auto" label-position="top" size="large">
        <el-form-item class="address" label="目的地" label-width="100%">
            <el-input v-model="form.address" placeholder="目的地" clearable />
        </el-form-item>
        <el-form-item class="time-range" v-if="all">
            <template #label>入住日期</template>
            <el-date-picker
                v-model="timeRange"
                type="daterange"
                range-separator="-"
                start-placeholder="入住日期"
                value-format="YYYY-MM-DD"
                end-placeholder="退房日期"
                :clearable="false"
                :disabled-date="disabledDate"
            />
        </el-form-item>
        <el-form-item class="person-count" v-if="all">
            <template #label>人数</template>
            <el-input-number v-model="form.personCount" :min="1"></el-input-number>
        </el-form-item>
      <el-form-item class="execute">
        <button class="font-semibold p-2 hover:bg-primary hover:text-white rounded-md flex items-center gap-1 w-fit whitespace-nowrap" @click.prevent="handleSearch">
          <span>搜索</span>
          <svg class="icon">
            <use xlink:href="#iconfsearch"></use>
          </svg>
        </button>
      </el-form-item>
      <el-form-item class="home-type" v-if="all">
        <template #label>房型</template>
        <el-select multiple v-model="homeTypeList" clearable placeholder="房型" collapse-tags collapse-tags-tooltip :max-collapse-tags="3">
          <el-option v-for="item in ['情侣房','大床房','电竞房']" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="min-rent" v-if="all">
        <template #label>最小价格</template>
        <el-input-number v-model="form.minRent" placeholder="最小价格" :min="50"></el-input-number>
      </el-form-item>
      <el-form-item class="max-rent" v-if="all">
        <template #label>最大价格</template>
        <el-input-number v-model="form.maxRent" placeholder="最大价格" :max="10000"></el-input-number>
      </el-form-item>
      <el-form-item class="device-list" v-if="all">
        <template #label>设备</template>
        <el-select multiple v-model="deviceList" clearable placeholder="设备" collapse-tags collapse-tags-tooltip :max-collapse-tags="3">
          <el-option v-for="item in ['空调','热水器','冰箱','洗衣机']" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="room-count" v-if="all">
        <template #label>房间数量</template>
        <el-input-number v-model="form.roomCount" :min="1" :max="10"></el-input-number>
      </el-form-item>
    </el-form>
</template>
<style lang="scss" scoped>
.form-box {
  @apply p-4 bg-gray-100 shadow-lg rounded-md grid grid-cols-12 items-center w-2/3;
  .address {
    @apply col-span-11;
  }
  .execute {
    @apply col-span-1;
  }
  &.all{
    @apply p-4 bg-transparent grid-cols-12 grid-rows-2 grid gap-4 w-11/12 bg-white border;
    .address {
      @apply col-span-5;
    }
    .time-range {
      @apply col-span-4;
    }
    .room-count,.person-count {
      @apply col-span-2;
    }
    .home-type {
      @apply col-span-3;
    }
    .min-rent,.max-rent {
      @apply col-span-2;
    }
    .device-list {
      @apply col-span-3;
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
