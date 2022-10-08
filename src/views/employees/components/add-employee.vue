<template>
  <el-dialog title="新增员工" :visible="showDialog" width="35%" top="8vh">
    <!-- 表单 -->
    <el-form label-width="120px" :model="employeeForm" :rules="rules" ref="employeeForm">
      <el-form-item label="姓名">
        <el-input style="width:90%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机">
        <el-input style="width:90%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker style="width:90%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式">
        <el-select style="width:90%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="工号">
        <el-input style="width:90%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门">
        <el-input style="width:90%" placeholder="请选择部门" />
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker style="width:90%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- el中内置的footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small">确定</el-button>
          <el-button size="small">取消</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { addNewEmployee, getBasicInfo } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      employeeForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位' }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getEmployeeInfo()
  },
  methods: {
    async getEmployeeInfo(id) {
      this.employeeForm = await getBasicInfo(id)
    },
    addNewEmployee(){

    },
    async btnOK() {
      this.$refs.employeeForm.validate((valid)=>{
        if (valid) {
            if(id){
              // 触发编辑员工信息
            } else {
              // 触发新增员工
              await addNewEmployee(this.employeeForm)
            }
            // 调用父组件方法 更新前端页面数据
          this.$emit('getEmployeesList')
          // 关闭窗口
          this.btnCancel()
          }
      })
      
    }
  }
}
</script>

<style>

</style>
