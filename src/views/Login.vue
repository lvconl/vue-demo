<template>
    <div>
        <div class="header">
            <mt-header fixed title="登录"></mt-header>
            <img src="../assets/brand-logo.svg">
        </div>
        <div class="login-box">
            <div class="input-box">
                <mt-field label="账号" placeholder="请输入账号..." :state="usernameStatus" v-model="username" @blur.native.capture="checkUsername"></mt-field>
                <mt-field label="密码" placeholder="请输入密码..." type="password" :state="passwordStatus" v-model="password" @blur.native.capture="checkPassword"></mt-field>
            </div>
            <div class="btn-box">
                <mt-button type="primary" size="large" @click="login">登录</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'
import { setTimeout } from 'timers'
export default {
  name: 'Login',
  data () {
    return {
      usernameStatus: '',
      username: '',
      password: '',
      passwordStatus: ''
    }
  },
  mounted () {
    /*
        axios
        .get('http://127.0.0.1:5000/api/test')
        .then(res => {
            this.users = res.data.users
            console.log(res.data);
        })
        */
  },
  methods: {
    checkUsername () {
      var name = this.username
      var regex = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[8])\d{8}$/
      if (regex.test(name)) {
        this.usernameStatus = 'success'
      } else {
        this.usernameStatus = 'error'
      }
    },
    checkPassword () {
      var passwd = this.password
      var regex = /^\d{8}$/
      if (regex.test(passwd)) {
        this.passwordStatus = 'success'
      } else {
        this.passwordStatus = 'error'
      }
    },
    login () {
      var username = this.username
      var password = this.password
      var usernameRegex = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[8])\d{8}$/
      var passwordRgex = /^\d{8}$/
      if (usernameRegex.test(username) && passwordRgex.test(password)) {
        axios.post(
          'http://localhost:5000/api/login',
          {
            'username': username,
            'password': password
          }
        )
          .then(res => {
            var token = res.data.token
            console.log(token)
            if (Object.keys(token).length === 0) {
              Toast({
                message: '请检查账号或密码...',
                position: 'middle',
                duration: '1500',
                iconClass: 'iconfont icon-error'
              })
            } else {
              Indicator.open('登录成功...')
              setTimeout(() => {
                Indicator.close()
              }, 1500)
              this.$router.push('/upload')
            }
          })
          .catch(e => {
            Toast({
              message: '请检查网络或联系商家...',
              position: 'middle',
              duration: 1500,
              iconClass: 'iconfont icon-error'
            })
          })
      } else {
        Toast({
          message: '账号或密码格式错误',
          position: 'middle',
          duration: 1500,
          iconClass: 'iconfont icon-error'
        })
      }
    }
  }
}
</script>
<style scoped>
.login-box{
    margin-top: 2rem;
}
.btn-box{
    margin-top: 2rem;
}
</style>
