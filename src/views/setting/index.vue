<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="editRole()"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="roleList">
              <el-table-column label="序号" width="120" type="index" align="center" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                  <el-button size="small" type="primary" @click="editRole(scope.row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(scope.row.id)">删除</el-button>
                  <el-button size="small" type="success">分配权限</el-button>
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
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <add-role ref="addRole" :show-dialog.sync="showDialog" @getRoleList="getRoleList" />
  </div>
</template>

<script>
import { getRoleList, delRole } from '@/api/setting.js'
import AddRole from './components/addRole.vue'
export default {
  components: { AddRole },
  data() {
    return {
      page: {
        page: 1,
        pagesize: 5,
        total: 0
      },
      roleList: [],
      showDialog: false,
      currentId: null
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
          }).then(() => {
          // 调用接口，删除后端数据
          delRole(id)
        }).then(() => {
          this.$message.success('删除成功')
          // 更新前端页面
          this.getRoleList()
        })
      } catch (error) {
        this.$message.error('删除失败')
      }
    },

    // 修改角色信息
    editRole(id) {
      // 获取当前节点角色信息
      this.showDialog = true
      this.$refs.addRole.getRoleDetail(id)
    }

  }
}
</script>

<style>

</style>
