<template>
  <div>
    <div class="img-box">
      <img :src="avatar?avatar:require('../assets/man.svg')" alt="">
    </div>
    <router-link to="/upload">
      <mt-button type="primary" size="small" v-if="avatar === ''">更改头像</mt-button>
      <mt-button type="primary" size="small" v-else>更改头像</mt-button>
    </router-link>
    <!-- 以下是个人信息相关cell -->
    <div class="input-box" v-if="changeInfoStatus">
      <mt-cell
        title="标题文字"
        to="//github.com"
        is-link
        value="带链接">
      </mt-cell>
    </div>
    <div class="btn-box">
      <mt-button type="primary" size="large" @click="changeInfo" v-if="changeInfoStatus">修改信息</mt-button>
      <mt-button type="primary" size="large" @click="confirmChangeInfo" v-else>确认修改</mt-button>
      <mt-button type="danger" size="large" class="btn-singout">退出账号</mt-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui'
export default {
  name: 'MyInfoContainer',
  data () {
    return {
      avatar: '',
      changeInfoStatus: true,
      username: 'username',
      email: 'example@web.com',
      password: '***',
      phone: '13290243215'
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
    changeInfo () {
      this.changeInfoStatus = false
    },
    confirmChangeInfo () {
      console.log(this.username)
      console.log(this.password)
      console.log(this.email)
      console.log(this.phone)
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box{
  margin-top: 2rem;
}
  .btn-singout{
    margin-top: 0.7rem;
  }
  .input-box{
    margin-top: 1rem;
  }
  .img-box {
    width: 45%;
    height: 45%;
    margin: 0 auto;
    margin-top: 1rem;
}
.img-box img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
}
</style>
