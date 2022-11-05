<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <!-- 新增角色按钮 -->
      <page-tools :show-before="true">
        <span slot="before">共计 {{ page.total }} 种角色</span>
        <template v-slot:after>
          <el-button size="small" type="primary" plain @click="editRole()">新增角色</el-button>
        </template>
      </page-tools>
      <el-card>
        <!-- 表格 -->
        <el-table :data="roleList" border>
          <el-table-column label="序号" width="50" type="index" align="center" />
          <el-table-column label="角色名称" width="240" prop="name" align="center" />
          <el-table-column label="描述" prop="description" align="center" />
          <el-table-column label="操作" align="center" width="240px">
            <!-- 作用域插槽 -->
            <template slot-scope="scope">
              <el-button type="text" @click="editRole(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="delRole(scope.row.id)">删除</el-button>
              <el-button type="text" @click="assignRole(scope.row.id)">分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <!-- 分页组件 -->
          <el-pagination
            layout="prev,pager,next"
            :current-page="page.page"
            :total="page.total"
            :page-size="page.pagesize"
            @current-change="handleCurrentChange"
          />
        </el-row>

      </el-card>
    </div>
    <!-- 添加角色 -->
    <add-role ref="addRole" :show-dialog.sync="showDialog" @getRoleList="getRoleList" />
    <!-- 分配权限 -->
    <assign-role
      ref="assignRole"
      :show-perm-dialog.sync="showPermDialog"
      @getRoleList="getRoleList"
    />

  </div>
</template>

<script>
import { getRoleList, delRole } from '@/api/setting.js'
import AddRole from './components/addRole.vue'
import AssignRole from './components/assignRole.vue'

export default {
  components: { AddRole, AssignRole },
  data() {
    return {
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      roleList: [],
      showDialog: false,
      showPermDialog: false
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const result = await getRoleList(this.page)
      this.roleList = result.rows
      this.page.total = result.total
    },
    // 当前页码
    handleCurrentChange(val) {
      this.page.page = val
      // 更新页面
      this.getRoleList()
    },
    // 删除角色
    async delRole(id) {
      try {
        await this.$confirm('是否确认删除该角色', '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        // 只有点击了确定 才能进入到下方
        await delRole(id) // 调用删除接口
        this.getRoleList() // 重新加载数据
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },

    // 修改角色信息
    editRole(id) {
      // 获取当前节点角色信息
      this.showDialog = true
      this.$refs.addRole.getRoleDetail(id)
    },
    // 分配角色权限
    assignRole(id) {
      // 获取该id的角色权限
      this.$refs.assignRole.getPermId(id)
      this.showPermDialog = true
    }
  }
}
</script>

<style>

</style>
