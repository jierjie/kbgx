<template>
  <div class="score_result">
    <div class='report'>
      <span>成绩单</span>
      <b></b>
    </div>
    <ul class='core'>
      <li>
        <p>您获得积分</p>
        <div>
          <b>{{ myScore || 0　}}</b>
          <span>点</span>
        </div>
      </li>
    </ul>
    <div class='tip'>
      <h6>积分规则：</h6>
      <p>参加考试获得5点积分（考试得分需超过80分）。</p>
      <p>积分可累积，请前往【库博光学行业睛英汇】进行兑换，有效期1年。</p>
      <p>积分规则解释权归平台所有，如有问题请联系后台邮箱：xxxx@xxxx。</p>
      <p>
        <span>积分兑换请点击：</span><img @click='goExchange' src="@/assets/img/c06.png" alt="">
      </p>
    </div>
  </div>
</template>

<script>
import { Score } from '@/service'
export default {
  data() {
    return {
      user: JSON.parse(localStorage.user || '{}'),
      myScore: 0
    }
  },
  created() {
    this.getScore()
  },
  methods: {
    getScore() {
      Score.getScore(this.user.id)
        .then(res => {
          console.log(res)
          this.myScore = res.score || 0
        })
    },
    goExchange() {
      window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA5ODA4MjAxOA==&scene=123#wechat_redirect'
    }
  }
}
</script>

<style lang='less' scoped>
@blue-color : #1AC1C9;
.score_result {
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
  .core {
    display: flex;
    justify-content: center;
    margin-bottom: 0.68rem;
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
        font-size: 0.36rem;
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
  .tip {
    font-size: 0.28rem;
    padding: 0.2rem 0.6rem 0;
    h6 {
      font-size: 0.32rem;
      font-weight: 400;
      color: #333;
      padding: 0.2rem 0 0.1rem;
    }
    p {
      color: #626675;
      padding-top: 0.16rem;
      img {
        display: inline-block;
        vertical-align: middle;
        height: 0.4rem;
        width: 2rem;
      }
      span {
        margin-top: 0.5rem;
        display: inline-block;
        line-height: 0.4rem;
        height: 0.4rem;
      }
    }
  }
}
</style>
