<template>
  <div>
    <!-- 上传组件 -->
    <el-upload
      list-type="picture-card"
      action="#"
      :on-success="onSuccess"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :http-request="httpRequest"
    >
      <i class="el-icon-upload2"></i>
    </el-upload>
    <el-dialog title="预览图片" width="600px" :visible.sync="isDialogShow">
      <img :src="imgUrl" width="100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// 导入腾讯的sdk
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "AKIDIcxGUgpsogTADC52urkZJyW0QksmSvAB",
  SecretKey: "qSq0whEXbR4SceVAdu1uYxHQNGzZu1uZ",
});
export default {
  name: "ImageUpload",
  data() {
    return {
      // http://192.168.19.78:8060/admin/common/upload?type=images
      isDialogShow: false,
      imgUrl: "",
      fileList: [
        {
          name: "aaa.jpg",
          url: "http://yun.itheima.com/Upload/Images/20220722/62da600e97fcf.jpg",
        },
        {
          name: "bbb.jpg",
          url: "https://www.itcast.cn/2020gw/images/indeximg/mapweb.png",
        },
      ],
    };
  },
  methods: {
    onSuccess() {
      console.log("success");
    },
    onRemove(file, fileList) {
      // this.fileList = fileList;
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
    },
    onChange(file, fileList) {
      // this.fileList = fileList;
      console.log(file);
      console.log(fileList);
      this.fileList = fileList.map((item) => item);
    },
    onPreview(file) {
      this.imgUrl = file.url;
      this.isDialogShow = true;
    },
    beforeUpload(file) {
      const maxSize = 1024 * 1024 * 2;
      if (file.size > maxSize) {
        this.$message.warning("文件最大不能超过2M");
        return false;
      }
      const typeArr = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
      if (!typeArr.includes(file.type)) {
        this.$message.warning("文件类型不正确");
        return false;
      }
      return true;
    },
    httpRequest({ file }) {
      cos.putObject(
        {
          Bucket: "qiminjie-1313179203", // 存储桶，必须字段
          Region: "ap-nanjing", // 存储桶所在地域,必须字段
          Key: file.name, // 存储在桶里的对象键，必须字段
          StorageClass: "STANDARD",
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
          },
        },
        function (err, data) {
          console.log(err || data);
          console.log(data.Location);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
