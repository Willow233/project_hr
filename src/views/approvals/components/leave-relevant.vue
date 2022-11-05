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
            <el-form-item label="假期类型" prop="holidayType">
              <el-select v-model="ruleForm.holidayType" placeholder="请选择" style="width: 220px;" @change="handleChange">
                <el-option
                  v-for="item in baseData.leaveType"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="申请单位">
              <span>按天</span>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
              <el-col :span="8">
                <el-date-picker
                  v-model="ruleForm.startTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                  style="width: 340px;"
                  @change="getDuration"
                />
              </el-col>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
              <el-col :span="8">
                <el-date-picker
                  v-model="ruleForm.endTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                  style="width: 340px;"
                  @change="getDuration"
                />
              </el-col>
            </el-form-item>
            <el-form-item label="请假天数">
              <el-input v-model="ruleForm.duration" disabled style="width: 340px;" />
            </el-form-item>
            <el-form-item label="申请理由" prop="reason">
              <el-input
                v-model="ruleForm.reason"
                type="textarea"
                style="width: 340px;"
                :autosize="{ minRows: 3, maxRows: 8}"
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button size="small" type="primary" @click="resetForm()">重置</el-button>
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
      dialogVisible: false,
      state: '1',
      ruleForm: {
        startTime: '',
        endTime: '',
        reason: '',
        holidayType: '',
        duration: 0,
        applyUnit: '按天',
        processKey: 'process_leave',
        processName: '请假',
        userId: this.$store.getters.userId
      },
      baseData: commonApi,
      opType: 7,
      options: [
        {
          value: 7,
          label: '请假'
        },
        {
          value: 18,
          label: '调休'
        }
      ],
      duration: 0,
      rules: {
        holidayType: [{ required: true, message: '请选择假期类型', trigger: 'blur' }],
        startTime: [{ required: true, message: '开始时间', trigger: 'blur' }],
        endTime: [{ required: true, message: '结束时间', trigger: 'blur' }],
        reason: [{ required: true, message: '请填写原因', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async  submitForm(name) {
      try {
        await this.$refs.ruleForm.validate()
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
      console.log(this.ruleForm.holidayType)
      this.state = obj
    },
    getDuration() {
      let duration = 0
      if (this.ruleForm.startTime && this.ruleForm.endTime) {
        const durationStamp = (new Date(this.ruleForm.endTime)).valueOf() - (new Date(this.ruleForm.startTime)).valueOf()
        const fourHours = 1000 * 60 * 60 * 4
        const total = Math.floor(durationStamp / fourHours)
        duration = Math.floor(total / 2) + (total % 2) * 0.5
      }
      this.ruleForm.duration = duration
    }
  }
}
</script>

