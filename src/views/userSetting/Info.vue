<script setup lang="ts">
import {useGlobalStore} from "@/stores";
import {computed, ref} from "vue";
import type {ResponseData, UserInfo} from "@/types";
import {updateUser} from "@/api/user/user";
import {updateUserInfo} from "@/api/user/info";
import dayjs from "dayjs";

const { userInfo } = useGlobalStore()
const loading = ref(false)
const rules = {
  'user.userName': [
    { required: true ,message: '姓名不能为空' }
  ],
  'user.userEmail': [
    { required: true ,message: '邮箱不能为空' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  'user.userPhone': [
    { required: true ,message: '电话不能为空' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的电话号码', trigger: 'blur' }
  ],
  'userInformation.userGender': [
    { required: true ,message: '性别不能为空' }
  ],
  'userInformation.userBirthday': [
    { required: true ,message: '出生日期不能为空' }
  ],
}
const form = ref<UserInfo>(userInfo)
const editAble = ref(false)
const uploadOptions = computed(() => ({
  action: import.meta.env.VITE_BASE_URL + '/upload',
  accept: '.png, .jpeg, .jpg, .git, .webp',
  limit: 1,
  listType: 'picture-card'
}))
const fileList = ref([])
const fileListChange = (res:ResponseData<string>) => {
  form.value.user.userHeadImage = res.data
}

const edit = () => {
  editAble.value = true
}
const cancelEdit = () => {
  editAble.value = false
}

const confirmEdit = async () => {
  loading.value = true
  await updateUser(form.value.user)
  await updateUserInfo(form.value.userInformation)
  loading.value = false
  editAble.value = false
}
</script>

<template>
  <div class="wrap" v-loading="loading">
    <div class="user-info__header">
      <div class="title">
        <h1>个人信息</h1>
        <h3>管理你本人的信息。</h3>
      </div>
      <div v-show="editAble">
        <el-avatar :src="'/' + userInfo.user.userHeadImage" size="large"></el-avatar>
      </div>
    </div>
    <div class="user-info__content">
      <el-form :model="form" :rules="rules"></el-form>
      <div class="user-info__item user-info__account">
        <span class="user-info__item__label">头像</span>
        <div class="user-info__item__main">
          <el-collapse-transition mode="out-in">
            <el-avatar :src="'/' + userInfo.user.userHeadImage" size="large" v-if="!editAble"></el-avatar>
            <el-upload v-bind="uploadOptions" :file-list="fileList" :on-success="fileListChange" v-else>
              <el-icon><Plus/></el-icon>
            </el-upload>
          </el-collapse-transition>
        </div>
      </div>
      <div class="user-info__item user-info__account">
        <span class="user-info__item__label">账号</span>
        <div class="user-info__item__main">
          <span class="user-info__item__text">{{userInfo.user.userAccount}}</span>
        </div>
      </div>
      <div class="user-info__item user-info__name">
        <span class="user-info__item__label">姓名</span>
        <div class="user-info__item__main">
          <el-collapse-transition mode="out-in">
            <el-form-item prop="user.userName" v-if="editAble">
              <el-input v-model="form.user.userName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <span class="user-info__item__text" v-else>{{userInfo.user.userName}}</span>
          </el-collapse-transition>
        </div>
      </div>
      <div class="user-info__item user-info__email">
        <span class="user-info__item__label">邮箱</span>
        <div class="user-info__item__main">
          <el-collapse-transition mode="out-in">
            <el-form-item prop="user.userEmail" v-if="editAble">
              <el-input type="email" v-model="form.user.userEmail" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <span class="user-info__item__text" v-else>{{userInfo.user.userEmail}}</span>
          </el-collapse-transition>
        </div>
      </div>
      <div class="user-info__item user-info__phone">
        <span class="user-info__item__label">电话</span>
        <div class="user-info__item__main">
          <el-collapse-transition mode="out-in">
            <el-form-item prop="user.userPhone" v-if="editAble">
              <el-input type="tel" v-model="form.user.userPhone" placeholder="请输入电话"></el-input>
            </el-form-item>
            <span class="user-info__item__text" v-else="!editAble">{{userInfo.user.userPhone}}</span>
          </el-collapse-transition>
        </div>
      </div>
      <div class="user-info__item user-info__gender">
        <span class="user-info__item__label">性别</span>
        <div class="user-info__item__main">
          <el-collapse-transition mode="out-in">
            <el-form-item prop="userInformation.userGender" v-if="editAble">
              <el-radio-group v-model="form.userInformation.userGender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <span class="user-info__item__text" v-else>{{userInfo.userInformation.userGender}}</span>
          </el-collapse-transition>
        </div>
      </div>
      <div class="user-info__item user-info__birthday">
        <span class="user-info__item__label">出生日期</span>
        <div class="user-info__item__main">
          <el-collapse-transition mode="out-in">
            <el-form-item prop="userInformation.userBirthday" v-if="editAble">
              <el-date-picker
                  v-model="form.userInformation.userBirthday"
                  type="date"
                  placeholder="请选择出生日期"
                  value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
            <span class="user-info__item__text" v-else>{{dayjs(userInfo.userInformation.userBirthday).format("YYYY年MM月DD")}}</span>
          </el-collapse-transition>
        </div>
      </div>
      <div class="user-info__item user-info__signature">
        <span class="user-info__item__label">个性签名</span>
        <div class="user-info__item__main">
          <el-collapse-transition mode="out-in">
            <el-form-item prop="userInformation.userSignature" v-if="editAble">
              <el-input type="textarea" :rows="2" v-model="form.userInformation.userSignature" placeholder="请输入"></el-input>
            </el-form-item>
            <span class="user-info__item__text" v-else>{{userInfo.userInformation.userSignature}}</span>
          </el-collapse-transition>
        </div>
      </div>
      <div class="user-info__item user-info__execute">
        <template v-if="!editAble">
          <el-button type="primary" @click="edit">编辑</el-button>
        </template>
        <template v-else>
          <el-button type="danger" @click="cancelEdit">取消</el-button>
          <el-button type="success" @click="confirmEdit">确定</el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  @apply w-full;
  .user-info__header {
    @apply flex items-center justify-between;
    .title {
      h1 {
        @apply text-2xl font-semibold underline underline-offset-[-2px] decoration-8 decoration-success;
      }
    }
  }
  .user-info__content {
    @apply mt-8 divide-y;
    .user-info__item {
      @apply flex items-center py-2;
      &.user-info__execute {
        @apply flex justify-end;
      }
      .user-info__item__label {
        @apply w-1/4 text-right pr-4;
      }
      .user-info__item__main {
        @apply w-3/4 pl-4 flex items-center;
        .user-info__item__text {
          @apply text-gray-500;
        }
      }
    }
  }
}
</style>
