<template>
  <div class="detail">
    <top-logo></top-logo>
    <div class='my-palyer'>
      <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="playsinline" :options="playerOptions" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)"></video-player>
    </div>
    <!-- <textarea placeholder="留言区"></textarea>
                                                    <div class='check'>
                                                      <div class='left'>
                                                        <p>私密留言</p>
                                                        <van-checkbox v-model="isPrivate">
                                                        </van-checkbox>
                                                      </div>
                                                      <p class='right'>发表留言</p>
                                                    </div> -->
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
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
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
    console.log(this.openId, this.watchTime)
    this.logUpdate({ id: this.openId, watchTime: this.watchTime })
    console.log('beforeDestroy')
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
    this.playerOptions.sources[0].src = localStorage.originUrl + this.$route.query.sources
    // this.playerOptions.poster = localStorage.originUrl + "/images/1/0411.png"
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
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    onPlayerPause(player) {
      console.log('player pause!', player.currentTime())
      let watchTime = parseInt(player.currentTime())
      if (watchTime > this.watchTime) {
        this.watchTime = watchTime
      }
    },
    onPlayerEnded(player) {
      console.log('player end!', player.currentTime())
      let watchTime = parseInt(player.currentTime())
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
          console.log(111, res)
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
    border-bottom: 1px solid #ccc;
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
  textarea {
    border: 1px solid #000;
    border-radius: 0;
    width: calc(100% - .2rem);
    margin: 0 0 .1rem .1rem;
    height: 1.5rem;
    font-size: .3rem;
  }
  .check {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      flex: 1;
      height: .46rem;
      line-height: .46rem;
      font-size: .3rem;
      p,
      >div {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .right {
      border: 1px solid #000;
      line-height: .46rem;
      height: .46rem;
      font-size: .3rem;
      padding: 0 .2rem;
    }
  }
  ul {
    padding-bottom: 0.2rem;
    li {
      padding: .16rem .3rem;
      border-bottom: 1px solid #ccc;
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
}

.detail /deep/ .video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
