<template>
    <div>
        <div style="margin-bottom:15px;display:flex;gap:10px;">
            <el-input v-model="keyword" placeholder="按名称搜索" style="width:200px" />
            <el-button type="primary" @click="load">搜索</el-button>
        </div>

        <el-table :data="list" border>
            <!-- <el-table-column prop="sku_id" label="SKU ID" /> -->
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="quantity" label="库存数量" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" type="success" @click="openDialog(scope.row, 'IN')">入库</el-button>
                    <el-button size="small" type="warning" @click="openDialog(scope.row, 'OUT')">出库</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination style="margin-top:15px;" :total="total" v-model:current-page="page" :page-size="pageSize"
            @current-change="load" />

        <el-dialog v-model="visible" :title="type === 'IN' ? '入库' : '出库'">
            <el-form>
                <el-form-item label="数量">
                    <el-input-number v-model="quantity" />
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="remark" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import request from '../utils/request'
import { ElMessage } from 'element-plus'

const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 10
const keyword = ref('')

const visible = ref(false)
const currentRow = ref(null)
const type = ref('IN')
const quantity = ref(1)
const remark = ref('')

const load = async () => {
    const res = await request.get('/stock', {
        params: { page: page.value, pageSize, keyword: keyword.value }
    })
    list.value = res.data.list
    total.value = res.data.total
}

const openDialog = (row, t) => {
    currentRow.value = row
    type.value = t
    quantity.value = 1
    remark.value = ''
    visible.value = true
}

const submit = async () => {
    const path = `/stock/${type.value === 'IN' ? 'in' : 'out'}`
    const params = {
        sku_id: currentRow.value.sku_id,
        quantity: quantity.value,
        remark: remark.value
    }
    try {
        console.log(path, params, 'path, params');
        
        await request.post(path, params)
        ElMessage.success('操作成功')
        visible.value = false
        load()
    } catch (error) {
        console.log(error);
        
    }
}

load()
</script>