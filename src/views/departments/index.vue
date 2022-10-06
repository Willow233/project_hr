<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 头部 -->
        <tree-tools :tree-node="title" :is-root="true" />
        <!-- /头部 -->
        <!-- 树形结构主体 -->
        <el-row>
          <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
            <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" />
          </el-tree>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tool.vue'
import { getDepartments } from '@/api/departments.js'
import { tranListToTreeData } from '@/utils/index'

export default {
  components: {
    TreeTools
  },
  data() {
    return {
      title: {
        name: '公司组织架构详情',
        manager: '负责人'
      },
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      departs: []
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.departs = tranListToTreeData(result.depts, '')
    }

  }

}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size:14px;
}
</style>
