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
                <span class="header-title">绩效指数</span>
              </div>
              <line-chart />
            </el-card>
          </el-row>
          <!-- 公告 -->
          <el-row>
            <el-card class="box-card announce-card" style="height: 150px">
              <div slot="header" class="clearfix">
                <span class="header-title">公告</span>
              </div>
              <ul class="announce">
                <li v-for="item in news" :key="item.id">
                  <a :href="item.url" :title="item.title" target="_blank">
                    {{ item.title }}
                  </a>
                  <span class="date">
                    {{ item.date }}
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
                <span class="header-title">流程申请</span>
              </div>
              <work-apply />
            </el-card>
          </el-row>
          <!-- 工作日历 -->
          <el-row>
            <el-card class="box-card" style="height: 350px">
              <div slot="header" class="clearfix">
                <span class="header-title">工作日历</span></div>
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
      defaultImg: require('@/assets/common/defaultHead.png'),
      news: [{
        id: 1,
        url: 'http://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202211/t20221104_2851445.html',
        title: '地铁5号线大屯路东站至天通苑北站将于11月5日起提前收车 公交集团增加运力保障出行',
        date: '2022-10-11'
      },
      {
        id: 2,
        url: 'http://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202211/t20221105_2852302.html',
        title: '第六届中国戏曲文化周在北京园博园启动 游园赏秋看好戏 和合共美！',
        date: '2022-10-10'
      },
      {
        id: 3,
        url: 'http://www.beijing.gov.cn/ywdt/yaowen/202211/t20221105_2852311.html',
        title: '中华环保世纪行2022年宣传活动在京举行 “贯彻习近平生态文明思想 用法治力量保护生态环境” ',
        date: '2022-09-11'
      }
      ]
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
.el-card{
  .header-title{
    font-weight: 700;
    color: #43BCFF;
    &::before{
      content: '';
      display: inline-block;
      margin-right:10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #43BCFF;
    }
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
  height: 100px;
  overflow: hidden;
  overflow-y:auto;
  li {
    position: relative;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
    list-style-type:none;
    margin-bottom: 10px;
    margin-left: -20px;
    a{
      color:#2c97f4;
    vertical-align: middle;
    display: inline-block;
    width:450px ;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover{
      color:#202020;
    }
    }
    .date {
      color: #a8a8a8;
      position: absolute;
      right: 20px;
    }

}
}

</style>

