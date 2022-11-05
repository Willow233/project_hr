<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 头部 -->
        <tree-tools :tree-node="title" :is-root="true" @addDepts="addDepts" />
        <!-- /头部 -->
        <!-- 树形结构主体 -->
        <el-row>
          <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
            <tree-tools
              slot-scope="{ data }"
              :tree-node="data"
              @updateDepts="getDepartments"
              @addDepts="addDepts"
              @editDepts="editDepts"
            />
          </el-tree>
        </el-row>
      </el-card>
    </div>
    <!-- 弹出层 增加部门信息 -->
    <!-- 运用sync修饰符简化 -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @updateDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tool.vue'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments.js'
import { transListToTreeData } from '@/utils/index'

export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      title: {
        name: '公司组织架构详情',
        manager: '负责人',
        id: ''
      },
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      departs: [],
      showDialog: false,
      node: null // 记录当前选中节点
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.departs = transListToTreeData(result.depts, '')
    },
    addDepts(node) {
      this.showDialog = true // 显示增加子部门弹窗
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      // 通过ref可以获取add-dept组件的实例对象 从而调用该实例对象上的方法
      this.$refs.addDept.getDeptDetail(this.node.id)
    }

  }

}
</script>

<style scoped>
.app-container {
  margin-top:10px ;
}
.tree-card {
  padding: 30px 140px;
  font-size:14px;
}
</style>
