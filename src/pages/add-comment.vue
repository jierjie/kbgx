<template>
  <div class="add-comment">
    <top-logo></top-logo>
    <textarea placeholder="留言区" v-model="form.content"></textarea>
    <div class='check'>
      <div class='left' v-if='!form.parentId'>
        <p>私密留言</p>
        <van-checkbox v-model="isPrivate">
        </van-checkbox>
      </div>
      <p class='right' @click='addComment'>发表留言</p>
    </div>
  </div>
</template>

<script>
import { CommentService } from '@/service'
import { TopLogo } from '@/components'
export default {
  components: {
    TopLogo
  },
  data() {
    return {
      isPrivate: false,
      user: JSON.parse(localStorage.user || '{}'),
      form: {
        classId: '',
        userId: '',
        content: '',
        parentId: '',
        isPub: 0 // 是否公开0：公开，1：私密
      }
    }
  },
  created() {
    this.form.parentId = this.$route.query.id || ''
    this.form.classId = this.$route.query.classId
  },
  methods: {
    addComment() {
      let data = { ...this.form }
      data.userId = this.user.id
      if (this.isPrivate) {
        data.isPub = 1
      }
      CommentService.addComment(data)
        .then(res => {
          this.$notify({ type: 'success', message: '评论成功' })
          this.form.content = ''
          this.form.isPub = 0
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.add-comment {
  position: relative;
  padding: 0 0.3rem;

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
}
</style>
