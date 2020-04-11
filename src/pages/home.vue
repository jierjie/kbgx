<template>
  <div class="home">
    <!-- <img src="@/assets/img/logo1.png" alt=""> -->
    <ul class='tab'>
      <li v-for='(i,index) in modulesList' :key=index @click="getTopics(i)">{{i}}</li>
      <!-- <li>精品课程</li>
                                    <li>直播频道</li> -->
    </ul>
    <ul class='course'>
      <li v-for="(i,index) in topicsList" :key='index' @click='goCourseList(i)'>{{i}}</li>
    </ul>
  </div>
</template>

<script>
import { ClassService } from '@/service'

export default {
  data() {
    return {
      modulesList: [],
      topicsList: []
    }
  },
  created() {
    // 模块
    this.getModules()
  },
  methods: {
    getModules() {
      ClassService.getModules()
        .then(res => {
          this.getTopics(res[0])
          this.modulesList = res
        })
    },
    getTopics(i) {
      ClassService.getTopics(i)
        .then(res => {
          this.topicsList = res
        })
    },
    goCourseList(i) {
      this.$router.push({ path: '/course/list', query: { topic: i } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@blue-color : #55B6B3;
.home {
  img {
    height: 1rem;
    width: auto;
  }
  .tab {
    height: .8rem;
    margin: .3rem 0 .3rem;
    li {
      float: left;
      width: 48%;
      line-height: .8rem;
      text-align: center;
      background: #ccc;
      margin: 0 1%;
    }
  }
  .course {
    margin: 0 .1rem .6rem;
    li {
      background: @blue-color;
      line-height: 2rem;
      padding-left: .6rem;
      color: #fff;
      font-size: .6rem;
      margin-bottom: .2rem;
    }
  }
}
</style>
