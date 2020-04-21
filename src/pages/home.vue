<template>
  <div class="home">
    <top-logo></top-logo>
    <!-- 轮播图 -->
    <div class='live'>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="i in computedLiveList" :key="i.id" @click='goLive(i)'>
          <img v-lazy="i.imgUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 精品 -->
    <div class='fine-class'>
      <ul>
        <li v-for='(i,index) in computedTopicsList' :key="index" @click='goCourseList(i.name)'>
          <img v-if='i.imgUrl' :src="i.imgUrl" alt="">
          <div v-else></div>
        </li>
        <li @click='goGZH'>
          <img src="@/assets/img/c06.png" alt="">
        </li>
      </ul>
    </div>
    <van-popup v-model="show" closeable @close='closeHandle'>
      <div class='my-pop'>
        <i>课程口令</i>
        <input type="text" placeholder="请输入课程口令" v-model.trim="form.code" @blur='blurHandle' @focus="inputFocus('code')" ref='code'>
        <span class="clear" v-show="form.code" @click="clear('code')">×</span>
        <div @click='submit' :class="{'btn':true,'no-active':!isSubmit}">确认</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ClassService } from '@/service'
import { TopLogo } from '@/components'
export default {
  components: { TopLogo },
  data() {
    return {
      topicsList: [],
      liveList: [],
      gzhUrl: '',
      form: {
        code: ''
      },
      show: false,
      live: {},
      myScrollTop: 0
    }
  },
  computed: {
    computedLiveList() {
      return this.liveList.map(i => {
        return {
          ...i,
          imgUrl: localStorage.originUrl + i.image,
          liveUrl: i.url
        }
      })
    },
    computedTopicsList() {
      return this.topicsList.map(i => {
        return {
          ...i,
          imgUrl: localStorage.originUrl + i.img_url
        }
      })
    },
    isSubmit() {
      if (this.form.code) {
        return true
      }
      return false
    }
  },
  created() {
    this.getClass()
    this.getTopics()
  },
  methods: {
    submit() {
      if (!this.isSubmit) {
        return
      }
      // 验证码校验
      ClassService.validate({ ...this.form, classId: this.live.id })
        .then(res => {
          this.show = false
          window.location.href = this.live.liveUrl
        })
        .catch(() => {
          this.$toast('课程口令错误')
          // this.show = false
        })
    },
    goLive(i) {
      this.showPopup()
      this.live = {
        ...i,
        liveUrl: i.liveUrl + '?nickname=' + JSON.parse(localStorage.user).name
      }
    },
    // 轮播图
    getClass() {
      ClassService.getClass('直播课程')
        .then(res => {
          this.liveList = res
        })
      ClassService.getClass('公众号')
        .then(res => {
          this.gzhUrl = res[0].url
        })
    },
    getTopics() {
      ClassService.getTopics()
        .then(res => {
          this.topicsList = res
        })
    },
    goCourseList(i) {
      this.$router.push({ path: '/course/list', query: { topic: i } })
    },
    goGZH() {
      window.location.href = this.gzhUrl
    },
    showPopup() {
      this.show = true
      this.myScrollTop = this.getHeight()
    },
    inputFocus(type) {
      this.$refs[type].focus()
    },
    clear(type) {
      this.form[type] = ""
      this.inputFocus(type)
    },
    closeHandle() {
      this.form.code = ''
      this.blurHandle()
    },
    blurHandle() {
      document.body.scrollTop = this.myScrollTop
      document.documentElement.scrollTop = this.myScrollTop
    },
    getHeight() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      return scrollTop
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@blue-color : #55B6B3;
.home {
  padding: 0 0.3rem 0.6rem;
  min-height: 100vh;
  .live {
    margin-bottom: .5rem;
    height: 3.2rem;
    background: #EAF2F9;
    .van-swipe {
      height: 3.2rem;
      img {
        height: 3.2rem;
        width: 6.9rem;
      }
    }
  }
  .fine-class {
    background: rgba(234, 242, 249, 1);
    border-radius: 0.08rem;
    padding: 0.18rem 0.3rem 0;
    ul {
      font-size: 0;
      li {
        width: calc((100% - 0.2rem)/2);
        margin-top: 0.32rem;
        display: inline-block;
        vertical-align: top;
        &:nth-child(2n) {
          margin-left: 0.2rem;
        }
        div {
          height: 1.6rem;
          background: #fff;
        }
        img {
          width: 100%;
        }
      }
    }
  }
  .my-pop {
    position: relative;
    padding: .6rem 0.3rem .4rem;
    border-radius: 0.04rem;
    >i {
      display: block;
      font-size: 0.32rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.45rem;
      padding-bottom: 0.3rem;
    }
    input {
      width: 100%;
      height: 0.8rem;
    }
    span.clear {
      position: absolute;
      line-height: 0.8rem;
      right: 0.4rem;
      color: #55b6b3;
      opacity: 0.5;
      font-size: 0.4rem;
      bottom: 1.6rem;
    }
    .btn {
      width: 5rem;
      height: 0.8rem;
      line-height: 0.8rem;
      background: rgba(85, 182, 179, 1);
      border-radius: 0.04rem;
      color: rgba(255, 255, 255, 1);
      font-size: 0.32rem;
      text-align: center;
      margin-top: 0.4rem;
      &.no-active {
        opacity: 0.5;
      }
    }
  }
}
</style>
