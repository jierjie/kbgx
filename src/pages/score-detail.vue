<template>
  <div class="score_detail">
    <div class='report'>
      <span>积分明细</span>
      <b></b>
    </div>
    <ul class='core'>
      <li>
        <p>答题总积分</p>
        <div>
          <b>{{ myScore || 0　}}</b>
          <span>点</span>
        </div>
      </li>
    </ul>
    <ul class='detail_list'>
      <li class='title'>
        <i>课程名称</i>
        <span>获得积分</span>
      </li>
      <li class='detail' v-for="(i,index) in list" :key="index">
        <i>{{i.ClassName}}</i>
        <span>{{i.examScore}}点</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Score } from '@/service'
export default {
  data() {
    return {
      user: JSON.parse(localStorage.user || '{}'),
      myScore: 0,
      list: []
    }
  },
  created() {
    this.myScore = this.$route.query.myScore
    this.getScoreLogs()
  },
  methods: {
    getScoreLogs() {
      Score.getScoreLogs(this.user.id)
        .then(res => {
          this.list = res
          console.log(res)
        })
    }

  }
}
</script>

<style lang='less' scoped>
@blue-color : #1AC1C9;
.score_detail {
  position: relative;
  padding: 0.32rem 0 0.3rem;
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
  .core {
    display: flex;
    justify-content: center;
    margin-bottom: 0.28rem;
    padding-top: 0.5rem;
    li {
      width: 2.86rem;
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
        font-size: 0.32rem;
        line-height: 0.36rem;
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
  .detail_list {
    padding: 0.2rem 0.6rem;
    li {
      font-size: 0;
      padding: 0.1rem 0.1rem;
      position: relative;
      i,
      span {
        font-size: 0.26rem;
        display: inline-block;
        text-align: center;
      }
      span {
        position: absolute;
        width: 1.3rem;
        right: 0.1rem;
      }
    }
    .title {
      font-weight: 700;
      i {
        padding-left: 0.7rem;
      }
    }
    .detail {
      border-top: 1px solid #ccc;
      span {
        color: #1AC1C9;
      }
    }
  }
}
</style>
