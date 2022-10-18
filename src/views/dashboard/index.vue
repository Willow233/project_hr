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
                <!-- <div class="dept-name">
                  <i class="el-icon-s-promotion" />
                  {{ userInfo.departmentName }}
                </div> -->

              </div>
            </el-card>
          </el-row>
          <!-- 图表 -->
          <el-row>
            <!-- 绩效指数 -->
            <el-card class="box-card" style="height: 350px">
              <div slot="header" class="clearfix">
                <span>绩效指数</span>
              </div>
              <line-chart />
            </el-card>
          </el-row>
          <!-- 公告 -->
          <el-row>
            <el-card class="box-card announce-card" style="height: 150px">
              <div slot="header" class="clearfix">
                <span>公告</span>
              </div>
              <ul class="announce">
                <li class=""><a href="./zwxx/zwtzgg/202210/t20221011_2833238.html" title="关于2019-2020年度北京市社会公用充电 设施运营考核奖励项目年度评审评价结果的公告（第四批）" target="_blank">
                  关于2019-2020年度北京市社会公用充电 设施运营考核奖励项目年度评审评价结果的公告（第四批）
                </a><span class="date">
                  2022-10-11
                </span></li>
                <li class=""><a href="./zwxx/zwtzgg/202209/t20220928_2825525.html" title="关于公示注册信息变更的售电公司相关信息的通知" target="_blank">
                  关于公示注册信息变更的售电公司相关信息的通知
                </a><span class="date">
                  2022-09-28
                </span></li>
                <li class=""><a href="./zwxx/zwtzgg/202209/t20220923_2821802.html" title="2022年北京市城市管理委员会信息安全外包服务公开招标公告" target="_blank">
                  2022年北京市城市管理委员会信息安全外包服务公开招标公告
                </a><span class="date">
                  2022-09-23
                </span></li>
              </ul>
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
import LineChart from './components/line-chart.vue'
import { mapGetters, createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')

export default {
  name: 'Dashboard',
  components: {
    WorkApply,
    WorkCalender,
    LineChart
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
  overflow: auto;
}

.el-table{
    margin-top: 0px;
}

.announce{
  margin: 0;
  li {
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    padding-right: 90px;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
}

</style>

