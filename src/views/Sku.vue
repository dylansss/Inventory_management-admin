<template>
  <div>
    <!-- 搜索栏 -->
    <div style="margin-bottom:15px;display:flex;gap:10px;">
      <el-input v-model="keyword" placeholder="按名称搜索" style="width:200px" />
      <el-button type="primary" @click="load">搜索</el-button>
      <el-button type="success" @click="openDialog()">新增商品</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border>
      <!-- <el-table-column prop="id" label="ID" width="60"/> -->
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="color" label="颜色"/>
      <el-table-column prop="material" label="材质"/>
      <el-table-column prop="unit" label="单位"/>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="openDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      style="margin-top:15px;"
      :total="total"
      v-model:current-page="page"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      @current-change="load"
    />

    <!-- 弹窗 -->
    <el-dialog v-model="visible" :title="form.id ? '编辑商品' : '新增商品'">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称"><el-input v-model="form.name"/></el-form-item>
        <el-form-item label="颜色"><el-input v-model="form.color"/></el-form-item>
        <el-form-item label="材质"><el-input v-model="form.material"/></el-form-item>
        <el-form-item label="单位"><el-input v-model="form.unit"/></el-form-item>
        <el-form-item label="备注"><el-input v-model="form.extra"/></el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="visible=false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import request from '../utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 10
const keyword = ref('')
const visible = ref(false)

const form = reactive({
  id: null,
  name: '',
  color: '',
  material: '',
  unit: '',
  extra: ''
})

const load = async () => {
  const res = await request.get('/skus', {
    params: { page: page.value, pageSize, keyword: keyword.value }
  })
  list.value = res.data.list
  total.value = res.data.total
}

const openDialog = (row=null) => {
  if (row) Object.assign(form, row)
  else Object.assign(form, { id:null,name:'',color:'',material:'',unit:'',extra:'' })
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

load()
</script>