<template>
  <div>
    <div style="margin-bottom:15px;display:flex;gap:10px;">
      <el-input v-model="keyword" placeholder="按名称搜索" style="width:200px" />
      <base-button @click="load()">查询</base-button>
    </div>

    <el-table :data="list" border>
      <el-table-column prop="name" label="商品" />
      <el-table-column prop="username" label="操作人" />
      <el-table-column prop="type" label="类型">
        <template #default="scope">
          <span>{{ scope.row.type === 'IN' ? '入库' : '出库' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="created_at" label="时间">
        <template #default="scope">
          <span>{{ formatTime(scope.row.created_at) }}</span>
        </template>
      </el-table-column>
    </el-table>


    <Pagination ref="paginationRef" :page-total="total" @update="load" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import request from '../utils/request'

const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 10
const keyword = ref('')

const paginationRef = ref();
const load = async (page = 1) => {
  if (page !== paginationRef.value.pageNum) {
    paginationRef.value.pageNum = page;
  }
  const params = {
    keyword: keyword.value,
    page: paginationRef.value.pageNum,
    pageSize: paginationRef.value.pageSize
  };
  const res = await request.get('/stock/logs', {
    params
  })
  list.value = res.data.list
  total.value = res.data.total
}
const formatTime = (time) => {
  const date = new Date(time)
  return date.toLocaleString()
}
onMounted(() => {
  load()
})
</script>