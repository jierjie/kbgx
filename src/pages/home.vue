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
      gzhUrl: ''
    }
  },
  computed: {
    computedLiveList() {
      return this.liveList.map(i => {
        return {
          ...i,
          imgUrl: localStorage.originUrl + i.image,
          liveUrl: localStorage.originUrl + i.url
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
    }
  },
  created() {
    this.getClass()
    this.getTopics()
  },
  methods: {
    goLive(i) {
      window.location.href = i.liveUrl
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@blue-color : #55B6B3;
.home {
  padding: 0 0.3rem;
  min-height: 100vh;
  .live {
    margin-bottom: .4rem;
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
    padding: 0.2rem 0.3rem 0;
    ul {
      font-size: 0;
      li {
        width: 3.05rem;
        margin-top: 0.2rem;
        display: inline-block;
        vertical-align: top;
        &:nth-child(2n) {
          margin-left: .2rem;
        }
        div {
          height: 1.6rem;
          background: #fff;
        }
        img {
          width: 3.05rem;
        }
      }
    }
  }
}
</style>
