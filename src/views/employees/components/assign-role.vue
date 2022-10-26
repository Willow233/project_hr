<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- 分配角色 -->
    <el-checkbox-group v-model="roleIds">
      <!-- label表示要存储的值 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <!-- footer插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>

</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'

export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [], // 所有角色列表
      roleIds: [] // 当前用户的角色
    }
  },
  created() {
    this.getRoleList()
    this.getUserDetailById()
    // this.getID()
  },
  methods: {
    //  获取所有角色
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
    },
    // 获取当前用户的角色
    // 父组件调用该方法
    async getUserDetailById(id) {
      if (id) {
        const { roleIds } = await getUserDetailById(id) // 这里不能直接用this.userId 因为props传值是异步的 此时可能还没获取到userId值
        this.roleIds = roleIds
      }
    },
    async btnOk() {
      // 提交表单
      await assignRoles({ id: this.userId, permIds: this.roleIds })
      // 关闭窗口
      this.btnCancel()
    },
    btnCancel() {
      // 还原表单数据
      this.roleIds = []
      // 关闭窗口
      this.$emit('update:showRoleDialog', false)
    }
    // getID() {
    //   console.log(this.userId)
    // }
  }
}
</script>

<style>

</style>
