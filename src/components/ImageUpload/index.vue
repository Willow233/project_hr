
<template>
  <div>
    <!--  需要先安装 npm i cos-js-sdk-v5 --save 腾讯云cos存储插件 -->
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{upload:fileComputed}"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
    >
      <!-- :class="{类名：布尔值}" -->
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog">
      <img :src="imgUrl" alt="" width="100%">
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      fileList: [
        { url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.dtstatic.com%2Fuploads%2Fblog%2F202102%2F28%2F20210228085905_de8f7.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.dtstatic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668085616&t=254a08c76322bc113308539a990a7ab0' }
      ],
      imgUrl: ''
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      // 预览头像
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      // el-upload on_remove事件会传递两个参数
      // file 是删除的文件
      // fileList 是删除之后 其他文件
    //   this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      this.fileList = fileList
    },

    changeFile(file, fileList) {
      // 文件状态改变时的钩子，添加文件（触发第一次）、上传成功（触发第二次）和上传失败（触发第二次）时都会被调用
      // 添加图片时会被触发两次 所以不能用push
      // fileList.length 第一次为1 第二次为0 是因为此时action="#" 上传失败 返回的是空数组
      this.fileList = fileList.map(item => item)
    },
    // 上传前检查文件格式及大小
    beforeUpload(file) {
      // 检查文件类型
      const types = ['image/jepg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('图片格式不正确')
        return false
      }
      // 检查文件大小
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小应在5M以内')
        return false
      }
      return true
    }
  }
}
</script>

<style>
    .upload .el-upload--picture-card {
        display: none;
    }
</style>
