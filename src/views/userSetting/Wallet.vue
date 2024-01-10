<script setup lang="ts">
import {useGlobalStore} from "@/stores";
import {onUnmounted, ref} from "vue";
import {getBalance, updateBalance} from "@/api/balance/balance";
import type {Balance, ResponseData} from "@/types";
import {statusPayment} from "@/api/payment/payment";

const { userInfo } = useGlobalStore()
const form = ref<Balance>({} as Balance)
const loading = ref(false)
const balance = ref(0)

const getData =async () => {
  loading.value = true
  const {data} = await getBalance(userInfo.userId)
  form.value = data
  try{
    await statusPayment(userInfo.userId)
  } catch (e) {
    await ElMessageBox.alert('请先设置支付密码', '提示', {
      confirmButtonText: '确定'
    })
    window.open('/pay?set=1', '_blank')
  }
  loading.value = false
}
getData()

const dialogOpen = (flag: boolean) => {
  ElMessageBox.prompt('请输入金额(跳转后请勿关闭此页面)', flag ? '充值' : '提现', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValidator: (value: string) => {
      if (!value) {
        return '请输入金额'
      }
      if (Number(value) <= 0) {
        return '请输入正确的金额'
      }
      if(Number(value) > 50000) {
        return '最高操作金额为50000'
      }
      return true
    }
  }).then(async ({value}:any) => {
    balance.value = flag ? Number(value) : -Number(value)
    window.open(`/pay`, '_blank')
  })
}

const listener =async (e: MessageEvent) => {
  if(e.data.pass) {
    await updateBalance({
      userId: userInfo.userId,
      userBalance: balance.value
    })
    ElMessage.success(balance.value > 0 ? '充值成功' : '提现成功')
    getData()
  }
}
window.addEventListener('message', listener)
onUnmounted(() => {
  window.removeEventListener('message', listener)
})
</script>

<template>
  <div class="wrap">
    <div class="wallet__header">
      <div class="title">
        <h1>钱包</h1>
        <h3>查看你的余额。</h3>
      </div>
    </div>
    <div class="wallet__content">
      <div class="wallet__balance">
        <div class="wallet__balance__title">当前余额</div>
        <div class="wallet__balance__number">￥{{form.userBalance?.toFixed(2)}}</div>
      </div>
      <div class="wallet__execute">
        <el-button type="primary" size="large" @click="dialogOpen(true)">充值</el-button>
        <el-button size="large" @click="dialogOpen(false)" :disabled="form.userBalance <=0">提现</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  @apply w-2/3 flex flex-col;
}
.title {
  @apply mb-4;
  h1 {
    @apply text-2xl font-semibold underline underline-offset-[-2px] decoration-8 decoration-success;
  }
}
.wallet__content {
  @apply flex flex-col gap-4 items-center;
  .wallet__balance{
    @apply flex items-center justify-center;
    &__number {
      @apply text-6xl font-bold text-primary;
    }
  }
}
</style>
