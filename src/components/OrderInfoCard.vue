<script setup lang="ts">

import {Avatar} from "@element-plus/icons-vue";
import {ref} from "vue";
import type {Identity} from "@/types";
import {useGlobalStore} from "@/stores";

const props = defineProps<{
  item: Identity
}>()
const emits = defineEmits(['save'])

const { userInfo } = useGlobalStore()
const edit = ref(false)
const form = ref<Identity>({
  userId: userInfo.userId
} as Identity)
const formRef = ref()
const rules = {
  IDCardName: [
    {required: true, message: '请输入姓名', trigger: 'blur'}
  ],
  IDCardPhoneNumber: [
    {required: true, message: '请输入手机号码', trigger: 'blur'},
    {pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'change'}
  ],
  IDCardNumber: [
    {required: true, message: '请输入身份证号码', trigger: 'blur'},
    {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号码', trigger: 'change'}
  ]
}

const submit = async () => {
  await formRef.value.validate()
  emits('save', form.value)
  edit.value = false
}

const cancel = async () => {
  edit.value = false
}

const editIdentity = () => {
  edit.value = true
}
// 脱敏函数
const desensitization = (str: string) => {
  return str?.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2")
}
</script>

<template>

  <el-form :model="form" :rules="rules" ref="formRef" class="card-item">
    <div class="card-item__title">
      <div class="card-item__name">
        <span class="flex items-center mr-3"><el-icon><Avatar/></el-icon></span>
        <transition name="fade" mode="out-in">
          <el-form-item class="mt-4" prop="IDCardName" v-if="edit">
            <el-input v-model="form.IDCardName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <span v-else>{{item.IDCardName || '请点击编辑'}}</span>
        </transition>
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="edit">
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button plain @click="cancel">取消</el-button>
        </div>
        <div v-else>
          <el-button type="success" plain @click="editIdentity">编辑</el-button>
        </div>
      </transition>
    </div>
    <div class="card-item__number">
      <span class="card-item__label">身份证</span>
      <transition name="fade" mode="out-in">
        <el-form-item class="card-item__text" prop="IDCardNumber" v-if="edit">
          <el-input v-model="form.IDCardNumber" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <span class="card-item__text" v-else>{{desensitization(item.IDCardNumber) || '请点击编辑'}}</span>
      </transition>
    </div>
    <div class="card-item__phone">
      <span class="card-item__label">手机</span>
      <transition name="fade" mode="out-in">
        <el-form-item class="card-item__text" prop="IDCardPhoneNumber" v-if="edit">
          <el-input type="tel" v-model="form.IDCardPhoneNumber" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <span class="card-item__text" v-else>{{item.IDCardPhoneNumber || '请点击编辑'}}</span>
      </transition>
    </div>
  </el-form>
</template>

<style scoped lang="scss">

.card-item {
  @apply flex flex-col gap-2 p-2 rounded-md border shadow-md;
  &:hover {
    @apply shadow-inner;
  }
  .card-item__title {
    @apply flex items-center justify-between;
    .card-item__name {
      @apply flex items-center;
    }
  }
  .card-item__number,.card-item__phone {
    @apply grid grid-cols-5;
  }
  .card-item__label {
    @apply col-span-1;
  }
  .card-item__text {
    @apply col-span-4 text-text;
  }
}
</style>
