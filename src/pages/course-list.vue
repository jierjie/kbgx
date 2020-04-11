<template>
  <div class="list">
    <!-- <img src="@/assets/img/logo1.png" alt=""> -->
    <ul>
      <li v-for='(i,index) in courseList' :key='index' @click="goDetail(i.id)">
        <img :src="i.videoImage" alt="">
      </li>
      <li @click="goDetail">
        <!-- <img src="@/assets/img/2.jpg" alt=""> -->
      </li>
    </ul>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import { BottomBar } from '@/components'
import { ClassService } from '@/service'
export default {
  components: {
    BottomBar
  },
  data() {
    return {
      courseList: []
    }
  },
  created() {
    const topic = this.$route.query.topic
    this.getClass(topic)
  },
  methods: {
    getClass(topic) {
      ClassService.getClass(topic)
        .then(res => {
          this.courseList = res
        })

    },
    goDetail(id) {
      this.$router.push({ path: '/detail', query: { id: id } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.list {
  position: relative;
  >img {
    height: 1rem;
    width: auto;
  }
  ul {
    li {
      cursor: pointer;
      margin: .12rem 0;
      img {
        width: 100%;
        height: 3rem;
      }
    }
  }
}
</style>
