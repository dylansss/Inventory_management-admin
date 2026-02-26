<template>
  <div>
    <!-- 搜索栏 -->
    <div style="margin-bottom:15px;display:flex;gap:10px;">
      <el-input v-model="keyword" placeholder="按名称搜索" style="width:200px" />
      <base-button @click="load()">查询</base-button>
      <base-button type="primary" @click="openDialog()">新增</base-button>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border>
      <!-- <el-table-column prop="id" label="ID" width="60"/> -->
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="color" label="颜色" />
      <el-table-column prop="material" label="材质" />
      <el-table-column prop="unit" label="单位" />
      <el-table-column label="操作" width="240">
        <template #default="scope">
          <el-button size="small" @click="openDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination ref="paginationRef" :page-total="total" @update="load" />
    <!-- 弹窗 -->
    <el-dialog v-model="visible" :title="form.id ? '编辑商品' : '新增商品'">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="颜色"><el-input v-model="form.color" /></el-form-item>
        <el-form-item label="材质"><el-input v-model="form.material" /></el-form-item>
        <el-form-item label="单位"><el-input v-model="form.unit" /></el-form-item>
        <el-form-item label="备注"><el-input v-model="form.extra" /></el-form-item>
      </el-form>

      <template #footer>
        <base-button @click="submit">保存</base-button>
        <base-button @click="visible = false">关闭</base-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import request from '../utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
const list = ref([])
const total = ref(0)
const keyword = ref('')
const visible = ref(false)

const form = reactive({
  id: null,
  name: '',
  color: '',
  material: '',
  unit: '张',
  extra: ''
})
const paginationRef = ref();
const load = async (page = 1) => {
  if (page !== paginationRef.value.pageNum) {
    paginationRef.value.pageNum = page;
  }

  const param = {
    keyword: keyword.value,
    page: paginationRef.value.pageNum,
    pageSize: paginationRef.value.pageSize
  };

  const res = await request.get('/skus', {
    params: param
  })
  list.value = res.data.list
  total.value = res.data.total
}

const openDialog = (row = null) => {
  if (row) Object.assign(form, row)
  else Object.assign(form, { id: null, name: '', color: '', material: '', unit: '张', extra: '' })
  visible.value = true
}

const submit = async () => {
  if (form.id) {
    await request.put(`/skus/${form.id}`, form)
    ElMessage.success('更新成功')
  } else {
    await request.post('/skus', form)
    ElMessage.success('创建成功')
  }
  visible.value = false
  load()
}

const remove = async (id) => {
  await ElMessageBox.confirm('确认删除？')
  await request.delete(`/skus/${id}`)
  ElMessage.success('删除成功')
  load()
}

onMounted(() => {
  load()
})
</script>