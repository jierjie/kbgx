<template>
  <div class="login">
    <!-- <h3>登录</h3> -->
    <img src="@/assets/img/home_banner.png" alt="">
    <div class='form'>
      <ul>
        <li>
          <i>手机号</i>
          <input type="text" placeholder="请输入注册手机号" v-model.trim="form.phone" maxlength="11" @focus="inputFocus('phone')" ref='phone'>
          <span class="clear" v-show="form.phone" @click="clear('phone')">×</span>
        </li>
        <li>
          <i>密码</i>
          <input type="password" placeholder="请输入密码" v-model.trim="form.password" @focus="inputFocus('password')" ref='password'>
          <span class="clear" v-show="form.password" @click="clear('password')">×</span>
        </li>
      </ul>
      <p class='loginBtn' @click='goLogin' :class="{'no-active':!isLogin}">登录</p>
      <p @click='register'>注册</p>
    </div>
    <h6 @click='goRetrieve'>忘记密码</h6>
  </div>
</template>

<script>
import { UserService, WXService } from '@/service'
import wx from 'weixin-js-sdk'

export default {
  data() {
    return {
      form: {
        phone: '',
        password: ''
      }
    }
  },
  computed: {
    isLogin() {
      if (this.form.phone && this.form.password) {
        return true
      }
      return false
    }
  },
  created() {
    this.wxServer()
    // this.WXConfig.wxShowMenu("test-title", "http://cooper.duoruime.top/v1/images/share/share.png");
  },
  methods: {
    register() {
      this.$router.push('/register')
    },
    goRetrieve() {
      this.$router.push('/retrieve')
    },
    goLogin() {
      if (!this.isLogin) {
        return
      }
      if (!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
        this.$toast('请输入正确的手机号码')
        return
      }
      UserService.login(this.form)
        .then(res => {
          localStorage.user = JSON.stringify(res || {})
          // this.$toast('登录成功')
          // 登录成功 跳转首页
          this.$router.push('/home')
        })
    },
    inputFocus(type) {
      this.$refs[type].focus()
    },
    clear(type) {
      this.form[type] = ""
      this.inputFocus(type)
    },
    wxServer() {
      //签名的URL
      let sign_url = '';
      if (window.__wxjs_is_wkwebview === true) {
        //如果当前设备是IOS
        sign_url = window.location.href.split('#')[0];
      } else {
        //非IOS设备
        sign_url = window.location.href;
      }
      WXService.getSignature(sign_url)
        .then(data => {
          wx.config({
            debug: false,
            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
              "updateAppMessageShareData",//分享给朋友”及“分享到QQ
              "updateTimelineShareData" //分享到朋友圈”及“分享到QQ空间
            ]
          });
          wx.ready(function() {
            let data = {
              title: '我的视界库', // 分享标题
              desc: '库博视光学院，同一个视界，同一个梦想', // 分享描述
              link: 'http://cooper.duoruime.top/#/login', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://cooper.duoruime.top/v1/images/share/share.png', // 分享图标
              success: () => {
              }
            }
            wx.updateAppMessageShareData(data)
            wx.updateTimelineShareData(data)
          });
          wx.error(function(res) {
            console.log(res)
          })
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@blue-color : #55B6B3;
.login {
  position: relative;
  >img {
    width: 7.5rem;
    height: 4rem;
  }
  h3 {
    background-color: @blue-color;
    color: #fff;
    height: 1rem;
    line-height: 1rem;
    font-weight: 400;
  }
  .form {
    padding-bottom: 0.4rem;
    background: #fff;
    position: relative;
    margin: -0.67rem auto 0;
    width: 6.3rem;
    box-shadow: 0rem 0.06rem 0.4rem 0rem rgba(119, 119, 119, 0.2);
    ul {
      padding: .2rem 0.5rem 0.2rem;
      li {
        position: relative;
        padding-top: .4rem;
        >i {
          display: block;
          font-size: 0.32rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 0.45rem;
          padding-bottom: 0.2rem;
        }
        input {
          width: 5.3rem;
          height: 0.8rem;
        }
        span.clear {
          position: absolute;
          line-height: 0.8rem;
          right: 0.1rem;
          color: #55b6b3;
          opacity: 0.5;
          font-size: 0.4rem;
          bottom: 0;
        }
      }
    }
    p {
      font-size: 0.32rem;
      text-align: center;
      margin: 0 auto 0.2rem;
      height: .8rem;
      width: 5.3rem;
      line-height: .8rem;
      background-color: #fff;
      border: 1px solid @blue-color;
      color: @blue-color;
      border-radius: 0.04rem;
      &.no-active {
        opacity: 0.5;
      }
      &.loginBtn {
        background-color: @blue-color;
        color: #fff;
      }
    }
  }
  h6 {
    text-align: right;
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 0.33rem;
    margin: 0.4rem 1rem 0 0;
  }
}
</style>
