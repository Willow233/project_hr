<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="success" plain>excel导入</el-button>
          <el-button size="small" type="danger" plain>excel导出</el-button>
          <el-button size="small" type="primary" plain>新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table v-loading="loading" border :data="employeesList">
          <el-table-column label="序号" sortable type="index" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column label="聘用形式" sortable prop="formOfEmployment" :formatter="formatEmployment" />
          <el-table-column label="部门" sortable prop="departmentName" />
          <!-- 运用作用域插槽&过滤器 格式化时间 -->
          <el-table-column label="入职时间" sortable prop="timeOfEntry">
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable prop="enableState">
            <template v-slot="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :total="page.total"
            :current-page="page.page"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeesList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
export default {
  data() {
    return {
      page: {
        page: 1,
        size: 6,
        total: 0
      },
      employeesList: [],
      loading: false
    }
  },
  created() {
    this.getEmployeesList()
  },
  methods: {
    // 获取页面数据
    async getEmployeesList() {
      this.loading = true
      const result = await getEmployeesList(this.page)
      this.employeesList = result.rows
      this.page.total = result.total
      this.loading = false
    },
    // 监听页面更新
    handleCurrentChange(val) {
      this.page.page = val
      // 更新前端页面
      this.getEmployeesList()
    },
    // 格式化聘用形式
    formatEmployment(cellValue) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue.formOfEmployment)
      return obj ? obj.value : '未知'
    },
    // 删除员工
    async delEmployee(id) {
      try {
        await this.$confirm('是否确认删除该员工', '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style>

</style>
