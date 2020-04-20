<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'
  import {WXService} from '@/service'

  export default {
    name: 'App',
    created() {
      let originUrl = window.origin
      if (window.origin === 'http://localhost:8080' || window.origin === 'http://192.168.0.105:8080') {
        originUrl = 'http://39.98.132.132'
      }
      localStorage.originUrl = originUrl
      this.wxServer()
    },
    methods: {
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
            wx.ready(function () {
              let data = {
                title: '我的视界库', // 分享标题
                desc: '库博光学视光学院', // 分享描述
                link: 'http://cooper.duoruime.top/#/home', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://cooper.duoruime.top/v1/images/share/share01.png', // 分享图标
                success: () => {
                }
              }
              wx.updateAppMessageShareData(data)
              wx.updateTimelineShareData(data)
            });
            wx.error(function (res) {
              console.log(res)
            })
          }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: PingFangSC-Regular, PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    min-height: 100vh;
  }
</style>
