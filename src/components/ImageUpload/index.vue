
<template>
  <div>

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
      :http-request="upload"
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
import { cos } from './cos.js'// 通常情况下应在后端配置cos存储相关信息
export default {
  data() {
    return {
      showDialog: false,
      fileList: [],
      imgUrl: '',
      currentFileUid: null // 记录当前上传的uid
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
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
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
      this.currentFileUid = file.uid
      return true
    },
    upload(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'hr-manage-picture-1314303348', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-beijing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
          StorageClass: 'STANDARD' /* 上传的模式类型 默认标准*/
        }, (err, data) => {
          console.log(err || data)
          //   data 处理返回数据
          if (!err && data.status === 200) {
            this.fileList = this.fileList.map(obj => {
              // 此处用了this 所以要把普通函数function(err,data)改为箭头函数
              if (obj.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location }
              }
              return obj
            })
          }
        })
      }
    }
  }
}
</script>

<style>
    .upload .el-upload--picture-card {
        display: none;
    }
</style>
