<template>
  <div class="detail">
    <img src="@/assets/img/logo1.png" alt="">
    <img class='live' src="@/assets/img/1.jpg" alt="">
    <textarea placeholder="留言区"></textarea>
    <div class='check'>
      <div class='left'>
        <p>私密留言</p>
        <van-checkbox v-model="isPrivate">
        </van-checkbox>
      </div>
      <p class='right'>发表留言</p>
    </div>
    <ul>
      <li>
        <img src="" alt="">
        <div class='right'></div>
      </li>
      <li>
        <img src="" alt="">
        <div class='right'></div>
      </li>
      <li>
        <img src="" alt="">
        <div class='right'></div>
      </li>
    </ul>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import { BottomBar } from '@/components'
import { CommentService } from '@/service'

export default {
  components: {
    BottomBar
  },
  data() {
    return {
      isPrivate: false,
      user: JSON.parse(localStorage.user || '{}')
    }
  },
  created() {
    const classId = this.$route.query.id
    this.getComments({ classId, userId: this.user.id })
  },
  methods: {
    // 获取课程的评论
    getComments(data) {
      CommentService.getComments(data)
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.detail {
  position: relative;
  >img {
    height: 1rem;
    width: auto;
  }
  .live {
    margin: .1rem 0 .2rem;
    width: 100%;
    height: 3rem;
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
    padding: .2rem 0;
    li {
      display: flex;
      padding: .1rem .3rem;
      img {
        width: .5rem;
        height: .5rem;
        background: green;
        border-radius: 50%;
        margin-right: .1rem;
      }
      .right {
        flex: 1;
        background: #ccc;
        height: 1rem;
      }
    }
  }
}
</style>
