<script>
  import swal from 'sweetalert'
  import { API } from '../services/api'
  import { Event } from '../services/event'
  export default {
    components: {},
    props: {
      text: {
        type: String,
        default: '上传图片'
      }
    },
    data: () => ({
      image: null
    }),
    methods: {
      fileChange(event) {
        const _this = this
        const file = event.target.files[0]
        if (!file.type.startsWith('image')) {
          return swal('错误的文件', '请选择正确的图片', 'error')
        }
        if (file.size > 1600000) {
          return swal('错误的文件', '图片过大，请压缩后上传', 'error')
        }
        let thumbnail = new FileReader()
        thumbnail.readAsDataURL(file)
        thumbnail.onloadend = () => {
          if (!file.name) return;
          API.post('image', { image: thumbnail.result, size: file.size })
            .then(json => {
              if (!json || !json.key) {
                return swal('上传失败', '上传失败，请稍候重试', 'error')
              }
              swal('上传成功', '图片已上传！', 'success')
              Event.$emit('IMAGE_UPLOAD_SUCCESS', { url: `http://static.wittsay.cc/${json.key}` })
            })
        }

      }
    },
  }
</script>

<template>
  <div class="upload">
    <input type="file" class="input" @change="fileChange" accept="image/*">
    <span class="btn">{{text}}</span>
  </div>
</template>

<style scoped>
  .upload {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
    color: inherit;
  }

  .input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    opacity: 0;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .btn {
    width: 100%;
    height: 100%;
    font-size: 14px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: inherit;
  }

</style>
