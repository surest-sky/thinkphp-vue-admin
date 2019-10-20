<template>
  <div>
    <el-upload
      :action="domain"
      list-type="picture-card"
      :data="QiniuData"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handSuccess"
      :on-error="handError"
      :setImgSrc="setImgSrc"
      :before-upload="beforeAvatarUpload"
      :limit="1"
      :file-list="fileList"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body='false'>
      <img width="100%" :src="imgSrc" alt />
    </el-dialog>
  </div>
</template>

<script>
import md5 from "js-md5";
import moment from "moment";
import { getQiniuToken } from '@/api/common.js'

export default {
  name: "UploadSimple",
  data() {
    return {
      dialogVisible: false,
      domain: "https://upload-z2.qiniup.com",
      qiniuaddr: "http://cdn.surest.cn/",
      QiniuData: {
        key: "", //图片名字处理
        token: "" //七牛云token
      },
      fileList: [],
      uploadImg: ""
    };
  },
  props: {
    imgSrc: String
  },
  created() {
    console.log(this.imgSrc);
    if (this.imgSrc) {
      this.fileList = [
        {
          name: "default.jpg",
          url: this.imgSrc
        }
      ];
    }
    this.getQiniuToken();
  },

  watch: {
    imgSrc(val) {
      if (val) {
        this.fileList = [
          {
            name: "default.jpg",
            url: val
          }
        ];
      }else{
        this.fileList = [];
      }
    }
  },

  destroyed() {
    console.log(2);
  },

  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 张图片，如需更换，请删除上一张图片在重新选择！`
      );
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handSuccess(response, file, fileList) {
      let imgSrc = this.qiniuaddr + this.QiniuData.key;
      console.log(imgSrc);
      this.setImgSrc(imgSrc);
    },
    handError(err, file, fileList) {
      this.$message({
        message: "上传出错，请联系管理员！",
        type: "error",
        center: true
      });
    },
    beforeAvatarUpload(file) {
      const isJPEG = file.type === "image/jpeg";
      const isLt4M = file.size / 1024 / 1024 < 4;
      const isJPG = file.type === "image/jpg";
      const isPNG = file.type === "image/png";

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error("上传头像图片只能是 jpg、png、jpeg 格式!");
        return false;
      }
      if (!isLt4M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
        return false;
      }
      this.QiniuData.key = Math.random(2, 10000) + (Math.random(0, 20) * 20);
    },

    getQiniuToken() {
      let that = this
      getQiniuToken().then(r => {
        that.QiniuData.token = r.data.token
      })
    },

    // 设置文件上传地址
    setImgSrc(src) {
      this.$emit("setImgSrc", src);
    }
  }
};
</script>