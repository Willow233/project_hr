<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-row :gutter="15">
        <!-- 左侧信息栏 -->
        <el-col :span="12">
          <!-- 个人信息 -->
          <el-row>
            <el-card style="height: 85px">
              <div class="welcome">
                <img v-imageError="defaultImg" :src="staffPhoto" class="user-avatar">
                <div class="text">
                  <span class="username">{{ name }}</span>
                  <span class="role-name"> {{ userInfo.departmentName }} | 早上好，祝您有开心的一天</span>
                </div>
                <div class="dept-name">
                  <i class="el-icon-time" />
                  16：41：00
                </div>

              </div>
            </el-card>
          </el-row>
          <!-- 图表 -->
          <el-row :gutter="15">
            <el-col :span="12">
              <el-card class="box-card" style="height: 300px">
                <div slot="header" class="clearfix">
                  <span>Echart</span>
                </div>

              </el-card>
            </el-col>
            <!-- 绩效指数 -->
            <el-col :span="12">
              <el-card class="box-card" style="height: 300px">
                <div slot="header" class="clearfix">
                  <span>绩效指数</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <!-- 公告 -->
          <el-row>
            <el-card class="box-card" style="height: 200px">
              <div slot="header" class="clearfix">
                <span>公告</span>
              </div>
            </el-card>
          </el-row>
        </el-col>
        <!-- 右侧信息栏 -->
        <el-col :span="12">
          <!-- 流程申请 -->
          <el-row>
            <el-card class="box-card" style="height: 250px">
              <div slot="header" class="clearfix">
                <span>流程申请</span>
              </div>
              <work-apply />
            </el-card>
          </el-row>
          <!-- 工作日历 -->
          <el-row>
            <el-card class="box-card" style="height: 350px">
              <div slot="header" class="clearfix">
                <span>工作日历</span>
              </div>
              <work-calender />
            </el-card>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import WorkApply from './components/work-apply.vue'
import WorkCalender from './components/work-calendar.vue'
import { mapGetters, createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')

export default {
  name: 'Dashboard',
  components: {
    WorkApply,
    WorkCalender
  },
  data() {
    return {
      defaultImg: require('@/assets/common/defaultHead.png')
    }
  },
  computed: {
    ...mapGetters([
      'name', 'staffPhoto'
    ]),
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}

.welcome {
  display: flex;
  align-items: center;
  position: relative;
  .user-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  margin-right: 15px;
}
.text{
  display: flex;
  flex-direction: column;

  .username{
    font-size: 20px;
  }
  .role-name{
    margin-top:5px;
    font-size: 12px;
    color: rgb(158, 158, 158);
  }
}
.dept-name{
    position: absolute;
    right: -5px;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 10px;
    background-color: #8EC5FC;
background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
color: #fff;

  }
}

.el-card__body {
  display: flex;
}

.el-table{
    margin-top: 0px;
}

</style>

