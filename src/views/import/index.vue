<template>
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees.js'
export default {
  methods: {
    async success({ header, results }) {
      // 将中文转为与新增员工表单相对应的英文
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      /*  方法一
      let arr = []
      results.forEach(item => {
        let userInfo = {}
        Object.keys(item).forEach(key => {
          // 现在Key是中文
          userInfo[userRelations[key]] = item[key] //key值转化（userRelations）为英文后 赋值
        })
        arr.push(userInfo)
      }) */

      // 方法二
      const newArr = results.map(item => {
        var userInfo = {}
        Object.keys(item).forEach(key => {
          if (userInfo[userRelations[key]] === 'timeOfEntry' || userInfo[userRelations[key]] === 'correctionTime') {
            // 格式化后并转换为时间类型 供后端接口使用
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key]), '/')
          } else {
            userInfo[userRelations[key]] = item[key]
          }
        })
        return userInfo
      })

      await importEmployee(newArr) // 调用导入接口
      this.$message.success('导入excel成功')
      this.$router.back() // 返回原来的页面
    },
    // 转换excel日期格式
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
