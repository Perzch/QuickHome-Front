<script setup lang="ts">
import {useGlobalStore} from "@/stores";
import {ref, watch} from "vue";
import {addIdentity, deleteIdentity, listIdentity, updateIdentity} from "@/api/identity/identity";
import type {Identity, UpdateIdentityRequestData} from "@/types";
import TravellerCard from "@components/TravellerCard.vue";
import {useRoute} from "vue-router";

const { userInfo } = useGlobalStore()
const list = ref<(Identity & {edit: boolean})[]>([])
const total = ref(0)
const loading = ref(false)
const queryParams = ref({
  userId: userInfo.userId,
  page: 1,
  size: 10
})

const getList = async () => {
  loading.value = true
  const {data} = await listIdentity(queryParams.value)
  list.value = data.records.map(item => ({...item, edit: false}))
  total.value = data.total
  loading.value = false
}
watch(() => queryParams.value, getList, {immediate: true})

const deleteCard =async (item:Identity) => {
   await ElMessageBox.confirm('此操作将永久删除该记录','提示', {
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type: "warning"
  })
  loading.value = true
  await deleteIdentity(item)
  await getList()
  loading.value = false
  ElMessage.success('删除成功')
}

const route = useRoute()
const select = ref(Boolean(route.query.select))
const save = async (item:UpdateIdentityRequestData | Identity) => {
  if(select.value) {
    window.opener.postMessage({
      identity: JSON.parse(JSON.stringify(item as Identity))
    }, '*')
    window.close()
  } else {
    loading.value = true
    // @ts-ignore
    if(item.oldIDCardName) {
      await updateIdentity(item as UpdateIdentityRequestData)
      await getList()
      ElMessage.success('修改成功')
    } else {
      await addIdentity({
        userId: userInfo.userId,
        // @ts-ignore
        IDCardName: item.newIDCardName,
        // @ts-ignore
        IDCardNumber: item.newIDCardNumber,
        // @ts-ignore
        IDCardPhoneNumber: item.newIDCardPhoneNumber
      })
      ElMessage.success('添加成功')
      await getList()
    }
    loading.value = false
  }
}

const handleAdd = () => {
  list.value.push({
    add: true,
    edit: true,
    IDCardName: '',
    IDCardNumber: '',
    IDCardPhoneNumber: '',
    userId: userInfo.userId
  } as Identity & {edit: boolean})
}
</script>

<template>
  <div class="wrap">
    <div class="card-header">
      <div class="title">
        <h1>旅客信息</h1>
        <h3>行使隐私权，管理数据使用方式。</h3>
      </div>
      <div>
        <el-button type="primary" icon="plus" @click="handleAdd" v-if="!select">添加</el-button>
      </div>
    </div>
    <div class="card-list">
      <transition-group name="fade">
        <TravellerCard :item="item" :select="select" v-model:edit="item.edit" @deleteCard="deleteCard" @save="save" v-for="(item,index) in list" :key="item.IDCardRecordID || index"/>
      </transition-group>
    </div>
    <div class="flex justify-end my-4">
      <el-pagination
          v-model="queryParams.page"
          :page-size="queryParams.size"
          :total="total"
          layout="prev, pager, next"
          background
          @current-change="getList"
      ></el-pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  @apply w-full;
}
.card-header {
  @apply flex items-center justify-between;
}
.title {
  @apply mb-4;
  h1 {
    @apply text-2xl font-semibold underline underline-offset-[-2px] decoration-8 decoration-success;
  }
}
.card-list {
  @apply grid grid-cols-2 gap-2;
}
</style>
