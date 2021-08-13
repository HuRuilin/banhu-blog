<template>
  <div class="cropper-dialog">
    <!-- 选择本地图片 -->
    <el-upload class="uploader" v-bind="uploadConfig">
      <slot name="upload-btn"></slot>
    </el-upload>
    <!-- 利用vue-cropper剪裁图片实现-->
    <el-dialog
      title="图片剪裁"
      width="455px"
      v-model="isVisible"
      append-to-body
      :before-close="close"
    >
      <div class="cropper-content">
        <div class="cropper" style="text-align: center">
          <vue-cropper ref="cropper" v-bind="cropperConfig"></vue-cropper>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="finish"
            >确认</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {
          // vueCropper 配置
          cropper: {},
          // el-upload 配置
          upload: {},
          // 是否需要裁剪
          autoCrop: true,
        };
      },
    },
    // 图片上传api
    api: {
      type: Function,
    },
  },
  emits: ["success", "fail"],
  data() {
    return {
      loading: false,
      isVisible: false,
      cropper: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 140, // 默认生成截图框宽度
        autoCropHeight: 140, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: true, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        maxImgSize: 2000, // 图片最大尺寸
      },
      upload: {
        action: "", //自动上传地址
        autoUpload: false, //是否开启自动上传
        showFileList: false, //是否显示文件列表
        beforeUpload: this.beforeAvatarUpload, //上传前执行事件
        onChange: this.changeUpload, //文件变动时，执行事件
      },
    };
  },
  computed: {
    cropperConfig() {
      return Object.assign({}, this.cropper, this.config.cropper);
    },
    uploadConfig() {
      return Object.assign({}, this.upload, this.config.upload);
    },
  },
  methods: {
    finish() {
      this.$refs.cropper.getCropData(async (data) => {
        const file = this.dataURLtoFile(data, this.cropperConfig.fileName);
        if (this.api) {
          const fileInfo = await this.uploadUrl(file);
          if (!fileInfo) return;
          this.isVisible = false;
          this.$emit("success", fileInfo);
        }
      });
    },

    // 裁剪完成，准备上传
    async uploadUrl(file) {
      try {
        if (!file) return;
        this.loading = true;
        const formData = new FormData();
        formData.append("file", file);
        const { result } = await this.api(formData);
        if (!result) return null;
        return result;
      } catch (error) {
        this.$emit("fail", error);
        console.error("上传异常", error);
      } finally {
        this.loading = false;
      }
    },
    close() {
      this.isVisible = false;
    },

    // 选择本地图片
    async changeUpload(file, fileList) {
      console.log("文件对象", file);
      const valid = this.beforeAvatarUpload(file.raw);
      if (!valid) return;
      // 是否需要裁剪
      if (this.config.autoCrop) {
        this.cropper.img = URL.createObjectURL(file.raw);
        this.cropper.fileName = file.name;
        this.isVisible = true;
      } else {
        const fileInfo = await this.uploadUrl(file.raw);
        if (!fileInfo) return;
        this.$emit("success", fileInfo);
      }
    },

    //检查图片格式
    beforeAvatarUpload(file) {
      const whiteList = ["image/jpeg", "image/jpg", "image/png"];
      const isAllow = whiteList.includes(file.type);
      if (!isAllow) {
        this.$message.error("上传图片只能是 JPG、png、jpeg 格式!");
      }

      return isAllow;
    },

    // 将裁剪base64的图片转换为file文件
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
  },
};
</script>
<style scoped lang="scss">
// 截图
.cropper-content {
  .cropper {
    width: auto;
    height: 300px;
  }
}
</style>
