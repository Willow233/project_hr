<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before" style="font-size:12px; ">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="success" plain @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="danger" plain @click="exportData">excel导出</el-button>
          <el-button size="small" type="primary" plain :disabled="!checkPermission('POINT-USER-ADD')" @click="addNewEmployee">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table v-loading="loading" border :data="employeesList">
          <el-table-column label="序号" sortable type="index" width="50px" align="center" />
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
          <el-table-column label="账户状态" sortable prop="enableState" align="center">
            <template v-slot="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <i v-if="row.enableState === 1" class="el-icon-success" style="color:green;" />
              <i v-if="row.enableState !== 1" class="el-icon-error" style="color:red;" />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}?`)">查看</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
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
    <!-- 添加员工弹出窗口 -->
    <add-employee ref="addEmployee" :show-dialog.sync="showDialog" @getEmployeeList="getEmployeeList" />
    <!-- 分配角色弹出窗口 -->
    <assign-role ref="assignRole" :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee.vue'
import { formatDate } from '@/filters'
import AssignRole from './components/assign-role.vue'

export default {
  components: {
    AddEmployee,
    AssignRole
  },
  data() {
    return {
      page: {
        page: 1,
        size: 6,
        total: 0
      },
      employeesList: [],
      loading: false,
      showDialog: false,
      showRoleDialog: false,
      userId: null
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 获取页面数据
    async getEmployeeList() {
      this.loading = true
      const result = await getEmployeeList(this.page)
      this.employeesList = result.rows
      this.page.total = result.total
      this.loading = false
      console.log('页面刷新')
    },
    // 监听页面更新
    handleCurrentChange(val) {
      this.page.page = val
      // 更新前端页面
      this.getEmployeeList(this.page)
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
        this.getEmployeeList(this.page)
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 新增员工
    addNewEmployee(id) {
      this.showDialog = true
      // this.$refs.addEmployee.addNewEmployee()
    },
    // 导出excel表格数据
    exportData() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职时间': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 懒加载是一种将资源初始化推迟到需要时再加载的一种设计模式。
      // 懒加载对应的工具
      import('@/vendor/Export2Excel').then(async excel => {
        // 获取所有员工信息
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows)
        // 添加复杂表头
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        // 合并单元格
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        // excel是引入文件的导出对象
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工资料表',
          multiHeader,
          merges
        })
      })
    },
    // 转换数据格式
    //  [{username:'张三'，mobile:'123'}] =>[['张三','123']] 且顺序要与header对应
    formatJson(headers, rows) {
      return rows.map(item => {
        // item {username:'张三'，mobile:'123'}
        return Object.keys(headers).map(key => {
          // 判断是否为时间字段
          if (headers[key] === 'timeOfEntry' || headers[key] === 'formOfEmployment') {
            // 格式化时间
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const resultObj = EmployeeEnum.hireType.find(obj => {
              obj.id === item[headers[key]]
            })
            return resultObj ? resultObj.value : '未知'
          }
          return item[headers[key]]
        })
      })
    },
    // 分配角色 权限一般分割为：页面访问权限（前端）、按钮操作权限（前端）、API访问权限（常在后端设置）
    async editRole(id) {
      this.userId = id // 再试一下传值
      await this.$refs.assignRole.getUserDetailById(id) // 使用await 让异步任务结束后再执行this.showRoleDialog = true 不然弹窗出现时 数据还没获取完成
      this.showRoleDialog = true
    }

  }
}
</script>

<style>

</style>
