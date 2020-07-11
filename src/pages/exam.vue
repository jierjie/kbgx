<template>
  <div class="exam">
    <ul>
      <li>
        <h6>1.下列哪项是诊断糖尿病所必须的条件 【单选20分】</h6>
        <ul>
          <li class='active'>
            <p>A.静脉血糖达到诊断标准</p>
          </li>
          <li class='error'>
            <p>B.尿糖阳性</p>
          </li>
          <li>C.有“三多一少”表现</li>
          <li>D.有糖尿病家族史</li>
        </ul>
      </li>
      <li>
        <h6>1.下列哪项是诊断糖尿病所必须的条件 【单选20分】</h6>
        <ul>
          <li class='active'>
            <p>A.静脉血糖达到诊断标准</p>
          </li>
          <li class='error'>
            <p>B.尿糖阳性</p>
          </li>
          <li>C.有“三多一少”表现</li>
          <li>D.有糖尿病家族史</li>
        </ul>
      </li>
      <li>
        <h6>1.下列哪项是诊断糖尿病所必须的条件 【单选20分】</h6>
        <ul>
          <li class='active'>
            <p>A.静脉血糖达到诊断标准</p>
          </li>
          <li class='error'>
            <p>B.尿糖阳性</p>
          </li>
          <li>C.有“三多一少”表现</li>
          <li>D.有糖尿病家族史</li>
        </ul>
      </li>
      <li>
        <h6>1.下列哪项是诊断糖尿病所必须的条件 【单选20分】</h6>
        <ul>
          <li class='active'>
            <p>A.静脉血糖达到诊断标准</p>
          </li>
          <li class='error'>
            <p>B.尿糖阳性</p>
          </li>
          <li>C.有“三多一少”表现</li>
          <li>D.有糖尿病家族史</li>
        </ul>
      </li>
    </ul>
    <span class='submit' @click='submit'>提交</span>
  </div>
</template>

<script>
import { Exam } from '@/service'
export default {
  data() {
    return {
      examList: [
        {}
      ],
      keys: []
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    submit() {
      this.$router.push('/exam/result')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.exam {
  position: relative;
  padding: 0.32rem 0 1.02rem;
  >ul {
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
