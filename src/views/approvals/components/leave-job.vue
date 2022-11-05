<template>
  <div class="AdjustThePost">
    <div class="infoBox">
      <div class="info">
        <p>
          <span class="name">姓名：{{ ruleForm.username }}</span>
        </p>
        <p>
          <span>部门：</span>
          {{ ruleForm.departmentName }}
        </p>
        <p>
          <span>入职时间：</span>
          {{ ruleForm.timeOfEntry | formatDate }}
        </p>
      </div>
    </div>
    <div>
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="请假类型：" prop="holidayType">
          <el-input v-model="ruleForm.data.holidayType" style="width: 220px;" :disabled="true" />
        </el-form-item>

        <el-form-item label="开始时间：" prop="startTime">
          <el-date-picker
            v-model="ruleForm.data.start_time"
            type="datetime"
            placeholder="选择日期"
            :disabled="computeOpType"
          />
        </el-form-item>
        <el-form-item label="结束时间：" prop="endTime">
          <el-date-picker
            v-model="ruleForm.data.end_time"
            type="datetime"
            placeholder="选择日期"
            :disabled="computeOpType"
          />
        </el-form-item>
        <el-form-item label="请假时长：" prop="duration">
          <el-input v-model="ruleForm.data.duration" style="width: 220px;" :disabled="true" />
        </el-form-item>
        <el-form-item label="申请原因：" prop="cause">
          <el-input
            v-model="ruleForm.data.reason"
            type="textarea"
            style="width: 400px;"
            placeholder="显示请假人填写的请假原因"
            :disabled="computeOpType"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getApprovalsDetail
} from '@/api/approvals'
export default {
  name: 'UsersTableIndex',
  props: {
    selectedId: {
      type: String,
      default: ''
    },
    tabLab: {
      type: String,
      default: ''

    }
  },

  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      timeValue: '',
      ruleForm: {
        data: { holidayType: '' }
      }
    }
  },
  computed: {
    computeOpType() {
      return this.ruleForm.stateOfApproval !== '已撤销'
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const data = await getApprovalsDetail(this.selectedId)
      this.ruleForm = data
      this.ruleForm.data = JSON.parse(this.ruleForm.procData)
      const type = this.ruleForm.data.holidayType
      this.ruleForm.data.holidayType = type === 1 ? '请假' : '调休'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/variables";
.AdjustThePost {
  .infoBox {
    border-bottom: solid 1px #ccc;
    margin-bottom: 20px;
   padding-bottom: 10px;
    .info {
      p {
        line-height: 20px;
        .name {
          font-size: 16px;
        }
        span {
          font-weight: bold;
          display: inline-block;
          margin-right: 0px;
          margin-left: 10px;
        }
      }
    }
    .buttones {
      text-align: center;
    }
  }
}
</style>
