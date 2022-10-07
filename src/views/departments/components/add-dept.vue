<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="dialogTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="deptForm" label-width="120px" :rules="rules" :model="formData">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="3-15个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeesSimple">
          <el-option v-for="item in employeesList" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>

</template>

<script>
import { getDepartments, addDepartments, getDeptDetail, editDeptDetail } from '@/api/departments.js'
import { getEmployeesSimple } from '@/api/employees.js'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }

  },
  data() {
    // 校验部门名称是否重复
    const checkNameRepeat = async(rule, value, callback) => {
      // 后去部门信息
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式 校验
        // 不能与除自身以外的同级部门重名
        isRepeat = depts.filter(item => item.pid === this.treeNode.id && item.id !== this.treeNode.id).some(item => item.name === value)
      } else {
        // 新增模式 校验
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      isRepeat ? callback(new Error(`${value}已存在`)) : callback()
    }
    // 校验部门编码是否重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 获取部门信息
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式 校验
        isRepeat = depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value && value)
      } else {
        // 新增模式校验
        isRepeat = depts.some(item => item.code === value && value)
      }
      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 3, max: 15, message: '部门名称要求3-15个字符', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-300个字符' }]

      },
      employeesList: {}
    }
  },
  computed: {
    dialogTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async getEmployeesSimple() {
      this.employeesList = await getEmployeesSimple()
    },
    async getDeptDetail(id) {
      this.formData = await getDeptDetail(id)
    //    父组件调用子组件方法，设置了node数据 直接调用方法
    // props传值是异步的，在该方法内直接调用this.treeNode.id 可能会取不到该值
    // 为了避免异步 父组件调用方法时直接传入id值
    },
    btnOk() {
      // 手动校验表单
      this.$refs.deptForm.validate(async valid => {
        if (valid) {
          if (this.formData.id) {
            // 编辑模式  调用编辑接口
            await editDeptDetail(this.formData)
          } else {
            // 新增模式
            // 调用新增接口 添加父部门的id
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }
          //   触发父组件事件 更新前端表单
          this.$emit('updateDepts')
          //   关闭窗口
          this.$emit('update:showDialog', false)
        }
      })
    },
    btnCancel() {
      // 手动重置数据 resetFields只能重置表单上的数据 其他数据无法重置
      this.formData = { name: '', code: '', manager: '', introduce: '' }
      // 运用sync修饰符简化 子组件：this.$emit('update:props属性名称',data)
      this.$emit('update:showDialog', false)
      // 清除之前的校验
      //   resetFields 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.deptForm.resetFields()
    }
  }

}
</script>

<style>

</style>
