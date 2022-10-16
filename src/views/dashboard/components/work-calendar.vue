<template>
  <!-- 工作日历 -->
  <div>
    <el-row type="flex" justify="end">
      <el-select size="small" style="width:90px" />
      <el-select size="small" style="width:90px;margin-left:10px;">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>
    <el-calendar v-model="value" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style>

</style>
