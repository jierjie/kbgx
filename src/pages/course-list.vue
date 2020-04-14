<template>
  <div class="list">
    <top-logo></top-logo>
    <ul>
      <li v-for='(i,index) in computedCourseList' :key='index' @click="goDetail(i)">
        <img :src="i.imgUrl" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import { ClassService } from '@/service'
import { TopLogo } from '@/components'
export default {
  components: {
    TopLogo
  },
  data() {
    return {
      courseList: []
    }
  },
  computed: {
    computedCourseList() {
      return this.courseList.map(i => {
        return {
          ...i,
          imgUrl: localStorage.originUrl + i.image
        }
      })
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
    goDetail(i) {
      if (i.type === 'video') {
        this.$router.push({ path: '/detail', query: { id: i.id, sources: i.url } })
      } else {
        window.location.href = i.url
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.list {
  min-height: 100vh;
  padding: 0 0.3rem;
  ul {
    li {
      cursor: pointer;
      margin-bottom: .2rem;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
