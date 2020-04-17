<template>
  <div class="list">
    <top-logo></top-logo>
    <ul>
      <li v-for='(i,index) in computedCourseList' :key='index' @click="goDetail(i)">
        <img :src="i.imgUrl" alt="">
      </li>
    </ul>
    <van-popup v-model="show" closeable @close='closeHandle'>
      <div class='my-pop'>
        <i>专属码</i>
        <input type="text" placeholder="请输入专属码" v-model.trim="form.code" @focus="inputFocus('code')" ref='code'>
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
  components: {
    TopLogo
  },
  data() {
    return {
      courseList: [],
      show: false,
      form: {
        code: ''
      },
      course: {}
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
    },
    isSubmit() {
      if (this.form.code) {
        return true
      }
      return false
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
        this.show = true
        this.course = i
      } else {
        window.location.href = i.url
      }
    },
    showPopup() {
      this.show = true
    },
    submit() {
      if (!this.isSubmit) {
        return
      }
      // 验证码校验
      ClassService.validate({ ...this.form, classId: this.course.id })
        .then(res => {
          this.show = false
          sessionStorage.sources = this.course.url
          sessionStorage.coverImg = this.course.coverImg
          this.$router.push({ path: '/detail', query: { id: this.course.id } })
        })
        .catch(() => {
          this.$toast('专属码错误')
        })
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
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.list {
  min-height: 100vh;
  padding: 0 0.3rem;
  background: #fff;
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
