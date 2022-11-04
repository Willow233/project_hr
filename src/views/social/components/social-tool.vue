<template>
  <el-card>
    <el-form label-width="100px">
      <el-form-item label="部门:">
        <el-checkbox-group v-model="departmentChecks">
          <el-checkbox v-for="item in departmentList" :key="item.id" :label="item.id" @change="checkChange">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="社保城市:">
        <el-checkbox-group v-model="socialSecurityChecks">
          <el-checkbox v-for="item in cityList" :key="item.id" :label="item.id" @change="checkChange">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="公积金城市:">
        <el-checkbox-group v-model="providentFundChecks">
          <el-checkbox v-for="item in cityList" :key="item.id" :label="item.id" @change="checkChange">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getCityList } from '@/api/common'
import { getDepartments } from '@/api/departments'

export default {
  name: 'SocialTool',
  data() {
    return {
      tips: {},
      keyword: '',
      departmentChecks: [],
      socialSecurityChecks: [],
      providentFundChecks: [],
      cityList: [],
      departmentList: []
    }
  },
  created: function() {
    this.getCityList()
    this.getDepartments()
  },
  methods: {
    // 获取城市
    async getCityList() {
      this.cityList = await getCityList()
    },
    // 获取组织架构
    async getDepartments() {
      const { depts } = await getDepartments()
      this.departmentList = depts.filter(item => item.pid === '')
    },
    checkChange() {
      const selectParams = {
        'departmentChecks': this.departmentChecks,
        'socialSecurityChecks': this.socialSecurityChecks,
        'providentFundChecks': this.providentFundChecks
      }
      this.$parent.changeSelectParams && this.$parent.changeSelectParams(selectParams)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item {
   margin-bottom: none
}

</style>
