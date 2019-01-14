<template>
    <div>
        <mt-header fixed title="上传图片">
          <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
        </mt-header>
        <div class="upload">
          <input type="file" accept="image/jpg,image/png,image/jpeg" @change="uploadImage">
        </div>
        <div class="img-box">
          <img :src="avatar?avatar:require('../assets/man.svg')" class="preview" alt="">
        </div>
        <div class="btn-box">
          <mt-button type="primary" size="large" v-if="file" @click="upload">上传</mt-button>
          <mt-button type="primary" size="large" v-else disabled>上传</mt-button>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import axios from 'axios'
export default {
  name: 'upload',
  data () {
    return {
      file: '',
      avatar: ''
    }
  },
  mounted () {
    axios.get('http://localhost:5000/api/get_img/1')
      .then(res => {
        if (res.data.img_stream) {
          this.avatar = res.data.img_stream
        }
      })
      .catch(e => {
        Toast({
          message: '网络错误，请检查网络或联系开发人员...',
          position: 'middle',
          duration: 2000,
          iconClass: 'iconfont icon-error'
        })
      })
  },
  methods: {
    uploadImage (obj) {
      let file = obj.target.files[0]
      this.file = file
      var reader = new FileReader()
      let that = this
      reader.readAsDataURL(file)
      reader.onload = function () {
        that.avatar = this.result
      }
    },
    upload () {
      const file = this.avatar
      axios
        .post(
          'http://localhost:5000/api/upload_image',
          {
            'img': file
          }
        )
        .then(res => {
          Toast({
            message: '上传成功',
            position: 'middle',
            duration: 1000,
            iconClass: 'iconfont icon-yes2'
          })
          this.$router.go(-1)
        })
        .catch(e => {
          Toast({
            message: '上传失败,请检查网络或联系开发人员...',
            position: 'middle',
            duration: 2000,
            iconClass: 'iconfont icon-error'
          })
        })
    }
  }
}
</script>
<style scoped>
.upload{
  margin-top: 3.5rem;
}
.img-box {
    width: 70%;
    height: 70%;
    margin: 0 auto;
    margin-top: 1rem;
}
.img-box img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
}
.btn-box{
    margin-top: 2rem;
}
</style>
