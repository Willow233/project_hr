<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">

      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <!-- 内容 -->
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="delete">删除部门</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>

    </el-col>
  </el-row>
</template>

<script>
import { deleteDepartments } from '@/api/departments.js'
export default {
  props: {
    // 定义传入的属性
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'add') {
        // 添加子部门
      } else if (command === 'edit') {
        //  编辑部门信息
      } else if (command === 'delete') {
        this.$confirm('确定删除该部门么？').then(() => {
          return deleteDepartments(this.treeNode.id) // 返回promise对象 后端数据删除
        }).then(() => {
          //
          this.$emit('delDepts') // 触发父组件自定义事件 更新前端页面
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>

<style>

</style>
