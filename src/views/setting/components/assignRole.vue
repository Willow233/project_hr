<template>
  <el-dialog title="分配权限" :visible="showPermDialog" @close="btnPermCancel">
    <!-- 权限是一颗树 -->
    <!-- 将数据绑定到组件上 -->
    <!-- check-strictly 如果为true 那表示父子勾选时  不互相关联 如果为false就互相关联 -->
    <!-- id作为唯一标识 -->
    <el-tree
      ref="permTree"
      :data="permData"
      :props="defaultProps"
      :show-checkbox="true"
      :check-strictly="true"
      :default-expand-all="true"
      :default-checked-keys="selectCheck"
      node-key="id"
    />
    <!-- :check-strictly="true" 父子不关联 -->
    <!-- 确定 取消 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnPermOK">确定</el-button>
        <el-button size="small" @click="btnPermCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
import { assignPerm, getRoleDetail } from '@/api/setting.js'
export default {
  props: {
    showPermDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      permData: [], // 接受权限数据
      defaultProps: {
        label: 'name'
      }, // 定义显示字段的名称&子属性的字段
      selectCheck: [],
      currentId: null
    }
  },
  // created() {
  //   this.getPermId()
  // },
  methods: {
    async getPermId(id) {
      this.permData = transListToTreeData(await getPermissionList(), '0')
      this.currentId = id
      const { permIds } = await getRoleDetail(id)
      this.selectCheck = permIds
    },
    async btnPermOK() {
      try {
        // 获取el-tree实例 并调用其方法
        await assignPerm({ id: this.currentId, permIds: this.$refs.permTree.getCheckedKeys() })
        this.$message.success('分配权限成功')
        this.btnPermCancel()
      } catch (error) {
        console.log(error)
      }
    },
    btnPermCancel() {
    //   清空tree选中
      this.$refs.permTree.setCheckedKeys([])
      this.currentId = null
      this.$emit('update:showPermDialog', false)
    }
  }
}
</script>

<style>

</style>
