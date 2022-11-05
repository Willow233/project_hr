<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <div class="usersContainer">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            status-icon
            label-width="110px"
            class="demo-ruleForm"
            enctype="multipart/form-data"
          >
            <el-form-item label="申请类型">
              <el-select v-model="opType" placeholder="请选择" style="width: 220px;" prop="applyType" @change="handleChange">
                <el-option
                  v-for="item in baseData.applyType"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <!--离职表单-->
            <div v-if="state==3">
              <el-form-item label="期望离职时间" :class="computeOpType?'item-enable':'item-dismiss'" prop="exceptTime">
                <el-date-picker
                  v-model="ruleForm2.exceptTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                />
              </el-form-item>
              <el-form-item label="离职原因" :class="computeOpType?'item-enable':'item-dismiss'" prop="reason">
                <el-input
                  v-model="ruleForm2.reason"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 8}"
                  style="width: 70%;"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </div>
            <!--离职表单-->
            <!--加班表单-->
            <div :v-else-if="state==15">
              <el-form-item label="加班开始时间" :class="computeOpType?'item-dismiss':'item-enable'" prop="start_time">
                <el-date-picker
                  v-model="ruleForm.start_time"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                />
              </el-form-item>
              <el-form-item label="加班结束时间" :class="computeOpType?'item-dismiss':'item-enable'" prop="end_time">
                <el-date-picker
                  v-model="ruleForm.end_time"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                />
              </el-form-item>
              <el-form-item label="补偿方式" :class="computeOpType?'item-dismiss':'item-enable'">
                <span>调休</span>
              </el-form-item>
              <el-form-item label="加班原因" :class="computeOpType?'item-dismiss':'item-enable'" prop="reason">
                <el-input
                  v-model="ruleForm.reason"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 8}"
                  style="width: 70%;"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </div>
            <!--加班表单-->
            <el-form-item>
              <el-button size="small" type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button size="small" type="primary" @click="resetForm">重置</el-button>
              <el-button size="small" type="primary" @click="$router.push('/dashboard')">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { startProcess } from '@/api/approvals'
import commonApi from '@/api/constant/user'
export default {
  name: 'UsersTableIndex',
  data() {
    return {
      dialogImageUrl: '',
      value: '加班',
      opType: 15,
      ruleForm: {
        start_time: '',
        end_time: '',
        reason: '',
        processKey: 'process_overtime',
        processName: '加班',
        userId: this.$store.getters.userId

      },
      ruleForm2: {
        exceptTime: '',
        reason: '',
        processKey: 'process_dimission',
        processName: '离职',
        userId: this.$store.getters.userId
      },
      rules: {
        applyType: [{ required: true, message: '请选择申请类型', trigger: 'blur' }],
        start_time: [{ required: true, message: '开始时间', trigger: 'blur' }],
        end_time: [{ required: true, message: '结束时间', trigger: 'blur' }],
        exceptTime: [{ required: true, message: '请选择期望离职时间', trigger: 'blur' }],
        reason: [{ required: true, message: '请填写原因', trigger: 'blur' }]
      },
      baseData: commonApi,
      state: '3'
    }
  },
  computed: {
    computeOpType() {
      return this.opType === 3
    }
  },
  created() {
  },
  methods: {
    async  submitForm(name) {
      try {
        if (this.state === 3) {
          // await this.$refs.ruleForm.validate()
          this.ruleForm.processKey = 'process_dimission'
          this.ruleForm.processName = '离职'
        } else {
          // await this.$refs.ruleForm.validate()
          this.ruleForm.processKey = 'process_overtime'
          this.ruleForm.processName = '加班'
        }
        this.ruleForm.userId = this.$store.getters.userId
        await startProcess(this.ruleForm)
        this.$message.success('提交申请成功!')
        this.$router.push('/dashboard')
      } catch (error) {
        console.log(error)
      }
    },
    resetForm() {
      this.ruleForm = {}
    },
    handleChange(obj) {
      this.ruleForm = {}
      this.state = obj
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../styles/variables";
.usersContainer {
  .el-form-item {
    margin-bottom: 20px;
    .el-form-item__error {
      position: relative;
      margin-left: 300px;
    }
  }
}
.item-enable {
  display: block;
}
.item-dismiss {
  display: none;
}
</style>
