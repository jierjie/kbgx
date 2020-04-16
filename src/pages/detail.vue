<template>
  <div class="detail">
    <top-logo></top-logo>
    <!-- <video class='my-video' controls autoplay name="media" meted="meted" style="object-fit:fill"
                   webkit-playsinline="true" playsinline="true" x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen='true'>
                                                                                <source src='http://39.98.132.132/videos/1/0415-01.mp4' type='video/mp4'>
                                                                              </video> -->
    <div class='my-palyer'>
      <video-player class="video-player vjs-custom-skin" autoplay meted="meted" ref="videoPlayer" :playsinline="playsinline" :options="playerOptions" @timeupdate="onPlayerTimeupdate($event)"></video-player>
    </div>
    <!-- @play="onPlayerPlay($event)"  @pause="onPlayerPause($event)"  @ended="onPlayerEnded($event)" -->
    <div class='talk'>
      <span @click='commentHanlder()'>
        <van-icon name="chat-o" />
      </span>
      <p>评论</p>
    </div>
    <ul>
      <li v-for='i in computedCommentList' :key='i.id' @click="commentHanlder(i.id)">
        <h6>{{i.userName}}</h6>
        <p>
          <span v-show='i.replyTo'>回复</span>
          <b v-show='i.replyTo'>{{i.replyTo}}: </b>{{i.content}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { CommentService, ClassService } from '@/service'
import { TopLogo } from '@/components'
import { videoPlayer } from 'vue-video-player'
export default {
  components: {
    TopLogo, videoPlayer
  },
  data() {
    return {
      isPrivate: false,
      user: JSON.parse(localStorage.user || '{}'),
      form: {
        classId: '',
        userId: '',
        content: '',
        isPub: 0
      },
      url: localStorage.originUrl + sessionStorage.sources,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          src: '',  // 路径
          type: 'video/mp4'  // 类型
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      },
      commentList: [],
      query: {
        classId: '',
        userId: ''
      },
      openId: '',
      watchTime: 0
    }
  },
  beforeDestroy() {
    this.logUpdate({ id: this.openId, watchTime: this.watchTime })
    // console.log('beforeDestroy')
  },
  computed: {
    playsinline() {
      let ua = navigator.userAgent.toLocaleLowerCase();
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        return false
      } else {
        return true
      }
    },
    computedCommentList() {
      let list = []
      this.commentList.map(i => {
        list.push(i)
        if (i.replys && i.replys.length) {
          list = [...list, ...i.replys]
        }
      })
      return list
    }
  },
  created() {
    this.playerOptions.sources[0].src = localStorage.originUrl + sessionStorage.sources
    this.playerOptions.poster = localStorage.originUrl + sessionStorage.coverImg
    const classId = this.$route.query.id
    this.query = {
      classId: this.$route.query.id,
      userId: this.user.id
    }
    this.logOpen(this.query)
    this.getComments(this.query)

  },
  methods: {
    addComment() {
      let data = { ...this.form }
      CommentService.addComment({ ...data, ...this.query })
        .then(res => {
          console.log(res)
        })
    },
    // 点击评论某人
    commentHanlder(id) {
      // 调取评论页面
      this.$router.push({ path: '/addcomment', query: { id: id, classId: this.$route.query.id } })
    },
    // 获取课程的评论
    getComments(data) {
      CommentService.getComments(data)
        .then(res => {
          this.commentList = res
        })
    },
    // listen event
    // onPlayerPlay(player) {
    //   console.log('player play!', player)
    // },
    // onPlayerPause(player) {
    //   let watchTime = parseInt(player.currentTime())
    //   if (watchTime > this.watchTime) {
    //     this.watchTime = watchTime
    //   }
    // },
    // onPlayerEnded(player) {
    //   let watchTime = parseInt(player.currentTime())
    //   if (watchTime > this.watchTime) {
    //     this.watchTime = watchTime
    //   }
    // },
    onPlayerTimeupdate(player) {
      let watchTime = parseInt(player.cache_.currentTime)
      if (watchTime > this.watchTime) {
        this.watchTime = watchTime
      }
    },
    logOpen(data) {
      ClassService.logOpen(data)
        .then(res => {
          this.openId = res.id
        })
    },
    logUpdate(data) {
      ClassService.logUpdate(data)
        .then(res => {
          // console.log(111, res)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.detail {
  position: relative;
  padding: 0 0.3rem;
  .my-palyer {
    height: 9/16 * 6.9rem;
    margin-bottom: .4rem;
  }
  .talk {
    border-bottom: 0.01rem solid #ccc;
    padding-bottom: .3rem;
    p {
      line-height: 0.5rem;
      font-size: 0.36rem;
      font-weight: 700;
      color: rgba(51, 51, 51, 1);
    }
    span {
      float: right;
      width: 0.4rem;
      height: 0.42rem;
      margin-top: 0.05rem;
    }
  }
  ul {
    padding-bottom: 0.2rem;
    li {
      padding: .16rem .3rem;
      border-bottom: 0.01rem solid #ccc;
      h6 {
        color: #55B6B3;
        font-size: 0.28rem;
        line-height: 0.4rem;
        font-weight: 400;
      }
      p {
        font-size: 0.28rem;
        line-height: 0.4rem;
        b {
          color: #55B6B3;
          font-weight: 400;
        }
      }
    }
  }
  .my-video {
    width: 100%;
    max-height: 100%;
    max-width: 100%;
  }
}

.detail /deep/ .video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: rgba(43, 51, 63, 0.7) url("../assets/img/go.png") no-repeat 0.1rem 0.1rem;
  background-size: 80% 80%;
  >span {
    display: none;
  }
}

.detail /deep/ .video-js {
  background: transparent;
}

.detail /deep/ .vjs-poster {
  background-position: 0 0;
  background-size: 100% 100%;
  background-repeat: repeat;
}
</style>
