<script lang="ts" setup>
import {computed, markRaw, ref, shallowRef} from "vue";
import type {User} from "@/types";
import {useRoute, useRouter} from "vue-router";
import type {FormInstance, FormItemProp, FormRules, FormValidateCallback} from "element-plus";
import {ElEmpty} from "element-plus";
import {useTitle} from "@vueuse/core";
import {getCaptcha} from "@/request";

const route = useRoute()
const router = useRouter()
const form = shallowRef(<FormInstance>{})
const captcha = ref('')
const captchaText = ref(<string | number>'获取验证码')
const phoneLogin = computed(() => {
    return captcha.value && type.value === '1'
})
const type = ref(route.params.type);
useTitle(computed(() => {
    return (type.value === '1'?'登录':'注册') + ' / QuickHome'
}))
const user = ref(<User>{});
const error = ref(<{
    userPhone: boolean,
    userPwd: boolean,
    repeatPassword: boolean,
    captcha: boolean
}>{});
const rules = ref<FormRules>({
    userPhone: [
        {required:true, message: "请输入手机号", trigger: 'blur'},
        {pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/ ,message:"手机号格式错误!",trigger:"blur"}
    ],
    userPwd: [
        {required:true, message: "请输入密码", trigger: 'blur'},
        {min:6,max:18,message:"密码的长度在6-18位",trigger:"blur"}
    ],
    repeatPassword: [
        {required:true, message: "请输入确认密码", trigger: 'blur'},
        {min:6,max:18,message:"确认密码的长度在6-18位",trigger:"blur"},
        {validator: (rule, value, callback) => {
                if (value !== user.value.userPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }, trigger: 'blur'}
    ],
    captcha:[
        {required: true, message: '请输入验证码', trigger: 'blur'},
        {validator: (rule, value, callback) => {
                if (value !== captcha.value) {
                    callback(new Error('验证码错误!'));
                } else {
                    callback();
                }
            }, trigger: 'blur'}
    ]
})
const changeType = () => {
    type.value = type.value === '1'?'0':'1'
    router.push({path: `/auth/${type.value}`})
    form.value.clearValidate()
}
const formValidate = (prop: FormItemProp, isValid: boolean, message: string) => {
    error.value[prop] = !isValid
}
const sendCaptcha = async () => {
    await form.value.validateField('userPhone')
    captcha.value = (await getCaptcha(user.value.userPhone)).data;
    captchaText.value = 60
    const interval = setInterval(() => {
        captchaText.value = (Number(captchaText.value) - 1).toString()
        if(captchaText.value === '-1') {
            captchaText.value = '获取验证码'
            clearInterval(interval)
        }
    },1000)
}
const register = async () => {
    await form.value.validate()
    //TODO: 注册
    console.log("register")
}
const login = async () => {
    if(phoneLogin.value) {
        await form.value.validateField(['userPhone','captcha'])
    } else
        await form.value.validateField(['userPhone','password'])
    //TODO: 登录
    console.log("login")
}
</script>
<template>
    <div class="warp">
            <div class="box">
                <img src="../assets/logo.svg" class="h-24" alt="QuickHome">
                <p class="title">{{type === '1'?'登录':'注册'}}</p>
                <p class="change-type-text">{{type === '1'?'新用户?':'已有账户?'}}<el-text @click="changeType">{{type === '1'?'注册':'登录'}}</el-text></p>
                <el-form class="form-box" label-width="auto" label-position="top" size="large" :rules="rules" :model="user" hide-required-asterisk @validate="formValidate" ref="form">
                    <el-form-item prop="userPhone">
                        <template #label>手机号</template>
                        <el-input v-model="user.userPhone" placeholder="手机号" clearable  :class="{'error-input':error.userPhone, 'pass-input':error.userPhone === false}">
                            <template #suffix>
                                <el-button type="primary" size="small" @click="sendCaptcha" :disabled="captchaText !== '获取验证码'">{{captchaText}}</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="captcha" v-show="captcha.trim()">
                        <template #label>验证码</template>
                        <el-input v-model="user.captcha" placeholder="验证码" clearable  :class="{'error-input':error.captcha, 'pass-input':error.captcha === false}">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="userPwd" v-show="!phoneLogin">
                        <template #label>密码</template>
                        <el-input v-model="user.userPwd" placeholder="密码" type="password" show-password clearable  :class="{'error-input':error.userPwd, 'pass-input':error.userPwd === false}" />
                    </el-form-item>
                    <el-form-item prop="repeatPassword" v-show="type === '0'">
                        <template #label>确认密码</template>
                        <el-input v-model="user.repeatPassword" placeholder="确认密码" type="password" show-password clearable  :class="{'error-input':error.repeatPassword, 'pass-input':error.repeatPassword === false}" />
                    </el-form-item>
                </el-form>
                <div class="w-full items-center flex justify-end">
                    <el-button type="primary" size="large" @click="register" v-if="type==='0'">注册</el-button>
                    <el-button type="primary" size="large" @click="login" v-else>登录</el-button>
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
        @apply bg-white flex flex-col gap-4;
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
</style>