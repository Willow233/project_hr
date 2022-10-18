<template>
  <!-- 工作日历 -->
  <div>
    <el-row>
      <el-col :span="20">
        <el-calendar v-model="currentDate">
          <!-- date 当前单元格的日期 data是对象中显示的数据data -->
          <template v-slot:dateCell="{date,data}">
            <div class="date-content">
              <span class="text" :class="{rest:isWeek(date)}"> {{ data.day | getDay }}</span>
              <!-- <span v-if="isWeek(date)" class="rest">休</span> -->
            </div>
          </template>
        </el-calendar>
      </el-col>
      <el-col :span="4">
        <div style="display:flex;flex-direction:column; justify-content:center;">
          <!-- 年份 当前年份 前后5年 -->
          <el-select v-model="currentYear" size="small" style="width:90px" @change="dataChange">
            <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
          </el-select>
          <!-- 月份 -->
          <el-select v-model="currentMonth" size="small" style="width:90px;margin-top:10px;" @change="dataChange">
            <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  filters: {
    getDay(value) {
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => {
        return new Date()
      }
    }
  },
  data() {
    return {
      yearList: [], // 年份数组
      currentYear: null,
      currentMonth: null,
      currentDate: null // 当前选择时间

    }
  },
  created() {
    // 获取当前年份
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
    this.yearList = Array.from(Array(11), (v, i) => i + 2015)
  },
  methods: {
    dataChange() {
    // 生成新的日期
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    },
    // 判断当前是否是周末
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    }
  }
}
</script>

<style  scoped>
 /deep/ .el-calendar-day {
  height: auto;
  padding: 0px;
 }
 /deep/ .el-calendar-table__row td,/deep/ .el-calendar-table tr td:first-child,  /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 35px;
  text-align: center;
  line-height: 35px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 5px;
  background:#43a7feda;
  width: 25px;
  height: 25px;
  line-height: 25px;
  display: inline-block;
  font-size: 14px;
}
.date-content .text{
  width: 40px;
  height: 24px;
  line-height: 24px;
 display: inline-block;

}
 /deep/ .el-calendar-table td.is-selected .text{
   background: #ff8940;
   color: #fff;
   border-radius: 5px;
 }
 /deep/ .el-calendar__header {
   display: none
 }

 /deep/ .el-calendar__body{
    padding: 0 10px 0 0;
 }
</style>

