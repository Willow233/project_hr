<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <!-- 登录账户设置 -->
            <el-form
              ref="employeeInfo"
              :model="employeeInfo"
              :rules="rules"
              label-width="120px"
              style="margin-left: 120px; margin-top:30px"
            >
              <el-form-item label="姓名:" prop="username">
                <!-- 不允许修改管理员姓名 -->
                <el-input v-model="employeeInfo.username" :disabled="userDetailId === '1063705989926227968'" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="employeeInfo.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveBasicInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 个人详情页面 -->
          <el-tab-pane label="个人详情">
            <!-- 打印按钮 -->
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- <UserInfo /> -->
            <component :is="userComponent" />
            <!-- vue js中内置了一个组件component 可以是任何组件
            通过is属性来绑定需要显示在该位置的组件
            is后面为组件的组件名称 要在data中绑定
            作用：动态切换组件
             -->
          </el-tab-pane>
          <!-- 岗位信息页面 -->
          <el-tab-pane label="岗位信息">
            <!-- 打印按钮 -->
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- JobInfo -->
            <component :is="jobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { saveUserDetailById } from '@/api/employees.js'
import { getUserDetailById } from '@/api/user.js'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      userComponent: 'UserInfo', // 动态组件绑定
      jobComponent: 'JobInfo',
      // 此处是route 不是router
      userDetailId: this.$route.params.id,
      employeeInfo: {
        username: '',
        password2: '' // 读取的是password密文 新存一个password2替换
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['userId', 'name'])
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
    async getUserDetailById() {
      this.employeeInfo = await getUserDetailById(this.userDetailId)
    },
    async saveBasicInfo() {
      try {
        this.$refs.employeeInfo.validate(async valid => {
          if (valid) {
            await saveUserDetailById({ ...this.employeeInfo, password: this.employeeInfo.password2 })
            this.$message.success('更新密码成功')
            // 判断是否是登录用户id 是则更新同步导航栏用户名
            if (this.userDetailId === this.userId) {
              this.getUserInfo()
            }
          } else {
            this.message.error('用户名或密码格式不正确')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
