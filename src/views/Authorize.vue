<script lang="ts" setup>
import {ref, shallowRef, computed} from "vue";
import type {User, UserVerify} from "@/types";
import {useRoute, useRouter} from "vue-router";
import {encrypt} from "@/utils/encryption";
//@ts-ignore
import type {FormInstance, FormRules} from "element-plus";
import {login as sendLogin, loginByPhone, registerByPhone as sendRegister} from "../api/user/user";
import { getPhone as getCaptcha } from '@/api/method/method'
import {useGlobalStore} from "@/stores";
import {getUserInfo} from "@/api/user/info";
type Error = {
  userInput: boolean,
  userPwd: boolean,
  repeatPassword: boolean,
  captcha: boolean
}
const route = useRoute()
const router = useRouter()
const form = shallowRef(<FormInstance>{})
const select = ref('')
const captcha = ref('')
const captchaText = ref(<string | number>'获取验证码')
const type = ref(route.params.type);
const pass = ref(false);
const user = ref(<UserVerify>{});
const error = ref(<Error>{});
const rules = ref<FormRules>({
  userInput: [
    { required: true, message: "请输入账号", trigger: 'blur'},
    {
      validator: (rule:any, value:any, callback:any) => {
        if (/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
          select.value = 'userPhone'
        } else if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(value)) {
          select.value = 'userEmail'
        } else {
          select.value = 'userAccount'
        }
        callback()
      },
      trigger: 'blur',
    }
  ],
  userPwd: [
    {required: true, message: "请输入密码", trigger: 'blur'},
    {min: 6, max: 18, message: "密码的长度在6-18位", trigger: "blur"}
  ],
  repeatPassword: [
    {required: true, message: "请输入确认密码", trigger: 'blur'},
    {min: 6, max: 18, message: "确认密码的长度在6-18位", trigger: "blur"},
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== user.value.userPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ],
  captcha: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== captcha.value) {
          callback(new Error('验证码错误!'));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ]
})
/**
 * @description: 切换登录/注册
 */
const changeType = () => {
  type.value = type.value === '1' ? '0' : '1'
  router.push({path: `/auth/${type.value}`})
  form.value.clearValidate()
  error.value = <Error>{}
}
/**
 * @description: 表单验证
 * @param prop 需要验证的字段
 * @param isValid 是否通过验证
 * @param message 错误信息
 */
const formValidate = (prop: string, isValid: boolean, message: string) => {
  error.value[prop] = !isValid
}
/**
 * @description: 发送验证码
 */
const sendCaptcha = async () => {
  await form.value.validateField('userInput')
  captcha.value = (await getCaptcha(user.value.userInput)).data;
//   做读秒效果
  let time = 60
  const timer = setInterval(() => {
    time--
    captchaText.value = time
    if(time === 0) {
      clearInterval(timer)
      captchaText.value = '获取验证码'
    }
  },1000)
}
/**
 * @description 注册
 */
const register = async () => {
  await form.value.validate()
  //TODO: 注册,需要加密
  // 暂时只有手机号注册
  await form.value.validateField(['userInput', 'captcha', 'userPwd', 'repeatPassword'])
  const tmp = {
    [select.value]: user.value.userInput,
    userPwd: encrypt(user.value.userPwd || '')
  }
  const res =  await sendRegister(tmp)
  localStorage.setItem('userId',res.data.toString())
  ElMessage.success('注册成功!')
  changeType()
}
/**
 * @description 登录
 */
const login = async () => {
  if(pass.value) {
  //   免密登录
    console.log('1')
    await form.value .validateField(['userInput', 'captcha'])
    const {data} = await loginByPhone({
      userPhone: user.value.userInput
    })
    localStorage.setItem('token',data.token)
    localStorage.setItem('userId',data.userId)
  } else {
    console.log(0)
    await form.value.validateField(['userInput', 'userPwd'])
    const tmp:User = {
      [select.value]: user.value.userInput,
      userPwd: encrypt(user.value.userPwd || '')
    }
    const {data} = (await sendLogin(tmp))
    localStorage.setItem('token',data.token)
    localStorage.setItem('userId',data.userId.toString())
  }
  const {data} = await getUserInfo(localStorage.getItem('userId') as any)
  localStorage.setItem('userInfo', data)
  ElMessage.success('登录成功!')

  router.push({path: '/'})
}
</script>
<template>
  <div class="warp">
    <div class="box">
      <router-link to="/"><img src="../assets/logo/logo-text.png" class="h-24 object-contain" alt="QuickHome">
      </router-link>
      <div v-auto-animate>
          <p class="title" v-if="type === '1'">登录</p>
          <p class="title" v-else>注册</p>
          <p class="change-type-text" v-if="type === '1'">新用户?
            <el-text @click="changeType">注册</el-text>
          </p>
          <p class="change-type-text" v-else>已有账户?
            <el-text @click="changeType">登录</el-text>
          </p>
      </div>
      <el-form class="form-box" label-width="auto" label-position="top" size="large" :rules="rules" :model="user"
               hide-required-asterisk @validate="formValidate" ref="form">
        <el-form-item prop="userInput">
          <template #label>账号</template>
          <el-input v-model="user.userInput" placeholder="账号/邮箱/手机号" clearable
                    :class="{'error-input':error.userInput, 'pass-input':error.userInput === false}">
            <template #suffix>
              <el-button type="primary" size="small" @click="sendCaptcha" :disabled="captchaText !== '获取验证码'" v-if="['userPhone','userEmail'].includes(select) && pass">
                {{ captchaText }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <transition mode="out-in">
          <el-form-item prop="captcha" v-if="pass || type === '0'">
            <template #label>验证码</template>
            <el-input v-model="user.captcha" placeholder="验证码" clearable
                      :class="{'error-input':error.captcha, 'pass-input':error.captcha === false}">
            </el-input>
          </el-form-item>
        </transition>
        <transition mode="out-in">
          <el-form-item prop="userPwd" v-if="!pass || type === '0'">
            <template #label>密码</template>
            <el-input v-model="user.userPwd" placeholder="密码" type="password" show-password clearable
                      :class="{'error-input':error.userPwd, 'pass-input':error.userPwd === false}"/>
          </el-form-item>
        </transition>
        <transition mode="out-in">
          <el-form-item prop="repeatPassword" v-if="type === '0'">
            <template #label>确认密码</template>
            <el-input v-model="user.repeatPassword" placeholder="确认密码" type="password" show-password clearable
                      :class="{'error-input':error.repeatPassword, 'pass-input':error.repeatPassword === false}"/>
          </el-form-item>
        </transition>
      </el-form>
      <div class="w-full flex flex-col">
        <el-button type="primary" size="large" @click="type === '1'?login():register()">
          {{ type === '1' ? '登录' : '注册' }}
        </el-button>
      </div>
      <div class="w-fit" v-if="type === '1'">
        <el-text class="cursor-pointer" @click="pass = !pass">{{pass ? '密码登录' : '免密登录'}}</el-text>
      </div>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.warp {
  @apply bg-no-repeat bg-cover h-screen w-screen flex items-center;
  // 响应式调整
  @apply p-4 sm:pr-4 md:pr-10 xl:pr-32 2xl:pr-20;
  @apply justify-center sm:justify-end md:justify-end lg:justify-end xl:justify-end 2xl:justify-end;
  background-image: url('https://picsum.photos/1280/1080');

  .box {
    @apply bg-white flex flex-col gap-4 overflow-hidden;
    // 响应式调整
    @apply p-10 sm:p-10 md:p-14 lg:p-14 xl:p-14 2xl:py-14 2xl:px-14;
    @apply w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-1/2 2xl:w-1/3;
    //@apply h-2/3 sm:h-2/3 md:h-2/3 lg:h-2/3 xl:h-2/3 2xl:h-2/3;
    .title {
      @apply text-xl font-bold;
    }

    .change-type-text {
      @apply text-gray-500;
      span {
        @apply text-green-800 cursor-pointer;
        @apply hover:text-green-600 hover:underline;
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
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  translate: 100%;
}
</style>
