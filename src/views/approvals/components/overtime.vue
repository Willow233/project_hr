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
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="补偿方式" prop="types">
          调休
        </el-form-item>
        <el-form-item label="加班开始时间" prop="timeValue">
          <el-date-picker
            v-model="ruleForm.data.start_time"
            format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期"
            :disabled="computeOpType"
          />
        </el-form-item>
        <el-form-item label="加班结束时间" prop="timeValue">
          <el-date-picker
            v-model="ruleForm.data.end_time"
            type="date"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
            :disabled="computeOpType"
          />
        </el-form-item>
        <el-form-item label="申请原因" prop="evaluate">
          <el-input
            v-model="ruleForm.data.reason"
            type="textarea"
            style="width: 400px;"
            placeholder="显示加班人填写的加班原因"
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
  name: 'Overtime',
  props: {
    selectedId: {
      type: String,
      default: ''
    },
    tabLab: {
      type: String,
      default: ''
    }},
  data() {
    return {
      id: '',
      dialogImageUrl: '',
      dialogVisible: false,
      timeValue: '',
      ruleForm: {
        data: {
          start_time: ''
        }
      },
      rules: {}
    }
  },
  computed: {
    computeOpType() {
      return this.ruleForm.stateOfApproval !== '已撤销'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const data = await getApprovalsDetail(this.selectedId)
      this.ruleForm = data
      this.ruleForm.data = JSON.parse(this.ruleForm.procData)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/variables";
.AdjustThePost {
  .infoBox {
    display: flex;
    border-bottom: solid 1px #ccc;
    margin-bottom: 20px;
    padding-bottom: 10px;

    .info {
      p {
        line-height: 30px;
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
