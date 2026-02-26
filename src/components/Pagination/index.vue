<template>
  <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
    :current-page="pageNum" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
    layout="slot, sizes, prev, pager,  next, jumper" :total="pageTotal">
    <span class="el-pagination__total-custom">
      <span v-show="pageTotal > 0">
        当前{{ (pageNum - 1) * pageSize + 1 }}-{{
          Math.min(pageNum * pageSize, pageTotal)
        }}条记录，
      </span>
      共{{ pageTotal }}条记录
    </span>
  </el-pagination>
</template>

<script setup>
import { ref, watch } from 'vue'

// 定义 props
const props = defineProps({
  pageTotal: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  }
})

// 定义 emits
const emit = defineEmits(['update'])

// 响应式数据
const pageNum = ref(1)
const pageSize = ref(props.pageSize)

// 监听 props.pageSize 变化
watch(() => props.pageSize, (newSize) => {
  pageSize.value = newSize
}, { immediate: true })

// 方法
const handleSizeChange = (size) => {
  pageSize.value = size
  pageNum.value = 1
  emit('update', 1)
}

const handleCurrentChange = (page) => {
  pageNum.value = page
  emit('update', pageNum.value)
}

// 暴露给父组件的属性和方法
defineExpose({
  pageNum,
  pageSize
})
</script>

<style lang="scss" scoped>
.el-pagination.pagination {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-pagination__total-custom {
    margin-right: 10px;
    font-weight: normal;
    color: #606266;
    font-size: 13px;
    height: 28px;
    line-height: 28px;
  }
}
</style>
