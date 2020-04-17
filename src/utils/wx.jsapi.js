// import axios from 'axios'

import { WXShare } from '../service'

export default {
  wxShowMenu: function(title, img) {
    let pageurl = encodeURIComponent(window.location.href)
    // console.log(window.location.href);
    WXShare.getWXConfig(pageurl).then(function(res) {
      let data = res.data.slice(1, res.data.length - 1)
      var getMsg = JSON.parse(data)
      console.log(getMsg)
      wx.config({
        debug: true, //生产环境需要关闭debug模式
        appId: getMsg.appId, //appId通过微信服务号后台查看
        timestamp: getMsg.timestamp, //生成签名的时间戳
        nonceStr: getMsg.nonceStr, //生成签名的随机字符串
        signature: getMsg.signature, //签名
        jsApiList: [
          //需要调用的JS接口列表
          'updateAppMessageShareData', //分享给好友
          'updateTimelineShareData', //分享到朋友圈
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ]
      })
      wx.ready(function() {
        console.log('ready?')
        wx.checkJsApi({
          jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ], //分享到朋友圈,
          success: function(res) {
            console.log(111, res)
            alert(111, res)
          },
          error: function(err) {
            console.log(222, err)
            alert(222, err)
          }
        })

        //分享到朋友圈
        wx.updateTimelineShareData({
          title: title, // 分享标题
          desc: '我在真知灼见跟随大咖学金融，赶紧一起加入吧！', //分享描述
          link: location.href.split('#')[0], // 分享链接
          imgUrl: img // 分享图标
        })

        //分享给朋友
        wx.updateAppMessageShareData({
          title: title, // 分享标题
          desc: '我在真知灼见跟随大咖学金融，赶紧一起加入吧！', //分享描述
          link: location.href.split('#')[0], // 分享链接
          imgUrl: img, // 分享图标
          success: function(res) {
            alert('updateAppMessageShareData', res)
          }
        })
      })

      wx.error(function(err) {
        console.log(err)
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    })
  }
}
