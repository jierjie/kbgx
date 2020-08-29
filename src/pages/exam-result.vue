<template>
  <div class="exam_result">
    <div class='report'>
      <span>成绩单</span>
      <b></b>
    </div>
    <p class='total'>满分100分，共{{ questions.length }}题</p>
    <ul class='core'>
      <li>
        <p>您的得分</p>
        <div>
          <b>{{ examLog.score || 0　}}</b>
          <span>分</span>
        </div>
      </li>
      <li>
        <p>答对题数</p>
        <div>
          <b>{{ examLog.rightNum || 0 }}</b>
          <span>题</span>
        </div>
      </li>
    </ul>
<!--    <div class='report'>
      <span>答案解析</span>
      <b></b>
    </div>
    <ul class='result'>
      <li v-for='(item,index) in computedQuestions' :key='item.id'>
        <h6>{{ item.question }} 【{{ item.type==='single'?'单':'多' }}选{{ item.score }}分】</h6>
        <ul>
          <template v-if="item.type==='single'">
            <li v-for='i in item.options' :key='i.key' :class="{'error':(examLog.answer[index] !== item.result && examLog.answer[index]===i.key),'active':(item.result===i.key)}">
              <p>{{ i.key }}. {{ i.label }}</p>
            </li>
          </template>
          <template v-else>
            <li v-for='i in item.options' :key='i.key' :class="{'error':(examLog.answer[index].indexOf(i.key)!==-1 && item.result.indexOf(i.key)===-1),'active':item.result.indexOf(i.key) !==-1 ?true:false}">
              <p>{{ i.key }}. {{ i.label }}</p>
            </li>
          </template>
        </ul>
      </li>
    </ul>
    <span class='submit' @click='angin'>重做</span>-->
  </div>
</template>

<script>
import { Exam } from '@/service'
export default {
  data() {
    return {
      query: {},
      user: JSON.parse(localStorage.user || '{}'),
      examLog: {
        answer: [],
        score: '',
        rightNum: '',
      },
      questions: []
    }
  },
  computed: {
    computedQuestions() {
      return this.questions.map(i => {
        return {
          ...i,
          result: i.result.length > 1 ? i.result.split('') : i.result
        }
      })
    }
  },
  created() {
    this.query = {
      classId: this.$route.query.classId,
      userId: this.user.id
    }
    this.examResult(this.query)
  },
  methods: {
    examResult(data) {
      Exam.examResult(data)
        .then(res => {
          console.log(res)
          this.questions = res.questions || []
          this.examLog = { ...res.examLog }
        })
    },
    angin() {
      this.$router.replace({ path: '/exam', query: { classId: this.$route.query.classId } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@blue-color : #1AC1C9;
.exam_result {
  position: relative;
  padding: 0.32rem 0 1.02rem;
  .report {
    position: relative;
    color: @blue-color;
    font-size: 0.3rem;
    line-height: 0.3rem;
    height: 0.3rem;
    padding: 0 0.56rem 0 0.7rem;
    background: url('../assets/img/exam/1.png') no-repeat 0.5rem center;
    background-size: 0.16rem 0.2rem;
    span {
      position: absolute;
      z-index: 5;
      background: #fff;
      padding-right: 0.1rem;
    }
    b {
      position: relative;
      display: block;
      border-bottom: 1px solid @blue-color;
      width: 6.1rem;
      padding-top: 0.14rem;
      &::after {
        position: absolute;
        content: '';
        width: 0.04rem;
        height: 0.04rem;
        border: 1px solid @blue-color;
        border-radius: 50%;
        right: -0.05rem;
        top: 0.11rem;
      }
    }
  }
  .total {
    padding: 0.14rem 0 0.3rem 0.8rem;
    font-size: 0.22rem;
    color: #717071;
    line-height: 0.28rem;
  }
  .core {
    display: flex;
    justify-content: center;
    margin-bottom: 0.68rem;
    li {
      width: 1.86rem;
      height: 2.04rem;
      background: rgba(26, 193, 201, 0.05);
      border: 1px solid @blue-color;
      margin: 0 0.5rem;
      border-radius: 0.12rem;
      overflow: hidden;
      p {
        color: #fff;
        background: @blue-color;
        text-align: center;
        font-size: 0.27rem;
        line-height: 0.27rem;
        padding: 0.12rem 0 0.1rem;
        margin-bottom: 0.1rem;
      }
      >div {
        color: @blue-color;
        font-size: 0;
        text-align: center;
        b {
          font-size: 0.9rem;
          font-weight: 400;
          display: inline-block;
        }
        span {
          display: inline-block;
          font-size: 0.32rem;
        }
      }
    }
  }
  .result {
    padding-top: 0.32rem;
    >li {
      font-size: 0.27rem;
      h6 {
        padding: 0 .5rem;
        margin-bottom: 0.06rem;
        background: rgba(0, 0, 0, 0.06);
        line-height: 0.7rem;
        color: #717071;
      }
      ul {
        padding: 0 0.8rem 0.37rem;
        li {
          color: #2F2E2F;
          line-height: 0.67rem;
          p {
            width: 5.4rem;
          }
          &.active {
            color: #1AC1C9;
            background: url('../assets/img/exam/right.png') no-repeat right 0.2rem;
            background-size: 0.33rem 0.27rem;
          }
          &.error {
            color: #b00613;
            background: url('../assets/img/exam/error.png') no-repeat right 0.19rem;
            background-size: 0.29rem 0.29rem;
          }
        }
      }
    }
  }
  .submit {
    position: fixed;
    width: 5.5rem;
    line-height: 0.82rem;
    text-align: center;
    color: #fff;
    background: #1AC1C9;
    bottom: 0.2rem;
    left: 1rem;
    border-radius: 0.4rem;
    font-size: 0.38rem;
    letter-spacing: 0.2rem;
  }
}
</style>
