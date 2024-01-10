<script setup lang="ts">

import {onMounted, onUnmounted, ref} from "vue";
import {useGlobalStore} from "@/stores";
import {setPayment, verifyPayment} from "@/api/payment/payment";
import {encrypt} from "@/utils/encryption";
import {useRoute} from "vue-router";
import {addBalance} from "@/api/balance/balance";

const route = useRoute()
const {userInfo} = useGlobalStore()
const set = ref(Boolean(route.query.set))
const payNumbers = ref(new Array(6))
const inputs = ref<HTMLInputElement[]>([])
const inputChange = async (index:number) => {
  if(isNaN(Number(payNumbers.value[index]))) {
    payNumbers.value[index] = null
    ElMessage.error('请输入数字')
    return
  }
  if(index === 5) {
    if(set) {
    //   设置支付密码
      await setPayment({
        userId: userInfo.userId,
        paymentPassword: encrypt(payNumbers.value.join(''))
      })
      window.opener.postMessage({
        pass: true
      }, '*')
      window.close()
    } else {
      await verifyPayment({
        userID: userInfo.userId,
        encryptedPassword: encrypt(payNumbers.value.join(''))
      })
      window.opener.postMessage({
        pass: true
      }, '*')
      window.close()
    }
  } else {
    inputs.value[index+1].focus()
  }
}
const keydown = (e:WindowEventMap['keydown']) => {
  const index = inputs.value.findIndex(item => item === document.activeElement)
  if(e.key === 'Backspace') {
    if(index === 0) {
      payNumbers.value[index] = null
      return
    }
    if(payNumbers.value[index] !== null) {
      payNumbers.value[index] = null
    } else {
      payNumbers.value[index-1] = null
      inputs.value[index-1].focus()
    }
  }
}
window.addEventListener('keydown',keydown)
onMounted(() => {
  if(window.opener === null) {
    ElMessage.error('请从正常渠道进入此页面!')
    window.close()
  }
  inputs.value[0].focus()
})
onUnmounted(() => {
  window.removeEventListener('keydown', keydown)
})
</script>

<template>
  <div class="wrap">
    <p class="pay__img">
      <img src="../assets/logo/text-bg.png" alt="" class="w-80 object-contain">
    </p>
    <p class="pay__title">请输入你的支付密码</p>
    <div class="pay__box">
      <div class="pay__box__input">
        <template v-for="(item,index) in payNumbers">
          <input type="password" maxlength="1" ref="inputs" pattern="\d" v-model.number="payNumbers[index]" @input="inputChange(index)"/>
        </template>
      </div>
<!--      <div class="pay__box__keyboard">-->
<!--        <div class="pay__box__keyboard__item" @click="payNumbers.push(1)">1</div>-->
<!--        <div class="pay__box__keyboard__item" @click="payNumbers.push(2)">2</div>-->
<!--        <div class="pay__box__keyboard__item" @click="payNumbers.push(3)">3</div>-->
<!--        <div class="pay__box__keyboard__item" @click="payNumbers.push(4)">4</div>-->
<!--        <div class="pay__box__keyboard__item" @click="payNumbers.push(5)">5</div>-->
<!--        <div class="pay__box__keyboard__item" @click="payNumbers.push(6)">6</div>-->
<!--        <div class="pay__box__keyboard__item" @click="payNumbers.push(7)">7</div>-->
<!--        <div class="pay__box__keyboard__item" @click="payNumbers.push(8)">8</div>-->
<!--        <div class="pay__box__keyboard__item" @click="payNumbers.push(9)">9</div>-->
<!--        <div class="pay__box__keyboard__item" @click="payNumbers.push(0)">0</div>-->
<!--        <div class="pay__box__keyboard__item" @click="payNumbers.pop()">删除</div>-->
<!--        <div class="pay__box__keyboard__item" @click="payNumbers=[]">清空</div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  @apply h-[100dvh] w-[100dvw] flex flex-col items-center justify-center bg-primary;
  .pay__img {
    @apply mb-10 -mt-20 rounded-md overflow-hidden shadow-md;
  }
  .pay__title {
    @apply text-2xl font-semibold mb-10 text-white;
  }
  .pay__box {
    @apply flex flex-col gap-4;
    &__input {
      @apply flex gap-2;
      input {
        @apply w-12 h-12 border border-gray-300 rounded-md text-center;
      }
    }
    &__keyboard {
      @apply grid grid-cols-3 gap-2;
      &__item {
        @apply flex items-center justify-center border border-gray-300 rounded-md cursor-pointer;
      }
    }
  }
}
</style>
