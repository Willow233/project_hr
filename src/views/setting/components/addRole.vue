<template>
  <el-dialog title="编辑弹层" :visible="showDialog" @close="btnCancel">
    <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="roleForm.description" />
      </el-form-item>
    </el-form>
    <!-- 底部 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRole, editRole, addRole } from '@/api/setting.js'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }

        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 在父组件中 通过ref 调用了该方法
    async getRole(id) {
    // 获取当前角色信息
      if (id) {
        this.roleForm = await getRole(id)
      }
    },
    // 确认
    btnOK() {
      this.$refs.roleForm.validate(async valid => {
        if (valid) {
          if (this.roleForm.id) {
            // 调用接口修改角色信息
            await editRole(this.roleForm)
          } else {
            await addRole(this.roleForm)
          }
          // 更新前端页面
          this.$emit('getRoleList')
          // 成功提示
          this.$message.success('操作成功！')
          // 关闭窗口
          this.btnCancel()
        }
      })
    },
    // 取消
    btnCancel() {
      // 还原表单数据
      this.roleForm = { name: '', description: '' }
      // 关闭窗口
      this.$emit('update:showDialog', false)
      // 清除校验
      this.$refs.roleForm.resetFields()
    }
  }
}
</script>

<style>

</style>
