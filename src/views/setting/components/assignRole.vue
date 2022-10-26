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
import { assignRoles } from '@/api/employees'
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
import { getRole } from '@/api/setting.js'
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
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.permData = transListToTreeData(await getPermissionList(), '0')
    },
    async getPermId(id) {
      this.currentId = id
      const { permIds } = await getRole(id)
      this.selectCheck = permIds
      // Todo 优化 把showDiaglog在这 数据获取完再展示
    },
    async btnPermOK() {
      // 获取el-tree实例 并调用其方法
      await assignRoles({ id: this.currentId, permIds: this.$refs.permTree.getCheckedKeys() })
      this.$message.success('分配权限成功')
      this.btnPermCancel()
      console.log(this.selectCheck)
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
