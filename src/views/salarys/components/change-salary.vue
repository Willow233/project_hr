<template>
  <div class="changeSalary">
    <div class="infoBox">
      <div class="info">
        <p>
          <span class="name">姓名：{{ user.username }}</span>
        </p>
        <p>
          <span>部门：</span>
          {{ user.departmentName }}
        </p><p>
          <span>入职时间：</span>
          {{ user.timeOfEntry | formatDate }}
        </p>
      </div>
    </div>
    <div>
      <el-form :model="ruleForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="调整基本工资">
          <el-input v-model="userSalary.currentBasicSalary" style="width: 220px;" :disabled="true" />
          <span class="Label">-></span>
          <el-input
            v-model="ruleForm.currentBasicSalary"
            style="width: 220px;"
            placeholder="请输入调整后基本工资"
            type="number"
          />
        </el-form-item>
        <el-form-item label="调整岗位工资">
          <el-input v-model="userSalary.currentPostWage" style="width: 220px;" :disabled="true" />
          <span class="Label">-></span>
          <el-input
            v-model="ruleForm.currentPostWage"
            style="width: 220px;"
            placeholder="请输入调整后岗位工资"
            type="number"
          />
        </el-form-item>
        <el-form-item label="工资合计">
          <el-input v-model="computeCurrentTotal" style="width: 220px;" :disabled="true" />
          <span class="Label">-></span>
          <el-input v-model="computeChangeTotal" style="width: 220px;" :disabled="true" />
        </el-form-item>
        <el-form-item label="调整幅度">
          <el-input v-model="computeChangeSize" style="width: 220px;" :disabled="true" />
        </el-form-item>
        <div style="text-align: left;margin-top: 40px;">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onClose">关闭</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { changeSalary } from '@/api/salarys'

export default {
  name: 'UsersTableIndex',
  props: {
    userSalary: {
      type: Object,
      default: null
    },
    userId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      user: {},
      ruleForm: {
      }
    }
  },
  computed: {
    computeCurrentTotal() {
      let base = 0
      if (this.userSalary.currentBasicSalary != null) {
        base = Number(this.userSalary.currentBasicSalary)
      }
      let post = 0
      if (this.userSalary.currentPostWage != null) {
        post = Number(this.userSalary.currentPostWage)
      }
      return base + post
    },
    computeChangeTotal() {
      let base = 0
      if (this.ruleForm.currentBasicSalary != null) {
        base = Number(this.ruleForm.currentBasicSalary)
      }
      let post = 0
      if (this.ruleForm.currentPostWage != null) {
        post = Number(this.ruleForm.currentPostWage)
      }
      return base + post
    },
    computeChangeSize() {
      return this.computeChangeTotal - this.computeCurrentTotal
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async  onSubmit() {
      const sendData = this.ruleForm
      sendData.userId = this.userId
      await changeSalary(sendData)
      this.$message({ message: '保存成功', type: 'success' })
      this.$emit('success')
      this.onClose()
    },
    onClose() {
      this.ruleForm = {}
      this.$emit('onDialogCancel')
    },
    async getUserDetailById() {
      this.user = await getUserDetailById(this.userId)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/variables.scss';
  .changeSalary{
    .infoBox{
      display: flex;
      border-bottom: solid 1px #ccc;
      margin-bottom: 20px;
      .info{
        p{
          line-height: 30px;
          .name{font-size: 16px;}
          span{
            font-weight: bold;
            display: inline-block;
            margin-right: 0px;
            margin-left: 10px;
          }
        }
      }
    }
    .Label{
      margin: 0 20px;
      color:#999;
    }
  }
</style>
