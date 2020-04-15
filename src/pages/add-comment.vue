<template>
  <div class="add-comment">
    <top-logo></top-logo>
    <textarea placeholder="留言区" v-model="form.content"></textarea>
    <div class='check' v-if='!form.parentId'>
      <span :class="{'isPub':form.isPub}" @click="isPubHandler"></span>
      <p>私密留言</p>
    </div>
    <p class='submit' @click='addComment'>发表留言</p>
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
      if (!data.content.trim()) {
        this.$toast('发表的言论不能为空')
        return
      }
      data.userId = this.user.id
      CommentService.addComment(data)
        .then(res => {
          this.$router.push({ path: '/detail', query: { id: this.$route.query.classId } })
          this.$toast('评论成功')
        })
    },
    isPubHandler() {
      if (this.form.isPub) {
        this.form.isPub = 0
      } else {
        this.form.isPub = 1
      }
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
    margin: 0;
    border-radius: 0;
    border: none;
    width: 6.9rem;
    height: 2.2rem;
  }
  .check {
    margin-top: 0.34rem;
    padding-left: 0.05rem;
    font-size: 0;
    span {
      display: inline-block;
      vertical-align: middle;
      width: 0.31rem;
      height: 0.31rem;
      background: #fff url("../assets/img/check.png") no-repeat 0 0;
      background-size: 100% 100%;
      margin-right: 0.24rem;
      &.isPub {
        background: #fff url("../assets/img/check-square.png") no-repeat 0 0;
        background-size: 100% 100%;
      }
    }
    p {
      display: inline-block;
      vertical-align: middle;
      font-size: 0.24rem;
      color: rgba(153, 153, 153, 1);
      line-height: 0.33rem;
    }
  }
  .submit {
    margin-top: 0.6rem;
    line-height: .8rem;
    height: 0.8rem;
    font-size: .3rem;
    padding: 0 .2rem;
    background: rgba(85, 182, 179, 1);
    border-radius: 0.04rem;
    font-size: 0.32rem;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }
}
</style>
