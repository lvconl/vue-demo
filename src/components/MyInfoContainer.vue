<template>
  <div>
    <div class="img-box">
      <img :src="avatar?avatar:require('../assets/man.svg')" alt="">
    </div>
    <div class="btn-change">
      <router-link to="/upload">
        <mt-button type="primary" size="small" v-if="avatar === ''" disabled>更改头像</mt-button>
        <mt-button type="primary" size="small" v-else>更改头像</mt-button>
      </router-link>
    </div>
    <!-- 以下是个人信息相关cell -->
    <div class="info-box">
      <mt-cell title="个人信息" is-link to="/changeInfo"><img slot="icon" src="../assets/info-img/info.svg" alt=""></mt-cell>
      <mt-cell title="个人安全" is-link to="/safe"><img slot="icon" src="../assets/info-img/safe.svg" alt=""></mt-cell>
      <mt-cell title="意见反馈" is-link to="/feedback"><img slot="icon" src="../assets/info-img/feedback.svg" alt=""></mt-cell>
      <mt-cell title="关于我们" is-link to="/about"><img slot="icon" src="../assets/info-img/setting.svg" alt></mt-cell>
    </div>
    <div class="btn-box">
      <mt-button type="danger" size="large" class="btn-singout" @click="signout">退出账号</mt-button>
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
        this.changeInfoStatus = false
      })
  },
  methods: {
    signout () {
      localStorage.setItem('userInfo', JSON.stringify({
        username: this.username,
        phone: this.phone
      }))
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
.info-box{
  margin-top: 1rem;
  img{
    width: 6%;
    height: 6%;
  }
}
.img-box {
  width: 45%;
  height: 45%;
  margin: 0 auto;
  margin-top: 2.5rem;
}
.img-box img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.btn-change{
  text-align: center;
}
</style>
