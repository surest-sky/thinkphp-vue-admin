<template>
  <div>
    <el-upload
      :action="action"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handSuccess"
      :on-error="handError"
      limit=1
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "UploadSimple",
    props:{
      action: String
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handSuccess(response, file, fileList){
          console.log(arguments)
      },
      handError(err, file, fileList){
          console.log(arguments)
      }
    }
  }
</script>