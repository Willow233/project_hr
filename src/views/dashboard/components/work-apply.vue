<template>
  <el-row :gutter="15">
    <el-col
      v-for="(item, index) in countData"
      :key="index"
      :span="6"
      class="box-card"
    >
      <div>
        <el-card :style="{ 'background': item.color, 'background-image':item.image }">
          <i :class="`${item.icon}`" class="icon-style" />
          <el-button
            class="order-title"
            type="text"
            @click="$router.push(item.link)"
          >{{ item.cardTitle }}</el-button>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      countData: [
        {
          cardTitle: '请假调休',
          icon: 'el-icon-s-data',
          color: '#08AEEA',
          image: 'linear-gradient(35deg, #08AEEA 0%, #2AF598 100%)',
          link: '/users/leave-relevant'
        },
        {
          cardTitle: '加班离职',
          icon: 'el-icon-star-on',
          color: ' #74EBD5',
          image: 'linear-gradient(225deg, #74EBD5 0%, #9FACE6 100%)',
          link: '/users/apply'
        },
        {
          cardTitle: '审批列表',
          icon: 'el-icon-s-order',
          color: '#ffd82a',
          image: 'linear-gradient(225deg, #ffd82a 0%, #38d2ad 100%)',
          link: '/users/approvals'
        },
        {
          cardTitle: '我的信息',
          icon: 'el-icon-user-solid',
          color: '#FBAB7E',
          image: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
          link: '/users/info'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  }
  /* created() {
    this.getId()
  },
  methods: {
    getId() {
      this.countData[3].link = `/employees/detail/${this.userId}`
    }
  } */
}
</script>

<style lang="scss" scoped>

  .el-card {
     position: relative;
    color: white;
    height: 145px;
    .icon-style {
      position: absolute;
      top: 10px;
      right: 20px;
      display: block;
      text-align: center;
      line-height: 30px;
      height: 30px;
      width: 30px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
    }

    .order-title{
        position:absolute;
        font-size: 18px;
        top: 85px;
        left: 15px;
        color: white;
        letter-spacing: 2px;
    }

  }

</style>
